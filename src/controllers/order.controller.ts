import { Request, Response } from 'express';
import { ProcessOrderRequest } from '../domain';
import { processOrder } from '../UseCases/order/processOrder';
import { ProcessOrderBadRequestError } from '../UseCases/order/processOrder/processOrderErrors';
import { response } from '../utils';
import { StatusCode } from '../types';
import { getOrder } from '../UseCases/order/getOrder';
import { GetOrderBadRequestError, GetOrderNotFoundError } from '../UseCases/order/getOrder/getOrderErrors';
import { CreateOrderRequestDto } from '../UseCases/order/createOrder/createOrderRequestDto';
import { createOrder } from '../UseCases/order/createOrder';
import { CreateOrderBadRequestError } from '../UseCases/order/createOrder/createOrderErrors';
import { getOrders } from '../UseCases/order/getOrders';
import { GetOrdersBadRequestError } from '../UseCases/order/getOrders/getOrdersErrors';

export class OrderController {
  constructor() {
    this.processOrderWebhook = this.processOrderWebhook.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  async getOrders(req: Request, res: Response) {
    const { page, limit, ...orderFilters } = req.query;
    const result = await getOrders.execute({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      orderFilters: {
        ...orderFilters
      }
    });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetOrdersBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async getOrder(req: Request, res: Response) {
    const { id } = req.params;
    const result = await getOrder.execute({ id });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetOrderNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        case GetOrderBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async processOrderWebhook(req: Request, res: Response) {
    const payload = req.body as ProcessOrderRequest;
    const result = await processOrder.execute(payload);
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case ProcessOrderBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.CREATED);
  }

  async createOrder(req: Request, res: Response) {
    const payload = req.body as CreateOrderRequestDto;
    const result = await createOrder.execute(payload);
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case CreateOrderBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.CREATED);
  }

  async updateOrder(req: Request, res: Response) {
    return response(res, 'Not implemented', StatusCode.NOT_IMPLEMENTED);
  }
}
