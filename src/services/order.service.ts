import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

class OrderRoutes {
  router: Router;

  controller: OrderController;

  constructor() {
    this.router = Router();
    this.controller = new OrderController();
    this.routes();
  }

  routes() {
    this.router.post('/orders/process-orders', this.controller.processOrderWebhook);
    this.router.route('/orders/:id').get(this.controller.getOrder).patch(this.controller.updateOrder);
    this.router.route('/orders').get(this.controller.getOrders).post(this.controller.createOrder);
  }
}

export default new OrderRoutes().router;
