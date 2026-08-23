import { getVideoSlots } from './_lib/videoStore.js';
import { ensureResHelpers } from './_lib/resPolyfill.js';

export default async function handler(req, res) {
  ensureResHelpers(res);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slots = getVideoSlots();
  return res.status(200).json({ slots });
}
