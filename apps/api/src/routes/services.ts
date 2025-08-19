import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { searchServices } from '../repos/servicesRepo.js';

export const servicesRouter = Router();

servicesRouter.get('/search', requireAuth, async (req, res) => {
  const { categoryId, instant } = req.query as Record<string, string>;
  const items = await searchServices({ categoryId: categoryId ? Number(categoryId) : undefined, instant: instant ? instant === 'true' : undefined });
  res.json({ items });
});
