import { Router } from 'express';
import { handleOtherPaths } from '../routers/UserControllers';
import { groupsRoutes } from './groupsRoutes';
import { usersRoutes } from './usersRoutes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/groups', groupsRoutes);
routes.get('/', handleOtherPaths);

export default routes;
