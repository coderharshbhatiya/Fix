import { Router } from 'express';
import { listCategories } from '../repos/categoriesRepo.js';

export const categoriesRouter = Router();

categoriesRouter.get('/', async (_req, res) => {
  const items = await listCategories();
  res.json({ items });
});
