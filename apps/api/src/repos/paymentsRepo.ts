import { query } from './dbClient.js';

export async function createPayment(data: { provider: string; provider_order_id: string; amount_cents: number; currency: string; user_id: string; booking_id: string; status: string; raw?: any }) {
  const sql = `insert into payments (provider, provider_order_id, amount_cents, currency, user_id, booking_id, status, raw) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *`;
  const { rows } = await query(sql, [data.provider, data.provider_order_id, data.amount_cents, data.currency, data.user_id, data.booking_id, data.status, data.raw || null]);
  return rows[0];
}
