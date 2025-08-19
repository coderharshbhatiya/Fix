import { query } from './dbClient.js';

export async function listCategories() {
  const { rows } = await query('select id, name, slug, parent_id from categories order by id asc');
  return rows;
}
