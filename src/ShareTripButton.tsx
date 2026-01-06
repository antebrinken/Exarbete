import { useState } from "react";

function uuidv4() {
  // simple random uuid (for demo)
  return "xxxxxxxx".replace(/x/g, () => ((Math.random() * 36) | 0).toString(36));
}

export default function ShareTripButton({ plan }: { plan: any }) {
  const [sharedId, setSharedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleShare() {
    let tripId = plan.sharedId || plan._id || null;
    if (!tripId) {
      tripId = uuidv4();
      plan.sharedId = tripId;
    }
    localStorage.setItem("trip-" + tripId, JSON.stringify(plan));
    setSharedId(tripId);
    // copy link
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/trip/' + tripId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <>
      <button
        className="rounded-lg border border-purple-300 bg-purple-600 px-4 py-2 text-white font-semibold hover:bg-purple-500"
        onClick={handleShare}
        type="button"
      >
        Dela resa
      </button>
      {sharedId && (
        <div className="mt-2 flex flex-col items-center">
          <input
            className="w-[290px] text-xs bg-slate-950 border border-purple-500 rounded mb-1 text-center text-purple-200 px-2 py-1"
            readOnly
            value={window.location.origin + "/trip/" + sharedId}
            onFocus={e => e.currentTarget.select()}
          />
          <span className="text-xs text-purple-300">{copied ? 'Länk kopierad!' : 'Kopiera och dela länken till den här resan.'}</span>
        </div>
      )}
    </>
  );
}


