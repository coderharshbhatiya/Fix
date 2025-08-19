import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

export const walletRouter = Router();

walletRouter.get('/', requireAuth, (req, res) => {
  res.json({ balance_cents: 0, currency: 'INR', ledger: [] });
});
