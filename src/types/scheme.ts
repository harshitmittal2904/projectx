export type SchemeId = 'nps' | 'ppf' | 'epf' | 'ssy' | 'scss' | 'apy' | 'nsc' | 'sgb'

export type RiskLevel = 'low' | 'moderate' | 'market-linked'

export type TaxBenefit = 'EEE' | 'EET' | 'ETE' | 'none'

export interface SchemeRate {
  current: number
  asOf: string
  historical?: { year: string; rate: number }[]
}

export interface Scheme {
  id: SchemeId
  name: string
  nameHindi: string
  fullName: string
  tagline: string
  icon: string
  color: string

  interestRate: SchemeRate
  minInvestment: number
  maxInvestment: number | null
  lockInYears: number
  maturityYears: number | null
  riskLevel: RiskLevel
  taxBenefit: TaxBenefit
  section80CLimit: number | null

  eligibility: {
    minAge: number | null
    maxAge: number | null
    residency: 'indian-citizen' | 'resident' | 'any'
    gender: 'any' | 'female'
    category: string
  }

  description: string
  benefits: string[]
  howToOpen: string[]
  requiredDocuments: string[]
  withdrawalRules: string[]
  taxImplications: {
    contribution: string
    interest: string
    maturity: string
    regime: 'both' | 'old-only'
  }

  faqs: { question: string; answer: string }[]
  officialPortalUrl: string
  lastUpdated: string
}
