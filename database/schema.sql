CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at INTEGER DEFAULT (strftime('%s','now')),
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS hero (
  id TEXT PRIMARY KEY,
  role TEXT,
  summary TEXT,
  profile_photo TEXT,
  name TEXT,
  headline TEXT,
  description TEXT,
  button_text TEXT,
  button_link TEXT,
  background_image TEXT,
  stats_json TEXT,
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS about (
  id TEXT PRIMARY KEY,
  title TEXT,
  biography TEXT,
  vision TEXT,
  mission TEXT,
  experience TEXT,
  education TEXT,
  achievements TEXT,
  skills TEXT,
  research_interest TEXT,
  cv_link TEXT,
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS portfolio (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  category TEXT,
  website TEXT,
  github TEXT,
  image TEXT,
  created_at INTEGER DEFAULT (strftime('%s','now')),
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  icon TEXT,
  url TEXT,
  created_at INTEGER DEFAULT (strftime('%s','now')),
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  image_url TEXT,
  category TEXT,
  created_at INTEGER DEFAULT (strftime('%s','now')),
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS contact (
  id TEXT PRIMARY KEY,
  phone TEXT,
  email TEXT,
  office_address TEXT,
  maps_url TEXT,
  facebook TEXT,
  instagram TEXT,
  linkedin TEXT,
  tiktok TEXT,
  researchgate TEXT,
  google_scholar TEXT,
  orcid TEXT,
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  quote TEXT,
  author TEXT,
  role TEXT,
  created_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS seo (
  id TEXT PRIMARY KEY,
  page TEXT,
  title TEXT,
  description TEXT,
  keywords TEXT,
  og_image TEXT,
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY,
  site_title TEXT,
  site_description TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  admin_email TEXT,
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);
