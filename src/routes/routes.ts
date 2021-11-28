import { Router } from 'express';
import { handleOtherPaths } from '../routers/UserControllers';
import { usersRoutes } from './usersRoutes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.get('/', handleOtherPaths);

export default routes;
