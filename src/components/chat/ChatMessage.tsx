import Markdown from 'react-markdown'
import { cn } from '@/lib/utils'
import type { ChatMessage as ChatMessageType } from '@/types/chat'

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex gap-3 mb-4', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center shrink-0 mt-1">
          <div className="w-4 h-4 border-[1.5px] border-white rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </div>
      )}
      <div
        className={cn(
          'max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
          isUser
            ? 'bg-navy text-white dark:bg-navy-light rounded-br-md'
            : 'bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border text-navy/80 dark:text-white/70 rounded-bl-md'
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0.5 [&_h2]:text-base [&_h3]:text-sm [&_h2]:mt-3 [&_h3]:mt-2 [&_strong]:text-navy dark:[&_strong]:text-white">
            <Markdown>{message.content || '...'}</Markdown>
          </div>
        )}
      </div>
    </div>
  )
}
