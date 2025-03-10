import { err, ok, Result } from "neverthrow";
import { SignupBadRequestError, SignupUserEmailAlreadyExistsError, SignupUserUsernameAlreadyExistsError } from "./signupErrors";
import { SignupResponseDto } from "./signupResponseDto";
import { UnexpectedError, UseCase } from "../../../utils";
import { SignupRequestDto } from "./signupRequestDto";
import { User } from "../../../domain/auth";
import { IUserRepository } from "../../../repositories";

type Response = Result<SignupResponseDto, SignupBadRequestError | SignupUserEmailAlreadyExistsError | SignupUserUsernameAlreadyExistsError | UnexpectedError>

class Signup implements UseCase<SignupRequestDto, Response> {
    constructor(private readonly userRepository: IUserRepository) {}
    async execute(request: SignupRequestDto, service?: any): Promise<Response> {
        try {
            const userOrError = User.create(request);
            if(userOrError.isErr()){
                return err(new SignupBadRequestError(userOrError.error));
            }
            const user = userOrError.value;

            const userByEmail = await this.userRepository.getUser({ email: user.email });
            if(userByEmail){
                return err(new SignupUserEmailAlreadyExistsError());
            }

            const userByUsername = await this.userRepository.getUser({ username: user.username });
            if(userByUsername){
                return err(new SignupUserUsernameAlreadyExistsError());
            }

            return ok(await this.userRepository.create(user));
        } catch (error) {
            return err(new UnexpectedError(error.message));
        }
    }
}

export default Signup;
