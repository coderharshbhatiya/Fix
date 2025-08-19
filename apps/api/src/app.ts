import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRouter } from './routes/auth.js';
import { meRouter } from './routes/me.js';
import { categoriesRouter } from './routes/categories.js';
import { servicesRouter } from './routes/services.js';
import { requestsRouter } from './routes/requests.js';
import { bidsRouter } from './routes/bids.js';
import { bookingsRouter } from './routes/bookings.js';
import { paymentsRouter } from './routes/payments.js';
import { walletRouter } from './routes/wallet.js';
import { devicesRouter } from './routes/devices.js';

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
  app.use('/v1/services', servicesRouter);
  app.use('/v1/requests', requestsRouter);
  app.use('/v1/requests', bidsRouter);
  app.use('/v1/bookings', bookingsRouter);
  app.use('/v1/payments', paymentsRouter);
  app.use('/v1/wallet', walletRouter);
  app.use('/v1/devices', devicesRouter);

  return app;
};
