import { AgentDbResponseMap } from 'src/mappers';
import { Agent, IAgentProps } from '../domain/agent';
import { GenericFilters } from '../types';

export type AgentFilter = {
  id?: string;
  name?: string;
  lastname?: string;
  address?: string;
  documentNumber?: string;
  email?: string;
  phone?: string;
} & GenericFilters;
export interface IAgentRepository {
  getAgents(filters?: AgentFilter): Promise<AgentDbResponseMap[]>;
  getAgent(filters?: AgentFilter): Promise<AgentDbResponseMap | null>;
  createAgent(agent: IAgentProps): Promise<AgentDbResponseMap>;
  updateAgent(id: string, agent: Partial<IAgentProps>): Promise<Agent>;
}
