import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, RotateCcw, Trophy } from 'lucide-react'
import { quizQuestions, getSchemeRecommendations } from '@/data/quiz-questions'
import { schemes } from '@/data/schemes'
import { cn } from '@/lib/utils'

export function QuizFlow() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = quizQuestions[step]
  const totalSteps = quizQuestions.length

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)

    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      setShowResults(true)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setShowResults(false)
  }

  if (showResults) {
    const recommendations = getSchemeRecommendations(answers)

    return (
      <div className="max-w-2xl animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-7 h-7 text-saffron" />
          </div>
          <h2 className="font-heading text-xl font-bold text-navy dark:text-white mb-2">
            Your Personalized Recommendations
          </h2>
          <p className="text-sm text-navy/50 dark:text-white/40">
            Based on your profile, here are the best schemes for you
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {recommendations.map((rec, i) => {
            const scheme = schemes.find(s => s.id === rec.schemeId)
            if (!scheme) return null
            return (
              <Link
                key={rec.schemeId}
                to={`/schemes/${rec.schemeId}`}
                className={`card-hover animate-fade-in-up stagger-${i + 1} flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: scheme.color }}>
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-heading font-semibold text-navy dark:text-white">
                    {scheme.name} — {scheme.fullName}
                  </div>
                  <div className="text-sm text-navy/50 dark:text-white/40 mt-0.5">{rec.reason}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-navy/20 dark:text-white/20 shrink-0" />
              </Link>
            )
          })}
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 text-sm font-medium text-saffron-dark dark:text-saffron hover:underline mx-auto"
        >
          <RotateCcw className="w-4 h-4" /> Take the quiz again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl animate-fade-in-up">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              i <= step ? 'bg-saffron' : 'bg-navy/10 dark:bg-white/10'
            )}
          />
        ))}
      </div>

      <div className="text-xs text-navy/40 dark:text-white/30 mb-2">
        Question {step + 1} of {totalSteps}
      </div>

      <h2 className="font-heading text-xl font-bold text-navy dark:text-white mb-6">
        {currentQuestion.question}
      </h2>

      <div className="space-y-2 mb-8">
        {currentQuestion.options.map(option => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className={cn(
              'w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all border',
              answers[currentQuestion.id] === option.value
                ? 'bg-saffron/10 border-saffron text-saffron-dark dark:text-saffron'
                : 'bg-white dark:bg-midnight-card border-navy/10 dark:border-midnight-border text-navy/70 dark:text-white/60 hover:border-saffron/50'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="flex items-center gap-2 text-sm text-navy/50 dark:text-white/40 hover:text-navy dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
      )}
    </div>
  )
}
