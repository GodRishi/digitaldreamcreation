import { getAdminPassword, setSessionCookie, checkRateLimit, recordFailedAttempt, resetFailedAttempts } from './_lib/adminAuth.js';
import { ensureResHelpers } from './_lib/resPolyfill.js';

export default async function handler(req, res) {
  ensureResHelpers(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      error: `Too many failed login attempts. Please wait ${rateCheck.remainingSeconds} seconds before trying again.`
    });
  }

  const { password } = req.body || {};
  const expectedPassword = getAdminPassword();

  if (!password || password !== expectedPassword) {
    const record = recordFailedAttempt(clientIp);
    if (record.count >= 5) {
      return res.status(429).json({
        error: 'Too many failed login attempts. Account locked out for 5 minutes.'
      });
    }
    return res.status(401).json({ error: 'Incorrect password' });
  }

  resetFailedAttempts(clientIp);
  setSessionCookie(res);

  return res.status(200).json({ success: true, message: 'Authenticated successfully' });
}
