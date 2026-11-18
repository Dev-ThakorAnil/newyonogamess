const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://diwalatestgames.onrender.com/api';

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  // Only apply ISR revalidation for public GET requests (no explicit cache option)
  const fetchOptions: RequestInit & { next?: { revalidate?: number | false } } = {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  };

  // Don't set `next.revalidate` when `cache: 'no-store'` is used (they conflict in Next.js)
  if (!options?.cache && !fetchOptions.next) {
    fetchOptions.next = { revalidate: 3600 };
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${url}`, fetchOptions);
  } catch (err: any) {
    // Network error (backend down, CORS, DNS failure, etc.)
    throw new Error(
      `Cannot connect to server. Make sure the backend is running at ${API_BASE}. (${err.message})`
    );
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: `Request failed (${res.status})` }));
    throw new Error(error.error || `Request failed (${res.status})`);
  }
  return res.json();
}

// Public APIs
export async function getGames(params?: {
  page?: number; limit?: number; category?: string;
  tag?: string; gameType?: string; featured?: string; trending?: string; sort?: string;
}) {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => { if (v) query.set(k, String(v)); });
  }
  return fetcher<{ games: import('./types').Game[]; pagination: { page: number; limit: number; total: number; pages: number } }>(
    `/games?${query.toString()}`
  );
}

export async function getGame(slug: string) {
  return fetcher<{ game: import('./types').Game; related: import('./types').Game[] }>(`/games/${slug}`, {
    next: { revalidate: 300 },
  });
}

export async function searchGames(q: string) {
  return fetcher<{ games: import('./types').Game[] }>(`/games/search?q=${encodeURIComponent(q)}`);
}

export async function getCategories() {
  return fetcher<{ categories: import('./types').Category[] }>('/categories', {
    next: { revalidate: 3600 },
  });
}

export async function getCategoryGames(slug: string, page = 1) {
  return fetcher<{ category: import('./types').Category; games: import('./types').Game[]; pagination: { page: number; limit: number; total: number; pages: number } }>(
    `/categories/${slug}?page=${page}`,
    { next: { revalidate: 3600 } }
  );
}

export async function trackDownload(slug: string) {
  return fetcher<{ downloadUrl: string; referralUrl: string }>(`/downloads/${slug}`, { method: 'POST', cache: 'no-store' });
}

// Admin APIs
function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function adminLogin(email: string, password: string) {
  return fetcher<{ token: string; admin: { id: string; email: string; name: string } }>(
    '/admin/login', { method: 'POST', body: JSON.stringify({ email, password }), cache: 'no-store' }
  );
}

export async function getDashboard(token: string) {
  return fetcher<import('./types').DashboardData>('/admin/dashboard', { headers: authHeaders(token), cache: 'no-store' });
}

export async function getAdminGames(
  token: string,
  page = 1,
  limit = 50,
  status = "all",
  search = "",
  gameType?: string
) {
  const query = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (status && status !== "all") query.set("status", status);
  if (search) query.set("search", search);
  if (gameType) query.set("gameType", gameType);
  return fetcher<{
    games: import("./types").Game[];
    pagination: { page: number; limit: number; total: number; pages: number };
    counts?: { all: number; active: number; inactive: number };
  }>(`/admin/games?${query.toString()}`, {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function restoreGame(token: string, id: string) {
  return fetcher<{ message: string; game: import('./types').Game }>(`/admin/games/${id}/restore`, {
    method: 'PATCH',
    headers: authHeaders(token),
    cache: 'no-store',
  });
}

export async function permanentDeleteGame(token: string, id: string) {
  return fetcher<{ message: string }>(`/admin/games/${id}/permanent`, {
    method: 'DELETE',
    headers: authHeaders(token),
    cache: 'no-store',
  });
}

export async function createGame(token: string, data: Partial<import('./types').Game>) {
  return fetcher<{ game: import('./types').Game }>('/admin/games', {
    method: 'POST', body: JSON.stringify(data), headers: authHeaders(token), cache: 'no-store'
  });
}

export async function updateGame(token: string, id: string, data: Partial<import('./types').Game>) {
  return fetcher<{ game: import('./types').Game }>(`/admin/games/${id}`, {
    method: 'PUT', body: JSON.stringify(data), headers: authHeaders(token), cache: 'no-store'
  });
}

export async function deleteGame(token: string, id: string) {
  return fetcher<{ message: string }>(`/admin/games/${id}`, {
    method: 'DELETE', headers: authHeaders(token), cache: 'no-store'
  });
}

export async function changeAdminPassword(token: string, oldPassword: string, newPassword: string) {
  return fetcher<{ message: string }>('/admin/password', {
    method: 'PUT',
    body: JSON.stringify({ oldPassword, newPassword }),
    headers: authHeaders(token),
    cache: 'no-store'
  });
}

export async function logoutAllDevices(token: string) {
  return fetcher<{ message: string }>('/admin/logout-all', {
    method: 'POST',
    headers: authHeaders(token),
    cache: 'no-store'
  });
}

export async function getTopPlatformsConfig() {
  try {
    const res = await fetch('/api/top-platforms', { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch {}
  return { slots: [] };
}

export async function saveTopPlatformsConfig(slots: any[]) {
  const res = await fetch('/api/top-platforms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slots }),
  });
  if (!res.ok) throw new Error('Failed to save top platforms');
  return res.json();
}
