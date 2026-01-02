import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { TravelPlan } from "./types/travel";

export default function PrintTripPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const onceRef = useRef(false);
  const [trip, setTrip] = useState<TravelPlan | null>(null);

  useEffect(() => {
    if (id) {
      const data = localStorage.getItem("trip-" + id);
      if (data) {
        setTrip(JSON.parse(data));
      }
    }
  }, [id]);

  // Auto-print when trip loaded
  useEffect(() => {
    if (trip && !onceRef.current) {
      onceRef.current = true;
      setTimeout(() => window.print(), 400);
    }
    // eslint-disable-next-line
  }, [trip]);

  if (!trip) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <h2>Ingen resplan hittad</h2>
        <button onClick={() => navigate("/")}>Till startsidan</button>
      </div>
    );
  }

  return (
    <div className="print-bg px-5 py-10 max-w-2xl mx-auto print:max-w-full" style={{fontFamily:'inherit'}}>
      {/* Title block */}
      <div className="mb-6 text-center print:mb-4">
        <h1 className="text-3xl font-bold mb-2">{trip.destination}</h1>
        <div className="text-lg text-slate-600 print:text-black">
          {trip.startDate} - {trip.endDate}
        </div>
      </div>
      {/* One day per block */}
      {trip.days.map(day => (
        <section key={day.date} className="mb-5 print:mb-3">
          <h2 className="text-xl font-semibold mb-1 print:mb-0">{day.date}</h2>
          <ol className="pl-2 mb-2 print:mb-1">
            {day.activities.map(act => (
              <li key={act.id} className="mb-1 text-base print:text-sm">
                <span style={{fontWeight:600}}>{act.label.charAt(0).toUpperCase()+act.label.slice(1)}:</span> <span>{act.text}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}
      {/* Packing list */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-1">Packlista</h3>
        <ul className="list-disc ml-5 text-base print:text-sm">
          {trip.packingList.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      {/* Tips */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-1">Tips</h3>
        <ul className="list-disc ml-5 text-base print:text-sm">
          {trip.tips.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8 text-sm text-slate-500 print:text-black italic">
        ✓ Spara eller skriv ut denna PDF. Karta och fler funktioner finns i appen.
      </div>
      <style>{`
        @media print {
          html, body { background: white !important; }
          .print-bg { background: white !important; box-shadow:none !important; color:#000 !important; }
          * { color-adjust: exact !important; -webkit-print-color-adjust:exact !important; }
          button, .noprint, .share, .download, .map { display: none !important; }
        }
      `}</style>
    </div>
  );
}

