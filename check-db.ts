import mysql from 'mysql2/promise';

async function check() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test',
    });
    const [rows] = await pool.query('SELECT * FROM plans');
    console.log(rows);
    process.exit(0);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
}
check();
