// ─── Lensify localStorage Utility ───────────────────────────────────
// Centralises all read/write to localStorage so every component
// goes through the same safe, try-caught helpers.

const KEYS = {
  ACCOUNTS: 'lensify_accounts',
  CURRENT_USER: 'lensify_current_user',
  UPLOADS: 'lensify_uploads',
  LIKES: 'lensify_likes',
};

// ── Generic helpers ──────────────────────────────────────────────────

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[storage] Failed to write "${key}":`, e);
  }
}

// ── Accounts ─────────────────────────────────────────────────────────

export function getAccounts() {
  return read(KEYS.ACCOUNTS, []);
}

/** Returns the new account object, or throws with a user-facing message. */
export function createAccount({ name, email, password }) {
  const accounts = getAccounts();
  if (accounts.some(a => a.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }
  const account = {
    id: `user_${Date.now()}`,
    name,
    email: email.toLowerCase(),
    // Simple hash — NOT secure, but fine for a localStorage demo
    passwordHash: simpleHash(password),
    avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
    createdAt: new Date().toISOString(),
  };
  accounts.push(account);
  write(KEYS.ACCOUNTS, accounts);
  return account;
}

/** Returns the account object, or throws with a user-facing message. */
export function loginAccount({ email, password }) {
  const accounts = getAccounts();
  const account = accounts.find(
    a => a.email === email.toLowerCase()
  );
  if (!account) throw new Error('No account found with this email.');
  if (account.passwordHash !== simpleHash(password)) {
    throw new Error('Incorrect password.');
  }
  return account;
}

// ── Session (current user) ───────────────────────────────────────────

export function getCurrentUser() {
  return read(KEYS.CURRENT_USER, null);
}

export function setCurrentUser(user) {
  write(KEYS.CURRENT_USER, user);
}

export function clearCurrentUser() {
  localStorage.removeItem(KEYS.CURRENT_USER);
}

// ── Uploads ──────────────────────────────────────────────────────────

export function getUploads() {
  return read(KEYS.UPLOADS, []);
}

export function saveUploads(uploads) {
  write(KEYS.UPLOADS, uploads);
}

export function addUpload(photo) {
  const uploads = getUploads();
  uploads.unshift(photo);
  write(KEYS.UPLOADS, uploads);
}

export function deleteUpload(photoId) {
  const uploads = getUploads();
  const updated = uploads.filter(p => p.id !== photoId);
  write(KEYS.UPLOADS, updated);
}

// ── Likes ────────────────────────────────────────────────────────────
// Shape:  { [photoId]: { count: number, likedBy: string[] } }

export function getLikes() {
  return read(KEYS.LIKES, {});
}

/**
 * Toggle a like for a given photo + user.
 * Returns { count, isLiked } after the toggle.
 */
export function toggleLike(photoId, userId) {
  const likes = getLikes();
  if (!likes[photoId]) {
    likes[photoId] = { count: 0, likedBy: [] };
  }
  const entry = likes[photoId];
  const idx = entry.likedBy.indexOf(userId);
  if (idx === -1) {
    entry.likedBy.push(userId);
    entry.count += 1;
  } else {
    entry.likedBy.splice(idx, 1);
    entry.count -= 1;
  }
  write(KEYS.LIKES, likes);
  return { count: entry.count, isLiked: idx === -1 };
}

// ── Download helper ──────────────────────────────────────────────────

export async function downloadImage(url, filename = 'lensify-photo.jpg') {
  try {
    let blobUrl;
    if (url.startsWith('data:')) {
      // base64 data URL — convert directly
      const res = await fetch(url);
      const blob = await res.blob();
      blobUrl = URL.createObjectURL(blob);
    } else {
      // External URL (e.g. Unsplash) — fetch as blob
      const res = await fetch(url);
      const blob = await res.blob();
      blobUrl = URL.createObjectURL(blob);
    }
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (e) {
    console.error('[storage] Download failed:', e);
    // Fallback: open in new tab
    window.open(url, '_blank');
  }
}

// ── Internal ─────────────────────────────────────────────────────────

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36);
}
