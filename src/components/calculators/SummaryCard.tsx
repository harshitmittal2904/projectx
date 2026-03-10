import { memo } from 'react'
import { cn } from '@/lib/utils'

interface SummaryCardProps {
  label: string
  value: string
  accent?: boolean
}

export const SummaryCard = memo(function SummaryCard({ label, value, accent }: SummaryCardProps) {
  return (
    <div className={cn(
      'p-4 rounded-xl border',
      accent
        ? 'bg-sage/5 dark:bg-sage/10 border-sage/10'
        : 'bg-white dark:bg-midnight-card border-navy/5 dark:border-midnight-border'
    )}>
      <div className="text-xs text-navy/40 dark:text-white/30 mb-1">{label}</div>
      <div className={cn(
        'text-lg font-heading font-bold',
        accent ? 'text-sage dark:text-sage-light' : 'text-navy dark:text-white'
      )}>
        {value}
      </div>
    </div>
  )
})
