import { Router } from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';
import { createInstantBooking, getBooking } from '../repos/bookingsRepo.js';

export const bookingsRouter = Router();

bookingsRouter.post('/instant', requireAuth, (req: AuthedRequest, res) => {
  const { service_id, emergency } = req.body || {};
  const subtotal = 1000;
  const emergencyFee = emergency ? Math.round(subtotal * 0.15) : 0;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + emergencyFee + serviceFee;
  createInstantBooking({ service_id, user_id: req.user!.uid, provider_id: '00000000-0000-0000-0000-000000000001', subtotal_amount: subtotal, emergency_fee: emergencyFee, service_fee: serviceFee, total_amount: total })
    .then((b) => res.json(b));
});

bookingsRouter.get('/:id', requireAuth, (req, res) => {
  getBooking(req.params.id).then((b) => {
    if (!b) return res.status(404).json({ error: 'Not found' });
    res.json(b);
  });
});
