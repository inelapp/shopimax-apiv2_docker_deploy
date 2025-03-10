import { GenericObject } from "src/types";
import { UnexpectedError, UseCase } from "../../../utils";
import { err, ok, Result } from "neverthrow";
import { Role } from "../../../domain/auth";
import { IAuthRepository } from "src/repositories";

type Response = Result<Role[], UnexpectedError>;
class GetRoles implements UseCase<GenericObject, Response> {
    constructor(private readonly authRepository: IAuthRepository){}

    async execute(request: GenericObject, service?: any): Promise<Response> {
        try {
            return ok(await this.authRepository.getRoles());
        } catch (error) {
            return err(new UnexpectedError(error.message));
        }
    }
}

export default GetRoles;