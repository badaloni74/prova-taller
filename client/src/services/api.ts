export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function snakeToCamel(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function camelToSnake(key: string): string {
  return key.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function convertKeys(value: unknown, convert: (key: string) => string): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => convertKeys(item, convert));
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [convert(key), convertKeys(val, convert)]),
    );
  }
  return value;
}

export function toCamelCase<T>(value: unknown): T {
  return convertKeys(value, snakeToCamel) as T;
}

export function toSnakeCase(value: unknown): unknown {
  return convertKeys(value, camelToSnake);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (body && body.error) || `Error ${response.status}`;
    throw new ApiError(response.status, message);
  }

  return toCamelCase<T>(body);
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(toSnakeCase(data)) }),
  put: <T>(path: string, data: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(toSnakeCase(data)) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
