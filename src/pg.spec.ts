import exp from 'constants';
import { Client } from 'pg';

describe('pg', () => {
  let client: Client;

  beforeAll(async () => {
    const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    };
    client = new Client(config);
    await client.connect();
  });

  afterAll(async () => {
    await client.end();
  });

  it('should create table', async () => {
    const create = await client.query(`
      CREATE TABLE IF NOT EXISTS accounts (
        user_id serial PRIMARY KEY,
        username VARCHAR ( 50 ) UNIQUE NOT NULL,
        password VARCHAR ( 50 ) NOT NULL,
        email VARCHAR ( 255 ) UNIQUE NOT NULL,
        created_on TIMESTAMP NOT NULL,
              last_login TIMESTAMP 
      );
    `);
    console.log({ create });
    expect(create.command).toBe('CREATE');
  });

  it('should insert data', async () => {
    const query = await client.query(`
      INSERT INTO accounts (username, password, email, created_on)
      VALUES ('admin_${Date.now()}', 'admin', 'admin_${Date.now()}@admin.com', NOW());
    `);
    console.log({ query });
    expect(query.command).toBe('INSERT');
  });

  it('should select data', async () => {
    const res = await client.query(`
      SELECT * FROM accounts;
    `);
    expect(res.rows.length).toBeGreaterThan(0);
    console.log({ res });
    expect(res.command).toBe('SELECT');
  });
});
