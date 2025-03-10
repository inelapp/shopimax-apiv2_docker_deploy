"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentMap = void 0;
class AgentMap {
    static toDbFromDomain(agent) {
        return {
            id: agent._id,
            user: agent?.user ? {
                id: agent?.user?._id,
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
    static toDbFromDomainWithoutDetail(agent) {
        return {
            id: agent._id,
            user: agent?.user?._id,
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
        };
    }
}
exports.AgentMap = AgentMap;
