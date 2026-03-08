import type { QuizQuestion } from '@/types/quiz'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'age',
    question: 'What is your age group?',
    options: [
      { label: '18-30 years', value: 'young' },
      { label: '31-45 years', value: 'mid' },
      { label: '46-59 years', value: 'senior' },
      { label: '60+ years', value: 'retired' },
    ],
  },
  {
    id: 'employment',
    question: 'What is your employment type?',
    options: [
      { label: 'Salaried (Private)', value: 'salaried-private' },
      { label: 'Government Employee', value: 'government' },
      { label: 'Self-Employed / Business', value: 'self-employed' },
      { label: 'Not Employed / Homemaker', value: 'unemployed' },
    ],
  },
  {
    id: 'risk',
    question: 'What is your risk appetite?',
    options: [
      { label: 'Low — I want guaranteed returns', value: 'low' },
      { label: 'Moderate — Some risk is fine', value: 'moderate' },
      { label: 'High — I want maximum growth', value: 'high' },
    ],
  },
  {
    id: 'goal',
    question: 'What is your primary investment goal?',
    options: [
      { label: 'Retirement planning', value: 'retirement' },
      { label: 'Tax saving', value: 'tax' },
      { label: "Child's future / education", value: 'child' },
      { label: 'Regular income', value: 'income' },
      { label: 'Wealth building / long-term growth', value: 'wealth' },
    ],
  },
  {
    id: 'horizon',
    question: 'For how long can you lock in your money?',
    options: [
      { label: 'Less than 5 years', value: 'short' },
      { label: '5-10 years', value: 'medium' },
      { label: '10-20 years', value: 'long' },
      { label: '20+ years', value: 'very-long' },
    ],
  },
  {
    id: 'regime',
    question: 'Which tax regime are you on?',
    options: [
      { label: 'Old regime (with deductions)', value: 'old' },
      { label: 'New regime (lower rates, no deductions)', value: 'new' },
      { label: "I'm not sure", value: 'unsure' },
    ],
  },
]

export function getSchemeRecommendations(
  answers: Record<string, string>
): { schemeId: string; score: number; reason: string }[] {
  const scores: Record<string, { score: number; reasons: string[] }> = {
    nps: { score: 0, reasons: [] },
    ppf: { score: 0, reasons: [] },
    epf: { score: 0, reasons: [] },
    ssy: { score: 0, reasons: [] },
    scss: { score: 0, reasons: [] },
    apy: { score: 0, reasons: [] },
    nsc: { score: 0, reasons: [] },
    sgb: { score: 0, reasons: [] },
  }

  // Age-based scoring
  if (answers.age === 'young') {
    scores.nps.score += 3; scores.nps.reasons.push('Great for long-term retirement building at a young age')
    scores.ppf.score += 3; scores.ppf.reasons.push('15-year lock-in aligns well with young investors')
    scores.apy.score += 2; scores.apy.reasons.push('Lower contributions when you start young')
    scores.sgb.score += 2; scores.sgb.reasons.push('Long horizon suits gold as a diversifier')
  } else if (answers.age === 'mid') {
    scores.nps.score += 3; scores.nps.reasons.push('Still enough years to build a solid corpus')
    scores.ppf.score += 2; scores.ppf.reasons.push('Safe guaranteed returns for medium-term')
    scores.nsc.score += 2; scores.nsc.reasons.push('5-year lock-in suits your timeline')
  } else if (answers.age === 'senior') {
    scores.ppf.score += 1; scores.ppf.reasons.push('Consider if you have 15+ years to maturity')
    scores.nsc.score += 3; scores.nsc.reasons.push('Short 5-year lock-in suits pre-retirement planning')
    scores.scss.score += 1; scores.scss.reasons.push('Will be available once you turn 60')
  } else if (answers.age === 'retired') {
    scores.scss.score += 5; scores.scss.reasons.push('Designed specifically for senior citizens with quarterly income')
    scores.sgb.score += 1; scores.sgb.reasons.push('Gold as a safe diversifier')
  }

  // Employment-based
  if (answers.employment === 'salaried-private') {
    scores.epf.score += 3; scores.epf.reasons.push('You likely already have EPF — maximize employer matching')
    scores.nps.score += 2; scores.nps.reasons.push('Additional NPS for extra tax benefit under 80CCD(1B)')
  } else if (answers.employment === 'self-employed') {
    scores.nps.score += 3; scores.nps.reasons.push('Best retirement option for self-employed — no EPF available')
    scores.ppf.score += 3; scores.ppf.reasons.push('Safe guaranteed option without employer contribution')
  }

  // Risk-based
  if (answers.risk === 'low') {
    scores.ppf.score += 3; scores.ppf.reasons.push('Zero risk with government guarantee')
    scores.scss.score += 2; scores.scss.reasons.push('Government-backed fixed returns')
    scores.nsc.score += 2; scores.nsc.reasons.push('Fixed guaranteed returns')
  } else if (answers.risk === 'moderate') {
    scores.sgb.score += 2; scores.sgb.reasons.push('Moderate risk with gold price + 2.5% interest')
    scores.nps.score += 2; scores.nps.reasons.push('Balanced allocation option available')
  } else if (answers.risk === 'high') {
    scores.nps.score += 3; scores.nps.reasons.push('Up to 75% equity allocation for aggressive growth')
  }

  // Goal-based
  if (answers.goal === 'retirement') {
    scores.nps.score += 4; scores.nps.reasons.push('Purpose-built for retirement savings')
    scores.epf.score += 2; scores.epf.reasons.push('Core retirement benefit for salaried')
    scores.ppf.score += 2; scores.ppf.reasons.push('Safe retirement supplement')
  } else if (answers.goal === 'tax') {
    scores.ppf.score += 3; scores.ppf.reasons.push('EEE status — completely tax-free returns')
    scores.nps.score += 3; scores.nps.reasons.push('Extra ₹50K deduction under 80CCD(1B)')
    scores.nsc.score += 2; scores.nsc.reasons.push('Accrued interest also eligible for 80C')
  } else if (answers.goal === 'child') {
    scores.ssy.score += 5; scores.ssy.reasons.push("India's best scheme for daughter's future — highest rate + EEE")
    scores.ppf.score += 2; scores.ppf.reasons.push('Tax-free corpus for child\'s education/marriage')
  } else if (answers.goal === 'income') {
    scores.scss.score += 4; scores.scss.reasons.push('Quarterly interest payout for regular income')
    scores.sgb.score += 2; scores.sgb.reasons.push('Semi-annual 2.5% interest payments')
  }

  // Horizon-based
  if (answers.horizon === 'short') {
    scores.nsc.score += 3; scores.nsc.reasons.push('5-year maturity fits short horizon')
    scores.scss.score += 2; scores.scss.reasons.push('5-year maturity with regular income')
  } else if (answers.horizon === 'long' || answers.horizon === 'very-long') {
    scores.ppf.score += 3; scores.ppf.reasons.push('15-year compounding maximizes returns')
    scores.nps.score += 3; scores.nps.reasons.push('Longer horizon = more compounding benefit')
  }

  // Tax regime
  if (answers.regime === 'new') {
    scores.nps.score += 3; scores.nps.reasons.push('80CCD(1B) deduction works in new regime too!')
    // Reduce scores for schemes that only benefit in old regime
    scores.ppf.score -= 1
    scores.nsc.score -= 1
  }

  return Object.entries(scores)
    .map(([schemeId, { score, reasons }]) => ({
      schemeId,
      score,
      reason: reasons[0] || 'May suit your profile',
    }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
}
