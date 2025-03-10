import { Router } from "express";
import { AuthController } from "../../controllers";

class UserRoutes {
    router: Router;
    controller: AuthController;

    constructor() {
        this.router = Router();
        this.controller = new AuthController();
        this.routes();
    }

    routes() {
        this.router.post('/auth/signup', this.controller.signup);
        this.router.get('/auth/roles', this.controller.getRoles)
    }
}

export default new UserRoutes().router;