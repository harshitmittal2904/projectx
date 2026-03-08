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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-midnight-card border-t border-navy/10 dark:border-midnight-border px-1 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 py-2 px-2 text-[10px] font-medium min-w-[44px] min-h-[44px] justify-center',
                isActive
                  ? 'text-saffron-dark dark:text-saffron'
                  : 'text-navy/40 dark:text-white/40'
              )
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
