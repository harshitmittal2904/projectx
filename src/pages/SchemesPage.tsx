import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, TrendingUp, Clock } from 'lucide-react'
import { schemes } from '@/data/schemes'
import { PageHeader } from '@/components/shared/PageHeader'
import { formatPercent, cn } from '@/lib/utils'
import type { RiskLevel } from '@/types/scheme'

const riskFilters: { label: string; value: RiskLevel | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Low Risk', value: 'low' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Market-Linked', value: 'market-linked' },
]

const riskBadge: Record<RiskLevel, { label: string; className: string }> = {
  low: { label: 'Low Risk', className: 'bg-sage/10 text-sage dark:text-sage-light' },
  moderate: { label: 'Moderate', className: 'bg-saffron/10 text-saffron-dark dark:text-saffron' },
  'market-linked': { label: 'Market-Linked', className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
}

export function SchemesPage() {
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all')

  const filtered = riskFilter === 'all' ? schemes : schemes.filter(s => s.riskLevel === riskFilter)

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <PageHeader title="Government Schemes" description="Explore all Indian government savings and pension schemes." />

      {/* Filters - horizontal scroll on mobile */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {riskFilters.map(f => (
          <button
            key={f.value}
            onClick={() => setRiskFilter(f.value)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0',
              riskFilter === f.value
                ? 'bg-navy text-white dark:bg-saffron dark:text-navy shadow-sm'
                : 'bg-white dark:bg-midnight-card text-navy/60 dark:text-white/50 border border-navy/10 dark:border-midnight-border hover:border-navy/30 dark:hover:border-white/20 active:scale-95'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filtered.map((scheme, i) => (
          <Link
            key={scheme.id}
            to={`/schemes/${scheme.id}`}
            className={`card-hover animate-fade-in-up stagger-${Math.min(i + 1, 6)} group p-4 md:p-5 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: scheme.color }}
                >
                  {scheme.name}
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-semibold text-navy dark:text-white truncate">{scheme.fullName}</div>
                  <div className="text-xs text-navy/40 dark:text-white/30">{scheme.nameHindi}</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-navy/60 dark:text-white/50 mb-4 line-clamp-2">
              {scheme.tagline}
            </p>

            <div className="flex items-center gap-2 md:gap-3 text-xs mb-4 flex-wrap">
              <span className={cn('px-2 py-1 rounded-full font-medium', riskBadge[scheme.riskLevel].className)}>
                {riskBadge[scheme.riskLevel].label}
              </span>
              {scheme.interestRate.current > 0 && (
                <span className="flex items-center gap-1 text-sage dark:text-sage-light">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {formatPercent(scheme.interestRate.current)}
                </span>
              )}
              {scheme.lockInYears > 0 && (
                <span className="flex items-center gap-1 text-navy/40 dark:text-white/30">
                  <Clock className="w-3.5 h-3.5" />
                  {scheme.lockInYears}yr lock-in
                </span>
              )}
              {scheme.taxBenefit === 'EEE' && (
                <span className="flex items-center gap-1 text-saffron-dark dark:text-saffron">
                  <Shield className="w-3.5 h-3.5" />
                  Tax-Free (EEE)
                </span>
              )}
            </div>

            <div className="flex items-center text-sm font-medium text-saffron-dark dark:text-saffron group-hover:gap-2 transition-all duration-200 gap-1">
              Learn more <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
