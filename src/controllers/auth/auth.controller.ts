import { Request, Response } from "express";
import { signup } from "../../UseCases/auth/signup";
import { SignupRequestDto } from "../../UseCases/auth/signup/signupRequestDto";
import { response } from "../../utils";
import { SignupBadRequestError } from "../../UseCases/auth/signup/signupErrors";
import { StatusCode } from "../../types";
import { getRoles } from "../../UseCases/auth/getRoles";

export class AuthController {
    constructor(){
        this.signup = this.signup.bind(this);
        this.getRoles = this.getRoles.bind(this);
    }

    async getRoles(req: Request, res: Response) {
        const result = await getRoles.execute({});
        if(result.isErr()){
            const error = result.error;
            return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
        }
        return response(res, result.value, 200);
    }

    async signup(req: Request, res: Response) {
        const { email, password, roles, username } = req.body as SignupRequestDto;
        const result = await signup.execute({ email, password, roles, username });
        if(result.isErr()){
            const error = result.error;
            switch (error.constructor) {
                case SignupBadRequestError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return response(res, result.value, 201);
    }
}