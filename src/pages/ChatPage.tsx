import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import { ChatMessage } from '@/components/chat/ChatMessage'
import { ChatInput } from '@/components/chat/ChatInput'
import { SuggestedChips } from '@/components/chat/SuggestedChips'

export function ChatPage() {
  const { messages, isLoading, error, sendMessage } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuestion = searchParams.get('q')
  const sentInitial = useRef(false)

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

  return (
    <div className="flex flex-col h-[calc(100vh-0px)] md:h-screen">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
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

      {/* Input */}
      <div className="px-4 md:px-8 pb-4 pt-2 max-w-3xl mx-auto w-full">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
