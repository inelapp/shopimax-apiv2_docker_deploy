import { err, ok, Result } from 'neverthrow';
import { CreateOrderRequestDto } from './createOrderRequestDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { CreateOrderBadRequestError } from './createOrderErrors';
import { IOrderRepository } from '../../../repositories';
import { IOrderProps, Order } from '../../../domain';
import { OriginData } from '../../../types';
import { CreateOrderResponseDto } from './createOrderResponseDto';

type Response = Result<CreateOrderResponseDto, UnexpectedError | CreateOrderBadRequestError>;

class CreateOrder implements UseCase<CreateOrderRequestDto, Response> {
  private readonly orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(request: CreateOrderRequestDto, service?: any): Promise<Response> {
    try {
      const { order, client, orderDetail } = request;

      const orderRequest: Partial<IOrderProps> = {
        ...order,
        origin: OriginData.MANUAL,
        client,
        orderDetail
      };

      const orderOrError = Order.create(orderRequest);
      if (orderOrError.isErr()) {
        return err(new CreateOrderBadRequestError(orderOrError.error.toString()));
      }

      const result = await this.orderRepository.createOrder({
        ...orderOrError.value,
        products: orderDetail
      });
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default CreateOrder;
