const encoder = new TextEncoder();
const decoder = new TextDecoder();

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}

function methodNotAllowed() {
  return jsonResponse({ error: 'Method not allowed' }, 405);
}

function unauthorized(message = 'Unauthorized') {
  return jsonResponse({ error: message }, 401);
}

function badRequest(message = 'Bad request') {
  return jsonResponse({ error: message }, 400);
}

function base64UrlEncode(buffer) {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(base64Url) {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function sha256Hex(message) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(message));
  const bytes = new Uint8Array(digest);
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function getHmacKey(secret) {
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
}

async function signJwt(payload, secret) {
  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const body = {
    ...payload,
    iat: now,
    exp: now + 60 * 60 * 24,
  };
  const encodedHeader = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(encoder.encode(JSON.stringify(body)));
  const data = `${encodedHeader}.${encodedPayload}`;
  const key = await getHmacKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return `${data}.${base64UrlEncode(signature)}`;
}

async function verifyJwt(token, secret) {
  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const data = `${encodedHeader}.${encodedPayload}`;
  const key = await getHmacKey(secret);
  const expectedSignature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const signatureBytes = base64UrlDecode(signature);
  const expectedBytes = new Uint8Array(expectedSignature);

  if (signatureBytes.length !== expectedBytes.length) {
    return null;
  }

  for (let i = 0; i < signatureBytes.length; i++) {
    if (signatureBytes[i] !== expectedBytes[i]) {
      return null;
    }
  }

  const payloadJson = decoder.decode(base64UrlDecode(encodedPayload));
  let payload;

  try {
    payload = JSON.parse(payloadJson);
  } catch (error) {
    return null;
  }

  if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
    return null;
  }

  return payload;
}

function getBearerToken(request) {
  const authorization = request.headers.get('Authorization') || request.headers.get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }
  return authorization.replace('Bearer ', '').trim();
}

async function requireAuth(request, env) {
  const token = getBearerToken(request);
  if (!token) {
    return null;
  }
  return verifyJwt(token, env.JWT_SECRET);
}

export { jsonResponse, methodNotAllowed, unauthorized, badRequest, sha256Hex, signJwt, verifyJwt, requireAuth };
