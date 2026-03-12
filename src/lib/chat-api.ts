import type { ChatMessage } from '@/types/chat'
import { getFallbackAnswer } from './fallback-answers'

const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY as string | undefined
const TIMEOUT_MS = 15_000

export async function streamChatResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  _onError: (error: string) => void,
  onSlowResponse?: () => void,
) {
  const lastUserMessage = messages[messages.length - 1]?.content || ''

  if (!API_KEY) {
    // No API key — use fallback system silently
    const fallback = getFallbackAnswer(lastUserMessage)
    simulateStreaming(fallback, onChunk, onDone)
    return
  }

  const controller = new AbortController()
  let slowTimer: ReturnType<typeof setTimeout> | undefined
  let timeoutTimer: ReturnType<typeof setTimeout> | undefined
  let receivedAnyChunk = false

  // Show "taking longer" after 8s
  slowTimer = setTimeout(() => {
    if (!receivedAnyChunk) onSlowResponse?.()
  }, 8000)

  // Hard timeout at 15s — cancel and use fallback
  timeoutTimer = setTimeout(() => {
    if (!receivedAnyChunk) {
      controller.abort()
      clearTimeout(slowTimer)
      const fallback = getFallbackAnswer(lastUserMessage)
      simulateStreaming(fallback, onChunk, onDone)
    }
  }, TIMEOUT_MS)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: systemPrompt,
        messages: messages.slice(-12), // Keep last 12 messages for context
        stream: true,
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      clearTimeout(slowTimer)
      clearTimeout(timeoutTimer)
      // API error — use fallback silently
      console.warn(`API error ${response.status}`)
      const fallback = getFallbackAnswer(lastUserMessage)
      simulateStreaming(fallback, onChunk, onDone)
      return
    }

    const reader = response.body?.getReader()
    if (!reader) {
      clearTimeout(slowTimer)
      clearTimeout(timeoutTimer)
      const fallback = getFallbackAnswer(lastUserMessage)
      simulateStreaming(fallback, onChunk, onDone)
      return
    }

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') continue
          try {
            const event = JSON.parse(data)
            if (event.type === 'content_block_delta' && event.delta?.text) {
              if (!receivedAnyChunk) {
                receivedAnyChunk = true
                clearTimeout(slowTimer)
                clearTimeout(timeoutTimer)
              }
              onChunk(event.delta.text)
            }
          } catch {
            // Skip non-JSON lines
          }
        }
      }
    }

    onDone()
  } catch (err) {
    clearTimeout(slowTimer)
    clearTimeout(timeoutTimer)

    if (controller.signal.aborted) {
      // Already handled by timeout fallback
      return
    }

    // Network error — use fallback
    console.warn('Chat API error:', err)
    const fallback = getFallbackAnswer(lastUserMessage)
    simulateStreaming(fallback, onChunk, onDone)
  }
}

/** Simulate streaming for fallback answers so the UX feels natural */
function simulateStreaming(text: string, onChunk: (text: string) => void, onDone: () => void) {
  const words = text.split(' ')
  let i = 0
  const interval = setInterval(() => {
    const batchSize = Math.min(3, words.length - i)
    if (batchSize <= 0) {
      clearInterval(interval)
      onDone()
      return
    }
    const batch = words.slice(i, i + batchSize).join(' ') + (i + batchSize < words.length ? ' ' : '')
    onChunk(batch)
    i += batchSize
  }, 30)
}

export function formatMessagesForAPI(messages: ChatMessage[]): { role: 'user' | 'assistant'; content: string }[] {
  return messages.map(m => ({ role: m.role, content: m.content }))
}
