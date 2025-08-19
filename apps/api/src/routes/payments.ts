import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

export const paymentsRouter = Router();

paymentsRouter.post('/intent', requireAuth, (req, res) => {
  const { booking_id, source } = req.body || {};
  const amount = 125000; // in paise demo
  res.json({ provider: 'razorpay', orderId: `order_${booking_id || 'demo'}`, amount, currency: 'INR', source });
});
