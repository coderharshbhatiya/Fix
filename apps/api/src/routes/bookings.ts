import { Router } from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';
import { randomUUID } from 'crypto';

export const bookingsRouter = Router();

type Booking = {
  id: string;
  type: 'instant' | 'bid';
  service_id?: string;
  request_id?: string;
  user_id: string;
  provider_id: string;
  status: string;
  subtotal_amount: number;
  emergency_fee: number;
  service_fee: number;
  total_amount: number;
};

const bookingsMem: Booking[] = [];

bookingsRouter.post('/instant', requireAuth, (req: AuthedRequest, res) => {
  const { service_id, emergency } = req.body || {};
  const subtotal = 1000;
  const emergencyFee = emergency ? Math.round(subtotal * 0.15) : 0;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + emergencyFee + serviceFee;
  const booking: Booking = {
    id: randomUUID(),
    type: 'instant',
    service_id,
    user_id: req.user!.uid,
    provider_id: 'prov_demo',
    status: 'pending_payment',
    subtotal_amount: subtotal,
    emergency_fee: emergencyFee,
    service_fee: serviceFee,
    total_amount: total
  };
  bookingsMem.push(booking);
  res.json(booking);
});

bookingsRouter.get('/:id', requireAuth, (req, res) => {
  const found = bookingsMem.find((b) => b.id === req.params.id);
  if (!found) return res.status(404).json({ error: 'Not found' });
  res.json(found);
});
