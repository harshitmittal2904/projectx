import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Play,
  MessageCircle,
  Lightbulb,
  Info,
} from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { withdrawalGuides, type WithdrawalGuide } from '@/data/withdrawal-guides'
import { cn } from '@/lib/utils'

const schemeTabs = [
  { id: 'epf', label: 'EPF' },
  { id: 'ppf', label: 'PPF' },
  { id: 'nps', label: 'NPS' },
  { id: 'ssy', label: 'SSY' },
  { id: 'scss', label: 'SCSS' },
  { id: 'nsc', label: 'NSC' },
]

export function WithdrawalGuidesPage() {
  const [activeScheme, setActiveScheme] = useState('epf')
  const [selectedGuide, setSelectedGuide] = useState<WithdrawalGuide | null>(null)
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [checkedPrereqs, setCheckedPrereqs] = useState<Set<number>>(new Set())

  const guidesForScheme = withdrawalGuides.filter(g => g.schemeId === activeScheme)

  const togglePrereq = (index: number) => {
    setCheckedPrereqs(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const handleSelectGuide = (guide: WithdrawalGuide) => {
    setSelectedGuide(guide)
    setExpandedStep(null)
    setCheckedPrereqs(new Set())
  }

  const handleBack = () => {
    setSelectedGuide(null)
    setExpandedStep(null)
    setCheckedPrereqs(new Set())
  }

  // Detail view for a specific guide
  if (selectedGuide) {
    const prereqProgress = selectedGuide.beforeYouStart.length > 0
      ? Math.round((checkedPrereqs.size / selectedGuide.beforeYouStart.length) * 100)
      : 100

    return (
      <div className="p-4 md:p-8 min-h-screen">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-navy/60 dark:text-white/50 hover:text-navy dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to guides
        </button>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy dark:text-white mb-1">
              {selectedGuide.title}
            </h1>
            <p className="text-sm text-navy/50 dark:text-white/40">{selectedGuide.subtitle}</p>
          </div>

          {/* Before You Start Checklist */}
          {selectedGuide.beforeYouStart.length > 0 && (
            <div className="mb-8 animate-fade-in-up">
              <div className="p-5 rounded-2xl bg-saffron/5 dark:bg-saffron/10 border border-saffron/15">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-semibold text-saffron-dark dark:text-saffron flex items-center gap-2">
                    <Info className="w-4 h-4" /> Before You Start
                  </h3>
                  <span className={cn(
                    'text-xs font-medium px-2 py-0.5 rounded-full',
                    prereqProgress === 100
                      ? 'bg-sage/10 text-sage'
                      : 'bg-saffron/10 text-saffron-dark dark:text-saffron'
                  )}>
                    {checkedPrereqs.size}/{selectedGuide.beforeYouStart.length} ready
                  </span>
                </div>
                <div className="space-y-2">
                  {selectedGuide.beforeYouStart.map((prereq, i) => (
                    <button
                      key={i}
                      onClick={() => togglePrereq(i)}
                      className="w-full flex items-start gap-3 text-left group"
                    >
                      {checkedPrereqs.has(i) ? (
                        <CheckSquare className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-navy/20 dark:text-white/20 shrink-0 mt-0.5 group-hover:text-saffron transition-colors" />
                      )}
                      <span className={cn(
                        'text-sm transition-all',
                        checkedPrereqs.has(i)
                          ? 'text-sage dark:text-sage-light line-through opacity-60'
                          : 'text-navy/70 dark:text-white/60'
                      )}>
                        {prereq}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Steps — Vertical Stepper */}
          <div className="mb-8">
            <h3 className="font-heading font-semibold text-navy dark:text-white mb-4">Steps</h3>
            <div className="relative">
              {selectedGuide.steps.map((step, i) => {
                const isExpanded = expandedStep === i
                const isLast = i === selectedGuide.steps.length - 1
                return (
                  <div key={i} className={`animate-fade-in-up stagger-${Math.min(i + 1, 6)} relative flex gap-4`}>
                    {/* Vertical line + circle */}
                    <div className="flex flex-col items-center shrink-0">
                      <button
                        onClick={() => setExpandedStep(isExpanded ? null : i)}
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 z-10',
                          isExpanded
                            ? 'bg-saffron text-white scale-110'
                            : 'bg-saffron/10 text-saffron-dark dark:text-saffron hover:bg-saffron/20'
                        )}
                      >
                        {i + 1}
                      </button>
                      {!isLast && (
                        <div className="w-px flex-1 min-h-[24px] bg-navy/10 dark:bg-white/10" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={cn('flex-1 pb-6', isLast && 'pb-0')}>
                      <button
                        onClick={() => setExpandedStep(isExpanded ? null : i)}
                        className="w-full flex items-center justify-between text-left mb-1"
                      >
                        <h4 className={cn(
                          'font-heading font-semibold text-sm transition-colors',
                          isExpanded ? 'text-saffron-dark dark:text-saffron' : 'text-navy dark:text-white'
                        )}>
                          {step.title}
                        </h4>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-navy/30 dark:text-white/30 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-navy/30 dark:text-white/30 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="animate-fade-in-up">
                          <p className="text-sm text-navy/70 dark:text-white/60 leading-relaxed mb-2">
                            {step.instruction}
                          </p>
                          {step.proTip && (
                            <div className="flex items-start gap-2 p-3 rounded-xl bg-sage/5 dark:bg-sage/10 border border-sage/10">
                              <Lightbulb className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                              <span className="text-xs text-sage dark:text-sage-light leading-relaxed">
                                <strong>Pro Tip:</strong> {step.proTip}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {!isExpanded && (
                        <p className="text-xs text-navy/40 dark:text-white/30 line-clamp-1">
                          {step.instruction}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Key Limits */}
          {selectedGuide.keyLimits && selectedGuide.keyLimits.length > 0 && (
            <div className="mb-8 animate-fade-in-up">
              <h3 className="font-heading font-semibold text-navy dark:text-white mb-3">Key Limits</h3>
              <div className="space-y-2">
                {selectedGuide.keyLimits.map((limit, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
                    <div className="text-xs font-medium text-navy/40 dark:text-white/30 uppercase mb-0.5">{limit.label}</div>
                    <div className="text-sm text-navy/70 dark:text-white/60">{limit.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Rejection Reasons */}
          {selectedGuide.commonRejections && selectedGuide.commonRejections.length > 0 && (
            <div className="mb-8 animate-fade-in-up">
              <div className="p-5 rounded-2xl bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                <h3 className="font-heading font-semibold text-red-600 dark:text-red-400 flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" /> Common Rejection Reasons
                </h3>
                <ul className="space-y-2">
                  {selectedGuide.commonRejections.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-600/80 dark:text-red-400/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Video Reference */}
          <div className="mb-8 animate-fade-in-up">
            <a
              href={selectedGuide.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <Play className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-navy dark:text-white">{selectedGuide.videoLabel}</div>
                <div className="text-xs text-navy/40 dark:text-white/30">Opens YouTube in a new tab</div>
              </div>
            </a>
          </div>

          {/* Ask AI Button */}
          <div className="animate-fade-in-up">
            <Link
              to={`/chat?q=${encodeURIComponent(selectedGuide.chatQuestion)}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-navy to-navy-light dark:from-saffron dark:to-saffron-dark text-white dark:text-navy font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Still confused? Ask AI
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Main view — scheme tabs + guide selection
  return (
    <div className="p-4 md:p-8 min-h-screen">
      <PageHeader
        title="Withdrawal Guides"
        description="Step-by-step visual guides for withdrawing from government schemes."
      />

      {/* Scheme tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {schemeTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveScheme(tab.id); setSelectedGuide(null) }}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0',
              activeScheme === tab.id
                ? 'bg-navy text-white dark:bg-saffron dark:text-navy shadow-sm'
                : 'bg-white dark:bg-midnight-card text-navy/60 dark:text-white/50 border border-navy/10 dark:border-midnight-border hover:border-navy/30 dark:hover:border-white/20 active:scale-95'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Guide cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
        {guidesForScheme.map((guide, i) => (
          <button
            key={guide.id}
            onClick={() => handleSelectGuide(guide)}
            className={`card-hover animate-fade-in-up stagger-${Math.min(i + 1, 6)} text-left p-5 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border group`}
          >
            <h3 className="font-heading font-semibold text-navy dark:text-white mb-1">
              {guide.title}
            </h3>
            <p className="text-xs text-navy/40 dark:text-white/30 mb-3">
              {guide.subtitle}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-navy/40 dark:text-white/30">
                {guide.steps.length} steps &middot; {guide.beforeYouStart.length} prerequisites
              </span>
              <span className="text-sm font-medium text-saffron-dark dark:text-saffron group-hover:translate-x-1 transition-transform">
                Open →
              </span>
            </div>
          </button>
        ))}

        {guidesForScheme.length === 0 && (
          <div className="col-span-2 text-center py-12 text-navy/40 dark:text-white/30">
            No withdrawal guides available for this scheme yet.
          </div>
        )}
      </div>
    </div>
  )
}
