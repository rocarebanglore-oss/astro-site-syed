import type { APIRoute } from 'astro';

// ✅ API ko static build se bachayega aur Vercel par serverless function banayega
export const prerender = false;

// ✅ Aapka Purana Webhook URL (Same Google Sheet ke liye)
const WEBHOOK = 'https://script.google.com/macros/s/AKfycbygR-2SFHUYeZPwsc5D58EqatdD_zm_y77cAefWq9VeXLzgxECUsXmb2FXCOmscdH8t/exec';

// ==========================================
// GOOGLE ADS API CREDENTIALS (Vercel se aayenge)
// ==========================================
const CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.GOOGLE_REFRESH_TOKEN;
const CUSTOMER_ID = import.meta.env.GOOGLE_CUSTOMER_ID;
const DEVELOPER_TOKEN = import.meta.env.GOOGLE_DEVELOPER_TOKEN;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const ip = request.headers.get('cf-connecting-ip')?.trim()
            || request.headers.get('x-real-ip')?.trim()
            || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || 'unknown';

    // 1. Google Sheet (Webhook) par data bhejo
    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip: ip, fp: data.fp, clicks: data.clicks, gclid: data.gclid,
        url: data.url, ua: data.ua, ts: Date.now()
      })
    });

    const result = await res.json();

    // 2. Agar 3 clicks poore ho gaye hain (result.blocked == true), toh Google Ads mein block karo
    if (result.blocked === true && ip !== 'unknown') {
      
      // Google OAuth se naya Access Token generate karo
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token: REFRESH_TOKEN,
          grant_type: 'refresh_token',
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.access_token) {
        // Turant Google Ads API ko call karke IP block karo
        const adsResponse = await fetch(`https://googleads.googleapis.com/v17/customers/${CUSTOMER_ID}/customerNegativeCriteria:mutate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'developer-token': DEVELOPER_TOKEN,
            'login-customer-id': CUSTOMER_ID,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operations: [
              {
                create: {
                  ipBlock: {
                    ipAddress: ip
                  }
                }
              }
            ]
          })
        });

        if (!adsResponse.ok) {
          const adsError = await adsResponse.json();
          console.error("Google Ads API Error: ", adsError);
        } else {
          console.log("IP successfully blocked in Google Ads: ", ip);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true, blocked: result.blocked || false }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("Backend Error:", err);
    return new Response(JSON.stringify({ ok: false, blocked: false }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  }
};

// ✅ Sirf warning hatane ke liye GET method add kiya hai
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ status: "API is active", message: "Use POST to send data." }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
