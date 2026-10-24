import type { APIRoute } from 'astro';
export const prerender = false;

const WEBHOOK = 'https://script.google.com/macros/s/AKfycbwDpIk5w_9O1-KZJ7xAgE6qFe2CsQh2cQS39rBqtHPGOsih9slGpMdgDQU6p12QkovD/exec';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const ip = "1.2.3.4"; // Dummy IP for test

    // Direct Webhook call
    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip: ip, fp: data.fp, clicks: data.clicks, gclid: data.gclid,
        url: data.url, ua: data.ua, ts: Date.now()
      })
    });
    
    const status = res.status;
    const textResponse = await res.text();

    // Log EVERYTHING
    console.log("Webhook Status:", status);
    console.log("Webhook Response (First 200 chars):", textResponse.substring(0, 200));

    return new Response(JSON.stringify({ ok: true, debug: textResponse }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error("Debug Error:", err.message);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 200 });
  }
};

export const GET: APIRoute = async () => new Response("Debug API Active");
