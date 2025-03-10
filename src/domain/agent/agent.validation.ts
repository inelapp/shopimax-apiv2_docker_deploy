import Joi, { ValidationResult } from 'joi';
import { IAgentProps } from './agent';
import { DataStatus, Roles } from '../../types';

const agentSchema = Joi.object<IAgentProps>({
  name: Joi.string().required(),
  lastname: Joi.string(),
  startWorkingTime: Joi.string().required(),
  endWorkingTime: Joi.string().required(),
  address: Joi.string().allow('').optional(),
  documentNumber: Joi.string(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  role: Joi.string()
    .optional()
    .valid(...Object.values(Roles))
    .default(Roles.AGENT),
  status: Joi.boolean().optional().default(true),
  registreStatus: Joi.string()
    .optional()
    .valid(...Object.values(DataStatus))
    .default(DataStatus.VALID),
  assigned: Joi.boolean().optional().default(false)
});

function validateAgent(agent: IAgentProps): ValidationResult<IAgentProps> {
  return agentSchema.validate(agent, { abortEarly: false });
}

const updateAgentSchema = agentSchema.fork(Object.keys(agentSchema.describe().keys), (schema) => schema.optional());

const validateUpdateAgentSchema = (update: Partial<IAgentProps>): Joi.ValidationResult<Partial<IAgentProps>> => {
  return updateAgentSchema.validate(update, { abortEarly: false });
};

export { validateAgent, validateUpdateAgentSchema };
