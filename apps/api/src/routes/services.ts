import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

export const servicesRouter = Router();

const services = [
  { id: 'svc_1', provider_id: 'prov_1', category_id: 1, title: 'Tap Fix', description: 'Fix leaking tap', pricing_type: 'fixed', base_price: 299, is_instant_book: true },
  { id: 'svc_2', provider_id: 'prov_2', category_id: 2, title: 'Fan Install', description: 'Install ceiling fan', pricing_type: 'fixed', base_price: 499, is_instant_book: true },
  { id: 'svc_3', provider_id: 'prov_3', category_id: 3, title: 'Home Deep Clean', description: '2BHK deep clean', pricing_type: 'range', price_min: 1999, price_max: 2999, is_instant_book: false }
];

servicesRouter.get('/search', requireAuth, (req, res) => {
  const { categoryId, instant } = req.query as Record<string, string>;
  let items = services;
  if (categoryId) items = items.filter((s) => String(s.category_id) === String(categoryId));
  if (instant) items = items.filter((s) => String(s.is_instant_book) === String(instant === 'true'));
  res.json({ items });
});
