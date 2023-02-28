import { Squad } from '../typeorm/entities/squad';

export interface SquadResponsePaginate {
  data: Squad[];
  totalItems: number;
  totalItemsPerPage: number;
  page: number;
  totalPages: number;
}
