import { useState } from "react";

export default function ShareRemoteButton({ plan }: { plan: any }) {
  const [sharedId, setSharedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  async function handleShare() {
    setLoading(true);
    setErr(null);
    try {
      const resp = await fetch("/api/shared-trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan),
      });
      if (!resp.ok) throw new Error("Serverfel/kunde inte dela");
      const data = await resp.json();
      setSharedId(data.shareId);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.origin + "/shared/" + data.shareId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e:any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inline-block ml-2 align-top">
      <button
        className="rounded-lg border border-fuchsia-400 bg-fuchsia-600 px-4 py-2 text-white font-semibold hover:bg-fuchsia-500"
        onClick={handleShare}
        type="button"
        disabled={loading}
      >
        {loading ? 'Skapar länk...' : 'Skapa delbar länk'}
      </button>
      {err && <div className="mt-1 text-xs text-rose-400">{err}</div>}
      {sharedId && (
        <div className="mt-2 flex flex-col items-center">
          <input
            className="w-[290px] text-xs bg-slate-950 border border-fuchsia-400 rounded mb-1 text-center text-fuchsia-200 px-2 py-1"
            readOnly
            value={window.location.origin + "/shared/" + sharedId}
            onFocus={e => e.currentTarget.select()}
          />
          <span className="text-xs text-fuchsia-300">{copied ? 'Länk kopierad!' : 'Kopiera och dela länken till den här resan.'}</span>
        </div>
      )}
    </div>
  );
}



