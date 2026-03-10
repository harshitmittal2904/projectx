import { NavLink } from 'react-router-dom'
import { Home, MessageCircle, Landmark, GitCompareArrows, Calculator, LifeBuoy } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/chat', icon: MessageCircle, label: 'Chat' },
  { to: '/schemes', icon: Landmark, label: 'Schemes' },
  { to: '/compare', icon: GitCompareArrows, label: 'Compare' },
  { to: '/calculators', icon: Calculator, label: 'Calc' },
  { to: '/troubleshoot', icon: LifeBuoy, label: 'Help' },
]

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-midnight-card/95 backdrop-blur-lg border-t border-navy/10 dark:border-midnight-border px-1 pb-[max(env(safe-area-inset-bottom),8px)] pt-1">
      <div className="flex justify-around">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'nav-tap relative flex flex-col items-center gap-0.5 py-2 px-2 text-[10px] font-medium min-w-[44px] min-h-[44px] justify-center rounded-xl transition-all duration-200',
                isActive
                  ? 'text-saffron-dark dark:text-saffron'
                  : 'text-navy/40 dark:text-white/40 active:bg-navy/5 dark:active:bg-white/5'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-saffron" />
                )}
                <Icon className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  isActive && 'scale-110'
                )} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
