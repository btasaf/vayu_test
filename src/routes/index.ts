import { Express } from 'express';
import userRoutes from './user.routes';
import groupRoutes from './group.routes';

export function loadRoutes(app: Express): void {
  app.use('/api/users', userRoutes);
  app.use('/api/groups', groupRoutes);
}
