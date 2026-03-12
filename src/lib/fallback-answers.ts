interface FallbackRule {
  keywords: string[][]  // OR groups of AND keywords
  answer: string
}

const fallbackRules: FallbackRule[] = [
  {
    keywords: [['epf', 'withdraw'], ['epf', 'claim'], ['pf', 'withdraw']],
    answer: `**How to Withdraw EPF Online:**

1. **Log in** to the UAN Member Portal — [unifiedportal-mem.epfindia.gov.in](https://unifiedportal-mem.epfindia.gov.in)
2. **Check KYC** — Go to Manage → KYC. Ensure Aadhaar, PAN, and Bank are all "Verified" ✅
3. **Update Date of Exit** — View → Service History. If blank, go to Manage → Mark Exit
4. **File Claim** — Online Services → Claim (Form-31, 19, 10C & 10D)
5. **Verify Bank** — Enter last 4 digits of linked account
6. **Select Claim Type:**
   - Form 19 = Full PF withdrawal (need 60+ days unemployment)
   - Form 31 = Partial advance (medical, education, home, etc.)
   - Form 10C = Pension withdrawal
7. **Submit with Aadhaar OTP**
8. **Track** — Online Services → Track Claim Status

⏱️ Auto-settlement in **3 days** for claims up to ₹5 lakh. Larger claims take 10-20 days.

**Common rejection reasons:** Aadhaar name mismatch, bank not verified by employer, Date of Exit not updated.

👉 Check the **Withdrawal Guides** section for the full step-by-step visual guide.

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
  {
    keywords: [['ppf', 'withdraw'], ['ppf', 'maturity'], ['ppf', 'closure']],
    answer: `**PPF Withdrawal Rules:**

**Partial Withdrawal (Form C):**
- Available from the **7th financial year** (after completing 5 years)
- Maximum: 50% of balance at end of 4th preceding year
- Only **one** partial withdrawal per financial year
- 100% **tax-free**

**Full Maturity (15 years):**
- Visit your bank/post office with Form C and passbook
- Entire balance credited to bank account — **100% tax-free** (EEE status)

**Premature Closure (after 5 years):**
- Only for: serious illness, higher education, NRI status change
- Penalty: 1% reduction in interest rate for entire tenure
- Submit Form 5 with supporting documents

💡 **Pro Tip:** Deposit before the 5th of each month — interest is calculated on the lowest balance between 5th and last day.

👉 Check the **Withdrawal Guides** section for detailed steps.

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
  {
    keywords: [['nps', 'withdraw'], ['nps', 'exit'], ['nps', 'retirement']],
    answer: `**NPS Withdrawal Options:**

**Partial Withdrawal (25% of own contributions):**
- After 3 years in NPS
- For: education, marriage, medical, home purchase, critical illness
- Maximum **4 partial withdrawals** in your lifetime
- Apply via CRA portal (cra-nsdl.com)

**At Retirement (Age 60):**
- Non-govt: Up to **80% lump sum** (60% tax-free), min 20% into annuity
- Govt: Up to **60% lump sum** (tax-free), min 40% into annuity
- If corpus ≤ ₹8 lakh: **100% lump sum** allowed, no annuity needed
- Can stay invested until age 75

**Premature Exit (Before 60):**
- After 5 years: Up to 20% lump sum, 80% into annuity
- If corpus ≤ ₹2.5 lakh: 100% lump sum allowed

👉 Check the **Withdrawal Guides** section for the full step-by-step process.

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
  {
    keywords: [['nps', 'ppf'], ['ppf', 'nps']],
    answer: `**NPS vs PPF Comparison:**

| Feature | NPS | PPF |
|---------|-----|-----|
| **Returns** | Market-linked (9-12% historical) | Fixed 7.1% p.a. |
| **Risk** | Moderate (equity exposure) | Zero (govt guaranteed) |
| **Lock-in** | Until age 60 | 15 years |
| **Tax on Investment** | 80C + extra ₹50K under 80CCD(1B) | 80C (up to ₹1.5L) |
| **Tax on Returns** | 60% of lump sum tax-free | 100% tax-free (EEE) |
| **Withdrawal** | Forced annuity (20-40%) | 100% yours at maturity |
| **Flexibility** | Choose equity/debt allocation | Fixed rate, no choice |

**Choose PPF if:** You want guaranteed, tax-free returns with zero risk.
**Choose NPS if:** You want higher growth potential and are comfortable with market risk.
**Best strategy:** Many investors use **both** — PPF for safety + NPS for growth.

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
  {
    keywords: [['tax', 'old'], ['tax', 'new'], ['tax', 'regime'], ['80c']],
    answer: `**Old vs New Tax Regime for Government Schemes:**

**Old Regime:**
- ✅ Section 80C deductions up to ₹1.5 lakh (PPF, EPF, ELSS, NPS, NSC, SSY)
- ✅ Extra ₹50,000 NPS deduction under 80CCD(1B)
- ✅ HRA, home loan interest deductions
- Total NPS tax benefit up to ₹2 lakh

**New Regime (Default from FY 2024-25):**
- ❌ NO Section 80C deductions
- ✅ Employer NPS contribution under 80CCD(2) up to 14% salary — still allowed
- ✅ Standard deduction: ₹75,000 (vs ₹50,000 in old)
- ✅ No tax if income ≤ ₹12 lakh (Section 87A rebate)

**Key Points:**
- PPF maturity and interest remain **tax-free under both regimes**
- EPF interest on contributions above ₹2.5L/year is taxable (since FY 2021-22)
- If your total deductions exceed ~₹3.75 lakh, old regime is likely better

👉 Use the **Tax Savings Calculator** to compare both regimes with your actual numbers.

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
  {
    keywords: [['epf', 'balance'], ['epf', 'check'], ['epf', 'passbook'], ['pf', 'balance']],
    answer: `**Check EPF Balance — 4 Ways:**

1. **Online Portal:** Log in to [unifiedportal-mem.epfindia.gov.in](https://unifiedportal-mem.epfindia.gov.in) → View → Passbook
2. **SMS:** Send **EPFOHO UAN** to **7738299899** (from registered mobile)
3. **Missed Call:** Dial **9966044425** from registered mobile
4. **UMANG App:** Download UMANG → EPFO → View Passbook

Your passbook shows monthly contributions from both you and your employer, plus interest credited.

💡 Interest is usually credited in November-December for the previous financial year.

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
  {
    keywords: [['ssy', 'withdraw'], ['sukanya', 'withdraw']],
    answer: `**SSY (Sukanya Samriddhi) Withdrawal Rules:**

**Partial Withdrawal (at age 18):**
- Up to **50%** of previous year's closing balance
- Only for higher education expenses
- Submit admission proof / fee receipt

**Full Maturity (21 years from opening):**
- Complete balance (principal + interest) paid out
- 100% **tax-free** (EEE status)
- Can close after girl's marriage if she's 18+

**Premature Closure:**
- After 5 years: For medical emergency of account holder or death of guardian
- Interest rate reduced by 1.5%

💡 Account must have minimum ₹250 deposit per year to stay active.

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
  {
    keywords: [['scss', 'withdraw'], ['senior', 'withdraw']],
    answer: `**SCSS Withdrawal Rules:**

- **Premature after 1 year:** 1.5% penalty on deposit amount
- **Premature after 2 years:** 1% penalty on deposit amount
- **At maturity (5 years):** Full amount, no penalty
- **Extension:** Can extend by 3 more years (apply within 1 year of maturity)

Interest is paid **quarterly** to your linked bank account.

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
  {
    keywords: [['epf', 'reject'], ['claim', 'reject'], ['epf', 'grievance']],
    answer: `**EPF Claim Rejected? Here's What to Do:**

**Common Rejection Reasons & Fixes:**
1. **Name mismatch** — Even one letter difference between Aadhaar and EPF records. Fix: Submit joint declaration (old + new name) to employer or visit EPFO office.
2. **Bank not verified** — Your bank account needs employer digital approval. Contact HR to approve on the employer portal.
3. **Date of Exit missing** — Self-update: UAN portal → Manage → Mark Exit
4. **Multiple UAN** — If you have more than one UAN, get them merged. File request on the member portal.

**Escalation Path:**
1. 📱 EPF Helpline: **1800-118-005** (toll-free)
2. 🌐 EPF Grievance Portal: [epfigms.gov.in](https://epfigms.gov.in)
3. 📝 CPGRAMS: [pgportal.gov.in](https://pgportal.gov.in) (escalate to Ministry of Labour)
4. 🏛️ Regional PF Commissioner (visit in person with all documents)

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
  {
    keywords: [['daughter'], ['girl', 'child'], ['ssy'], ['sukanya']],
    answer: `**Best Scheme for Your Daughter's Future — Sukanya Samriddhi Yojana (SSY):**

- **Interest Rate:** 8.2% p.a. (highest among fixed-rate small savings)
- **Tax Status:** EEE — fully tax-free at every stage
- **Eligibility:** Girl child under 10 years. Max 2 accounts (one per girl child)
- **Investment:** Min ₹250/year, Max ₹1.5 lakh/year
- **Maturity:** 21 years from opening (but deposits only for first 15 years)
- **Partial Withdrawal:** 50% at age 18 for education

**Example:** ₹12,500/month (₹1.5L/year) for 15 years at 8.2% → Approximately **₹72 lakh** at maturity! 💰

**How to Open:** Visit any post office or authorized bank with:
- Girl child's birth certificate
- Parent/guardian's Aadhaar + PAN
- Address proof

**Also Consider:** PPF (if girl is above 10) or SGB (for long-term wealth with gold exposure).

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
  {
    keywords: [['eligible'], ['which scheme']],
    answer: `To recommend the right scheme, I need to know a bit about you:

1. **Your age?** (some schemes have age limits)
2. **Employment type?** (salaried / self-employed / retired)
3. **Tax regime?** (old or new)
4. **Financial goal?** (retirement / tax saving / child's future / regular income / safe savings)
5. **Risk tolerance?** (prefer guaranteed returns or okay with market risk?)

You can also use the **Eligibility Checker** tool and the **"Which scheme is right for me?"** quiz in the Compare section for instant personalized recommendations!

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`
  },
]

const genericFallback = `I can help you with information about government investment schemes! Here are some topics I can assist with:

• **Withdrawals** — How to withdraw from EPF, PPF, NPS, SSY, SCSS
• **Comparisons** — NPS vs PPF, old vs new tax regime, which scheme to choose
• **Tax Benefits** — Section 80C, 80CCD(1B), tax-free returns
• **Calculators** — Estimate returns for PPF, NPS, EPF
• **Troubleshooting** — Claim rejected, KYC issues, grievance filing

Try asking something like:
- "How do I withdraw my EPF?"
- "NPS vs PPF — which is better?"
- "Best scheme for my daughter's future"

You can also explore the **Withdrawal Guides**, **Calculators**, and **Eligibility Checker** sections.

*Disclaimer: This is for informational purposes only. Please consult a financial advisor for personalized advice.*`

export function getFallbackAnswer(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  for (const rule of fallbackRules) {
    for (const keywordGroup of rule.keywords) {
      if (keywordGroup.every(kw => msg.includes(kw))) {
        return rule.answer
      }
    }
  }

  return genericFallback
}
