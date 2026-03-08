import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext } from './theme-context'

type Theme = 'light' | 'dark'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('nidhisetu-theme')
    return (stored === 'dark' ? 'dark' : 'light') satisfies Theme
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('nidhisetu-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
