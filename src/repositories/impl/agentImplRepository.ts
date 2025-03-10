import { agentModel, roleModel, userModel } from '../../db/mongo.schema';
import { AgentFilter, IAgentRepository } from '../agent.repository';
import { Agent, IAgentProps } from '../../domain/agent';
import { AgentDbResponse, AgentDbResponseMap, AgentMap } from '../../mappers';
import { getDataByFilters, getDataByFilterWithoutPagination } from '../../helpers';

export class AgentImplRepository implements IAgentRepository {
  private readonly agentModel: typeof agentModel;
  private readonly userModel: typeof userModel;
  private readonly roleModel: typeof roleModel;

  constructor() {
    this.agentModel = agentModel;
    this.userModel = userModel;
    this.roleModel = roleModel;
  }

  async getAgents(filters?: AgentFilter): Promise<AgentDbResponseMap[]> {
    try {
      const agents = await getDataByFilterWithoutPagination<AgentDbResponse, AgentFilter>(this.agentModel, filters, [{ path: 'user', populate: 'roles' }]);
      return agents.map((agent) => AgentMap.toDbFromDomain(agent));
    } catch (error) {
      throw error;
    }
  }

  async getAgent(filters?: AgentFilter): Promise<AgentDbResponseMap | null> {
    try {
      const result = await getDataByFilters<AgentDbResponseMap, AgentFilter>(this.agentModel, filters, [{ path: 'user', populate: 'roles' }]);
      if (!result) {
        return null;
      }
      return AgentMap.toDbFromDomain(result as AgentDbResponse);
    } catch (error) {
      throw error;
    }
  }

  async createAgent(agent: IAgentProps): Promise<AgentDbResponseMap> {
    const session = await this.agentModel.startSession();
    try {
      return await session.withTransaction(async () => {
        const role = await this.roleModel.findOne({ name: agent.role || 'asesor' }, null, { session });
        const newUser = new this.userModel({
          email: agent.email,
          password: 'ShopimaxPass2025#',
          username: agent.name || '',
          roles: [role?._id]
        })
        const userSaved = await newUser.save({ session });
        const newAgent = new this.agentModel({ ...agent, user: userSaved?._id }, null, { session });
        const agentSaved = await newAgent.save({ session });
        const agentById = await getDataByFilters<AgentDbResponse, { id?: string }>(this.agentModel,{ id: agentSaved?._id?.toString() }, [{ path: 'user', populate: 'roles' }], session);
        return AgentMap.toDbFromDomain(agentById);
      })
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async updateAgent(id: string, agent: Partial<IAgentProps>): Promise<Agent> {
    try {
      const updatedAgent = await this.agentModel.findByIdAndUpdate(id, agent, { new: true });
      const agentById = await getDataByFilters<AgentDbResponse, { id?: string }>(this.agentModel,{ id: updatedAgent?._id?.toString() });
      return AgentMap.toDbFromDomainWithoutDetail(agentById);
    } catch (error) {
      throw error;
    }
  }
}
