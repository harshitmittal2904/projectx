import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { calculateTaxSavings } from '@/lib/calculator-utils'
import { formatCurrency } from '@/lib/utils'
import { SliderInput } from './SliderInput'
import { SummaryCard } from './SummaryCard'

export function TaxSavingsCalculator() {
  const [income, setIncome] = useState(1200000)
  const [section80C, setSection80C] = useState(150000)
  const [section80CCD1B, setSection80CCD1B] = useState(50000)
  const [section80D, setSection80D] = useState(25000)

  const result = useMemo(
    () => calculateTaxSavings({ income, section80C, section80CCD1B, section80D }),
    [income, section80C, section80CCD1B, section80D]
  )

  const chartData = [
    { regime: 'Old Regime', tax: result.taxOld },
    { regime: 'New Regime', tax: result.taxNew },
  ]
  const colors = ['#1B2A4A', '#F59E0B']
  const betterRegime = result.taxOld <= result.taxNew ? 'Old Regime' : 'New Regime'

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SummaryCard label="Tax (Old Regime)" value={`₹${formatCurrency(result.taxOld)}`} />
        <SummaryCard label="Tax (New Regime)" value={`₹${formatCurrency(result.taxNew)}`} />
        <SummaryCard label={`You save with ${betterRegime}`} value={`₹${formatCurrency(result.savings)}`} accent />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5 p-5 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
          <SliderInput
            label="Annual Income"
            value={income}
            min={300000}
            max={5000000}
            step={50000}
            formatValue={v => `₹${v.toLocaleString('en-IN')}`}
            onChange={setIncome}
          />
          <SliderInput
            label="Section 80C (PPF, EPF, ELSS, LIC)"
            value={section80C}
            min={0}
            max={150000}
            step={10000}
            formatValue={v => `₹${v.toLocaleString('en-IN')}`}
            onChange={setSection80C}
          />
          <SliderInput
            label="Section 80CCD(1B) — NPS Extra"
            value={section80CCD1B}
            min={0}
            max={50000}
            step={5000}
            formatValue={v => `₹${v.toLocaleString('en-IN')}`}
            onChange={setSection80CCD1B}
          />
          <SliderInput
            label="Section 80D (Health Insurance)"
            value={section80D}
            min={0}
            max={100000}
            step={5000}
            formatValue={v => `₹${v.toLocaleString('en-IN')}`}
            onChange={setSection80D}
          />
          <p className="text-xs text-navy/40 dark:text-white/30">
            Note: 80CCD(1B) deduction of ₹50,000 for NPS is available even in the new tax regime.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(27,42,74,0.1)" />
              <XAxis dataKey="regime" tick={{ fontSize: 12 }} stroke="rgba(27,42,74,0.3)" />
              <YAxis tick={{ fontSize: 11 }} stroke="rgba(27,42,74,0.3)" tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip
                formatter={(value: number | undefined) => [`₹${formatCurrency(value ?? 0)}`, 'Tax']}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="tax" radius={[8, 8, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell key={index} fill={colors[index]} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 p-3 rounded-lg bg-sage/5 border border-sage/10 text-sm text-sage dark:text-sage-light text-center">
            <strong>{betterRegime}</strong> saves you ₹{formatCurrency(result.savings)} more
          </div>
        </div>
      </div>
    </div>
  )
}
