import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Clock, TrendingUp, Shield, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { getSchemeById } from '@/data/schemes'
import { formatCurrency, formatPercent, cn } from '@/lib/utils'

const tabs = ['Overview', 'How to Open', 'Tax Benefits', 'Withdrawal', 'FAQs'] as const
type Tab = typeof tabs[number]

export function SchemeDetailPage() {
  const { schemeId } = useParams()
  const scheme = getSchemeById(schemeId || '')
  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!scheme) {
    return (
      <div className="p-6 md:p-8 min-h-screen">
        <Link to="/schemes" className="flex items-center gap-2 text-sm text-navy/60 dark:text-white/50 hover:text-navy dark:hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Schemes
        </Link>
        <p className="text-navy/50 dark:text-white/40">Scheme not found.</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <Link to="/schemes" className="flex items-center gap-2 text-sm text-navy/60 dark:text-white/50 hover:text-navy dark:hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Schemes
      </Link>

      {/* Header */}
      <div className="animate-fade-in-up mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold"
            style={{ backgroundColor: scheme.color }}
          >
            {scheme.name}
          </div>
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy dark:text-white">{scheme.fullName}</h1>
            <p className="text-sm text-navy/50 dark:text-white/40">{scheme.nameHindi} &middot; {scheme.tagline}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {scheme.interestRate.current > 0 && (
            <div className="p-4 rounded-xl bg-sage/5 dark:bg-sage/10 border border-sage/10">
              <div className="flex items-center gap-1.5 text-xs text-sage dark:text-sage-light mb-1">
                <TrendingUp className="w-3.5 h-3.5" /> Interest Rate
              </div>
              <div className="text-xl font-heading font-bold text-sage dark:text-sage-light">
                {formatPercent(scheme.interestRate.current)}
              </div>
            </div>
          )}
          <div className="p-4 rounded-xl bg-navy/5 dark:bg-white/5 border border-navy/5 dark:border-midnight-border">
            <div className="flex items-center gap-1.5 text-xs text-navy/50 dark:text-white/40 mb-1">
              <Clock className="w-3.5 h-3.5" /> Lock-in
            </div>
            <div className="text-xl font-heading font-bold text-navy dark:text-white">
              {scheme.lockInYears > 0 ? `${scheme.lockInYears} years` : 'Till 60'}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-saffron/5 dark:bg-saffron/10 border border-saffron/10">
            <div className="flex items-center gap-1.5 text-xs text-saffron-dark dark:text-saffron mb-1">
              <Shield className="w-3.5 h-3.5" /> Tax Status
            </div>
            <div className="text-xl font-heading font-bold text-saffron-dark dark:text-saffron">
              {scheme.taxBenefit}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-navy/5 dark:bg-white/5 border border-navy/5 dark:border-midnight-border">
            <div className="flex items-center gap-1.5 text-xs text-navy/50 dark:text-white/40 mb-1">
              <Users className="w-3.5 h-3.5" /> Eligibility
            </div>
            <div className="text-sm font-semibold text-navy dark:text-white leading-tight">
              {scheme.eligibility.category}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 border-b border-navy/10 dark:border-midnight-border">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px',
              activeTab === tab
                ? 'border-saffron text-saffron-dark dark:text-saffron'
                : 'border-transparent text-navy/50 dark:text-white/40 hover:text-navy dark:hover:text-white'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in-up max-w-3xl">
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-semibold text-navy dark:text-white mb-2">About</h3>
              <p className="text-navy/70 dark:text-white/60 leading-relaxed">{scheme.description}</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-navy dark:text-white mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {scheme.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy/70 dark:text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-navy dark:text-white mb-2">Investment Range</h3>
              <p className="text-sm text-navy/70 dark:text-white/60">
                Minimum: {formatCurrency(scheme.minInvestment)}
                {scheme.maxInvestment && ` | Maximum: ${formatCurrency(scheme.maxInvestment)}`}
                {!scheme.maxInvestment && ' | No upper limit'}
              </p>
            </div>
            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-saffron-dark dark:text-saffron hover:underline"
            >
              Visit official portal <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {activeTab === 'How to Open' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-semibold text-navy dark:text-white mb-3">Step-by-step Guide</h3>
              <ol className="space-y-3">
                {scheme.howToOpen.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-saffron/10 text-saffron-dark dark:text-saffron flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-navy/70 dark:text-white/60 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-navy dark:text-white mb-3">Required Documents</h3>
              <ul className="space-y-1.5">
                {scheme.requiredDocuments.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy/70 dark:text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'Tax Benefits' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
              <div className="text-xs font-medium text-navy/40 dark:text-white/30 uppercase mb-1">Contribution</div>
              <p className="text-sm text-navy/70 dark:text-white/60">{scheme.taxImplications.contribution}</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
              <div className="text-xs font-medium text-navy/40 dark:text-white/30 uppercase mb-1">Interest Earned</div>
              <p className="text-sm text-navy/70 dark:text-white/60">{scheme.taxImplications.interest}</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
              <div className="text-xs font-medium text-navy/40 dark:text-white/30 uppercase mb-1">At Maturity</div>
              <p className="text-sm text-navy/70 dark:text-white/60">{scheme.taxImplications.maturity}</p>
            </div>
            <div className="p-3 rounded-lg bg-saffron/5 border border-saffron/10 text-sm text-saffron-dark dark:text-saffron">
              {scheme.taxImplications.regime === 'both'
                ? 'Tax benefits available under both old and new tax regimes.'
                : 'Tax deductions available only under the old tax regime.'}
            </div>
          </div>
        )}

        {activeTab === 'Withdrawal' && (
          <div>
            <h3 className="font-heading font-semibold text-navy dark:text-white mb-3">Withdrawal Rules</h3>
            <ul className="space-y-3">
              {scheme.withdrawalRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-navy/70 dark:text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-navy/30 dark:bg-white/30 mt-2 shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'FAQs' && (
          <div className="space-y-2">
            {scheme.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-medium text-navy dark:text-white pr-4">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-navy/40 dark:text-white/40 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-navy/40 dark:text-white/40 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-navy/60 dark:text-white/50 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
