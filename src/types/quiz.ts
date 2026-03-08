export interface QuizOption {
  label: string
  value: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
}

export interface QuizResult {
  schemeId: string
  score: number
  reason: string
}
