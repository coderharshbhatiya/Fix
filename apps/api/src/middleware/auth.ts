import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthedRequest extends Request {
  user?: { uid: string; role: string };
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : undefined;
    if (!token) return res.status(401).json({ error: 'Missing token' });
    const decoded = jwt.verify(token, process.env.API_JWT_SECRET || 'dev-secret') as any;
    req.user = { uid: decoded.uid, role: decoded.role };
    next();
  } catch (e: any) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
