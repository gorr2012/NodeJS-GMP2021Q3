import { Router } from 'express';
import { handleOtherPaths } from '../routers/UserControllers';
import { authRoutes } from './authRoutes';
import { groupsRoutes } from './groupsRoutes';
import { usersRoutes } from './usersRoutes';

const routes = Router();

routes.use('/login', authRoutes);
routes.use('/users', usersRoutes);
routes.use('/groups', groupsRoutes);
routes.get('/', handleOtherPaths);

export default routes;
