import { orderRepository } from '../../../repositories';
import GetOrders from './getOrders';

const getOrders = new GetOrders(orderRepository);

export { getOrders };
