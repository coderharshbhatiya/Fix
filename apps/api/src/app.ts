import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRouter } from './routes/auth.js';
import { meRouter } from './routes/me.js';
import { categoriesRouter } from './routes/categories.js';

export const createApp = () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '2mb' }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', ts: new Date().toISOString() });
  });

  app.use('/v1/auth', authRouter);
  app.use('/v1/me', meRouter);
  app.use('/v1/categories', categoriesRouter);

  return app;
};
