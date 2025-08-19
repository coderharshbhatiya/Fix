import 'dotenv/config';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { createApp } from './app.js';
import { pingDb } from './db.js';

const app = createApp();
const httpServer = createServer(app);
const io = new IOServer(httpServer, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.emit('welcome', { ok: true });
});

const port = process.env.PORT || 8080;
httpServer.listen(port, async () => {
  const dbOk = await pingDb().catch(() => false);
  console.log(`API listening on :${port} (db: ${dbOk ? 'ok' : 'failed'})`);
});
