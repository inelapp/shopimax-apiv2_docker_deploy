import { GenericFilters, OriginData } from '../types';
import { Client, IOrderProps, IProductProps, Order } from '../domain';
import { OrderDbResponseDetailMap } from '../mappers';
import { IPaginateData } from '../helpers';

export type ProductRequest = {
  productId: string;
  quantity: number;
  review?: string;
  customProduct?: IProductProps;
} & IProductProps;

export interface OrderProcessRequest {
  orderNumber: string;
  client: Client;
  storeName: string;
  origin: OriginData;
  advancePayment: number;
  agencyCost: number;
  discount: number;
}

export interface GetOrderFilters {
  id?: string;
  orderNumber?: string;
  storeName?: string;
  agency?: string;
  agent?: string;
  client?: Partial<Client>;
  status?: string;
  fromDate?: Date;
  toDate?: Date;
}

export type IOrderCreateOrUpdateRequest = IOrderProps & {
  products: Array<Partial<ProductRequest>>;
};

export interface IOrderRepository {
  getOrders(filters?: GetOrderFilters & GenericFilters): Promise<IPaginateData<OrderDbResponseDetailMap>>;
  processOrderToWebhook(order: OrderProcessRequest, products: Partial<ProductRequest>[]): Promise<Order>;
  validateExistOrder(orderNumber: string): Promise<boolean>;
  updateOrder(orderId: string, request: Partial<IOrderProps>): Promise<Order>;
  getOrderById(orderId: string): Promise<OrderDbResponseDetailMap | null>;
  createOrder(request: IOrderCreateOrUpdateRequest): Promise<OrderDbResponseDetailMap>;
}
