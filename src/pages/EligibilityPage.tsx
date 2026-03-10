import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, XCircle, ArrowRight, User, Briefcase, Calendar } from 'lucide-react'
import { schemes } from '@/data/schemes'
import { PageHeader } from '@/components/shared/PageHeader'
import { cn } from '@/lib/utils'
import type { Scheme } from '@/types/scheme'

interface UserProfile {
  age: number
  gender: 'male' | 'female'
  residency: 'indian-citizen' | 'nri'
  employment: 'salaried' | 'self-employed' | 'retired' | 'student'
  hasGirlChild: boolean
}

function checkEligibility(scheme: Scheme, profile: UserProfile): { eligible: boolean; reason: string } {
  const { eligibility } = scheme

  if (eligibility.minAge && profile.age < eligibility.minAge) {
    return { eligible: false, reason: `Minimum age is ${eligibility.minAge} years` }
  }
  if (eligibility.maxAge && profile.age > eligibility.maxAge) {
    return { eligible: false, reason: `Maximum age is ${eligibility.maxAge} years` }
  }
  if (eligibility.gender === 'female' && profile.gender !== 'female' && !profile.hasGirlChild) {
    return { eligible: false, reason: 'Only for girl children / female account holders' }
  }
  if (eligibility.residency === 'indian-citizen' && profile.residency === 'nri') {
    return { eligible: false, reason: 'Only for Indian residents' }
  }
  if (scheme.id === 'epf' && profile.employment !== 'salaried') {
    return { eligible: false, reason: 'Only for salaried employees' }
  }
  if (scheme.id === 'scss' && profile.age < 60) {
    return { eligible: false, reason: 'Only for citizens aged 60+' }
  }
  if (scheme.id === 'nps-vatsalya' && profile.age >= 18) {
    return { eligible: false, reason: 'Only for minors (0-18 years)' }
  }

  return { eligible: true, reason: 'You are eligible for this scheme' }
}

export function EligibilityPage() {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    gender: 'male',
    residency: 'indian-citizen',
    employment: 'salaried',
    hasGirlChild: false,
  })
  const [showResults, setShowResults] = useState(false)

  const handleCheck = () => {
    setShowResults(true)
    setStep(4)
  }

  const eligibleSchemes = schemes.filter(s => checkEligibility(s, profile).eligible)
  const ineligibleSchemes = schemes.filter(s => !checkEligibility(s, profile).eligible)

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <PageHeader
        title="Eligibility Checker"
        description="Find out which government schemes you qualify for based on your profile."
      />

      {!showResults ? (
        <div className="max-w-lg mx-auto">
          {/* Progress */}
          <div className="flex gap-1 mb-8">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={cn(
                  'h-1 flex-1 rounded-full transition-all duration-300',
                  i <= step ? 'bg-saffron' : 'bg-navy/10 dark:bg-white/10'
                )}
              />
            ))}
          </div>

          <div className="animate-fade-in-up">
            {step === 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-saffron-dark dark:text-saffron" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-navy dark:text-white">What is your age?</h3>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={profile.age}
                  onChange={e => setProfile(p => ({ ...p, age: +e.target.value }))}
                  className="w-full h-2 bg-navy/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer"
                />
                <div className="text-center text-2xl font-heading font-bold text-navy dark:text-white">
                  {profile.age} years
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-3 rounded-xl bg-navy text-white dark:bg-saffron dark:text-navy font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                >
                  Next
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-saffron-dark dark:text-saffron" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-navy dark:text-white">Your details</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-navy/70 dark:text-white/60 mb-2 block">Gender</label>
                    <div className="flex gap-2">
                      {(['male', 'female'] as const).map(g => (
                        <button
                          key={g}
                          onClick={() => setProfile(p => ({ ...p, gender: g }))}
                          className={cn(
                            'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border',
                            profile.gender === g
                              ? 'bg-navy text-white dark:bg-saffron dark:text-navy border-transparent'
                              : 'bg-white dark:bg-midnight-card text-navy/60 dark:text-white/50 border-navy/10 dark:border-midnight-border'
                          )}
                        >
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy/70 dark:text-white/60 mb-2 block">Do you have a girl child (under 10)?</label>
                    <div className="flex gap-2">
                      {[true, false].map(v => (
                        <button
                          key={String(v)}
                          onClick={() => setProfile(p => ({ ...p, hasGirlChild: v }))}
                          className={cn(
                            'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border',
                            profile.hasGirlChild === v
                              ? 'bg-navy text-white dark:bg-saffron dark:text-navy border-transparent'
                              : 'bg-white dark:bg-midnight-card text-navy/60 dark:text-white/50 border-navy/10 dark:border-midnight-border'
                          )}
                        >
                          {v ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(0)} className="flex-1 py-3 rounded-xl border border-navy/10 dark:border-midnight-border text-navy/60 dark:text-white/50 font-medium transition-all duration-200">Back</button>
                  <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl bg-navy text-white dark:bg-saffron dark:text-navy font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]">Next</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-saffron-dark dark:text-saffron" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-navy dark:text-white">Employment status</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: 'salaried', label: 'Salaried' },
                    { value: 'self-employed', label: 'Self-Employed' },
                    { value: 'retired', label: 'Retired' },
                    { value: 'student', label: 'Student' },
                  ] as const).map(e => (
                    <button
                      key={e.value}
                      onClick={() => setProfile(p => ({ ...p, employment: e.value }))}
                      className={cn(
                        'py-3 rounded-xl text-sm font-medium transition-all duration-200 border',
                        profile.employment === e.value
                          ? 'bg-navy text-white dark:bg-saffron dark:text-navy border-transparent'
                          : 'bg-white dark:bg-midnight-card text-navy/60 dark:text-white/50 border-navy/10 dark:border-midnight-border'
                      )}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-navy/10 dark:border-midnight-border text-navy/60 dark:text-white/50 font-medium transition-all duration-200">Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl bg-navy text-white dark:bg-saffron dark:text-navy font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]">Next</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-saffron-dark dark:text-saffron" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-navy dark:text-white">Residency status</h3>
                </div>
                <div className="flex gap-2">
                  {([
                    { value: 'indian-citizen', label: 'Indian Resident' },
                    { value: 'nri', label: 'NRI' },
                  ] as const).map(r => (
                    <button
                      key={r.value}
                      onClick={() => setProfile(p => ({ ...p, residency: r.value }))}
                      className={cn(
                        'flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 border',
                        profile.residency === r.value
                          ? 'bg-navy text-white dark:bg-saffron dark:text-navy border-transparent'
                          : 'bg-white dark:bg-midnight-card text-navy/60 dark:text-white/50 border-navy/10 dark:border-midnight-border'
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-navy/10 dark:border-midnight-border text-navy/60 dark:text-white/50 font-medium transition-all duration-200">Back</button>
                  <button onClick={handleCheck} className="flex-1 py-3 rounded-xl bg-saffron text-navy font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]">Check Eligibility</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <div className="mb-6 p-4 rounded-2xl bg-sage/5 dark:bg-sage/10 border border-sage/10">
            <div className="text-sm text-sage dark:text-sage-light font-medium mb-1">
              You're eligible for {eligibleSchemes.length} out of {schemes.length} schemes
            </div>
            <div className="text-xs text-navy/50 dark:text-white/40">
              {profile.age} years old · {profile.gender} · {profile.employment} · {profile.residency === 'indian-citizen' ? 'Indian Resident' : 'NRI'}
            </div>
          </div>

          <button
            onClick={() => { setShowResults(false); setStep(0) }}
            className="text-sm text-saffron-dark dark:text-saffron hover:underline mb-6 block"
          >
            ← Change profile
          </button>

          {/* Eligible */}
          <h3 className="font-heading font-semibold text-navy dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-sage" /> Eligible Schemes
          </h3>
          <div className="space-y-2 mb-8">
            {eligibleSchemes.map(scheme => (
              <Link
                key={scheme.id}
                to={`/schemes/${scheme.id}`}
                className="card-hover flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: scheme.color }}
                >
                  {scheme.name.slice(0, 3)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-navy dark:text-white">{scheme.fullName}</div>
                  <div className="text-xs text-navy/40 dark:text-white/30">{scheme.tagline}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-navy/20 dark:text-white/20 shrink-0" />
              </Link>
            ))}
          </div>

          {/* Ineligible */}
          {ineligibleSchemes.length > 0 && (
            <>
              <h3 className="font-heading font-semibold text-navy/50 dark:text-white/40 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" /> Not Eligible
              </h3>
              <div className="space-y-2">
                {ineligibleSchemes.map(scheme => {
                  const { reason } = checkEligibility(scheme, profile)
                  return (
                    <div
                      key={scheme.id}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-midnight-card/50 border border-navy/5 dark:border-midnight-border opacity-60"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 grayscale"
                        style={{ backgroundColor: scheme.color }}
                      >
                        {scheme.name.slice(0, 3)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-navy dark:text-white">{scheme.fullName}</div>
                        <div className="text-xs text-red-500 dark:text-red-400">{reason}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
