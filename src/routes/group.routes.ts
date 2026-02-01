import { Router, Request, Response } from 'express';
import groupService from '../services/group.service';
import { validate, paginationSchema } from '../validation';
import { asyncHandler } from '../middleware';

const router = Router();

router.get('/', validate(paginationSchema, 'query'), asyncHandler(async (req: Request, res: Response) => {
  const { limit, offset } = req.query as unknown as { limit: number; offset: number };
  const result = await groupService.findAll(limit, offset);
  res.json(result);
}));

export default router;
