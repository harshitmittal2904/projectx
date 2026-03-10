import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { cn } from '@/lib/utils'

interface GlossaryTerm {
  term: string
  termHindi?: string
  definition: string
  category: string
}

const glossaryTerms: GlossaryTerm[] = [
  { term: 'EEE (Exempt-Exempt-Exempt)', termHindi: 'तीन छूट', definition: 'Investment, returns, and withdrawal are all tax-free. PPF and SSY enjoy EEE status.', category: 'Tax' },
  { term: 'EET (Exempt-Exempt-Taxed)', termHindi: 'दो छूट एक कर', definition: 'Investment and returns are tax-free, but withdrawal is taxed. NPS follows EET (partially).', category: 'Tax' },
  { term: 'Section 80C', definition: 'Income Tax Act section allowing deductions up to ₹1.5 lakh per year for investments in PPF, ELSS, NSC, life insurance, etc.', category: 'Tax' },
  { term: 'Section 80CCD(1B)', definition: 'Additional ₹50,000 deduction for NPS contributions, over and above Section 80C limit.', category: 'Tax' },
  { term: 'AIS (Annual Information Statement)', definition: 'Comprehensive tax statement from Income Tax department showing all financial transactions in a year.', category: 'Tax' },
  { term: 'PRAN (Permanent Retirement Account Number)', termHindi: 'स्थायी सेवानिवृत्ति खाता संख्या', definition: 'Unique 12-digit number assigned to every NPS subscriber. Required for all NPS transactions.', category: 'NPS' },
  { term: 'Tier-I Account', definition: 'Primary NPS account with lock-in until age 60. Mandatory for NPS enrollment. Tax benefits apply.', category: 'NPS' },
  { term: 'Tier-II Account', definition: 'Voluntary NPS savings account with no lock-in. No tax benefits (except govt employees). Requires active Tier-I.', category: 'NPS' },
  { term: 'Annuity', termHindi: 'वार्षिकी', definition: 'Regular pension payment purchased with a portion of NPS corpus at retirement. Minimum 40% of corpus must buy annuity.', category: 'NPS' },
  { term: 'UAN (Universal Account Number)', termHindi: 'सार्वभौमिक खाता संख्या', definition: '12-digit unique number for EPF members. Remains same even when changing jobs. Links all Member IDs.', category: 'EPF' },
  { term: 'EPF (Employees\' Provident Fund)', termHindi: 'कर्मचारी भविष्य निधि', definition: 'Mandatory retirement savings for salaried employees earning up to ₹15,000/month. 12% employee + 12% employer contribution.', category: 'EPF' },
  { term: 'VPF (Voluntary Provident Fund)', definition: 'Additional voluntary contribution to EPF beyond mandatory 12%. Same interest rate as EPF, with 80C benefits.', category: 'EPF' },
  { term: 'PPF (Public Provident Fund)', termHindi: 'सार्वजनिक भविष्य निधि', definition: 'Government-backed long-term savings scheme with 15-year lock-in. EEE tax status. Current rate ~7.1% p.a.', category: 'PPF' },
  { term: 'NSC (National Savings Certificate)', termHindi: 'राष्ट्रीय बचत पत्र', definition: 'Fixed-income post office savings with 5-year lock-in. Interest compounded annually but taxable. 80C eligible.', category: 'Savings' },
  { term: 'SSY (Sukanya Samriddhi Yojana)', termHindi: 'सुकन्या समृद्धि योजना', definition: 'Savings scheme for girl children under 10. Highest fixed-rate among small savings. 21-year maturity. EEE status.', category: 'Savings' },
  { term: 'SCSS (Senior Citizens Savings Scheme)', termHindi: 'वरिष्ठ नागरिक बचत योजना', definition: 'Savings scheme for citizens 60+. Quarterly interest payout. 5-year tenure, extendable by 3 years. 80C eligible.', category: 'Savings' },
  { term: 'SGB (Sovereign Gold Bond)', termHindi: 'सॉवरेन गोल्ड बॉन्ड', definition: 'Government securities denominated in grams of gold. 2.5% annual interest + gold price appreciation. 8-year tenure.', category: 'Savings' },
  { term: 'APY (Atal Pension Yojana)', termHindi: 'अटल पेंशन योजना', definition: 'Government pension scheme for unorganized sector workers aged 18-40. Guaranteed monthly pension of ₹1,000-5,000.', category: 'Pension' },
  { term: 'KVP (Kisan Vikas Patra)', termHindi: 'किसान विकास पत्र', definition: 'Post office savings certificate that doubles your money. Current maturity ~115 months at 7.5% compounding.', category: 'Savings' },
  { term: 'POMIS (Post Office Monthly Income Scheme)', termHindi: 'डाकघर मासिक आय योजना', definition: 'Fixed-income scheme paying monthly interest. Max ₹9L (single) / ₹15L (joint). 5-year tenure.', category: 'Savings' },
  { term: 'Corpus', termHindi: 'कोष', definition: 'Total accumulated amount in an investment, including principal and returns.', category: 'General' },
  { term: 'Lock-in Period', termHindi: 'लॉक-इन अवधि', definition: 'Minimum period during which you cannot withdraw your investment without penalty.', category: 'General' },
  { term: 'Compounding', termHindi: 'चक्रवृद्धि', definition: 'Earning returns on your returns. Interest is calculated on principal + accumulated interest. "Interest on interest."', category: 'General' },
  { term: 'Maturity', termHindi: 'परिपक्वता', definition: 'The date when an investment reaches its full term and you can withdraw the complete amount.', category: 'General' },
  { term: 'Nomination', termHindi: 'नामांकन', definition: 'Designating a person who receives the investment proceeds in case of the account holder\'s death.', category: 'General' },
  { term: 'CPGRAMS', definition: 'Centralized Public Grievance Redress and Monitoring System. Government portal for filing complaints about any ministry.', category: 'Grievance' },
  { term: 'Ombudsman', termHindi: 'लोकपाल', definition: 'Independent authority for resolving complaints. Banking Ombudsman handles bank-related scheme grievances.', category: 'Grievance' },
]

const categories = ['All', ...Array.from(new Set(glossaryTerms.map(t => t.category)))]

export function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return glossaryTerms
      .filter(t => category === 'All' || t.category === category)
      .filter(t =>
        search === '' ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.term.localeCompare(b.term))
  }, [search, category])

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <PageHeader
        title="Jargon Buster"
        description="Plain-English explanations of financial terms used in government schemes."
      />

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/30 dark:text-white/30" />
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-midnight-card border border-navy/10 dark:border-midnight-border text-sm text-navy dark:text-white placeholder:text-navy/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-saffron/30"
        />
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0',
              category === c
                ? 'bg-navy text-white dark:bg-saffron dark:text-navy'
                : 'bg-white dark:bg-midnight-card text-navy/60 dark:text-white/50 border border-navy/10 dark:border-midnight-border'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
        {filtered.map((term, i) => (
          <div
            key={term.term}
            className={`animate-fade-in-up stagger-${Math.min(i + 1, 6)} p-4 rounded-2xl bg-white dark:bg-midnight-card border border-navy/5 dark:border-midnight-border`}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="font-heading font-semibold text-sm text-navy dark:text-white">{term.term}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-navy/5 dark:bg-white/10 text-navy/40 dark:text-white/30 shrink-0">
                {term.category}
              </span>
            </div>
            {term.termHindi && (
              <div className="text-xs text-navy/30 dark:text-white/20 mb-1.5">{term.termHindi}</div>
            )}
            <p className="text-sm text-navy/60 dark:text-white/50 leading-relaxed">{term.definition}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-navy/40 dark:text-white/30">
          No terms found for "{search}"
        </div>
      )}
    </div>
  )
}
