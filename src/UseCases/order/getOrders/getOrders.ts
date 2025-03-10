import { err, ok, Result } from 'neverthrow';
import { GetOrdersBadRequestError } from './getOrdersErrors';
import { createInstanceOrError, getDatefilters, UnexpectedError, UseCase } from '../../../utils';
import { ClientPropsTuple, GetOrdersRequestDto } from './getOrdersRequestDto';
import { IOrderRepository } from '../../../repositories';
import { GetOrderFilters } from '../../../repositories/order.repository';
import { GenericFilters } from '../../../types';
import { GetOrdersResponseDto } from './getOrdersResponseDto';
import { Client, getOrderFiltersSchema } from '../../../domain';

type Response = Result<GetOrdersResponseDto, GetOrdersBadRequestError | UnexpectedError>;

class GetOrders implements UseCase<GetOrdersRequestDto, Response> {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(request: GetOrdersRequestDto, service?: any): Promise<Response> {
    try {
      const validRequestOrError = createInstanceOrError<GetOrderFilters>(getOrderFiltersSchema, request.orderFilters);

      if (validRequestOrError.isErr()) {
        return err(new GetOrdersBadRequestError(validRequestOrError.error));
      }

      const orderFilter: GetOrderFilters & GenericFilters = this.getFilters(request);
      const result = await this.orderRepository.getOrders(orderFilter);
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }

  private getFilters(request: GetOrdersRequestDto): GetOrderFilters {
    const clientFilters = ['clientName', 'clientDocumentNumber', 'clientPhone', 'clientProvince'];
    const {
      orderFilters: { agency, agent, id, orderNumber, status, storeName, fromDate, toDate, ...restClientFilters },
      ...restRequestParams
    } = request;

    const { fromDate: parseFromDate, toDate: parseToDate } = getDatefilters(fromDate, toDate);

    const client: Partial<Client> | undefined = Object.keys(restClientFilters).reduce((acc, key) => {
      if (clientFilters.includes(key) && ClientPropsTuple[key]) {
        const newKey = ClientPropsTuple[key];
        acc[newKey] = restClientFilters[key];
      }
      return acc;
    }, {} as Partial<Client>);
    return {
      ...restRequestParams,
      agency,
      agent,
      id,
      orderNumber,
      status,
      storeName,
      fromDate: parseFromDate,
      toDate: parseToDate,
      client: Object.keys(client).length ? client : undefined
    };
  }
}

export default GetOrders;
