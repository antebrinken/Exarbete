import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MapView from './MapView';
import type { TravelPlan } from './types/travel';

export default function SharedTripPage() {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<TravelPlan | null>(null);

  useEffect(() => {
    if (id) {
      const data = localStorage.getItem('trip-' + id);
      if (data) {
        setTrip(JSON.parse(data));
      }
    }
  }, [id]);

  if (!trip) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Ingen resa hittades</h1>
        <Link to="/" className="text-indigo-400 hover:underline">Till startsidan</Link>
      </div>
    );
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-16 sm:py-20">
      <h1 className="text-3xl font-bold text-white mb-2">Delad Resa: {trip.destination}</h1>
      <div className="mb-6">
        <MapView
          center={trip.days.find(d=>d.activities.some(a=>a.lat && a.lng))?.activities.find(a=>a.lat && a.lng)?.lat ? [
            trip.days.find(d=>d.activities.some(a=>a.lat && a.lng))?.activities.find(a=>a.lat && a.lng)?.lat!,
            trip.days.find(d=>d.activities.some(a=>a.lat && a.lng))?.activities.find(a=>a.lat && a.lng)?.lng!
          ] : [0,0]}
          markers={trip.days.flatMap(day => day.activities.filter(a => typeof a.lat === 'number' && typeof a.lng === 'number').map(a => ({
            id: a.id,
            position: [a.lat!, a.lng!],
            popup: <span>{a.text}</span>
          })))}
          height="325px"
        />
      </div>
      {trip.days.map(day => (
        <section key={day.date} className="mb-4 rounded-xl border border-white/10 bg-slate-900 p-4">
          <h2 className="text-lg font-semibold text-indigo-100 mb-2">{day.date}</h2>
          <div className="flex flex-col gap-2">
            {day.activities.map(activity => (
              <div key={activity.id} className="rounded bg-slate-800 p-3">
                <span className="block text-xs text-indigo-300 font-bold mb-1">{activity.label}</span>
                <span className="block text-white">{activity.text}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-2">Packlista</h3>
        <ul className="list-disc ml-5 text-slate-200">
          {trip.packingList.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-2">Tips</h3>
        <ul className="list-disc ml-5 text-slate-200">
          {trip.tips.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

