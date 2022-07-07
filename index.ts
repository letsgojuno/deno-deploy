import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

const SECRET = Deno.env.get("SECRET");

console.log('secret', SECRET);

serve((_req) => {
  return new Response("Hello World 2!" + SECRET, {
    headers: { "content-type": "text/plain" },
  });
});
