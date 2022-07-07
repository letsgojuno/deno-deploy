import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import * as postgres from "https://deno.land/x/postgres@v0.14.0/mod.ts";

const databaseUrl = Deno.env.get("DATABASE_URL")!;
const pool = new postgres.Pool(databaseUrl, 3, true);

serve(async (_req) => {
  const connection = await pool.connect();
  const entries = [];
  for await (const entry of Deno.readDir(".")) {
    entries.push(entry);
  }
  try {
    const { rows } = await connection.queryObject`
      SELECT label FROM "TODOS";
    `;
    return new Response(JSON.stringify(rows) + JSON.stringify(entries), {
      headers: { "content-type": "text/plain" },
    });
  } finally {
    connection.release();
  }
});
