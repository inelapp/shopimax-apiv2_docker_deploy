import { userRepository } from "../../../repositories";
import Signup from "./signup";

const signup = new Signup(userRepository);

export { signup }; 