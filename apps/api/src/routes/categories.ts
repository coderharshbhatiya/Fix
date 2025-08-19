import { Router } from 'express';

export const categoriesRouter = Router();

const categories = [
  { id: 1, name: 'Plumbing' },
  { id: 2, name: 'Electrician' },
  { id: 3, name: 'Cleaning' }
];

categoriesRouter.get('/', (_req, res) => {
  res.json({ items: categories });
});
