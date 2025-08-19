import { pool } from '../db.js';
import type { QueryResult, QueryResultRow } from 'pg';

export async function query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
  return pool.query<T>(text, params);
}
