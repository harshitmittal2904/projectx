import type { ChatMessage } from '@/types/chat'

const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY as string | undefined

export async function streamChatResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (error: string) => void
) {
  if (!API_KEY) {
    onError('Claude API key not configured. Set VITE_CLAUDE_API_KEY in your .env file.')
    return
  }

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
        messages,
        stream: true,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      onError(`API error (${response.status}): ${errorBody}`)
      return
    }

    const reader = response.body?.getReader()
    if (!reader) {
      onError('No response body')
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
    onError(err instanceof Error ? err.message : 'Unknown error')
  }
}

export function formatMessagesForAPI(messages: ChatMessage[]): { role: 'user' | 'assistant'; content: string }[] {
  return messages.map(m => ({ role: m.role, content: m.content }))
}
