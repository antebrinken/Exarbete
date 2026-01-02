import { promises as fs } from 'fs';
const FILE = './shared-trips.json';

// Read all trips from file (returns {} if not found)
export async function readTrips() {
  try {
    const data = await fs.readFile(FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Write all trips to file
export async function writeTrips(trips) {
  await fs.writeFile(FILE, JSON.stringify(trips, null, 2), 'utf8');
}

// Save one trip and return id
export async function saveTrip(trip) {
  const trips = await readTrips();
  const id = (Math.random().toString(36).slice(2,10));
  trips[id] = trip;
  await writeTrips(trips);
  return id;
}

export async function getTrip(id) {
  const trips = await readTrips();
  return trips[id] || null;
}

