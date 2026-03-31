import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/lib/theme'
import { AppLayout } from '@/components/layout/AppLayout'

const DashboardPage = lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const ChatPage = lazy(() => import('@/pages/ChatPage').then(m => ({ default: m.ChatPage })))
const SchemesPage = lazy(() => import('@/pages/SchemesPage').then(m => ({ default: m.SchemesPage })))
const SchemeDetailPage = lazy(() => import('@/pages/SchemeDetailPage').then(m => ({ default: m.SchemeDetailPage })))
const ComparePage = lazy(() => import('@/pages/ComparePage').then(m => ({ default: m.ComparePage })))
const CalculatorsPage = lazy(() => import('@/pages/CalculatorsPage').then(m => ({ default: m.CalculatorsPage })))
const TroubleshootPage = lazy(() => import('@/pages/TroubleshootPage').then(m => ({ default: m.TroubleshootPage })))
const EligibilityPage = lazy(() => import('@/pages/EligibilityPage').then(m => ({ default: m.EligibilityPage })))
const GlossaryPage = lazy(() => import('@/pages/GlossaryPage').then(m => ({ default: m.GlossaryPage })))
const DocumentsPage = lazy(() => import('@/pages/DocumentsPage').then(m => ({ default: m.DocumentsPage })))
const WithdrawalGuidesPage = lazy(() => import('@/pages/WithdrawalGuidesPage').then(m => ({ default: m.WithdrawalGuidesPage })))

function PageLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="chakra-spinner" />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/schemes" element={<SchemesPage />} />
              <Route path="/schemes/:schemeId" element={<SchemeDetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/calculators" element={<CalculatorsPage />} />
              <Route path="/troubleshoot" element={<TroubleshootPage />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/withdrawal-guides" element={<WithdrawalGuidesPage />} />
            </Route>
          </Routes>
        </Suspense>
        <Analytics />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
