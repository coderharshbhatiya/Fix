import { Router } from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { createPayment } from '../repos/paymentsRepo.js';

export const paymentsRouter = Router();

const rz = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test', key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret' });

paymentsRouter.post('/intent', requireAuth, async (req: AuthedRequest, res) => {
  const { booking_id } = req.body || {};
  const amount = 125000; // paise demo
  const order = await rz.orders.create({ amount, currency: 'INR', receipt: booking_id || 'demo' });
  await createPayment({ provider: 'razorpay', provider_order_id: order.id, amount_cents: amount, currency: 'INR', user_id: req.user!.uid, booking_id, status: 'created', raw: order });
  res.json({ provider: 'razorpay', orderId: order.id, amount, currency: 'INR' });
});

paymentsRouter.post('/webhooks/razorpay', async (req, res) => {
  const signature = req.headers['x-razorpay-signature'] as string;
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'whsec';
  const body = JSON.stringify(req.body);
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  if (signature !== expected) return res.status(401).json({ error: 'Bad signature' });
  res.json({ ok: true });
});
