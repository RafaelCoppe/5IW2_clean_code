import express from 'express';
import { GetPartsControllerFactory } from './factories/GetPartsControllerFactory';
import ExpressRoutesAdapter from '../infrastructure/adapters/expressjs/express-routes.adapter';

const app = express();

app.use(express.json())

const GetPartsController = GetPartsControllerFactory.make();

app.post('/parts', (req, res) => GetPartsController.handle(req, res))

app.listen(3000, () => console.log('online'));