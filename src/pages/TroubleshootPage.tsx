import { useState } from 'react'
import {
  Building2,
  TrendingUp,
  Shield,
  Globe,
  FileWarning,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Phone,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { troubleshootCategories, escalationSteps } from '@/data/troubleshoot-guides'
import { portalLinks } from '@/data/portal-links'
import { cn } from '@/lib/utils'
import type { TroubleshootCategory } from '@/data/troubleshoot-guides'

const iconMap: Record<string, typeof Building2> = {
  Building2,
  TrendingUp,
  Shield,
  Globe,
  FileWarning,
}

export function TroubleshootPage() {
  const [selectedCategory, setSelectedCategory] = useState<TroubleshootCategory | null>(null)
  const [openIssue, setOpenIssue] = useState<number | null>(null)

  if (selectedCategory) {
    return (
      <div className="p-6 md:p-8 min-h-screen">
        <button
          onClick={() => { setSelectedCategory(null); setOpenIssue(null) }}
          className="flex items-center gap-2 text-sm text-navy/60 dark:text-white/50 hover:text-navy dark:hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to categories
        </button>

        <div className="mb-8 animate-fade-in-up">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy dark:text-white mb-2">
            {selectedCategory.title}
          </h1>
          <p className="text-sm text-navy/50 dark:text-white/40">{selectedCategory.description}</p>
        </div>

        {/* Issues accordion */}
        <div className="max-w-3xl space-y-3">
          {selectedCategory.issues.map((issue, i) => (
            <div
              key={i}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 6)} rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border overflow-hidden`}
            >
              <button
                onClick={() => setOpenIssue(openIssue === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-heading font-semibold text-navy dark:text-white pr-4">
                  {issue.title}
                </span>
                {openIssue === i ? (
                  <ChevronUp className="w-5 h-5 text-navy/30 dark:text-white/30 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-navy/30 dark:text-white/30 shrink-0" />
                )}
              </button>

              {openIssue === i && (
                <div className="px-5 pb-5 space-y-4 animate-fade-in-up">
                  {/* Steps */}
                  <ol className="space-y-3">
                    {issue.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-saffron/10 text-saffron-dark dark:text-saffron flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {j + 1}
                        </span>
                        <span className="text-sm text-navy/70 dark:text-white/60 leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>

                  {/* Helpline + Portal */}
                  <div className="flex flex-wrap gap-3 pt-2 border-t border-navy/5 dark:border-midnight-border">
                    {issue.helplineNumber && (
                      <a
                        href={`tel:${issue.helplineNumber}`}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-sage/5 text-sage dark:text-sage-light text-sm font-medium hover:bg-sage/10 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call {issue.helplineNumber}
                      </a>
                    )}
                    {issue.portalUrl && (
                      <a
                        href={issue.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-navy/5 dark:bg-white/5 text-navy/70 dark:text-white/60 text-sm font-medium hover:bg-navy/10 dark:hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open Portal
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <PageHeader
        title="Troubleshoot & Grievances"
        description="Step-by-step guides to resolve common issues with government investment schemes."
      />

      {/* Category cards */}
      <section className="mb-12">
        <h2 className="font-heading text-lg font-semibold text-navy dark:text-white mb-4">
          Select an issue category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {troubleshootCategories.map((cat, i) => {
            const IconComp = iconMap[cat.icon] || Globe
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`card-hover animate-fade-in-up stagger-${Math.min(i + 1, 6)} text-left p-5 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border group`}
              >
                <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center mb-3">
                  <IconComp className="w-5 h-5 text-saffron-dark dark:text-saffron" />
                </div>
                <h3 className="font-heading font-semibold text-navy dark:text-white mb-1">
                  {cat.title}
                </h3>
                <p className="text-sm text-navy/50 dark:text-white/40 mb-3">
                  {cat.description}
                </p>
                <span className="flex items-center gap-1 text-sm font-medium text-saffron-dark dark:text-saffron group-hover:gap-2 transition-all">
                  {cat.issues.length} guides <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Escalation Flowchart */}
      <section className="mb-12">
        <h2 className="font-heading text-lg font-semibold text-navy dark:text-white mb-4">
          Grievance Escalation Path
        </h2>
        <div className="relative">
          {/* Desktop flow - horizontal */}
          <div className="hidden md:flex items-start gap-0 overflow-x-auto pb-4">
            {escalationSteps.map((step, i) => (
              <div key={step.step} className="flex items-start shrink-0">
                <div className="flex flex-col items-center w-[160px]">
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-2',
                    i === 0 ? 'bg-sage/10 text-sage' :
                    i === escalationSteps.length - 1 ? 'bg-red-50 text-red-500 dark:bg-red-900/20' :
                    'bg-saffron/10 text-saffron-dark dark:text-saffron'
                  )}>
                    {step.step}
                  </div>
                  <h4 className="font-heading font-semibold text-sm text-navy dark:text-white text-center mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-navy/40 dark:text-white/30 text-center leading-tight px-2">
                    {step.description}
                  </p>
                </div>
                {i < escalationSteps.length - 1 && (
                  <div className="flex items-center mt-5 mx-1">
                    <ArrowRight className="w-5 h-5 text-navy/20 dark:text-white/15" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile flow - vertical */}
          <div className="md:hidden space-y-3">
            {escalationSteps.map((step, i) => (
              <div key={step.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold',
                    i === 0 ? 'bg-sage/10 text-sage' :
                    i === escalationSteps.length - 1 ? 'bg-red-50 text-red-500 dark:bg-red-900/20' :
                    'bg-saffron/10 text-saffron-dark dark:text-saffron'
                  )}>
                    {step.step}
                  </div>
                  {i < escalationSteps.length - 1 && (
                    <div className="w-px h-6 bg-navy/10 dark:bg-white/10 mt-1" />
                  )}
                </div>
                <div className="pt-2">
                  <h4 className="font-heading font-semibold text-sm text-navy dark:text-white">{step.title}</h4>
                  <p className="text-xs text-navy/40 dark:text-white/30">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Useful Portal Links */}
      <section>
        <h2 className="font-heading text-lg font-semibold text-navy dark:text-white mb-4">
          Official Portals & Helplines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {portalLinks.map((link, i) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-hover animate-fade-in-up stagger-${Math.min(i + 1, 6)} flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border`}
            >
              <div className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-navy/40 dark:text-white/40" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-navy dark:text-white">{link.name}</div>
                <div className="text-xs text-navy/40 dark:text-white/30 truncate">{link.description}</div>
              </div>
              <ExternalLink className="w-4 h-4 text-navy/20 dark:text-white/15 shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
