import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculatePPF } from '@/lib/calculator-utils'
import { formatCurrency } from '@/lib/utils'
import { SliderInput } from './SliderInput'
import { SummaryCard } from './SummaryCard'

export function PPFCalculator() {
  const [annual, setAnnual] = useState(100000)
  const [years, setYears] = useState(15)
  const rate = 7.1

  const projections = useMemo(() => calculatePPF({ annualInvestment: annual, years, rate }), [annual, years])
  const final = projections[projections.length - 1]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SummaryCard label="Total Invested" value={`₹${formatCurrency(final?.investment ?? 0)}`} />
        <SummaryCard label="Interest Earned" value={`₹${formatCurrency(final?.interest ?? 0)}`} />
        <SummaryCard label="Maturity Value" value={`₹${formatCurrency(final?.balance ?? 0)}`} accent />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5 p-5 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
          <SliderInput
            label="Annual Investment"
            value={annual}
            min={500}
            max={150000}
            step={5000}
            formatValue={v => `₹${v.toLocaleString('en-IN')}`}
            onChange={setAnnual}
          />
          <SliderInput
            label="Time Period (Years)"
            value={years}
            min={15}
            max={50}
            step={5}
            formatValue={v => `${v} years`}
            onChange={setYears}
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-navy/50 dark:text-white/40">Current PPF Rate</span>
            <span className="font-semibold text-sage">{rate}%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={projections} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(27,42,74,0.1)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="rgba(27,42,74,0.3)" />
              <YAxis tick={{ fontSize: 11 }} stroke="rgba(27,42,74,0.3)" tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip
                formatter={(value: number | undefined) => [`₹${formatCurrency(value ?? 0)}`, '']}
                labelFormatter={l => `Year ${l}`}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="investment" stackId="1" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.3} name="Invested" />
              <Area type="monotone" dataKey="interest" stackId="1" stroke="#059669" fill="#059669" fillOpacity={0.3} name="Interest" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
