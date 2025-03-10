import Joi from "joi";
import { IUserProps } from "./user";

const userSchema = Joi.object<IUserProps>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    roles: Joi.array().items(Joi.string()).optional().allow(null, ''),
    status: Joi.string().optional().allow(null, ''),
    username: Joi.string().optional().allow(null, ''),
})

const userValidationSchema = (user: IUserProps): Joi.ValidationResult<IUserProps> => {
    return userSchema.validate(user, { abortEarly: false, convert: false });
}

export { userValidationSchema };