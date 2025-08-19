import { query } from './dbClient.js';

export async function createBid(data: { request_id: string; provider_id: string; amount: number; eta_min?: number; note?: string }) {
  const sql = `insert into bids (request_id, provider_id, amount, eta_min, note) values ($1,$2,$3,$4,$5) returning *`;
  const { rows } = await query(sql, [data.request_id, data.provider_id, data.amount, data.eta_min || null, data.note || null]);
  return rows[0];
}

export async function listBids(request_id: string) {
  const { rows } = await query('select * from bids where request_id = $1 order by amount asc', [request_id]);
  return rows;
}
