export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['results', 'items', 'records', 'data']) {
    const value = payload[key]
    if (Array.isArray(value)) return value
    if (value && typeof value === 'object') {
      const nestedCollection = normalizeCollection(value)
      if (nestedCollection.length > 0) return nestedCollection
      if (['results', 'items', 'records', 'data'].some((nestedKey) => nestedKey in value)) {
        return nestedCollection
      }
    }
  }

  return []
}

export async function fetchCollection(url, signal) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`The API request failed with status ${response.status}.`)
  }

  return normalizeCollection(await response.json())
}
