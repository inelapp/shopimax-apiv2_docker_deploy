import { Schema } from 'mongoose';
import { Roles } from '../../types';

export interface IAgentDb {
  _id: string | Schema.Types.ObjectId;
  name: string;
  lastname?: string;
  user?: string | Schema.Types.ObjectId
  startWorkingTime: string;
  endWorkingTime: string;
  address?: string;
  documentNumber?: string;
  email?: string;
  phone?: string;
  role: Roles;
  status: boolean;
  registreStatus: String;
  assigned: boolean;
  createdAt: Date;
  updatedAt: Date;
}
