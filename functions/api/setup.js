import bcrypt from 'bcryptjs';
import { badRequest, jsonResponse, methodNotAllowed } from '../helpers.js';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function ensureFullNameColumn(env) {
  if (!env?.DB) {
    return;
  }

  try {
    await env.DB.prepare('ALTER TABLE admins ADD COLUMN full_name TEXT').run();
  } catch (error) {
    if (!String(error.message || '').includes('duplicate column name')) {
      throw error;
    }
  }
}

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return methodNotAllowed();
  }

  if (!env?.DB) {
    return jsonResponse({ error: 'D1 database binding is not configured.' }, 500);
  }

  let body = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const fullName = body?.fullName?.trim();
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password;
  const confirmPassword = body?.confirmPassword;

  if (!fullName || !email || !password || !confirmPassword) {
    return badRequest('Full name, email, password and confirmation are required.');
  }

  if (!isValidEmail(email)) {
    return badRequest('Please provide a valid email address.');
  }

  if (password.length < 8) {
    return badRequest('Password must be at least 8 characters long.');
  }

  if (password !== confirmPassword) {
    return badRequest('Passwords do not match.');
  }

  const existingAdmin = await env.DB.prepare('SELECT COUNT(*) AS count FROM admins').first();
  if (existingAdmin?.count > 0) {
    return jsonResponse({ error: 'Setup already completed. An administrator already exists.' }, 409);
  }

  try {
    await ensureFullNameColumn(env);

    const passwordHash = bcrypt.hashSync(password, 12);
    const result = await env.DB.prepare(
      'INSERT INTO admins (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)' 
    )
      .bind(fullName, email, passwordHash, 'admin')
      .run();

    return jsonResponse({
      message: 'Administrator created successfully.',
      admin: {
        id: result.meta?.last_row_id || null,
        email,
      },
    }, 201);
  } catch (error) {
    return jsonResponse({ error: error.message || 'Unable to create administrator.' }, 500);
  }
}
