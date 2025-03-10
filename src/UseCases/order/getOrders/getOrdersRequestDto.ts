import { Client } from '../../../domain';

export interface GetOrdersRequestDto {
  page: number;
  limit: number;
  orderFilters: {
    id?: string;
    orderNumber?: string;
    storeName?: string;
    agency?: string;
    agent?: string;
    clientName?: string;
    clientDocumentNumber?: string;
    clientPhone?: string;
    clientProvince?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
  };
}

export const ClientPropsTuple: { [x: string]: keyof Client } = {
  clientName: 'name',
  clientDocumentNumber: 'documentNumber',
  clientPhone: 'phone',
  clientProvince: 'province'
} as const;
