import { query } from './dbClient.js';

export async function createInstantBooking(data: {
  service_id: string;
  user_id: string;
  provider_id: string;
  subtotal_amount: number;
  emergency_fee: number;
  service_fee: number;
  total_amount: number;
}) {
  const sql = `insert into bookings (type, service_id, user_id, provider_id, status, subtotal_amount, emergency_fee, service_fee, total_amount)
               values ('instant',$1,$2,$3,'pending_payment',$4,$5,$6,$7) returning *`;
  const { rows } = await query(sql, [data.service_id, data.user_id, data.provider_id, data.subtotal_amount, data.emergency_fee, data.service_fee, data.total_amount]);
  return rows[0];
}

export async function getBooking(id: string) {
  const { rows } = await query('select * from bookings where id = $1', [id]);
  return rows[0];
}
