import pkg from 'pg';

const { Pool } = pkg;

const databasePool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'taskonedb',
  password: 'qwerty',
  port: 5432,
});

export default databasePool;
