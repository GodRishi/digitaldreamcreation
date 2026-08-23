import crypto from 'crypto';
import { parseCookie, stringifyCookie } from 'cookie';

const DEFAULT_PASSWORD = 'dream2025';
const SESSION_COOKIE = 'admin_session';

// Rate limiting state in memory
const failedAttempts = new Map(); // IP -> { count: number, lockoutUntil: timestamp }

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export function generateSessionToken() {
  const secret = getAdminPassword() + '-secret-salt-2025';
  return crypto.createHmac('sha256', secret).update('admin-authenticated-session').digest('hex');
}

export function isSessionValid(req) {
  try {
    const cookiesHeader = req.headers.cookie || '';
    const parsedCookies = parseCookie(cookiesHeader);
    const sessionToken = parsedCookies[SESSION_COOKIE];
    
    if (!sessionToken) return false;
    
    const validToken = generateSessionToken();
    return crypto.timingSafeEqual(Buffer.from(sessionToken), Buffer.from(validToken));
  } catch (err) {
    return false;
  }
}

export function checkRateLimit(ip) {
  const now = Date.now();
  const record = failedAttempts.get(ip);
  
  if (record) {
    if (record.lockoutUntil && now < record.lockoutUntil) {
      const remainingSeconds = Math.ceil((record.lockoutUntil - now) / 1000);
      return { allowed: false, remainingSeconds };
    }
    if (record.lockoutUntil && now >= record.lockoutUntil) {
      failedAttempts.delete(ip);
    }
  }
  return { allowed: true };
}

export function recordFailedAttempt(ip) {
  const now = Date.now();
  const record = failedAttempts.get(ip) || { count: 0, lockoutUntil: 0 };
  record.count += 1;

  if (record.count >= 5) {
    record.lockoutUntil = now + 5 * 60 * 1000; // 5 minutes lockout
  }

  failedAttempts.set(ip, record);
  return record;
}

export function resetFailedAttempts(ip) {
  failedAttempts.delete(ip);
}

export function setSessionCookie(res) {
  const token = generateSessionToken();
  const isProd = process.env.NODE_ENV === 'production';

  const cookieStr = stringifyCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/'
  });

  res.setHeader('Set-Cookie', cookieStr);
}

export function clearSessionCookie(res) {
  const cookieStr = stringifyCookie(SESSION_COOKIE, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0
  });

  res.setHeader('Set-Cookie', cookieStr);
}
