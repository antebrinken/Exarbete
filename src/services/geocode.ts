// Geocoding using Nominatim (OpenStreetMap) with cache per destination + placeQuery
export async function geocode(placeQuery: string, destination: string): Promise<{ lat: number, lng: number } | null> {
  if (!placeQuery || !destination) return null;
  // Cache key includes trip destination and query for granularity
  const cacheKey = `${destination.toLowerCase()}::${placeQuery.toLowerCase()}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const obj = JSON.parse(cached);
      if (obj && typeof obj.lat === 'number' && typeof obj.lng === 'number') {
        return { lat: obj.lat, lng: obj.lng };
      }
    } catch {}
  }
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeQuery)}`;
  const resp = await fetch(url, { headers: { 'Accept-Language': 'en' } });
  if (!resp.ok) return null;
  const results = await resp.json();
  if (!Array.isArray(results) || results.length === 0) return null;
  const best = results[0];
  const coords = { lat: parseFloat(best.lat), lng: parseFloat(best.lon) };
  localStorage.setItem(cacheKey, JSON.stringify(coords));
  return coords;
}
