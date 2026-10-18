import type { APIRoute } from 'astro';

// ✅ Aapka Purana Webhook URL (Same Google Sheet ke liye)
const WEBHOOK = 'https://script.google.com/macros/s/AKfycbygR-2SFHUYeZPwsc5D58EqatdD_zm_y77cAefWq9VeXLzgxECUsXmb2FXCOmscdH8t/exec';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const ip = request.headers.get('cf-connecting-ip')?.trim()
            || request.headers.get('x-real-ip')?.trim()
            || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || 'unknown';

    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip: ip, fp: data.fp, clicks: data.clicks, gclid: data.gclid,
        url: data.url, ua: data.ua, ts: Date.now()
      })
    });

    const result = await res.json();
    return new Response(JSON.stringify({ ok: true, blocked: result.blocked || false }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, blocked: false }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  }
};