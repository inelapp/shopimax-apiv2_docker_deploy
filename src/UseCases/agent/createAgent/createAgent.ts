import { err, ok, Result } from 'neverthrow';
import { UnexpectedError, UseCase } from '../../../utils';
import {
  AgentAlreadyRegisteredError,
  AgentInvalidDataStatusError,
  AgentInvalidEmailError,
  AgentInvalidRoleError,
  AgentMissingWorkingTimeError,
  CreateAgentBadRequestError
} from './createAgentErrors';
import { CreateAgentResponse } from './createAgentResponse';
import { CreateAgentRequestDto } from './createAgentRequestDto';
import { IAgentRepository, IUserRepository } from '../../../repositories';
import { Agent } from '../../../domain';

type Response = Result<
  CreateAgentResponse,
  | CreateAgentBadRequestError
  | AgentAlreadyRegisteredError
  | AgentInvalidRoleError
  | AgentInvalidDataStatusError
  | AgentMissingWorkingTimeError
  | AgentInvalidEmailError
  | UnexpectedError
>;

class CreateAgent implements UseCase<CreateAgentRequestDto, Response> {
  constructor(private readonly agentRepository: IAgentRepository, private readonly userRepository: IUserRepository) {}

  async execute(request: CreateAgentRequestDto, service?: any): Promise<Response> {
    try {
      const agentInstanceOrError = Agent.create(request);
      if (agentInstanceOrError.isErr()) {
        return err(new CreateAgentBadRequestError(agentInstanceOrError.error));
      }

      const agentInstance = agentInstanceOrError.value;

      const userByEmail = await this.userRepository.getUser({
        email: agentInstance.email
      });
      if (userByEmail) {
        return err(new AgentAlreadyRegisteredError('Agent Email already registered'));
      }

      const agentByDocumentNumber = await this.agentRepository.getAgent({
        documentNumber: agentInstance.documentNumber
      });
      if (agentByDocumentNumber) {
        return err(new AgentAlreadyRegisteredError('Agent Document Number already registered'));
      }

      const result = await this.agentRepository.createAgent(agentInstance);
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}
export default CreateAgent;
