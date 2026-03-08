export interface YearlyProjection {
  year: number
  investment: number
  interest: number
  balance: number
}

export interface NPSResult {
  corpus: number
  lumpSum: number
  annuityCorpus: number
  monthlyPension: number
  projections: YearlyProjection[]
}

export interface TaxResult {
  taxOld: number
  taxNew: number
  savings: number
}
