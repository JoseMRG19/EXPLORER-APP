const cache = new Map<string, unknown>();

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  if (cache.has(url)) {
    return cache.get(url) as T;
  }

  const response = await fetch(url, { signal });
  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  const data = (await response.json()) as T;
  cache.set(url, data);
  return data;
}

export function clearCache() {
  cache.clear();
}
