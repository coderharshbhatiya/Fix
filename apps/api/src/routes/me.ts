import { Router } from 'express';
import type { AuthedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';

export const meRouter = Router();

meRouter.get('/', requireAuth, async (req: AuthedRequest, res) => {
  res.json({ id: req.user?.uid, role: req.user?.role, wallets: [], badges: [] });
});
