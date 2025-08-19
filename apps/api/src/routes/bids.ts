import { Router } from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';
import { randomUUID } from 'crypto';

export const bidsRouter = Router({ mergeParams: true });

type Bid = {
  id: string;
  request_id: string;
  provider_id: string;
  amount: number;
  eta_min?: number;
  note?: string;
  status: 'active' | 'withdrawn' | 'accepted' | 'rejected';
  created_at: string;
};

const bidsMem: Bid[] = [];

bidsRouter.post('/:id/bids', requireAuth, (req: AuthedRequest, res) => {
  const requestId = req.params.id;
  const { amount, eta_min, note } = req.body || {};
  const bid: Bid = {
    id: randomUUID(),
    request_id: requestId,
    provider_id: req.user!.uid,
    amount: Number(amount),
    eta_min,
    note,
    status: 'active',
    created_at: new Date().toISOString()
  };
  bidsMem.push(bid);
  res.json(bid);
});

bidsRouter.get('/:id/bids', requireAuth, (req, res) => {
  const requestId = req.params.id;
  const sort = (req.query.sort as string) || 'price';
  let items = bidsMem.filter((b) => b.request_id === requestId);
  if (sort === 'price') items = items.sort((a, b) => a.amount - b.amount);
  res.json({ items });
});
