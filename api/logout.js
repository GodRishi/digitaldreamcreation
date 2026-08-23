import { clearSessionCookie } from './_lib/adminAuth.js';
import { ensureResHelpers } from './_lib/resPolyfill.js';

export default async function handler(req, res) {
  ensureResHelpers(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  clearSessionCookie(res);
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
