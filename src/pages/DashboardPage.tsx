import { Link } from 'react-router-dom'
import {
  Search,
  Calculator,
  GitCompareArrows,
  MessageCircle,
  TrendingUp,
  LifeBuoy,
  ArrowRight,
} from 'lucide-react'
import { schemes } from '@/data/schemes'
import { dashboardQuestions } from '@/data/suggested-questions'
import { formatPercent } from '@/lib/utils'

const quickActions = [
  { icon: Search, label: 'Find the right scheme', to: '/compare', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { icon: Calculator, label: 'Calculate returns', to: '/calculators', color: 'bg-sage/10 text-sage dark:text-sage-light' },
  { icon: GitCompareArrows, label: 'Compare schemes', to: '/compare', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  { icon: MessageCircle, label: 'Ask AI assistant', to: '/chat', color: 'bg-saffron/10 text-saffron-dark dark:text-saffron' },
  { icon: TrendingUp, label: 'Check current rates', to: '/schemes', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
  { icon: LifeBuoy, label: 'Resolve an issue', to: '/troubleshoot', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export function DashboardPage() {
  return (
    <div className="p-6 md:p-8 rangoli-pattern min-h-screen">
      {/* Welcome Hero */}
      <div className="mb-10 animate-fade-in-up">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy dark:text-white mb-2">
          {getGreeting()} <span className="text-saffron">!</span>
        </h1>
        <p className="text-lg text-navy/60 dark:text-white/50 max-w-xl">
          Your bridge to understanding and investing in Indian government savings schemes.
        </p>
      </div>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="font-heading text-lg font-semibold text-navy dark:text-white mb-4">
          I want to...
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={action.label}
              to={action.to}
              className={`card-hover animate-fade-in-up stagger-${i + 1} flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border text-center`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${action.color}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-navy dark:text-white/80">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Scheme Highlights */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold text-navy dark:text-white">
            Current Rates
          </h2>
          <Link to="/schemes" className="text-sm text-saffron-dark dark:text-saffron hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4">
          {schemes.filter(s => s.interestRate.current > 0).map((scheme, i) => (
            <Link
              key={scheme.id}
              to={`/schemes/${scheme.id}`}
              className={`card-hover animate-fade-in-up stagger-${i + 1} shrink-0 w-[200px] md:w-auto p-4 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: scheme.color }}
                >
                  {scheme.name.slice(0, 3)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy dark:text-white">{scheme.name}</div>
                  <div className="text-[10px] text-navy/40 dark:text-white/30">{scheme.nameHindi}</div>
                </div>
              </div>
              <div className="text-2xl font-heading font-bold text-sage dark:text-sage-light">
                {formatPercent(scheme.interestRate.current)}
              </div>
              <div className="text-[11px] text-navy/40 dark:text-white/30 mt-0.5">
                {scheme.interestRate.asOf}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Questions */}
      <section>
        <h2 className="font-heading text-lg font-semibold text-navy dark:text-white mb-4">
          Popular Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dashboardQuestions.map((q, i) => (
            <Link
              key={q}
              to={`/chat?q=${encodeURIComponent(q)}`}
              className={`card-hover animate-fade-in-up stagger-${i + 1} flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border`}
            >
              <MessageCircle className="w-5 h-5 text-saffron shrink-0" />
              <span className="text-sm text-navy/80 dark:text-white/70">{q}</span>
              <ArrowRight className="w-4 h-4 text-navy/20 dark:text-white/20 ml-auto shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
