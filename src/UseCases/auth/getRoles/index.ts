import { authRepository } from "../../../repositories";
import GetRoles from "./getRoles";

const getRoles = new GetRoles(authRepository);

export { getRoles };