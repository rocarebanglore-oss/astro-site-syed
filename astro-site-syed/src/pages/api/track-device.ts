import type { APIRoute } from 'astro';

export const prerender = false;

// ✅ AAPKA WEBHOOK URL (Google Sheet)
const WEBHOOK = 'https://script.google.com/macros/s/AKfycbwDpIk5w_9O1-KZJ7xAgE6qFe2CsQh2cQS39rBqtHPGOsih9slGpMdgDQU6p12QkovD/exec';

// ==========================================
// GOOGLE ADS API CREDENTIALS (Vercel se aayenge)
// ==========================================
const CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.GOOGLE_REFRESH_TOKEN;

// Client Account ID (Jisme ads chal rahe hain: 784-441-1097)
const CUSTOMER_ID = import.meta.env.GOOGLE_CUSTOMER_ID; 

// ✅ Manager (MCC) Account ID (Bina dash ke: 516-663-6500)
const MCC_ID = '5166636500'; 

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // User ka IP address nikalna
    const ip = request.headers.get('cf-connecting-ip')?.trim()
            || request.headers.get('x-real-ip')?.trim()
            || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || 'unknown';

    let result = { blocked: false };

    // 1. Webhook Call (Google Sheet par data bhejna)
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

    // 2. Google Ads API Call (Agar 3 clicks ho gaye hain)
    if (result.blocked === true && ip !== 'unknown') {
      console.log("Block condition met. Calling API for IP:", ip);

      // OAuth Token Generate karein
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

      const tokenText = await tokenResponse.text();
      let tokenData;
      try {
        tokenData = JSON.parse(tokenText);
      } catch (e) {
        console.error("OAuth Error:", tokenText.substring(0, 200));
        return new Response(JSON.stringify({ error: "OAuth Failed" }), { status: 500 });
      }

      if (tokenData.access_token) {
        // ✅ API v26 use kar rahe hain (Purana v19 hata diya)
        const adsResponse = await fetch(`https://googleads.googleapis.com/v26/customers/${CUSTOMER_ID}/customerNegativeCriteria:mutate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'login-customer-id': MCC_ID, // ✅ MCC ID yahan use ho rahi hai
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operations: [{ create: { ipBlock: { ipAddress: ip } } }]
          })
        });

        // Response check karein
        if (!adsResponse.ok) {
          const adsErrorText = await adsResponse.text();
          try {
            console.error("Ads API JSON Error:", JSON.parse(adsErrorText));
          } catch (e) {
            console.error("Ads API HTML Error:", adsErrorText.substring(0, 200));
          }
        } else {
          console.log("Success: IP blocked in Google Ads:", ip);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true, blocked: result.blocked || false }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("Backend Error:", err);
    return new Response(JSON.stringify({ ok: false }), { status: 200 });
  }
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ status: "API is active" }), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  });
};
