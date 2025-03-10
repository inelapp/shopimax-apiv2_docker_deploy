export enum OriginData {
  MANUAL = 'manual',
  ONLINE = 'online',
  UNDEFINED = 'undefined'
}

export enum DataStatus {
  INVALID = 'invalid',
  VALID = 'valid',
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum Roles {
  ADMIN = 'admin',
  AGENT = 'asesor'
}

export enum OrderStatus {
  PENDING = 'pendiente',
  NEW = 'nuevo',
  DELIVERED = 'entregado',
  TRACKING = 'seguimiento',
  DOWNGRADE = 'caida',
  TRANSIT = 'transito',
  ARRIVED_MISSING_PAYMENT = 'llego fp'
}
export interface OriginProps {
  origin: OriginData;
  comment?: string;
  registerStatus?: DataStatus;
  status?: OrderStatus | DataStatus;
}
