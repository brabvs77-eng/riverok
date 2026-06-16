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

    const clientIp = request.headers.get('CF-Connecting-IP') || '';
    const userAgent = request.headers.get('User-Agent') || '';

    const payload = {
      data: [
        {
          event_name: body.event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: body.event_id,
          event_source_url: body.event_source_url || request.headers.get('Referer') || '',
          action_source: 'website',
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            ...(body.fbp ? { fbp: body.fbp } : {}),
            ...(body.fbc ? { fbc: body.fbc } : {}),
          },
          custom_data: body.custom_data || {},
        },
      ],
      access_token: accessToken,
    };

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
