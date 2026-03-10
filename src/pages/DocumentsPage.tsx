import { useState } from 'react'
import { CheckSquare, Square, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { schemes } from '@/data/schemes'
import { PageHeader } from '@/components/shared/PageHeader'
import { cn } from '@/lib/utils'
import type { SchemeId } from '@/types/scheme'

export function DocumentsPage() {
  const [selectedScheme, setSelectedScheme] = useState<SchemeId | null>(null)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [showSchemeSelect, setShowSchemeSelect] = useState(false)

  const scheme = selectedScheme ? schemes.find(s => s.id === selectedScheme) : null
  const documents = scheme?.requiredDocuments ?? []
  const progress = documents.length > 0 ? Math.round((checked.size / documents.length) * 100) : 0

  const toggleDoc = (doc: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(doc)) next.delete(doc)
      else next.add(doc)
      return next
    })
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <PageHeader
        title="Document Checklist"
        description="Know exactly what documents you need before visiting the bank or post office."
      />

      {/* Scheme selector */}
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setShowSchemeSelect(!showSchemeSelect)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-midnight-card border border-navy/10 dark:border-midnight-border"
          >
            <div className="flex items-center gap-3">
              {scheme ? (
                <>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: scheme.color }}
                  >
                    {scheme.name.slice(0, 3)}
                  </div>
                  <span className="font-medium text-sm text-navy dark:text-white">{scheme.fullName}</span>
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 text-navy/30 dark:text-white/30" />
                  <span className="text-sm text-navy/50 dark:text-white/40">Select a scheme</span>
                </>
              )}
            </div>
            {showSchemeSelect ? (
              <ChevronUp className="w-4 h-4 text-navy/30 dark:text-white/30" />
            ) : (
              <ChevronDown className="w-4 h-4 text-navy/30 dark:text-white/30" />
            )}
          </button>

          {showSchemeSelect && (
            <div className="mt-2 rounded-2xl bg-white dark:bg-midnight-card border border-navy/10 dark:border-midnight-border overflow-hidden animate-fade-in-up">
              {schemes.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedScheme(s.id)
                    setShowSchemeSelect(false)
                    setChecked(new Set())
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors',
                    selectedScheme === s.id
                      ? 'bg-saffron/10 text-saffron-dark dark:text-saffron'
                      : 'text-navy/70 dark:text-white/60 hover:bg-navy/5 dark:hover:bg-white/5'
                  )}
                >
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.name.slice(0, 2)}
                  </div>
                  {s.fullName}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Document checklist */}
        {scheme && (
          <div className="animate-fade-in-up">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-navy/60 dark:text-white/50">
                  {checked.size} of {documents.length} ready
                </span>
                <span className={cn(
                  'font-semibold',
                  progress === 100 ? 'text-sage' : 'text-navy dark:text-white'
                )}>
                  {progress}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-navy/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sage transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <button
                  key={doc}
                  onClick={() => toggleDoc(doc)}
                  className={cn(
                    `animate-fade-in-up stagger-${Math.min(i + 1, 6)} w-full flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 text-left`,
                    checked.has(doc)
                      ? 'bg-sage/5 dark:bg-sage/10 border-sage/20'
                      : 'bg-white dark:bg-midnight-card border-navy/5 dark:border-midnight-border'
                  )}
                >
                  {checked.has(doc) ? (
                    <CheckSquare className="w-5 h-5 text-sage shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-navy/20 dark:text-white/20 shrink-0" />
                  )}
                  <span className={cn(
                    'text-sm transition-all duration-200',
                    checked.has(doc)
                      ? 'text-sage dark:text-sage-light line-through'
                      : 'text-navy/70 dark:text-white/60'
                  )}>
                    {doc}
                  </span>
                </button>
              ))}
            </div>

            {progress === 100 && (
              <div className="mt-6 p-4 rounded-2xl bg-sage/10 border border-sage/20 text-center animate-fade-in-up">
                <div className="text-sage dark:text-sage-light font-semibold mb-1">All documents ready!</div>
                <div className="text-xs text-navy/50 dark:text-white/40">
                  You're all set to open your {scheme.name} account.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
