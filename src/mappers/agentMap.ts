import { Document } from 'mongoose';
import { IAgentDb } from '../db/interfaces';
import { Agent } from '../domain';
import { IUserDbDetails, UserDbResponseDetailMap } from './auth/userMap';

export type AgentDbResponse = IAgentDb & Document & Omit<IAgentDb, 'user'> & { user: IUserDbDetails };

export type AgentDbResponseMap = Omit<Agent, 'user'> & { user: Partial<UserDbResponseDetailMap> | null }

export class AgentMap {
  static toDbFromDomain(agent: AgentDbResponse): AgentDbResponseMap {
    return {
      id: agent._id as string,
      user: agent?.user ? {
        id: agent?.user?._id as string,
        username: agent?.user?.username || '',
        email: agent?.user?.email,
        roles: agent?.user?.roles?.map((role) => ({ name: role?.name, description: role?.description, permissions: role?.permissions })),
        status: agent?.user?.status
      } : null,
      name: agent.name,
      lastname: agent.lastname || '',
      startWorkingTime: agent.startWorkingTime,
      endWorkingTime: agent.endWorkingTime,
      address: agent.address || '',
      documentNumber: agent.documentNumber || '',
      email: agent.email || '',
      phone: agent.phone || '',
      role: agent.role,
      status: agent.status,
      registreStatus: agent.registreStatus,
      assigned: agent.assigned
    };
  }

  static toDbFromDomainWithoutDetail(agent: AgentDbResponse): Agent {
    return {
      id: agent._id as string,
      user: agent?.user?._id as string,
      name: agent.name,
      lastname: agent.lastname || '',
      startWorkingTime: agent.startWorkingTime,
      endWorkingTime: agent.endWorkingTime,
      address: agent.address || '',
      documentNumber: agent.documentNumber || '',
      email: agent.email || '',
      phone: agent.phone || '',
      role: agent.role,
      status: agent.status,
      registreStatus: agent.registreStatus,
      assigned: agent.assigned,
    }
  }
}
