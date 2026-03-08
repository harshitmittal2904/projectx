import type { YearlyProjection, NPSResult, TaxResult } from '@/types/calculator'

export function calculatePPF(params: {
  annualInvestment: number
  years: number
  rate: number
}): YearlyProjection[] {
  const { annualInvestment, years, rate } = params
  const r = rate / 100
  const projections: YearlyProjection[] = []
  let balance = 0
  let totalInvested = 0

  for (let year = 1; year <= years; year++) {
    totalInvested += annualInvestment
    const interest = (balance + annualInvestment) * r
    balance = balance + annualInvestment + interest
    projections.push({
      year,
      investment: totalInvested,
      interest: balance - totalInvested,
      balance: Math.round(balance),
    })
  }

  return projections
}

export function calculateNPS(params: {
  monthlyContribution: number
  currentAge: number
  retirementAge: number
  expectedReturn: number
  annuityRate: number
  annuityPercentage: number
}): NPSResult {
  const { monthlyContribution, currentAge, retirementAge, expectedReturn, annuityRate, annuityPercentage } = params
  const years = retirementAge - currentAge
  const monthlyRate = expectedReturn / 100 / 12
  const projections: YearlyProjection[] = []
  let balance = 0
  let totalInvested = 0

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      balance = (balance + monthlyContribution) * (1 + monthlyRate)
    }
    totalInvested += monthlyContribution * 12
    projections.push({
      year,
      investment: totalInvested,
      interest: balance - totalInvested,
      balance: Math.round(balance),
    })
  }

  const corpus = Math.round(balance)
  const annuityCorpus = Math.round(corpus * (annuityPercentage / 100))
  const lumpSum = corpus - annuityCorpus
  const monthlyPension = Math.round((annuityCorpus * (annuityRate / 100)) / 12)

  return { corpus, lumpSum, annuityCorpus, monthlyPension, projections }
}

export function calculateEPF(params: {
  basicSalary: number
  currentAge: number
  retirementAge: number
  rate: number
  salaryGrowthRate: number
}): YearlyProjection[] {
  const { basicSalary, currentAge, retirementAge, rate, salaryGrowthRate } = params
  const years = retirementAge - currentAge
  const monthlyRate = rate / 100 / 12
  const projections: YearlyProjection[] = []
  let balance = 0
  let totalInvested = 0
  let currentSalary = basicSalary

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      const employeeContrib = currentSalary * 0.12
      const employerContrib = currentSalary * 0.0367
      const totalContrib = employeeContrib + employerContrib
      totalInvested += totalContrib
      balance = (balance + totalContrib) * (1 + monthlyRate)
    }
    projections.push({
      year,
      investment: Math.round(totalInvested),
      interest: Math.round(balance - totalInvested),
      balance: Math.round(balance),
    })
    currentSalary *= 1 + salaryGrowthRate / 100
  }

  return projections
}

function calculateIncomeTaxOld(income: number, deductions: number): number {
  const taxableIncome = Math.max(0, income - deductions - 50000) // 50K standard deduction
  const slabs = [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ]

  let tax = 0
  let remaining = taxableIncome

  for (const slab of slabs) {
    const slabAmount = Math.min(remaining, slab.limit - (slabs.indexOf(slab) === 0 ? 0 : slabs[slabs.indexOf(slab) - 1].limit))
    if (slabAmount <= 0) break
    tax += slabAmount * slab.rate
    remaining -= slabAmount
  }

  // 4% health and education cess
  tax *= 1.04
  return Math.round(tax)
}

function calculateIncomeTaxNew(income: number): number {
  const taxableIncome = Math.max(0, income - 75000) // 75K standard deduction in new regime
  const slabs = [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.10 },
    { limit: 1600000, rate: 0.15 },
    { limit: 2000000, rate: 0.20 },
    { limit: 2400000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 },
  ]

  let tax = 0
  let prev = 0

  for (const slab of slabs) {
    const slabAmount = Math.min(taxableIncome, slab.limit) - prev
    if (slabAmount <= 0) break
    tax += slabAmount * slab.rate
    prev = slab.limit
  }

  // Rebate u/s 87A for income up to ₹12L (taxable up to ~₹12.75L with std deduction)
  if (taxableIncome <= 1200000) tax = 0

  tax *= 1.04
  return Math.round(tax)
}

export function calculateTaxSavings(params: {
  income: number
  section80C: number
  section80CCD1B: number
  section80D: number
}): TaxResult {
  const { income, section80C, section80CCD1B, section80D } = params
  const totalDeductions = Math.min(section80C, 150000) + Math.min(section80CCD1B, 50000) + section80D

  const taxOld = calculateIncomeTaxOld(income, totalDeductions)
  const taxNew = calculateIncomeTaxNew(income)

  return {
    taxOld,
    taxNew,
    savings: Math.abs(taxOld - taxNew),
  }
}
