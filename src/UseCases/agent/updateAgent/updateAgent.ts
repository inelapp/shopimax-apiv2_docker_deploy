import { err, Result, ok } from 'neverthrow';
import { UnexpectedError, UseCase } from '../../../utils';
import { UpdateAgentResponse } from './updateAgentResponse';
import {
  AgentUpdateAlreadyAssigned,
  AgentUpdateBadRequestError,
  AgentUpdateIdNotValidError,
  AgentUpdateNotFoundError
} from './updateAgentErrors';
import { UpdateAgentRequestDto } from './updateAgentRequestDto';
import { IAgentRepository } from '../../../repositories';
import { isValidObjectId } from 'mongoose';
import { validateUpdateAgentSchema } from '../../../domain';
type Response = Result<
  UpdateAgentResponse,
  AgentUpdateNotFoundError | AgentUpdateBadRequestError | AgentUpdateIdNotValidError | AgentUpdateAlreadyAssigned | UnexpectedError
>;
class UpdateAgent implements UseCase<UpdateAgentRequestDto, Response> {
  private readonly agentRepository: IAgentRepository;

  constructor(agentRepo: IAgentRepository) {
    this.agentRepository = agentRepo;
  }

  async execute(request: UpdateAgentRequestDto): Promise<Response> {
    const { id, ...updateData } = request;
    try {
      if (!isValidObjectId(id)) {
        return err(new AgentUpdateIdNotValidError());
      }
      const existingAgent = await this.agentRepository.getAgent({ id });
      if (!existingAgent) {
        return err(new AgentUpdateNotFoundError());
      }

      const { error, value } = validateUpdateAgentSchema(updateData);
      if (error) {
        return err(new AgentUpdateBadRequestError(error.details.map((e) => e.message).join('. ')));
      }

      const agentUpdateRequest = value;
      const existAgentDocumentNumber = await this.agentRepository.getAgent({ documentNumber: agentUpdateRequest?.documentNumber, $ne: { _id: id } });
      if(existAgentDocumentNumber) {
        return err(new AgentUpdateBadRequestError('Document number is already in use.'));
      }

      const existAgentEmail = await this.agentRepository.getAgent({ email: agentUpdateRequest?.email, $ne: { _id: id } });
      if(existAgentEmail) {
        return err(new AgentUpdateBadRequestError('Email is already in use.'));
      }

      const updatedAgent = await this.agentRepository.updateAgent(id, updateData);
      return ok(updatedAgent);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}
export default UpdateAgent;
