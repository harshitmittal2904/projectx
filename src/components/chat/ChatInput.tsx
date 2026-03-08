import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1 relative">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          placeholder="Ask about NPS, PPF, EPF, tax savings..."
          rows={1}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-midnight-card border border-navy/10 dark:border-midnight-border text-sm text-navy dark:text-white placeholder:text-navy/30 dark:placeholder:text-white/30 resize-none focus:outline-none focus:border-saffron/50 focus:ring-1 focus:ring-saffron/20"
          style={{ minHeight: '44px', maxHeight: '120px' }}
        />
      </div>
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="p-3 rounded-xl bg-saffron text-white hover:bg-saffron-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  )
}
