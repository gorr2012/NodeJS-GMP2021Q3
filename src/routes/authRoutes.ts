import { Router } from 'express';
import { checkAuth } from '../routers/authorize/checkAuth';

export const authRoutes = Router();

authRoutes.post('/', checkAuth);
