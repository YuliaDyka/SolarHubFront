const API_URL = import.meta.env.VITE_API_URL as string;

export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};

async function parseError(res: Response): Promise<ApiError> {
  let body: any = null;
  try { body = await res.json(); } catch { /* ignore */ }

  return {
    message: body?.message || body?.error || res.statusText || "API error",
    status: res.status,
    details: body,
  };
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include", // ✅ КРИТИЧНО: щоб браузер зберіг/передавав HttpOnly cookies
  });

  if (!res.ok) throw await parseError(res);

  // якщо бекенд повертає пусто (204)
  if (res.status === 204) return undefined as T;

  // інколи бекенд може повернути пустий body (або тільки message)
  const text = await res.text();
  return (text ? JSON.parse(text) : (undefined as T));
}
