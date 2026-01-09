import { useState, useEffect, useRef } from 'react'
import SharedTripPage from './SharedTripPage'
import PrintTripPage from './PrintTripPage'
import RemoteResultsPage from './RemoteResultsPage'
import type { FormEvent } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { generateTravelPlan } from './services/api'
import type { TravelFormData } from './types/forms'
import LoginForm from './LoginForm';
import SettingsPage from './SettingsPage';
import ChangePasswordPage from './ChangePasswordPage';
import DeleteAccountPage from './DeleteAccountPage';
import NotificationsPage from './NotificationsPage';
import "leaflet/dist/leaflet.css";
import MapView from './MapView';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Planner', to: '/planner' },
  { label: 'Results', to: '/planner/results' },
]

type MenuProps = { loggedIn: boolean, navigate: (to: string) => void };
function Menu({ loggedIn, navigate }: MenuProps) {
  const [open, setOpen] = useState(false);
  // Close menu on navigation
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [open]);
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="p-2 rounded hover:bg-slate-800" aria-label="User menu">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-slate-200">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-white/10 bg-slate-900 shadow-2xl text-left">
          {loggedIn ? (
            <>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-800" onClick={() => { setOpen(false); navigate('/profile'); }}>Profile</button>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-800" onClick={() => { setOpen(false); navigate('/settings'); }}>Settings</button>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-800" onClick={() => { localStorage.removeItem('loggedInAccount'); setOpen(false); navigate('/'); window.dispatchEvent(new Event('login-status')); }}>Logout</button>
            </>
          ) : (
            <>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-800" onClick={() => { setOpen(false); navigate('/login'); }}>Login</button>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-800" onClick={() => { setOpen(false); navigate('/settings'); }}>Settings</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

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
  {/* Hamburger Menu */}
  <div className="flex items-center gap-1">
    <span className="text-slate-200 text-sm font-semibold mr-1 sm:inline hidden">Menu</span>
    <span className="text-slate-200 text-sm font-semibold mr-1 inline sm:hidden">Menu</span>
    <Menu loggedIn={loggedIn} navigate={navigate}/>
  </div>
</div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80 px-4 py-8 text-sm text-slate-400">
      <div className="mx-auto flex max-w-4xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 text-slate-400 text-sm font-medium">
          <span>Flygelgatan 4</span>
          <span>073*******</span>
          <span>Antebrinken@live.se</span>
        </div>

        {/* Socials (center) */}
        <div className="flex flex-row justify-center gap-6 py-2">
          {/* Instagram */}
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" title="Instagram" className="hover:scale-110 transition">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#E4405F"/>
              <path d="M7.75 6C6.50736 6 5.5 7.00736 5.5 8.25V15.75C5.5 16.9926 6.50736 18 7.75 18H16.25C17.4926 18 18.5 16.9926 18.5 15.75V8.25C18.5 7.00736 17.4926 6 16.25 6H7.75ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9ZM17 8C17.2761 8 17.5 8.22386 17.5 8.5C17.5 8.77614 17.2761 9 17 9C16.7239 9 16.5 8.77614 16.5 8.5C16.5 8.22386 16.7239 8 17 8ZM12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25Z" fill="white"/>
            </svg>
          </a>

          {/* Github */}
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" title="Github" className="hover:scale-110 transition">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#181717"/>
              <path d="M12 6C8.686 6 6 8.686 6 12c0 2.654 1.721 4.904 4.106 5.699.3.056.41-.13.41-.288 0-.142-.005-.518-.008-1.017-1.671.363-2.023-.807-2.023-.807-.273-.694-.668-.879-.668-.879-.545-.372.041-.365.041-.365.602.043.919.62.919.62.536.92 1.407.654 1.75.501.054-.388.21-.654.382-.805-1.334-.15-2.737-.667-2.737-2.97 0-.656.234-1.192.619-1.612-.063-.151-.269-.76.059-1.584 0 0 .504-.162 1.653.617a5.753 5.753 0 0 1 1.506-.203c.51.002 1.025.069 1.506.203 1.149-.779 1.652-.617 1.652-.617.329.824.123 1.433.06 1.584.386.42.618.956.618 1.612 0 2.308-1.406 2.818-2.744 2.965.216.187.409.555.409 1.119 0 .808-.007 1.459-.007 1.658 0 .159.108.346.413.287C16.281 16.902 18 14.652 18 12c0-3.314-2.686-6-6-6z" fill="white"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:scale-110 transition">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#0077B5"/>
              <path d="M8.672 17H6.208V10.48h2.464V17zM7.44 9.472c-.777 0-1.256-.52-1.256-1.168 0-.657.488-1.166 1.28-1.166.793 0 1.257.51 1.265 1.167 0 .648-.472 1.167-1.28 1.167zm7.545 7.528h-2.464v-3.07c0-.771-.276-1.297-.968-1.297-.528 0-.842.355-.981.697-.051.123-.064.295-.064.467V17h-2.463c.032-5.545 0-6.52 0-6.52h2.464v.888c.327-.505.91-1.224 2.217-1.224 1.617 0 2.834 1.057 2.834 3.326V17z" fill="white"/>
            </svg>
          </a>
        </div>

        <div className="flex flex-col gap-2 items-end sm:items-end text-slate-400 text-sm font-medium text-right">
          <Link className="hover:text-white" to="/planner">
            Planner
          </Link>
          <a className="hover:text-white" href="mailto:hello@example.com">
            Support
          </a>
          <span className="text-slate-500">© {new Date().getFullYear()} Travel Planner</span>
        </div>
      </div>
    </footer>
  )
}


function HomePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-32 sm:py-40 text-center">
      <h1 className="text-4xl font-bold leading-tight text-white mb-6 sm:text-5xl">
        Plan Your Dream Trip &mdash; Effortlessly
      </h1>
      <p className="text-lg text-slate-300 mb-8 max-w-xl">
        This app helps you save both <b>time</b> and <b>money</b> while getting the trip of a lifetime 
        together with your loved ones. Discover how seamless travel planning can be&mdash;one click, and you’ll have a customized adventure with zero headaches, less cost, and amazing memories.
      </p>
      <Link
        to="/planner"
        className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
      >
        Start planning your trip
      </Link>
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
                Destination <span className="text-xs text-slate-400"></span>
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
                Budget <span className="text-xs text-slate-400"></span>
              </label>
              <select
                id="budget"
                name="budget"
                className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                defaultValue="mid"
              >
                <option value="0-5000">0–5 000 SEK</option>
                <option value="5000-15000">5 000–15 000 SEK</option>
                <option value="15000-30000">15 000–30 000 SEK</option>
                <option value="30000plus">30 000+ SEK</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white" htmlFor="startDate">
                Start date <span className="text-xs text-slate-400">yyyy-mm-dd</span>
              </label>
<input
   id="startDate"
   name="startDate"
   type="text"
   placeholder="yyyy-mm-dd"
   pattern="\\d{4}-\\d{2}-\\d{2}"
   title="Enter date in yyyy-mm-dd format"
   className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
   required
 />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white" htmlFor="endDate">
                End date <span className="text-xs text-slate-400">yyyy-mm-dd</span>
              </label>
<input
   id="endDate"
   name="endDate"
   type="text"
   placeholder="yyyy-mm-dd"
   pattern="\\d{4}-\\d{2}-\\d{2}"
   title="Enter date in yyyy-mm-dd format"
   className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
   required
 />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <p className="text-sm font-semibold text-white">
                Interests <span className="text-xs text-slate-400"></span>
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
                <span className="text-xs text-slate-400"></span>
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
  budget: '5000-15000',
  interests: ['food', 'museums', 'outdoors'],
  travelers: 'Couple',
  days: [
    {
      date: '2025-04-12',
      activities: [
        { id: '1', label: 'morning', text: 'Arrive, drop bags at hotel, coffee near Nishiki Market.', source: 'ai', placeQuery: 'Nishiki Market, Kyoto' },
        { id: '2', label: 'afternoon', text: 'Explore Nishiki Market and sample local street food.', source: 'ai', placeQuery: 'Nishiki Market, Kyoto' },
        { id: '3', label: 'evening', text: 'Gion district stroll and dinner at a teahouse.', source: 'ai', placeQuery: 'Gion, Kyoto' }
      ]
    },
    {
      date: '2025-04-12',
      activities: [
        { id: '4', label: 'morning', text: 'Visit Fushimi Inari early to beat crowds.', source: 'ai', placeQuery: 'Fushimi Inari Taisha, Kyoto' },
        { id: '5', label: 'afternoon', text: 'Cycle along Kamo River and stop at local cafés.', source: 'ai', placeQuery: 'Kamo River, Kyoto' },
        { id: '6', label: 'evening', text: 'Pontocho alley yakitori and river views.', source: 'ai', placeQuery: 'Pontocho, Kyoto' }
      ]
    },
    {
      date: '2025-04-12',
      activities: [
        { id: '7', label: 'morning', text: 'Philosopher’s Path walk and temples.', source: 'ai', placeQuery: 'Philosopher’s Path, Kyoto' },
        { id: '8', label: 'afternoon', text: 'Arashiyama bamboo grove + Tenryuji gardens.', source: 'ai', placeQuery: 'Arashiyama Bamboo Grove, Kyoto' },
        { id: '9', label: 'evening', text: 'Onsen and relaxed izakaya dinner.', source: 'ai' }
      ]
    },
    {
      date: '2025-04-12',
      activities: [
        { id: '10', label: 'morning', text: 'Souvenir stop; pack.', source: 'ai' },
        { id: '11', label: 'afternoon', text: 'Check-out and head to Kansai Airport.', source: 'ai', placeQuery: 'Kansai Airport' },
        { id: '12', label: 'evening', text: 'Flight home.', source: 'ai' }
      ]
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
  const [trips, setTrips] = useState<TravelPlan[]>(() => {
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
    <div className="font-semibold text-lg">
      {t.tripName
  ? <>{t.tripName}{t.destination ? <span className="text-xs text-slate-400"> ({t.destination})</span> : null}</>
  : t.destination
}
    </div>
    <div className="text-sm text-slate-300">
      {[t.startDate, t.endDate].filter(Boolean).join(' → ')}{(t.startDate || t.endDate) && t.budget ? ' | ' : ''}{t.budget}
    </div>
    <div className="text-xs text-slate-400">{(t.interests || []).join(', ')}</div>
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => navigate('/planner/results', { state: { plan: t } })}
        className="rounded bg-indigo-500 px-3 py-1 text-white hover:bg-indigo-600 text-xs">
        Load this trip
      </button>
      <button
        onClick={() => {
          const confirmDelete = window.confirm('Delete this trip?');
          if (!confirmDelete) return;
          const newTrips = trips.filter((_, j) => i !== j);
          setTrips(newTrips);
          localStorage.setItem('savedTrips', JSON.stringify(newTrips));
        }}
        className="rounded bg-rose-600 px-3 py-1 text-white hover:bg-rose-700 text-xs">
        Delete
      </button>
      <button
        onClick={() => {
          const newName = prompt('Ge resan ett nytt namn:', t.tripName || t.destination);
          if (typeof newName === 'string' && newName.trim().length > 0) {
            const updatedTrips = trips.map((trip, idx) => idx === i ? { ...trip, tripName: newName.trim() } : trip);
            setTrips(updatedTrips);
            localStorage.setItem('savedTrips', JSON.stringify(updatedTrips));
          }
        }}
        className="rounded bg-yellow-600 px-3 py-1 text-white hover:bg-yellow-700 text-xs">
        Edit name
      </button>
    </div>
  </div>
))}
    </main>
  );
}

import type { TravelPlan } from './types/travel';

function ResultsPage() {
  const location = useLocation();
  const origPlan = (location.state as { plan?: TravelPlan } | null)?.plan ?? samplePlan;
  const [plan, setPlan] = useState(origPlan);
  const planRef = useRef(plan);
  useEffect(() => { planRef.current = plan; }, [plan]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([35.0116, 135.7681]); // fallback: Kyoto
  const [editField, setEditField] = useState<null | { dayIdx: number, activityIdx: number }>(null);
  const [editValue, setEditValue] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const activityRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Center the map to the destination or first marker with lat/lng
  useEffect(() => {
    // Get all markers with lat/lng
    const allActivities = plan.days.flatMap(day => day.activities);
    const markerWithCoords = allActivities.find(a => typeof a.lat === 'number' && typeof a.lng === 'number');
    if (markerWithCoords) {
      setMapCenter([markerWithCoords.lat!, markerWithCoords.lng!]);
      return;
    }
// Fallback: just set to default coordinates
    setMapCenter([35.0116, 135.7681]); // Kyoto
  }, [plan.destination, plan.days]);


  // Save to Profile
  const saveToProfile = () => {
    const saved: TravelPlan[] = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    // Use the latest value of plan from ref to avoid race conditions
    const currentPlan = planRef.current;
    const idx = saved.findIndex(t => t.destination === currentPlan.destination && t.startDate === currentPlan.startDate && t.endDate === currentPlan.endDate);
    if (idx !== -1) {
      saved[idx] = currentPlan;
    } else {
      saved.push(currentPlan);
    }
    localStorage.setItem('savedTrips', JSON.stringify(saved));
    alert('Trip saved to your profile!');
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:py-20">
      <div className="space-y-3 mt-3 mb-5 text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3" style={{ cursor: 'pointer' }} onClick={() => setEditField(null)} title="Click to edit">
          Your Itinerary
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-300">
          Here you get a day-by-day itinerary tailored just for you. Click "Your Itinerary" to edit.
        </p>
        <button
          className="rounded-lg border border-indigo-300 bg-indigo-500 px-4 py-2 text-white mt-3 font-semibold hover:bg-indigo-600 mr-3"
          onClick={() => {
            let tripId = (plan as unknown as { _sharedId?: string })._sharedId || null;
            if (!tripId) {
              tripId = (Math.random().toString(36).slice(2,10));
              (plan as unknown as { _sharedId?: string })._sharedId = tripId;
            }
            localStorage.setItem('trip-' + tripId, JSON.stringify(plan));
            setTimeout(() => {
              window.open(`/trip/${tripId}/print`, '_blank');
            }, 100);
          }}
        >
          Export as PDF
        </button>
        <button
          className="rounded-lg border border-green-300 bg-green-500 px-4 py-2 text-white mt-3 font-semibold hover:bg-green-600 mr-3"
          onClick={saveToProfile}
        >
          Save to Profile
        </button>
      </div>

      <section id="plan-to-pdf" className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-2xl border border-white/5 bg-slate-900/60 p-6 shadow-xl shadow-indigo-500/10">
          {/* Map View for this trip */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-indigo-200">Map for your destinations</h3>
            <MapView
              center={mapCenter}
              markers={plan.days.flatMap(day => day.activities.filter(a => typeof a.lat === 'number' && typeof a.lng === 'number').map(a => ({
                id: a.id,
                position: [a.lat!, a.lng!],
                popup: <span>{a.text}</span>
              })))}
              selectedId={selectedActivityId ?? undefined}
              height="325px"
              onMarkerClick={id => {
                setSelectedActivityId(id);
                setTimeout(() => {
                  activityRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
              }}
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-white">Timeline</p>
            <div className="space-y-4">
              {plan.days.map((day, idx) => (
  <div
    key={day.date + '-' + idx}
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
      {day.activities.map((activity, activityIdx) => (
        <div
          key={activity.id}
          ref={el => { activityRefs.current[activity.id] = el; }}
          className={`rounded-lg border bg-slate-900/70 p-3 ${selectedActivityId===activity.id ? 'border-indigo-400 shadow-lg' : 'border-white/5'}`}
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">{activity.label.charAt(0).toUpperCase() + activity.label.slice(1)}</p>
          {editField && editField.dayIdx === idx && editField.activityIdx === activityIdx ? (
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
                  newDays[idx].activities[activityIdx] = { ...activity, text: editValue };
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
              className={`text-sm cursor-pointer hover:underline ${selectedActivityId===activity.id ? 'text-indigo-200 font-semibold' : 'text-slate-100'}`}
              onClick={() => { setSelectedActivityId(activity.id); setEditField({ dayIdx: idx, activityIdx }); setEditValue(activity.text); }}
            >
              {activity.text}
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
              {plan.packingList.map((item, i) => (
                <li key={item + '-' + i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-xl shadow-indigo-500/10">
            <p className="text-sm font-semibold text-white">Tips & advice</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
{plan.tips.map((tip, i) => (
              <li key={tip + '-' + i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-xl shadow-indigo-500/10">
            <p className="text-sm font-semibold text-white mb-2">Reservations</p>
            <textarea
              className="w-full min-h-[100px] rounded border border-white/10 bg-slate-900/80 p-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 resize-vertical"
              value={plan.reservationsNotepad ?? (Array.isArray(plan.reservations) ? plan.reservations.map(
                res => `${res.type ? res.type.toUpperCase() + ' – ' : ''}${res.name}${res.time ? ' kl ' + res.time : ''}${res.address ? ', ' + res.address : ''}${res.confirmation ? ', ' + res.confirmation : ''}`
              ).join("\n") : '')}
              onChange={e => {
                setPlan(prev => ({ ...prev, reservationsNotepad: e.target.value }));
                setDirty(true);
              }}
              placeholder="Note hotels, restaurant bookings, times, addresses, etc..."
            />
            <button
              className="mt-2 rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-60"
              onClick={() => {
                const saved = JSON.parse(localStorage.getItem('savedTrips') || '[]');
                const currentPlan = planRef.current;
                const idx = saved.findIndex(
                  (t: typeof currentPlan) => t.destination === currentPlan.destination && t.startDate === currentPlan.startDate && t.endDate === currentPlan.endDate
                );
                if (idx !== -1) {
                  saved[idx] = { ...currentPlan };
                } else {
                  saved.push(currentPlan);
                }
                localStorage.setItem('savedTrips', JSON.stringify(saved));
                alert('Notes saved to profile!');
                setDirty(false);
              }}
              disabled={!(dirty && planRef.current.reservationsNotepad !== undefined && planRef.current.reservationsNotepad !== (Array.isArray(planRef.current.reservations) ? planRef.current.reservations.map(res => `${res.type ? res.type.toUpperCase() + ' – ' : ''}${res.name}${res.time ? ' kl ' + res.time : ''}${res.address ? ', ' + res.address : ''}${res.confirmation ? ', ' + res.confirmation : ''}`).join("\n") : ""))}
              type="button"
            >Save notes</button>
            <p className="text-xs text-slate-500 mt-1">Free notes field for your own booking information</p>
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
        <Route path="/trip/:id/print" element={<PrintTripPage />} />
        <Route path="/trip/:id" element={<SharedTripPage />} />
        <Route path="/shared/:id" element={<RemoteResultsPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/change-password" element={<ChangePasswordPage />} />
        <Route path="/settings/delete-account" element={<DeleteAccountPage />} />
        <Route path="/settings/notifications" element={<NotificationsPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
