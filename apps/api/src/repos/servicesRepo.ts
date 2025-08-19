import { query } from './dbClient.js';

export async function searchServices(opts: { categoryId?: number; instant?: boolean }) {
  const where: string[] = [];
  const params: any[] = [];
  if (opts.categoryId) {
    params.push(opts.categoryId);
    where.push(`category_id = $${params.length}`);
  }
  if (typeof opts.instant === 'boolean') {
    params.push(opts.instant);
    where.push(`is_instant_book = $${params.length}`);
  }
  const sql = `select id, provider_id, category_id, title, description, pricing_type, price_min, price_max, base_price, is_instant_book
               from services ${where.length ? 'where ' + where.join(' and ') : ''} order by title asc`;
  const { rows } = await query(sql, params);
  return rows;
}
