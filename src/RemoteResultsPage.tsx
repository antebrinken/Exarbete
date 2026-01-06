import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import MapView from "./MapView";
import type { TravelPlan } from "./types/travel";

export default function RemoteResultsPage() {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const activityRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/shared-trips/${id}`)
      .then(r => {
        if (!r.ok) throw new Error("Resan finns inte eller kunde inte laddas.");
        return r.json();
      })
      .then(data => { setPlan(data); setError(null); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-32 text-2xl text-slate-300">Laddar resa...</div>;
  if (error) return <div className="text-center mt-32 text-xl text-rose-400">{error}</div>;
  if (!plan) return null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 text-indigo-100">{plan.destination}</h1>
        <div className="text-slate-300 mb-2">{plan.startDate} – {plan.endDate}</div>
      </div>
      <div className="mb-8">
        <MapView
          center={plan.days.find(d=>d.activities.some(a=>a.lat && a.lng))?.activities.find(a=>a.lat && a.lng)?.lat ?[
            plan.days.find(d=>d.activities.some(a=>a.lat && a.lng))?.activities.find(a=>a.lat && a.lng)?.lat!,
            plan.days.find(d=>d.activities.some(a=>a.lat && a.lng))?.activities.find(a=>a.lat && a.lng)?.lng!
          ] : [0,0]}
          markers={plan.days.flatMap(day => day.activities.filter(a => typeof a.lat === 'number' && typeof a.lng === 'number').map(a => ({
            id: a.id,
            position: [a.lat!, a.lng!],
            popup: <span>{a.text}</span>
          })))}
          selectedId={selectedActivityId ?? undefined}
          onMarkerClick={id => {
            setSelectedActivityId(id);
            setTimeout(() => {
              activityRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          }}
          height="320px"
        />
      </div>
      <div className="grid gap-5">
        {plan.days.map((day, idx) => (
          <div key={day.date} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <div className="flex gap-6 items-center mb-2">
              <span className="font-semibold text-indigo-300">Dag {idx+1}:</span>
              <span className="text-sm text-slate-400">{day.date}</span>
            </div>
            <div className="space-y-2">
              {day.activities.map((a) => (
                <div
                  key={a.id}
                  ref={el => { activityRefs.current[a.id] = el; }}
                  className={`rounded bg-slate-800 px-3 py-2 text-sm ${selectedActivityId===a.id ? 'border border-indigo-400 shadow-sm font-semibold' : ''}`}
                >
                  <span>{a.label.charAt(0).toUpperCase() + a.label.slice(1)}: </span>
                  <span>{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 mb-6">
        <h4 className="font-bold text-white mb-1 text-lg">Packlista</h4>
        <ul className="list-disc ml-6">
          {plan.packingList?.map((item) => (
            <li key={item} className="text-slate-200 mb-1 text-base">{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8 mb-10">
        <h4 className="font-bold text-white mb-1 text-lg">Tips</h4>
        <ul className="list-disc ml-6">
          {plan.tips?.map((item) => (
            <li key={item} className="text-slate-200 mb-1 text-base">{item}</li>
          ))}
        </ul>
      </div>
      <div className="my-6 text-center">
        <Link to="/" className="text-indigo-300 underline hover:text-indigo-400">Till startsidan</Link>
      </div>
    </main>
  );
}



