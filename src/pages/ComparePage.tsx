import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { cn } from '@/lib/utils'
import { CompareTable } from '@/components/compare/CompareTable'
import { QuizFlow } from '@/components/compare/QuizFlow'

const tabs = [
  { id: 'compare', label: 'Compare Schemes' },
  { id: 'quiz', label: 'Which scheme is right for me?' },
] as const

type Tab = typeof tabs[number]['id']

export function ComparePage() {
  const [activeTab, setActiveTab] = useState<Tab>('compare')

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <PageHeader title="Compare Schemes" description="Side-by-side comparison or find the right scheme for you." />

      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-navy text-white dark:bg-saffron dark:text-navy'
                : 'bg-white dark:bg-midnight-card text-navy/60 dark:text-white/50 border border-navy/10 dark:border-midnight-border'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in-up">
        {activeTab === 'compare' && <CompareTable />}
        {activeTab === 'quiz' && <QuizFlow />}
      </div>
    </div>
  )
}
