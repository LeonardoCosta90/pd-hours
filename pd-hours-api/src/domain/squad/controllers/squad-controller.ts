import { SquadService } from '../services/squad-service';
import { Request, Response } from 'express';
import { SquadQueryRequest } from '../models/squad-query-request';

async function createSquad(
  request: Request,
  response: Response,
): Promise<Response> {
  const { name } = request.body;

  const squadController = new SquadService();

  const user = await squadController.createSquad(name);

  return response.status(201).json(user);
}

async function listSquad(
  request: Request,
  response: Response,
): Promise<Response> {
  const squadController = new SquadService();

  const query: SquadQueryRequest = {
    totalItemsPerPage: request.query.totalItemsPerPage as string,
    page: request.query.page as string,
  };

  const user = await squadController.getSquads(query);

  return response.status(200).json(user);
}

export default {
  createSquad,
  listSquad,
};
