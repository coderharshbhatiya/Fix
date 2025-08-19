import { Router } from 'express';
import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';

let firebaseInitialized = false;
try {
  if (!firebaseInitialized) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
    firebaseInitialized = true;
  }
} catch {}

export const authRouter = Router();

authRouter.post('/exchange-firebase', async (req, res) => {
  try {
    const idToken = (req.headers.authorization || '').replace('Bearer ', '') || req.body?.idToken;
    if (!idToken) return res.status(401).json({ error: 'Missing Firebase ID token' });
    const decoded = await admin.auth().verifyIdToken(idToken);
    const apiJwt = jwt.sign(
      { uid: decoded.uid, role: 'user' },
      process.env.API_JWT_SECRET || 'dev-secret',
      { expiresIn: '2h' }
    );
    res.json({ token: apiJwt, user: { firebase_uid: decoded.uid } });
  } catch (err: any) {
    res.status(401).json({ error: 'Invalid Firebase token', detail: err?.message });
  }
});
