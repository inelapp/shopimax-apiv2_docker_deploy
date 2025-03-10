import { GenericObject } from "./genericObject";

export interface GenericFilters {
  createdAt?: Date;
  updatedAt?: Date;
  page?: number;
  limit?: number;
  $ne?: GenericObject;
}
