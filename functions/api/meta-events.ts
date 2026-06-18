interface MetaEventBody {
  event_name: string;
  event_id: string;
  event_source_url?: string;
  fbp?: string;
  fbc?: string;
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

    const eventPayload: Record<string, unknown> = {
      event_name: body.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.event_id,
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: {
        client_ip_address: clientIp,
        client_user_agent: userAgent,
        ...(body.fbp ? { fbp: body.fbp } : {}),
        ...(fbc ? { fbc } : {}),
      },
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
