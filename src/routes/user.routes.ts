import { Router, Request, Response } from 'express';
import userService from '../services/user.service';
import { validate, paginationSchema, removeFromGroupParamsSchema, batchStatusChangeSchema } from '../validation';
import { UserStatus } from '../models/user.model';
import { asyncHandler } from '../middleware';

const router = Router();

router.get('/', validate(paginationSchema, 'query'), asyncHandler(async (req: Request, res: Response) => {
  const { limit, offset } = req.query as unknown as { limit: number; offset: number };
  const result = await userService.findAll(limit, offset);
  res.json(result);
}));


router.post('/batch-status-change', validate(batchStatusChangeSchema, 'body'), asyncHandler(async (req: Request, res: Response) => {
  const { users } = req.body as { users: { id: number; status: UserStatus }[] };
  const results = await userService.batchStatusChange(users);
  res.json(results);
}));

router.delete('/:id/group/:groupId', validate(removeFromGroupParamsSchema, 'params'), asyncHandler(async (req: Request, res: Response) => {
  const { id, groupId } = req.params as unknown as { id: number; groupId: number };
  const removed = await userService.removeFromGroup(id, groupId);
  if (!removed) {
    return res.status(404).json({ error: 'User not in this group' });
  }
  res.json({ message: 'User removed from group' });
}));

export default router;
