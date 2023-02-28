import squadController from '@domain/squad/controllers/squad-controller';
import { Router } from 'express';
import { validateBody } from '../middlewares/validations';
import createSquadValidation from '../validations/create-squad-validation';

const squadRoutes = Router();

squadRoutes.post(
  '/',
  validateBody(createSquadValidation),
  squadController.createSquad,
);
squadRoutes.get('/', squadController.listSquad);
export { squadRoutes };
