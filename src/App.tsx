import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/lib/theme'
import { AppLayout } from '@/components/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { ChatPage } from '@/pages/ChatPage'
import { SchemesPage } from '@/pages/SchemesPage'
import { SchemeDetailPage } from '@/pages/SchemeDetailPage'
import { ComparePage } from '@/pages/ComparePage'
import { CalculatorsPage } from '@/pages/CalculatorsPage'
import { TroubleshootPage } from '@/pages/TroubleshootPage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/schemes" element={<SchemesPage />} />
            <Route path="/schemes/:schemeId" element={<SchemeDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route path="/troubleshoot" element={<TroubleshootPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
