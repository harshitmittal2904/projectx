import { suggestedQuestions } from '@/data/suggested-questions'

interface SuggestedChipsProps {
  onSelect: (question: string) => void
}

export function SuggestedChips({ onSelect }: SuggestedChipsProps) {
  const chips = suggestedQuestions.slice(0, 6)

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map(q => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="px-3 py-2 rounded-full text-xs font-medium bg-white dark:bg-midnight-card border border-navy/10 dark:border-midnight-border text-navy/60 dark:text-white/50 hover:border-saffron/50 hover:text-saffron-dark dark:hover:text-saffron transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  )
}
