import CreateAgent from './createAgent';
import { agentRepository, userRepository } from '../../../repositories';

const createAgent = new CreateAgent(agentRepository, userRepository);

export { createAgent };
