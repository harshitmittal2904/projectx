import { useEffect, useRef, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MessageCircle, ArrowDown } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import { ChatMessage } from '@/components/chat/ChatMessage'
import { ChatInput } from '@/components/chat/ChatInput'
import { SuggestedChips } from '@/components/chat/SuggestedChips'

export function ChatPage() {
  const { messages, isLoading, error, sendMessage } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuestion = searchParams.get('q')
  const sentInitial = useRef(false)
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  useEffect(() => {
    if (initialQuestion && !sentInitial.current && messages.length === 0) {
      sentInitial.current = true
      setSearchParams({}, { replace: true })
      sendMessage(initialQuestion)
    }
  }, [initialQuestion, messages.length, sendMessage, setSearchParams])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    setShowScrollBtn(distanceFromBottom > 200)
  }, [])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="flex flex-col h-[calc(100dvh-0px)] md:h-screen">
      {/* Messages */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 md:px-8 pt-6 relative"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 rounded-full bg-saffron/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-saffron" />
            </div>
            <h2 className="font-heading text-xl font-bold text-navy dark:text-white mb-2">
              NidhiSetu AI Assistant
            </h2>
            <p className="text-sm text-navy/50 dark:text-white/40 mb-6">
              Ask me anything about NPS, PPF, EPF, tax savings, scheme comparisons, or investment guidance.
            </p>
            <SuggestedChips onSelect={sendMessage} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto pb-4">
            {messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 border-[1.5px] border-white rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-navy/20 dark:bg-white/20 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-navy/20 dark:bg-white/20 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-navy/20 dark:bg-white/20 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Scroll to bottom button */}
      {showScrollBtn && messages.length > 0 && (
        <div className="flex justify-center -mt-12 relative z-10">
          <button
            onClick={scrollToBottom}
            className="p-2 rounded-full bg-white dark:bg-midnight-card border border-navy/10 dark:border-midnight-border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ArrowDown className="w-4 h-4 text-navy/60 dark:text-white/50" />
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mx-4 md:mx-8 mb-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Suggestion chips after messages */}
      {messages.length > 0 && !isLoading && (
        <div className="px-4 md:px-8 pb-2 max-w-3xl mx-auto w-full">
          <SuggestedChips onSelect={sendMessage} />
        </div>
      )}

      {/* Input - safe area padding for mobile keyboard */}
      <div className="px-4 md:px-8 pb-[max(env(safe-area-inset-bottom),16px)] md:pb-4 pt-2 max-w-3xl mx-auto w-full">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
