import { OrderDbResponseDetailMap } from '../../../mappers';

export interface GetOrdersResponseDto {
  data: OrderDbResponseDetailMap[];
  totalRecords: number;
  page: number;
  limit: number;
  totalPages: number;
}
