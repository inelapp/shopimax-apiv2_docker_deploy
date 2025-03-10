import { Router } from 'express';
import { StorageController } from '../controllers/storage.controller';

class StorageRoutes {
  router: Router;

  controller: StorageController;

  constructor() {
    this.router = Router();
    this.controller = new StorageController();
    this.routes();
  }

  routes() {
    this.router.route('/storages').get(this.controller.getStorages).post(this.controller.createStorage);
    this.router
      .route('/storages/:id')
      .get(this.controller.getStorage)
      .delete(this.controller.deleteStorage)
      .patch(this.controller.updateStorage);
  }
}

export default new StorageRoutes().router;
