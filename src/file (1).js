import 'dotenv/config';
import { app } from './app.js';
import { pool } from './db/pool.js';

const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`mybiz API listening on port ${port}`);
});

async function shutdown(signal) {
  console.log(`${signal} received; shutting down`);

  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
