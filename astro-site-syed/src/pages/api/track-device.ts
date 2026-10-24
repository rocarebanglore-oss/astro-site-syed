import type { APIRoute } from 'astro';

export const prerender = false;

// ✅ AAPKA NAYA WEBHOOK URL
const WEBHOOK = 'https://script.google.com/macros/s/AKfycbwDpIk5w_9O1-KZJ7xAgE6qFe2CsQh2cQS39rBqtHPGOsih9slGpMdgDQU6p12QkovD/exec';

// ==========================================
// GOOGLE ADS API CREDENTIALS
// ==========================================
const CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.GOOGLE_REFRESH_TOKEN;
const CUSTOMER_ID = import.meta.env.GOOGLE_CUSTOMER_ID;
const DEVELOPER_TOKEN = import.meta.env.GOOGLE_DEVELOPER_TOKEN; 

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Original IP nikalne ka logic
    const ip = request.headers.get('cf-connecting-ip')?.trim()
            || request.headers.get('x-real-ip')?.trim()
            || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || 'unknown';

    let result = { blocked: false };

    // 1. Google Sheet (Webhook) par data bhejo
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ip: ip, fp: data.fp, clicks: data.clicks, gclid: data.gclid,
          url: data.url, ua: data.ua, ts: Date.now()
        })
      });
      
      const textResponse = await res.text();
      try {
        result = JSON.parse(textResponse);
      } catch (e) {
        console.error("Webhook JSON Error:", textResponse.substring(0, 100));
      }
    } catch (webhookError) {
      console.error("Webhook fetch error:", webhookError);
    }

    // 2. Agar 3 clicks ho gaye (blocked: true), toh Google Ads API call karo
    if (result.blocked === true && ip !== 'unknown') {
      console.log("Block condition met. Calling Google Ads API for IP:", ip);

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
        const adsResponse = await fetch(`https://googleads.googleapis.com/v19/customers/${CUSTOMER_ID}/customerNegativeCriteria:mutate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'developer-token': DEVELOPER_TOKEN,
            'login-customer-id': CUSTOMER_ID,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operations: [{ create: { ipBlock: { ipAddress: ip } } }]
          })
        });

        if (!adsResponse.ok) {
          const adsError = await adsResponse.json();
          console.error("Google Ads API Error: ", adsError);
        } else {
          console.log("Success: IP blocked in Google Ads: ", ip);
        }
      } else {
        console.error("OAuth Token Error: Access token not found.");
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

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ status: "API is active" }), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  });
};
