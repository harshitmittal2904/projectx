import { useState, useCallback } from 'react'
import type { ChatMessage } from '@/types/chat'
import { streamChatResponse, formatMessagesForAPI } from '@/lib/chat-api'
import { buildSystemPrompt } from '@/lib/system-prompt'

let nextId = 0
function genId() {
  return `msg-${Date.now()}-${nextId++}`
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSlow, setIsSlow] = useState(false)

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: genId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    }

    const assistantMessage: ChatMessage = {
      id: genId(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    setIsLoading(true)
    setIsSlow(false)

    const allMessages = [...messages, userMessage]
    const apiMessages = formatMessagesForAPI(allMessages)
    const systemPrompt = buildSystemPrompt()

    await streamChatResponse(
      apiMessages,
      systemPrompt,
      (chunk) => {
        setIsSlow(false)
        setMessages(prev => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last.role === 'assistant') {
            updated[updated.length - 1] = { ...last, content: last.content + chunk }
          }
          return updated
        })
      },
      () => {
        setIsLoading(false)
        setIsSlow(false)
      },
      () => {
        // Error callback — should never fire now since chat-api handles all errors with fallbacks
        // But just in case, gracefully handle it
        setIsLoading(false)
        setIsSlow(false)
      },
      () => {
        // Slow response callback
        setIsSlow(true)
      },
    )
  }, [messages])

  return { messages, isLoading, isSlow, sendMessage }
}
