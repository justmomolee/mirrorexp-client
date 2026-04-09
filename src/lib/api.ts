const normalizeBase = (value: string) => value.replace(/\/+$/, "");

const rawApiBase =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_REACT_APP_SERVER_URL ||
  "http://localhost:5000";

const normalizedBase = normalizeBase(rawApiBase);

export const apiBaseUrl = normalizedBase.endsWith("/api")
  ? normalizedBase
  : `${normalizedBase}/api`;

export const buildApiUrl = (path: string) =>
  `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
