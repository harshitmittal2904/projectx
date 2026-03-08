import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateNPS } from '@/lib/calculator-utils'
import { formatCurrency } from '@/lib/utils'
import { SliderInput } from './SliderInput'
import { SummaryCard } from './SummaryCard'

export function NPSCalculator() {
  const [monthly, setMonthly] = useState(5000)
  const [currentAge, setCurrentAge] = useState(30)
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [annuityPercent, setAnnuityPercent] = useState(40)

  const result = useMemo(
    () => calculateNPS({
      monthlyContribution: monthly,
      currentAge,
      retirementAge: 60,
      expectedReturn,
      annuityRate: 6,
      annuityPercentage: annuityPercent,
    }),
    [monthly, currentAge, expectedReturn, annuityPercent]
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryCard label="Total Corpus at 60" value={`₹${formatCurrency(result.corpus)}`} accent />
        <SummaryCard label="Lump Sum (Tax-Free)" value={`₹${formatCurrency(result.lumpSum)}`} />
        <SummaryCard label="Annuity Corpus" value={`₹${formatCurrency(result.annuityCorpus)}`} />
        <SummaryCard label="Est. Monthly Pension" value={`₹${result.monthlyPension.toLocaleString('en-IN')}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5 p-5 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
          <SliderInput
            label="Monthly Contribution"
            value={monthly}
            min={500}
            max={50000}
            step={500}
            formatValue={v => `₹${v.toLocaleString('en-IN')}`}
            onChange={setMonthly}
          />
          <SliderInput
            label="Current Age"
            value={currentAge}
            min={18}
            max={55}
            step={1}
            formatValue={v => `${v} years`}
            onChange={setCurrentAge}
          />
          <SliderInput
            label="Expected Annual Return"
            value={expectedReturn}
            min={6}
            max={14}
            step={0.5}
            formatValue={v => `${v}%`}
            onChange={setExpectedReturn}
          />
          <SliderInput
            label="Annuity Percentage"
            value={annuityPercent}
            min={40}
            max={100}
            step={5}
            formatValue={v => `${v}%`}
            onChange={setAnnuityPercent}
          />
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={result.projections} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(27,42,74,0.1)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="rgba(27,42,74,0.3)" />
              <YAxis tick={{ fontSize: 11 }} stroke="rgba(27,42,74,0.3)" tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip
                formatter={(value: number | undefined) => [`₹${formatCurrency(value ?? 0)}`, '']}
                labelFormatter={l => `Year ${l}`}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="investment" stackId="1" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.3} name="Invested" />
              <Area type="monotone" dataKey="interest" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Returns" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
