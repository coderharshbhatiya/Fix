import { query } from './dbClient.js';

export async function createRequest(data: { user_id: string; category_id: number; title: string; description?: string; emergency?: boolean }) {
  const sql = `insert into requests (user_id, category_id, title, description, emergency) values ($1,$2,$3,$4,$5) returning *`;
  const { rows } = await query(sql, [data.user_id, data.category_id, data.title, data.description || null, !!data.emergency]);
  return rows[0];
}

export async function listOpenRequests() {
  const { rows } = await query('select * from requests where status = $1 order by created_at desc', ['open']);
  return rows;
}
