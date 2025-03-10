import { OrderImplRepository } from './impl/orderImplRepository';
import { ProductImplRepository } from './impl/productImplRepository';
import { IProductRepository } from './product.repository';
import { IOrderRepository } from './order.repository';
import { AgentImplRepository } from './impl/agentImplRepository';
import { IAgentRepository } from './agent.repository';
import { ProviderImplRepository } from './impl/providerImplRepository';
import { StorageImplRepository } from './impl/storageImplRepository';
import { PurchaseImplRepository } from './impl/purchaseImplRepository';
import { UserImplRepository } from './impl/userImplRepository';
import { IAuthRepository, IUserRepository } from './user.repository';
import { AuthImplRepository } from './impl/authImplRepository';

const productRepository = new ProductImplRepository();
const orderRepository = new OrderImplRepository();
const agentRepository = new AgentImplRepository();
const providerRepository = new ProviderImplRepository();
const storageRepository = new StorageImplRepository();
const purchaseRepository = new PurchaseImplRepository();
const userRepository = new UserImplRepository();
const authRepository = new AuthImplRepository();

export {
  productRepository,
  IProductRepository,
  orderRepository,
  IOrderRepository,
  agentRepository,
  IAgentRepository,
  providerRepository,
  storageRepository,
  purchaseRepository,
  userRepository,
  IUserRepository,
  authRepository,
  IAuthRepository
};
