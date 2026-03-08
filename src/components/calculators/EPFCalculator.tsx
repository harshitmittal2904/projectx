import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateEPF } from '@/lib/calculator-utils'
import { formatCurrency } from '@/lib/utils'
import { SliderInput } from './SliderInput'
import { SummaryCard } from './SummaryCard'

export function EPFCalculator() {
  const [basicSalary, setBasicSalary] = useState(40000)
  const [currentAge, setCurrentAge] = useState(28)
  const [salaryGrowth, setSalaryGrowth] = useState(5)
  const rate = 8.25

  const projections = useMemo(
    () => calculateEPF({ basicSalary, currentAge, retirementAge: 58, rate, salaryGrowthRate: salaryGrowth }),
    [basicSalary, currentAge, salaryGrowth]
  )

  const final = projections[projections.length - 1]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SummaryCard label="Total Contributions" value={`₹${formatCurrency(final?.investment ?? 0)}`} />
        <SummaryCard label="Interest Earned" value={`₹${formatCurrency(final?.interest ?? 0)}`} />
        <SummaryCard label="Corpus at 58" value={`₹${formatCurrency(final?.balance ?? 0)}`} accent />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5 p-5 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border">
          <SliderInput
            label="Monthly Basic Salary"
            value={basicSalary}
            min={15000}
            max={200000}
            step={5000}
            formatValue={v => `₹${v.toLocaleString('en-IN')}`}
            onChange={setBasicSalary}
          />
          <SliderInput
            label="Current Age"
            value={currentAge}
            min={22}
            max={55}
            step={1}
            formatValue={v => `${v} years`}
            onChange={setCurrentAge}
          />
          <SliderInput
            label="Annual Salary Growth"
            value={salaryGrowth}
            min={0}
            max={15}
            step={1}
            formatValue={v => `${v}%`}
            onChange={setSalaryGrowth}
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-navy/50 dark:text-white/40">Current EPF Rate</span>
            <span className="font-semibold text-sage">{rate}%</span>
          </div>
          <p className="text-xs text-navy/40 dark:text-white/30">
            Employee: 12% of basic | Employer: 3.67% to EPF (8.33% goes to EPS)
          </p>
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
              <Area type="monotone" dataKey="investment" stackId="1" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.3} name="Contributions" />
              <Area type="monotone" dataKey="interest" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="Interest" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
