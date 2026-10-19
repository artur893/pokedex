// Locally (with VITE_API_URL set) requests go to json-server.
// Without it, e.g. in the deployed preview, the same json-server routes
// are emulated in localStorage, so the app works without a backend.
const LOCAL_API = "local-api";
const STORAGE_KEY = "pokedex-db";

export const API_URL = import.meta.env.VITE_API_URL || LOCAL_API;

function readDb() {
  try {
    const db = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { users: [], pokemons: [], ...db };
  } catch {
    return { users: [], pokemons: [] };
  }
}

function writeDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function localFetch(url, options = {}) {
  const { pathname, searchParams } = new URL(url, "http://localhost");
  const [, , collection, id] = pathname.split("/");
  const method = (options.method ?? "GET").toUpperCase();
  const db = readDb();
  const items = db[collection];

  if (!items) return jsonResponse({}, 404);

  if (method === "GET") {
    if (id) {
      const item = items.find((item) => String(item.id) === id);
      return item ? jsonResponse(item) : jsonResponse({}, 404);
    }
    const filtered = items.filter((item) =>
      [...searchParams].every(([key, value]) => String(item[key]) === value),
    );
    return jsonResponse(filtered);
  }

  const body = options.body ? JSON.parse(options.body) : {};

  if (method === "POST") {
    const item = { ...body, id: String(body.id ?? crypto.randomUUID()) };
    db[collection] = [...items, item];
    writeDb(db);
    return jsonResponse(item, 201);
  }

  const index = items.findIndex((item) => String(item.id) === id);
  if (index === -1) return jsonResponse({}, 404);

  if (method === "PATCH") {
    const item = { ...items[index], ...body };
    db[collection] = items.map((current, i) => (i === index ? item : current));
    writeDb(db);
    return jsonResponse(item);
  }

  if (method === "DELETE") {
    db[collection] = items.filter((_, i) => i !== index);
    writeDb(db);
    return jsonResponse(items[index]);
  }

  return jsonResponse({}, 405);
}

export function apiFetch(url, options) {
  return url.startsWith(LOCAL_API)
    ? localFetch(url, options)
    : fetch(url, options);
}
