import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { handlingErrors } from '@shared/infra/http/middlewares/handling-errors';
import '@shared/infra/typeorm';

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(handlingErrors);

export { app };
