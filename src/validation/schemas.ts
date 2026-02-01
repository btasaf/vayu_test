import { z } from 'zod';
import { USER_STATUSES } from '../models/user.model';

export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0)
});

export const userIdParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const removeFromGroupParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
  groupId: z.coerce.number().int().positive()
});

export const batchStatusChangeSchema = z.object({
  users: z.array(z.object({
    id: z.coerce.number().int().positive(),
    status: z.enum(USER_STATUSES)
  })).min(1).max(500)
});
