/**
 * Proxies mod-request form submissions to Discord.
 * Webhook URL stays server-side (DISCORD_WEBHOOK_URL env var).
 */

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map();

function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string' && xf.length) return xf.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  hits.set(ip, entry);
  return entry.count > RATE_MAX;
}

function truncate(value, max = 1000) {
  const text = String(value ?? '').trim();
  if (text.length <= max) return text || '—';
  return `${text.slice(0, max - 1)}…`;
}

function sanitizeField(value, max) {
  return truncate(String(value ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ''), max);
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
    return;
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (
    !webhook ||
    !/^https:\/\/(discord|discordapp|ptb\.discord|canary\.discord)\.com\/api\/webhooks\//.test(webhook)
  ) {
    res.status(503).json({ error: 'Request service is not configured.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: 'Invalid JSON body.' });
      return;
    }
  }
  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'Invalid request body.' });
    return;
  }

  const platform = sanitizeField(body.platform, 256);
  const discord = sanitizeField(body.discord || 'Not provided', 256);
  const details = sanitizeField(body.details, 1800);

  if (!details || details === '—') {
    res.status(400).json({ error: 'Please describe what you are looking for.' });
    return;
  }

  // Honeypot: bots often fill hidden fields
  if (body.website || body.company || body.url) {
    res.status(200).json({ ok: true });
    return;
  }

  const payload = {
    username: 'FiveStarrCust0mz Requests',
    embeds: [
      {
        title: 'New Mod Request',
        color: 0xc084fc,
        fields: [
          { name: 'Game / Platform', value: platform, inline: true },
          { name: 'Discord Username', value: discord, inline: true },
          { name: 'Request Details', value: details },
        ],
        footer: { text: 'FiveStarrCust0mz Website' },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      res.status(502).json({ error: 'Upstream delivery failed.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: 'Could not send request.' });
  }
};
