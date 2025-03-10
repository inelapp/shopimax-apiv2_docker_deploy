import { OrderStatus } from '../../../types';
import { Client, IProductProps } from '../../../domain';

export interface CreateOrderRequestDto {
  storeName?: string;
  order: Partial<{
    orderNumber: string;
    agent: string;
    agency: string;
    agencyCost: number;
    advancePayment: number;
    pendingPayment: number;
    paymentMethod: string;
    subTotal: number;
    discount: number;
    total: number;
    deliveryType: string;
    contactedStatus: string;
    observation: string;
    status?: OrderStatus;
  }>;
  client: Partial<Client>;
  orderDetail: Array<IProductProps & { productId?: string; id?: string }>;
}
