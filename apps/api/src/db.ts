import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://fixwale:fixwale@localhost:5432/fixwale'
});

export async function pingDb() {
  const client = await pool.connect();
  try {
    const r = await client.query('select 1 as ok');
    return r.rows[0].ok === 1;
  } finally {
    client.release();
  }
}
