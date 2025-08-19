import { Router } from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';
import { createBid, listBids } from '../repos/bidsRepo.js';

export const bidsRouter = Router({ mergeParams: true });

bidsRouter.post('/:id/bids', requireAuth, async (req: AuthedRequest, res) => {
  const requestId = req.params.id;
  const { amount, eta_min, note } = req.body || {};
  const bid = await createBid({ request_id: requestId, provider_id: req.user!.uid, amount: Number(amount), eta_min, note });
  res.json(bid);
});

bidsRouter.get('/:id/bids', requireAuth, async (req, res) => {
  const requestId = req.params.id;
  const items = await listBids(requestId);
  res.json({ items });
});
