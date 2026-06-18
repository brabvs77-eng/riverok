interface MetaEventBody {
  event_name: string;
  event_id: string;
  event_source_url?: string;
  fbp?: string;
  fbc?: string;
  user_data?: Record<string, string>;
  custom_data?: Record<string, unknown>;
}

interface Env {
  META_PIXEL_ID?: string;
  META_ACCESS_TOKEN?: string;
  META_TEST_EVENT_CODE?: string;
}

const ALLOWED_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'Lead',
  'InitiateCheckout',
  'Contact',
  'CompleteRegistration',
]);

const HASHED_USER_FIELDS = new Set(['em', 'ph', 'fn', 'ln', 'ct', 'st', 'zp', 'country', 'external_id', 'ge', 'db']);

async function sha256(value: string): Promise<string> {
  const normalized = value.toLowerCase().trim();
  const data = new TextEncoder().encode(normalized);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

async function buildHashedUserData(
  raw: Record<string, string> | undefined,
  clientIp: string,
  userAgent: string,
  fbp?: string,
  fbc?: string
): Promise<Record<string, string>> {
  const userData: Record<string, string> = {
    client_ip_address: clientIp,
    client_user_agent: userAgent,
  };

  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  if (!raw) return userData;

  for (const [field, value] of Object.entries(raw)) {
    if (!value || !HASHED_USER_FIELDS.has(field)) continue;

    if (field === 'ph') {
      userData.ph = await sha256(normalizePhone(value));
      continue;
    }

    userData[field] = await sha256(value);
  }

  return userData;
}

function extractFbclid(url: string): string | undefined {
  try {
    return new URL(url).searchParams.get('fbclid') || undefined;
  } catch {
    return undefined;
  }
}

function buildFbc(fbc: string | undefined, sourceUrl: string): string | undefined {
  if (fbc) return fbc;

  const fbclid = extractFbclid(sourceUrl);
  if (!fbclid) return undefined;

  return `fb.1.${Date.now()}.${fbclid}`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const pixelId = env.META_PIXEL_ID || '4451322711789343';
  const accessToken = env.META_ACCESS_TOKEN;

  if (!accessToken) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await request.json()) as MetaEventBody;

    if (!body.event_name || !body.event_id) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!ALLOWED_EVENTS.has(body.event_name)) {
      return new Response(JSON.stringify({ error: 'Invalid event name' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const clientIp = request.headers.get('CF-Connecting-IP') || '';
    const userAgent = request.headers.get('User-Agent') || '';
    const eventSourceUrl = body.event_source_url || request.headers.get('Referer') || '';
    const fbc = buildFbc(body.fbc, eventSourceUrl);
    const userData = await buildHashedUserData(body.user_data, clientIp, userAgent, body.fbp, fbc);

    const eventPayload: Record<string, unknown> = {
      event_name: body.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.event_id,
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: userData,
      custom_data: body.custom_data || {},
    };

    const payload: Record<string, unknown> = {
      data: [eventPayload],
      access_token: accessToken,
    };

    if (env.META_TEST_EVENT_CODE) {
      payload.test_event_code = env.META_TEST_EVENT_CODE;
    }

    const metaResponse = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await metaResponse.json();

    return new Response(JSON.stringify(result), {
      status: metaResponse.ok ? 200 : 502,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
