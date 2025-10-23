const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3006'
export async function getJSON(path: string) {
  const r = await fetch(`${BASE}${path}`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}