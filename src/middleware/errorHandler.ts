import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  const status = (err as any).status || (err as any).statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
};
