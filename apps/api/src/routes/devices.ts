import { Router } from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';

export const devicesRouter = Router();

const deviceTokens: Record<string, string[]> = {};

devicesRouter.post('/register', requireAuth, (req: AuthedRequest, res) => {
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ error: 'Missing token' });
  const uid = req.user!.uid;
  deviceTokens[uid] = deviceTokens[uid] || [];
  if (!deviceTokens[uid].includes(token)) deviceTokens[uid].push(token);
  res.json({ ok: true });
});
