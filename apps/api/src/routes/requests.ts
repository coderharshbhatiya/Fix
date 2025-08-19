import { Router } from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';
import { randomUUID } from 'crypto';

export const requestsRouter = Router();

type RequestItem = {
  id: string;
  user_id: string;
  category_id: number;
  title: string;
  description?: string;
  emergency: boolean;
  status: string;
};

const requestsMem: RequestItem[] = [];

requestsRouter.post('/', requireAuth, (req: AuthedRequest, res) => {
  const { category_id, title, desc, emergency } = req.body || {};
  const item: RequestItem = {
    id: randomUUID(),
    user_id: req.user!.uid,
    category_id: Number(category_id),
    title,
    description: desc,
    emergency: Boolean(emergency),
    status: 'open'
  };
  requestsMem.push(item);
  res.json(item);
});

requestsRouter.get('/nearby', requireAuth, (_req, res) => {
  res.json({ items: requestsMem.filter((r) => r.status === 'open') });
});
