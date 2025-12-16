import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { generateTravelPlan } from './services/api'
import type { TravelFormData } from './types/forms'
import type { TravelPlan } from './types/travel'
import LoginForm from './LoginForm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Planner', to: '/planner' },
  { label: 'Results', to: '/planner/results' },
]

function Header() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    function checkLogin() {
      setLoggedIn(!!localStorage.getItem('loggedInAccount'));
    }
    checkLogin();
    window.addEventListener('storage', checkLogin);
    // Allow updating state on page events as well:
    window.addEventListener('login-status', checkLogin);
    return () => {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('login-status', checkLogin);
    };
  }, []);

  return (
    <header className="border-b border-white/5 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-base font-semibold">
            TP
          </div>
          <div>
            <p className="text-lg font-bold text-indigo-200/80">
              Travel Planner
            </p>
            <p className="text-sm text-slate-200/90">Plan, edit and keep your journeys.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 sm:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'transition hover:text-white',
                  isActive ? 'text-white' : 'text-slate-200',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {loggedIn ? (
            <button
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:text-white"
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>
          ) : (
            <button
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:text-white"
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
          )}
          <Link
            to="/planner"
            className="rounded-lg bg-indigo-500 px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
          >
            Plan a trip
          </Link>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80 px-4 py-8 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-slate-200">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-semibold">
            FP
          </span>
          <div>
            <p className="font-semibold text-white">Frontpage</p>
            <p className="text-xs text-slate-400">Built with Tailwind CSS</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="hover:text-white" to="/planner">
            Planner
          </Link>
          <a className="hover:text-white" href="mailto:hello@example.com">
            Support
          </a>
          <span className="text-slate-500">© {new Date().getFullYear()} Frontpage</span>
        </div>
      </div>
    </footer>
  )
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-3xl bg-indigo-500/20 blur-3xl" />
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-indigo-500/20 backdrop-blur">
        <div className="border-b border-white/5 bg-slate-900/90 px-6 py-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span className="ml-2 text-slate-200">Preview</span>
          </div>
        </div>
        <div className="space-y-4 px-6 py-6">
          <div className="rounded-xl border border-white/5 bg-slate-900/80 p-4">
            <p className="text-sm font-semibold text-white">Header</p>
            <p className="text-xs text-slate-400">
              Sticky top bar with nav, CTA, and branding.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-slate-900/80 p-4">
            <p className="text-sm font-semibold text-white">Hero</p>
            <p className="text-xs text-slate-400">
              Responsive grid with headline, body, and action buttons.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-slate-900/80 p-4">
            <p className="text-sm font-semibold text-white">Footer</p>
            <p className="text-xs text-slate-400">
              Links and meta info with muted contrast.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:py-24">
      <section className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100 ring-1 ring-white/10">
            New
            <span className="text-white">Tailwind frontpage template</span>
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Build your next landing page faster with Tailwind CSS.
            </h1>
            <p className="text-lg text-slate-300">
              Pre-styled sections, responsive layout, and a clean starting point so you
              can focus on your product—not boilerplate.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/planner"
              className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              Try the planner
            </Link>
            <button className="rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/5">
              View demo
            </button>
            <p className="text-xs text-slate-400">No credit card required.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Live updates
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
              TypeScript ready
            </div>
          </div>
        </div>
        <HeroPreview />
      </section>

      <section
        id="features"
        className="grid gap-6 rounded-2xl border border-white/5 bg-slate-900/60 p-8 shadow-xl shadow-indigo-500/10 md:grid-cols-3"
      >
        {['Responsive by default', 'Utility-first workflow', 'Accessible components'].map(
          (feature, idx) => (
            <article
              key={feature}
              className="space-y-3 rounded-xl border border-white/5 bg-slate-900/70 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-sm font-semibold text-indigo-100">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-semibold">{feature}</h3>
              <p className="text-sm text-slate-300">
                Ship polished UI faster using Tailwind utilities and sensible defaults tuned
                for modern products.
              </p>
            </article>
          ),
        )}
      </section>
    </main>
  )
}

function PlannerPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    const interests = form.getAll('interests').map(String)

    const payload: TravelFormData = {
      destination: String(form.get('destination') ?? ''),
      startDate: String(form.get('startDate') ?? ''),
      endDate: String(form.get('endDate') ?? ''),
      budget: (form.get('budget') as TravelFormData['budget']) ?? 'mid',
      interests,
      travelers: form.get('travelers') ? String(form.get('travelers')) : undefined,
    }

    try {
      setLoading(true)
      setError(null)
      const plan = await generateTravelPlan(payload)
      navigate('/planner/results', { state: { plan } })
    } catch (err) {
      // Optionally log for debugging; keep user-facing message concise.
      console.error(err)
      setError('Något gick fel när resplanen skulle genereras. Försök igen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:py-20">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200/80">
          Travel planner
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Plan your next trip</h1>
        <p className="max-w-2xl text-slate-300">
          Capture destination, dates, budget, interests, and travel company details to
          generate a personalized itinerary.
        </p>
      </div>

      <section className="grid gap-8 rounded-2xl border border-white/5 bg-slate-900/60 p-8 shadow-xl shadow-indigo-500/10 md:grid-cols-[1.2fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white" htmlFor="destination">
                Destination <span className="text-xs text-slate-400">(text)</span>
              </label>
              <input
                id="destination"
                name="destination"
                type="text"
                placeholder="e.g. Kyoto, Japan"
                className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white" htmlFor="budget">
                Budget <span className="text-xs text-slate-400">(select)</span>
              </label>
              <select
                id="budget"
                name="budget"
                className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                defaultValue="mid"
              >
                <option value="shoestring">Shoestring</option>
                <option value="mid">Mid-range</option>
                <option value="premium">Premium</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white" htmlFor="startDate">
                Start date <span className="text-xs text-slate-400">(date)</span>
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white" htmlFor="endDate">
                End date <span className="text-xs text-slate-400">(date)</span>
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <p className="text-sm font-semibold text-white">
                Interests <span className="text-xs text-slate-400">(checkbox)</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {['Food', 'Museums', 'Outdoors', 'Nightlife', 'Beaches', 'Shopping'].map(
                  (interest) => (
                    <label
                      key={interest}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 hover:border-indigo-400/60"
                    >
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest.toLowerCase()}
                        className="h-4 w-4 rounded border-white/30 bg-slate-900/80 text-indigo-500 focus:ring-2 focus:ring-indigo-400/50"
                      />
                      {interest}
                    </label>
                  ),
                )}
              </div>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-white" htmlFor="travelers">
                Travel company / how many people{' '}
                <span className="text-xs text-slate-400">(optional)</span>
              </label>
              <input
                id="travelers"
                name="travelers"
                type="text"
                placeholder="Solo, couple, family of 4, team of 10..."
                className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              />
            </div>
          </div>
          {error ? (
            <p className="text-sm font-semibold text-rose-300">{error}</p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Genererar...' : 'Plan trip'}
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/5 disabled:opacity-60"
              disabled={loading}
            >
              Save draft
            </button>
            <p className="text-xs text-slate-400">You can edit details later.</p>
          </div>
        </form>

        <div className="space-y-4 rounded-2xl border border-white/5 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-sm font-semibold text-indigo-100">
              AI
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200/80">
                Preview
              </p>
              <p className="text-sm text-slate-300">
                Your itinerary will summarize travel details here.
              </p>
            </div>
          </div>
          <div className="space-y-3 rounded-xl border border-white/5 bg-slate-900/80 p-4">
            <p className="text-sm font-semibold text-white">Highlights</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Smart suggestions match your budget and dates.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Interest-based recommendations for food, culture, and more.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                Share or export plans for your travel companions.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

const samplePlan: TravelPlan = {
  destination: 'Kyoto, Japan',
  startDate: '2025-04-12',
  endDate: '2025-04-15',
  budget: 'mid',
  interests: ['food', 'museums', 'outdoors'],
  travelers: 'Couple',
  days: [
    {
      date: '2025-04-12',
      morning: 'Arrive, drop bags at hotel, coffee near Nishiki Market.',
      afternoon: 'Explore Nishiki Market and sample local street food.',
      evening: 'Gion district stroll and dinner at a teahouse.',
    },
    {
      date: '2025-04-13',
      morning: 'Visit Fushimi Inari early to beat crowds.',
      afternoon: 'Cycle along Kamo River and stop at local cafés.',
      evening: 'Pontocho alley yakitori and river views.',
    },
    {
      date: '2025-04-14',
      morning: 'Philosopher’s Path walk and temples.',
      afternoon: 'Arashiyama bamboo grove + Tenryuji gardens.',
      evening: 'Onsen and relaxed izakaya dinner.',
    },
    {
      date: '2025-04-15',
      morning: 'Souvenir stop; pack.',
      afternoon: 'Check-out and head to Kansai Airport.',
      evening: 'Flight home.',
    },
  ],
  packingList: [
    'Passport + copies',
    'Universal travel adapter',
    'Comfortable walking shoes',
    'Light rain jacket',
    'Portable battery pack',
  ],
  tips: [
    'Reserve popular restaurants 1–2 weeks ahead.',
    'Use IC card (Suica/PASMO) for trains and convenience stores.',
    'Carry some cash; smaller shops may be cash-only.',
  ],
  reservations: [
    { type: 'hotel', name: 'Machiya Stay', address: 'Central Kyoto' },
    { type: 'restaurant', name: 'Pontocho yakitori', time: '19:30' },
  ],
  transportNotes: ['JR pass not needed inside Kyoto; use IC card.', 'Consider day passes for buses if staying central.'],
  safetyNotes: ['Keep passport secure; most areas are safe, but stay aware in busy spots.'],
}

function ProfilePage() {
  const [trips] = useState<TravelPlan[]>(() => {
    const saved = localStorage.getItem('savedTrips');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch { /* Ignore */ }
    }
    return [];
  });
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h2 className="text-2xl font-bold mb-4">Your Saved Trips</h2>
      {trips.length === 0 && <p className="text-slate-400">No saved trips yet.</p>}
      {trips.map((t, i) => (
        <div key={i} className="mb-6 rounded border border-indigo-100 bg-slate-900/60 p-4">
          <div className="font-semibold text-lg">{t.destination}</div>
          <div className="text-sm text-slate-300">
            {t.startDate} → {t.endDate} | {t.budget}
          </div>
          <div className="text-xs text-slate-400">{(t.interests || []).join(', ')}</div>
          <button
            onClick={() => navigate('/planner/results', { state: { plan: t } })}
            className="mt-2 rounded bg-indigo-500 px-3 py-1 text-white hover:bg-indigo-600 text-xs">
            Load this trip
          </button>
        </div>
      ))}
    </main>
  );
}

function ResultsPage() {
  const location = useLocation()
  const origPlan = (location.state as { plan?: TravelPlan } | null)?.plan ?? samplePlan;
  const [plan, setPlan] = useState(origPlan);
const [editField, setEditField] = useState<string | { dayIdx: number, part: 'morning' | 'afternoon' | 'evening' } | null>(null);
const [editValue, setEditValue] = useState('');
const [regenerating, setRegenerating] = useState(false);
const [dirty, setDirty] = useState(false);

  // PDF Export
  const downloadPDF = async () => {
    const input = document.getElementById('plan-to-pdf')
    if (!input) return
    const canvas = await html2canvas(input, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
    const width = pdf.internal.pageSize.getWidth()
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save(`${plan.destination}-Trip.pdf`)
  }

  // Save to Profile
  const saveToProfile = () => {
    const saved: TravelPlan[] = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    saved.push(plan);
    localStorage.setItem('savedTrips', JSON.stringify(saved));
    alert('Trip saved to your profile!');
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:py-20">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold sm:text-4xl" onClick={() => setEditField('header')} title="Click to edit" style={{ cursor: 'pointer', textDecoration: 'underline dotted' }}>Results</h1>
        <p className="max-w-2xl text-slate-300">
          Results of the planned trips
        </p>
        {editField === 'header' ? (
          <div className="space-y-2 bg-slate-800 p-3 rounded">
            <label className="block mb-1 text-white">Destination
              <input value={plan.destination} onChange={e => setPlan({ ...plan, destination: e.target.value })} className="mb-1 w-full rounded px-2 py-1" />
            </label>
            <label className="block mb-1 text-white">Budget
              <select value={plan.budget} onChange={e => setPlan({ ...plan, budget: e.target.value as typeof plan.budget })} className="mb-1 w-full rounded px-2 py-1">
                {(['shoestring', 'mid', 'premium', 'luxury'] as const).map(b => <option key={b}>{b}</option>)}
              </select>
            </label>
            <label className="block mb-1 text-white">Interests
              <input value={plan.interests.join(', ')} onChange={e => setPlan({ ...plan, interests: e.target.value.split(/,\s*/) })} className="mb-1 w-full rounded px-2 py-1" />
            </label>
            <label className="block mb-1 text-white">Travelers
              <input value={plan.travelers ?? ''} onChange={e => setPlan({ ...plan, travelers: e.target.value })} className="mb-1 w-full rounded px-2 py-1" />
            </label>
            <button type="button" className="bg-green-500 text-white px-3 py-1 rounded mr-2" onClick={() => { setEditField(null); setDirty(true); }}>Save</button>
            <button type="button" className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setEditField(null)}>Cancel</button>
          </div>
        ) : (
          <h1 className="text-3xl font-bold sm:text-4xl" onClick={() => setEditField('header')} title="Click to edit" style={{ cursor: 'pointer', textDecoration: 'underline dotted' }}>Your itinerary overview</h1>
        )}
        <button
          className="rounded-lg border border-indigo-300 bg-indigo-500 px-4 py-2 text-white mt-3 font-semibold hover:bg-indigo-600 mr-3"
          onClick={downloadPDF}
        >
          Save as PDF
        </button>
        <button
          className="rounded-lg border border-green-300 bg-green-500 px-4 py-2 text-white mt-3 font-semibold hover:bg-green-600"
          onClick={saveToProfile}
        >
          Save to Profile
        </button>
      </div>

      {dirty && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mb-6 hover:bg-green-700"
          onClick={() => {
            // save edited plan to localStorage and show notification
            const saved: TravelPlan[] = JSON.parse(localStorage.getItem('savedTrips') || '[]');
            const idx = saved.findIndex(t => t.destination === plan.destination && t.startDate === plan.startDate && t.endDate === plan.endDate);
            if(idx !== -1){
              saved[idx] = plan;
            } else {
              saved.push(plan);
            }
            localStorage.setItem('savedTrips', JSON.stringify(saved));
            setDirty(false);
            alert('Changes saved to profile!');
          }}
        >
          Save changes to profile
        </button>
      )}
      <section id="plan-to-pdf" className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-2xl border border-white/5 bg-slate-900/60 p-6 shadow-xl shadow-indigo-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Destination</p>
              <p className="text-xl font-semibold text-white">{plan.destination}</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-indigo-100">
              {plan.budget} budget
            </div>
          </div>
          <p className="text-sm text-slate-300">
            {plan.startDate} → {plan.endDate} · {plan.travelers}
          </p>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-white">Timeline</p>
            <div className="space-y-4">
              {plan.days.map((day, idx) => (
  <div
    key={day.date}
    className="grid gap-3 rounded-xl border border-white/5 bg-slate-900/80 p-4 sm:grid-cols-[auto,1fr]"
  >
    <div className="flex gap-2 sm:flex-col sm:items-start">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-sm font-semibold text-indigo-100">
        D{idx + 1}
      </span>
      <p className="text-xs font-semibold text-slate-300">{day.date}</p>
      {/* Remove unused Edit button */}
      <button disabled={regenerating} onClick={async () => {
        setRegenerating(true);
        try {
          // Prepare formData for just this day
          const tripParams = {
            destination: plan.destination,
            startDate: day.date,
            endDate: day.date,
            budget: plan.budget,
            interests: plan.interests,
            travelers: plan.travelers,
          };
          const { regenerateDay } = await import('./services/api');
          const regenerated = await regenerateDay(tripParams);
          const newDays = [...plan.days];
          newDays[idx] = regenerated;
          setPlan({ ...plan, days: newDays });
        } finally {
          setRegenerating(false);
        }
      }} className="ml-2 text-xs bg-blue-100 px-2 py-0.5 rounded text-blue-800">{regenerating ? 'Regenerating...' : 'Regenerate'}</button>
    </div>
    <div className="space-y-2">
      {(['morning','afternoon','evening'] as const).map(part => (
        <div key={part} className="rounded-lg border border-white/5 bg-slate-900/70 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">{part.charAt(0).toUpperCase() + part.slice(1)}</p>
          {editField && typeof editField === 'object' && editField.dayIdx === idx && editField.part === part ? (
            <>
              <textarea
                className="text-sm text-slate-900 bg-white rounded px-2 py-1 w-full"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                autoFocus
              />
              <button className="text-xs mr-2 mt-1 bg-green-200 text-green-900 rounded px-2 py-0.5"
                onClick={() => {
                  const newDays = [...plan.days];
                  newDays[idx] = { ...newDays[idx], [part]: editValue };
                  setPlan({ ...plan, days: newDays });
                  setEditField(null);
                  setDirty(true);
                }}>
                Save
              </button>
              <button className="text-xs mt-1 bg-red-200 text-red-900 rounded px-2 py-0.5"
                onClick={() => { setEditField(null); setEditValue(''); }}>
                Cancel
              </button>
            </>
          ) : (
            <p
              className="text-sm text-slate-100 cursor-pointer hover:underline"
              onClick={() => { setEditField({dayIdx: idx, part}); setEditValue(day[part]); }}>
              {day[part]}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-xl shadow-indigo-500/10">
            <p className="text-sm font-semibold text-white">Packing list</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {plan.packingList.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-xl shadow-indigo-500/10">
            <p className="text-sm font-semibold text-white">Tips & advice</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {plan.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-xl shadow-indigo-500/10">
            <p className="text-sm font-semibold text-white">Reservations</p>
            <ul className="mt-3 space-y-3 text-sm text-slate-300">
              {(plan.reservations ?? []).map((res, idx) => (
                <li
                  key={`${res.name}-${idx}`}
                  className="rounded-lg border border-white/5 bg-slate-900/80 p-3"
                >
                  <p className="font-semibold text-white">
                    {res.type.toUpperCase()} · {res.name}
                  </p>
                  {res.time ? <p className="text-xs text-slate-400">Time: {res.time}</p> : null}
                  {res.address ? (
                    <p className="text-xs text-slate-400">Address: {res.address}</p>
                  ) : null}
                  {res.confirmation ? (
                    <p className="text-xs text-slate-400">Confirmation: {res.confirmation}</p>
                  ) : null}
                </li>
              ))}
              {plan.reservations?.length ? null : (
                <li className="text-xs text-slate-500">No reservations yet.</li>
              )}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-xl shadow-indigo-500/10">
            <p className="text-sm font-semibold text-white">Notes</p>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Transport
                </p>
                <ul className="mt-2 space-y-1">
                  {(plan.transportNotes ?? []).map((note) => (
                    <li key={note} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Safety
                </p>
                <ul className="mt-2 space-y-1">
                  {(plan.safetyNotes ?? []).map((note) => (
                    <li key={note} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_45%),radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.12),transparent_35%),radial-gradient(circle_at_80%_0,rgba(236,72,153,0.1),transparent_35%)]" />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/planner/results" element={<ResultsPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
