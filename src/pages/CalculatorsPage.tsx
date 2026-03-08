import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { cn } from '@/lib/utils'
import { PPFCalculator } from '@/components/calculators/PPFCalculator'
import { NPSCalculator } from '@/components/calculators/NPSCalculator'
import { EPFCalculator } from '@/components/calculators/EPFCalculator'
import { TaxSavingsCalculator } from '@/components/calculators/TaxSavingsCalculator'

const tabs = [
  { id: 'ppf', label: 'PPF' },
  { id: 'nps', label: 'NPS' },
  { id: 'epf', label: 'EPF' },
  { id: 'tax', label: 'Tax Savings' },
] as const

type CalcTab = typeof tabs[number]['id']

export function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<CalcTab>('ppf')

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <PageHeader title="Investment Calculators" description="Calculate returns for PPF, NPS, EPF and see tax savings." />

      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 border-b border-navy/10 dark:border-midnight-border">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px',
              activeTab === tab.id
                ? 'border-saffron text-saffron-dark dark:text-saffron'
                : 'border-transparent text-navy/50 dark:text-white/40 hover:text-navy dark:hover:text-white'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in-up">
        {activeTab === 'ppf' && <PPFCalculator />}
        {activeTab === 'nps' && <NPSCalculator />}
        {activeTab === 'epf' && <EPFCalculator />}
        {activeTab === 'tax' && <TaxSavingsCalculator />}
      </div>
    </div>
  )
}
