import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { generateTravelPlan } from './services/api'
import type { TravelFormData } from './types/forms'
import type { TravelPlan } from './types/travel'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Planner', to: '/planner' },
  { label: 'Results', to: '/planner/results' },
]

function Header() {
  return (
    <header className="border-b border-white/5 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-base font-semibold">
            FP
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/80">
              Frontpage
            </p>
            <p className="text-sm text-slate-200/90">A clean Tailwind starter</p>
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
          <button className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:text-white">
            Log in
          </button>
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

function ResultsPage() {
  const location = useLocation()
  const plan = (location.state as { plan?: TravelPlan } | null)?.plan ?? samplePlan

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:py-20">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200/80">
          AI travel plan
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Your itinerary overview</h1>
        <p className="max-w-2xl text-slate-300">
          Timeline of days, activities, packing list, and tips. Replace this sample with real AI output when ready.
        </p>
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
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
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-lg border border-white/5 bg-slate-900/70 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Morning</p>
                      <p className="text-sm text-slate-100">{day.morning}</p>
                    </div>
                    <div className="rounded-lg border border-white/5 bg-slate-900/70 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Afternoon</p>
                      <p className="text-sm text-slate-100">{day.afternoon}</p>
                    </div>
                    <div className="rounded-lg border border-white/5 bg-slate-900/70 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Evening</p>
                      <p className="text-sm text-slate-100">{day.evening}</p>
                    </div>
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
      </Routes>
      <Footer />
    </div>
  )
}

export default App
