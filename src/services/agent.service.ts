import { Router } from 'express';
import { AgentController } from '../controllers';

class AgentRoutes {
  router: Router;

  controller: AgentController;

  constructor() {
    this.router = Router();
    this.controller = new AgentController();
    this.routes();
  }

  routes() {
    this.router.route('/agents').get(this.controller.getAgents).post(this.controller.createAgent);
    this.router.route('/agents/:id').get(this.controller.getAgent).patch(this.controller.updateAgent);
  }
}

export default new AgentRoutes().router;
