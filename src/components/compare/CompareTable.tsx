import { useState } from 'react'
import { schemes } from '@/data/schemes'
import { formatCurrency, formatPercent, cn } from '@/lib/utils'
import type { Scheme } from '@/types/scheme'

const attributes: { key: string; label: string; getValue: (s: Scheme) => string }[] = [
  { key: 'rate', label: 'Interest Rate', getValue: s => s.interestRate.current > 0 ? formatPercent(s.interestRate.current) : 'Market-linked' },
  { key: 'risk', label: 'Risk Level', getValue: s => s.riskLevel === 'low' ? 'Low' : s.riskLevel === 'moderate' ? 'Moderate' : 'Market-Linked' },
  { key: 'lockin', label: 'Lock-in Period', getValue: s => s.lockInYears > 0 ? `${s.lockInYears} years` : 'Till retirement' },
  { key: 'maturity', label: 'Maturity', getValue: s => s.maturityYears ? `${s.maturityYears} years` : 'Flexible' },
  { key: 'min', label: 'Min Investment', getValue: s => formatCurrency(s.minInvestment) },
  { key: 'max', label: 'Max Investment', getValue: s => s.maxInvestment ? formatCurrency(s.maxInvestment) : 'No limit' },
  { key: 'tax', label: 'Tax Status', getValue: s => s.taxBenefit },
  { key: '80c', label: '80C Deduction', getValue: s => s.section80CLimit ? `Up to ${formatCurrency(s.section80CLimit)}` : 'No' },
  { key: 'regime', label: 'Tax Regime', getValue: s => s.taxImplications.regime === 'both' ? 'Old + New' : 'Old only' },
  { key: 'eligibility', label: 'Who can invest', getValue: s => s.eligibility.category },
]

export function CompareTable() {
  const [selected, setSelected] = useState<string[]>(['ppf', 'nps', 'epf'])

  const toggleScheme = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const selectedSchemes = schemes.filter(s => selected.includes(s.id))

  return (
    <div className="space-y-6">
      {/* Selector */}
      <div className="flex gap-2 flex-wrap">
        {schemes.map(s => (
          <button
            key={s.id}
            onClick={() => toggleScheme(s.id)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
              selected.includes(s.id)
                ? 'border-transparent text-white'
                : 'border-navy/10 dark:border-midnight-border text-navy/50 dark:text-white/40 hover:border-navy/30'
            )}
            style={selected.includes(s.id) ? { backgroundColor: s.color } : undefined}
          >
            {s.name}
          </button>
        ))}
        <span className="text-xs text-navy/30 dark:text-white/20 self-center ml-2">
          Select up to 4
        </span>
      </div>

      {selectedSchemes.length < 2 ? (
        <p className="text-sm text-navy/40 dark:text-white/30">Select at least 2 schemes to compare.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-navy/40 dark:text-white/30 font-medium w-[180px]">Attribute</th>
                  {selectedSchemes.map(s => (
                    <th key={s.id} className="text-left py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-lg text-white text-[10px] font-bold flex items-center justify-center"
                          style={{ backgroundColor: s.color }}
                        >
                          {s.name.slice(0, 3)}
                        </div>
                        <span className="font-heading font-semibold text-navy dark:text-white">{s.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr, i) => (
                  <tr key={attr.key} className={i % 2 === 0 ? 'bg-navy/[0.02] dark:bg-white/[0.02]' : ''}>
                    <td className="py-3 px-4 text-navy/50 dark:text-white/40 font-medium">{attr.label}</td>
                    {selectedSchemes.map(s => (
                      <td key={s.id} className="py-3 px-4 text-navy/70 dark:text-white/60">
                        {attr.getValue(s)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {attributes.map(attr => (
              <div key={attr.key} className="p-4 rounded-xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
                <div className="text-xs font-medium text-navy/40 dark:text-white/30 uppercase mb-2">{attr.label}</div>
                <div className="space-y-2">
                  {selectedSchemes.map(s => (
                    <div key={s.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: s.color }}>{s.name}</span>
                      <span className="text-sm text-navy/70 dark:text-white/60">{attr.getValue(s)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
