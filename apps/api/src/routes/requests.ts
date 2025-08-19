import { Router } from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';
import { createRequest, listOpenRequests } from '../repos/requestsRepo.js';

export const requestsRouter = Router();

requestsRouter.post('/', requireAuth, async (req: AuthedRequest, res) => {
  const { category_id, title, desc, emergency } = req.body || {};
  const item = await createRequest({ user_id: req.user!.uid, category_id: Number(category_id), title, description: desc, emergency });
  res.json(item);
});

requestsRouter.get('/nearby', requireAuth, async (_req, res) => {
  const items = await listOpenRequests();
  res.json({ items });
});
