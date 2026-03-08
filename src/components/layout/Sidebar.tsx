import { NavLink } from 'react-router-dom'
import {
  Home,
  MessageCircle,
  Landmark,
  GitCompareArrows,
  Calculator,
  LifeBuoy,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/chat', icon: MessageCircle, label: 'AI Assistant' },
  { to: '/schemes', icon: Landmark, label: 'Schemes' },
  { to: '/compare', icon: GitCompareArrows, label: 'Compare' },
  { to: '/calculators', icon: Calculator, label: 'Calculators' },
  { to: '/troubleshoot', icon: LifeBuoy, label: 'Troubleshoot' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen sticky top-0 bg-white dark:bg-midnight-card border-r border-navy/10 dark:border-midnight-border transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      <div className={cn('flex items-center h-16 px-4', collapsed ? 'justify-center' : 'justify-between')}>
        <Logo collapsed={collapsed} />
        {!collapsed && (
          <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-navy/5 dark:hover:bg-white/10">
            <PanelLeftClose className="w-4 h-4 text-navy/40 dark:text-white/40" />
          </button>
        )}
      </div>

      {collapsed && (
        <button onClick={onToggle} className="mx-auto p-1.5 rounded-lg hover:bg-navy/5 dark:hover:bg-white/10 mb-2">
          <PanelLeft className="w-4 h-4 text-navy/40 dark:text-white/40" />
        </button>
      )}

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-saffron/10 text-saffron-dark dark:bg-saffron/20 dark:text-saffron'
                  : 'text-navy/60 dark:text-white/50 hover:bg-navy/5 dark:hover:bg-white/5 hover:text-navy dark:hover:text-white'
              )
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={cn('px-3 pb-4', collapsed && 'flex justify-center')}>
        <ThemeToggle />
      </div>
    </aside>
  )
}
