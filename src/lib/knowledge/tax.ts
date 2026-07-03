//  JesAI Tax Law Knowledge Module 
// NLC validated - Nazmul, Advocate, Supreme Court of Bangladesh
// CURRENT LAWS ONLY:
//  Income Tax Act 2023 (  ) - replaced IT Ordinance 1984
//  VAT and Supplementary Duty Act 2012 + VAT Rules 2016
//  Finance Act 2024
//  NBR SROs and Notifications 2023-2024
//  Income Tax Ordinance 1984 - REPEALED, not referenced
// Last verified: 2025-03-09

import type { KnowledgeModule, LegalRule, QAEntry } from "./types";

const rules: LegalRule[] = [
  {
    id: "tax-ita-001",
    area: "tax",
    jurisdiction: "BD",
    title: "Income Tax Act 2023 - Replaced Ordinance 1984",
    rule: "The Income Tax Act 2023 (  ) came into force on 1 July 2023, fully replacing the Income Tax Ordinance 1984. All income tax matters from FY 2023-24 onward are governed by the new Act.",
    source: "Income Tax Act 2023, Section 1",
    certainty: "confirmed",
    tags: ["income tax act 2023", "ita 2023", "  ", "new tax law"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-slab-001",
    area: "tax",
    jurisdiction: "BD",
    title: "Individual Tax Slabs FY 2024-25",
    rule: "Tax-free threshold: BDT 3,50,000 (general). Women/65+ senior: BDT 4,00,000. Freedom fighters/disabled: BDT 4,75,000. Rates: 5%, 10%, 15%, 20%, 25% progressively.",
    source: "Income Tax Act 2023, Third Schedule; Finance Act 2024",
    certainty: "confirmed",
    tags: ["tax slab", "income tax rate", "2024-25", "individual tax"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-vat-001",
    area: "tax",
    jurisdiction: "BD",
    title: "VAT Standard Rate 15% - VAT Act 2012",
    rule: "Standard VAT rate 15%. Reduced rates: 5%, 7.5%, 10% on specified goods/services. Zero rate on exports. VAT registration threshold: BDT 50 lakh annual turnover.",
    source: "VAT and Supplementary Duty Act 2012; Finance Act 2024",
    certainty: "confirmed",
    tags: ["vat", "15%", "vat rate", "mushak", "value added tax"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-wht-001",
    area: "tax",
    jurisdiction: "BD",
    title: "Withholding Tax - Income Tax Act 2023 Chapter XII",
    rule: "WHT deducted at source by payer on: salary (slab), bank interest (10-15%), rent (10-15%), contractor (3-7%), professional fees (10%), dividend (10-20%), NRB profit (20% with TIN, 30% without TIN).",
    source: "Income Tax Act 2023, Chapter XII",
    certainty: "confirmed",
    tags: ["withholding tax", "wht", "source deduction", " "],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-corporate-001",
    area: "tax",
    jurisdiction: "BD",
    title: "Corporate Tax Rates FY 2024-25",
    rule: "Publicly traded: 22.5%. Private limited: 27.5%. Bank/insurance listed: 37.5%. Bank unlisted: 40%. Telecom: 45%. Tobacco: 45%. Cooperative: 15%. One-person company: 25%.",
    source: "Income Tax Act 2023, Third Schedule; Finance Act 2024",
    certainty: "confirmed",
    tags: ["corporate tax", "27.5%", "22.5%", "company tax"],
    lastVerified: "2025-03-09",
  },
];

const qaBank: QAEntry[] = [
  //  TIN & REGISTRATION 
  {
    id: "tax-qa-001",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["need tin", "get tin", "tin registration", "etin", " ", "tin "],
    question: "How do I get a TIN in Bangladesh?",
    irac: {
      issue: "How does a person obtain a TIN from NBR?",
      rule: "Income Tax Act 2023, Section 264: TIN obtained free and instantly online at incometax.gov.bd. NID + mobile number required.",
      application: "Go to incometax.gov.bd -> Register -> NID + DOB + mobile -> OTP verify -> fill details -> download TIN certificate instantly. No office visit needed.",
      conclusion: "**Get TIN online - free, 10 minutes:**\\n1. incometax.gov.bd -> e-TIN Registration\\n2. Enter NID + date of birth + mobile\\n3. Verify OTP\\n4. Fill details -> Download TIN certificate\\n\\n**Required:** NID, mobile number. **Cost:** Free.\\n\\n TIN checklist - BDT 99"
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-002",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tin mandatory", "tin required", "when need tin", " ", "  "],
    question: "When is TIN mandatory in Bangladesh?",
    irac: {
      issue: "In what situations is TIN mandatory under Income Tax Act 2023?",
      rule: "ITA 2023, Section 264: TIN mandatory for bank account > BDT 10 lakh, land purchase, flat purchase, motor vehicle registration, trade licence (city corporation), import/export licence, professional licence, company registration, govt tender > BDT 5 lakh, credit card.",
      application: "Even if income is below taxable limit, TIN is needed for these transactions. Banks, RJSC, BRTA will not process without TIN.",
      conclusion: "**TIN mandatory for:**\\n* Bank account > BDT 10 lakh balance\\n* Land/flat purchase (any value)\\n* Vehicle registration\\n* Trade licence (city corp)\\n* Company registration\\n* Import/export licence\\n* Govt tender > BDT 5 lakh\\n* Credit card\\n\\n**Register free:** incometax.gov.bd\\n\\n TIN requirement list - BDT 99"
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },
  //  INCOME TAX RETURNS 
  {
    id: "tax-qa-003",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["file tax return", "how to file return", "income tax return", " ", " "],
    question: "How do I file my income tax return in Bangladesh?",
    irac: {
      issue: "What is the process for filing annual income tax return?",
      rule: "ITA 2023, Section 166: File by 30 November online at etaxnbr.gov.bd or at Circle Tax Office. One-page simplified return for salaried persons with income below BDT 5 lakh.",
      application: "Collect: salary certificate (Form 108A), bank statements, investment proofs. Pay tax due via challan or online before filing. File at etaxnbr.gov.bd or Circle Tax Office.",
      conclusion: "**File return by 30 November each year:**\\n\\n**Online:** etaxnbr.gov.bd\\n**Physical:** Circle Tax Office\\n\\n**Documents:**\\n* Salary certificate (Form 108A)\\n* Bank statements\\n* Investment certificates\\n* NID + TIN\\n\\n**Tax year:** 1 July - 30 June\\n\\n Return document list - BDT 99 | Filing guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-004",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax slab", "income tax rate", "  ", " ", "tax rate 2024", "tax rate 2025"],
    question: "What are the income tax rates for 2024-25?",
    irac: {
      issue: "What are the current individual tax slabs for FY 2024-25?",
      rule: "ITA 2023 Third Schedule (Finance Act 2024): Progressive rates apply above the tax-free threshold of BDT 3,50,000 for general taxpayers.",
      application: "Income BDT 7 lakh: First BDT 3.5 lakh = nil. Next BDT 1 lakh x 5% = BDT 5,000. Remaining BDT 2.5 lakh x 10% = BDT 25,000. Total = BDT 30,000. Then deduct investment rebate.",
      conclusion: "**Tax Slabs FY 2024-25:**\\n\\n| Range | Rate |\\n|---|---|\\n| First BDT 3,50,000 | 0% |\\n| Next BDT 1,00,000 | 5% |\\n| Next BDT 3,00,000 | 10% |\\n| Next BDT 4,00,000 | 15% |\\n| Next BDT 5,00,000 | 20% |\\n| Above BDT 16,50,000 | 25% |\\n\\nWomen/65+: BDT 4,00,000 free\\nFreedom fighters/disabled: BDT 4,75,000 free\\n\\n Tax calculator - BDT 99 | Tax planning guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-005",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax rebate", "investment rebate", " ", "tax savings", "rebate calculation"],
    question: "How do I reduce tax through investment rebate?",
    irac: {
      issue: "How does the investment tax rebate work under ITA 2023?",
      rule: "ITA 2023, Section 78: Rebate = 15% of actual investment, capped at lower of: 3% of total income OR BDT 10 lakh. Qualifying investments: DPS, sanchayapatra, life insurance premium, approved PF, listed company stocks.",
      application: "Income BDT 10 lakh. Tax before rebate  BDT 75,000. Invested BDT 2 lakh in sanchayapatra. Rebate = 15% x BDT 2 lakh = BDT 30,000. Final tax = BDT 45,000.",
      conclusion: "**Investment rebate - 15% of qualifying investment:**\\n\\n**Qualifying investments:**\\n* Sanchayapatra (savings certificates)\\n* DPS at scheduled bank\\n* Life insurance premium\\n* Approved provident fund\\n* Listed company shares/mutual funds\\n* Govt Treasury Bond\\n\\n**Cap:** Lower of 3% of income or BDT 10 lakh\\n\\n Rebate guide - BDT 99 | Tax saving - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-006",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["late return", "return late penalty", " ", "missed deadline", "return after november"],
    question: "What happens if I file my tax return late?",
    irac: {
      issue: "Consequences of missing the 30 November return deadline?",
      rule: "ITA 2023, Section 174: Delay surcharge 2% per month on tax payable, minimum BDT 1,000. Non-filing -> DCT best judgment assessment.",
      application: "Late but filed is far better than not filing. Apply for time extension before 30 November if needed. DCT estimates income and levies tax + penalty for habitual non-filers.",
      conclusion: "**Late return consequences:**\\n* Surcharge: 2% per month on tax due\\n* Minimum: BDT 1,000\\n* Non-filing: DCT assessment + penalty\\n\\n**Extension:** Apply to DCT before 30 November.\\n**Always file - even late.**\\n\\n Late return guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-007",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["minimum tax", " ", "tin holder minimum", "zero income tax", "minimum payment"],
    question: "Is there a minimum tax even below the tax-free limit?",
    irac: {
      issue: "Must a TIN holder pay minimum tax even if income is below the threshold?",
      rule: "ITA 2023, Section 163: TIN holders must pay minimum tax regardless of income: City corporation areas BDT 5,000. Other municipalities BDT 4,000. Other areas BDT 3,000. New under ITA 2023 - did not exist under old Ordinance 1984.",
      application: "Dhaka resident with TIN and BDT 2 lakh income (below BDT 3.5 lakh threshold): must still pay BDT 5,000 minimum tax and file return.",
      conclusion: "**Minimum tax for TIN holders (ITA 2023 - NEW):**\\n\\n* Dhaka/Chattogram city: **BDT 5,000**\\n* Other municipalities: **BDT 4,000**\\n* Other areas: **BDT 3,000**\\n\\n Applies even if income is zero.\\n This is a major change from old law.\\n\\n Minimum tax guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },
  //  VAT 
  {
    id: "tax-qa-008",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["vat registration", "mushak registration", " ", "bin registration", "vat certificate"],
    question: "How do I register for VAT?",
    irac: {
      issue: "Process for VAT registration with NBR?",
      rule: "VAT Act 2012: Businesses with annual taxable turnover above BDT 50 lakh must register. Apply online at vat.gov.bd for BIN (Business Identification Number). Below BDT 30 lakh: exempt.",
      application: "Apply at vat.gov.bd -> Select business type -> Upload trade licence, TIN, NID -> BIN issued within 3-5 working days.",
      conclusion: "**VAT Registration:**\\n1. vat.gov.bd -> Apply for BIN\\n2. Upload: Trade licence, TIN, NID, bank account\\n3. BIN issued in 3-5 days\\n\\n**Thresholds:**\\n* > BDT 50 lakh -> VAT registration mandatory\\n* BDT 30-50 lakh -> 4% turnover tax\\n* < BDT 30 lakh -> exempt\\n\\n**VAT return deadline:** 15th of next month\\n\\n VAT registration docs - BDT 99 | VAT guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-009",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["vat return", "mushak 9.1", "monthly vat", " ", "vat filing"],
    question: "How do I file a monthly VAT return?",
    irac: {
      issue: "Process for filing monthly VAT return (MUSHAK 9.1)?",
      rule: "VAT Act 2012: File MUSHAK 9.1 by 15th of following month. Formula: Output VAT (15% of sales)  Input VAT (paid on purchases) = Net payable. Late filing: BDT 10,000 penalty. Late payment: 2% surcharge per month.",
      application: "Collect all sales invoices (MUSHAK 6.3) and purchase invoices. Calculate net VAT. File online at vat.gov.bd. Pay via bank challan.",
      conclusion: "**Monthly VAT (MUSHAK 9.1):**\\n\\n**Deadline:** 15th of following month\\n**Formula:** Output VAT Input VAT = Net payable\\n**File:** vat.gov.bd\\n\\n**Key forms:**\\n* MUSHAK 6.3 - Sales invoice\\n* MUSHAK 6.7 - Purchase register\\n* MUSHAK 9.1 - Monthly return\\n\\n**Penalties:** Late filing BDT 10,000 | Late payment 2%/month\\n\\n VAT return guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-010",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["vat exempt", "zero vat", " ", "no vat goods", "vat free items"],
    question: "Which goods and services are exempt from VAT?",
    irac: {
      issue: "What goods/services are VAT-exempt or zero-rated under VAT Act 2012?",
      rule: "VAT Act 2012, First and Second Schedules: Exempt: basic unprocessed food, education, medical (govt), agricultural inputs, religious services. Zero-rated: all exports, international transport.",
      application: "Fresh fish seller in local market: exempt. Restaurant: 15% VAT. Exporter: 0% VAT but can claim input VAT refund.",
      conclusion: "**VAT Exempt (First Schedule):**\\n* Unprocessed food (rice, fish, vegetables)\\n* Education services\\n* Govt medical/health\\n* Agricultural inputs\\n\\n**Zero-rated (exports):**\\n* All goods exported\\n* International transport\\n\\n**Reduced rates:**\\n* 5%, 7.5%, 10% - specified items\\n\\n VAT exemption guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },
  //  WITHHOLDING TAX 
  {
    id: "tax-qa-011",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["withholding tax", "source tax", " ", "tds bangladesh", "wht deduction"],
    question: "What is withholding tax and who must deduct it?",
    irac: {
      issue: "What is the WHT system and who is responsible?",
      rule: "ITA 2023, Chapter XII: Payer deducts WHT at source and deposits with NBR within 7 days. Failure to deduct = payer personally liable. Rates: salary (slab), bank interest 10-15%, rent 10-15%, contractor 3-7%, professional fees 10%, dividend 10-20%, NRB profit 20%/30%.",
      application: "Company paying rent to landlord must deduct 10-15% WHT and pay to NBR. Landlord claims WHT as tax credit in annual return.",
      conclusion: "**WHT Key Rates (ITA 2023):**\\n\\n| Payment | Rate |\\n|---|---|\\n| Salary | Slab rates |\\n| Bank interest (TIN) | 10% |\\n| Bank interest (no TIN) | 15% |\\n| Rent (commercial) | 10-15% |\\n| Contractor payment | 3-7% |\\n| Professional fees | 10% |\\n| Dividend (listed) | 10% |\\n| Dividend (unlisted) | 20% |\\n| NRB profit (TIN) | 20% |\\n| NRB profit (no TIN) | 30% |\\n\\n**Deposit deadline:** 7th of next month\\n\\n WHT compliance guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-wht-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-012",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["salary tax deduction", "employee tax", " ", "payroll tax", "salary withholding"],
    question: "How is income tax deducted from salary?",
    irac: {
      issue: "How is salary WHT calculated and deducted?",
      rule: "ITA 2023, Section 86: Employer calculates projected annual income, applies slab rates, deducts investment rebate declared by employee, divides by 12 for monthly deduction. Issues Form 108A annually.",
      application: "Monthly salary BDT 60,000 -> annual BDT 7,20,000. Tax  BDT 50,500. Monthly deduction = BDT 4,208. Employee must still file annual return by 30 November.",
      conclusion: "**Salary tax deduction:**\\n1. Employer calculates annual tax at slabs\\n2. Deducts investment rebate (if declared)\\n3. Divides by 12 -> monthly deduction\\n4. Issues Form 108A at year end\\n\\n**Employee must:**\\n* Declare investments to employer by March\\n* File annual return by 30 November\\n* WHT = tax credit (not final tax)\\n\\n Salary tax guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001", "tax-wht-001"],
    lastVerified: "2025-03-09",
  },
  //  BUSINESS TAX 
  {
    id: "tax-qa-013",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["company tax rate", "corporate tax", " ", "corporate tax rate", "business tax"],
    question: "What is the corporate tax rate in Bangladesh?",
    irac: {
      issue: "Current corporate income tax rates under ITA 2023?",
      rule: "ITA 2023 Third Schedule (Finance Act 2024): Rates vary by company type and listing status.",
      application: "Private company earning BDT 1 crore: pays BDT 27.5 lakh tax. Same company listed on stock exchange: BDT 22.5 lakh - saves BDT 5 lakh. Strong incentive to list.",
      conclusion: "**Corporate Tax FY 2024-25:**\\n\\n| Type | Rate |\\n|---|---|\\n| Publicly traded | 22.5% |\\n| Private limited | 27.5% |\\n| One-person company | 25% |\\n| Bank/insurance (listed) | 37.5% |\\n| Bank (unlisted) | 40% |\\n| Mobile telecom | 45% |\\n| Tobacco | 45% |\\n| Cooperative | 15% |\\n\\n**Return deadline:** 15 July\\n\\n Corporate tax guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-corporate-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-014",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["advance tax", "quarterly tax", " ", "advance income tax", "quarterly payment"],
    question: "Do I have to pay advance income tax?",
    irac: {
      issue: "Who must pay advance tax under ITA 2023?",
      rule: "ITA 2023, Section 172: Mandatory if previous year tax >= BDT 12,000. Four equal installments: 15 September (25%), 15 December (25%), 15 March (25%), 15 June (25%). Shortfall: 2% per month surcharge.",
      application: "Previous year tax BDT 50,000 -> pay BDT 12,500 per quarter. Overpayment refunded or adjusted next year.",
      conclusion: "**Advance tax - mandatory if prev year tax >= BDT 12,000:**\\n\\n**Schedule:**\\n* 15 September - 25%\\n* 15 December - 25%\\n* 15 March - 25%\\n* 15 June - 25%\\n\\n**Late payment:** 2% per month\\n**Overpayment:** Refunded/adjusted\\n\\n Advance tax guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-015",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax audit", "nbr audit", " ", "selected audit", "dcit audit"],
    question: "What happens if NBR audits my tax return?",
    irac: {
      issue: "What is the tax audit process under ITA 2023?",
      rule: "ITA 2023, Sections 184-198: DCT can audit within 3 years of filing (5 years for fraud). Issues notice -> taxpayer provides documents -> DCT raises demand if income understated -> taxpayer appeals within 30 days.",
      application: "If audited: cooperate fully. Provide all receipts, bank statements, investment proofs. Do not ignore notices. If demand raised - appeal to Commissioner (Appeals) within 30 days.",
      conclusion: "**If audited:**\\n1. Do not ignore audit notice\\n2. Gather all supporting documents\\n3. Respond within time given\\n4. If demand raised -> appeal within 30 days\\n\\n**Appeal path:**\\nDCT -> Commissioner (Appeals) -> Taxes Appellate Tribunal -> High Court\\n\\n**Limitation:** 3 years (5 for fraud)\\n\\n Engage tax consultant for audit response.\\n\\n Tax audit guide - BDT 2,999"
    },
    escalate: true,
    escalateReason: "Tax audit requires professional response. WhatsApp NLC.",
    relatedRules: [],
    lastVerified: "2025-03-09",
  },
  //  DISPUTES & APPEALS 
  {
    id: "tax-qa-016",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax appeal", "challenge tax demand", " ", "object tax", "tax dispute"],
    question: "How do I challenge a tax demand I disagree with?",
    irac: {
      issue: "Process for challenging a tax assessment under ITA 2023?",
      rule: "ITA 2023, Sections 243-258: Objection to DCT within 30 days -> Commissioner (Appeals) within 45 days -> Taxes Appellate Tribunal within 60 days -> High Court (law question only).",
      application: "Pay undisputed portion first - shows good faith, avoids interest on that amount. File appeal for disputed portion. All deadlines are strict.",
      conclusion: "**Tax appeal process:**\\n1. **Objection to DCT** - 30 days\\n2. **Commissioner Appeals** - 45 days\\n3. **Taxes Appellate Tribunal** - 60 days\\n4. **High Court** - law question, 60 days\\n\\n Pay undisputed portion first.\\n All deadlines strict - missing = appeal barred.\\n\\n Tax appeal guide - BDT 1,999"
    },
    escalate: true,
    escalateReason: "Tax appeals have strict deadlines. WhatsApp NLC for specialist referral.",
    relatedRules: [],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-017",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax refund", "overpaid tax", " ", "refund income tax", "excess tax paid"],
    question: "How do I get a refund if I overpaid tax?",
    irac: {
      issue: "Process for claiming tax refund under ITA 2023?",
      rule: "ITA 2023, Section 237: Refund if WHT/advance tax paid exceeds final assessed liability. Claim in annual return or within 6 years. DCT verifies and issues refund by cheque/bank transfer.",
      application: "File return showing actual income. If WHT deducted > final tax - difference is refund due. Attach all WHT certificates (Form 108A from employer, bank WHT certificates).",
      conclusion: "**Tax refund claim:**\\n1. File annual return showing refund due\\n2. Attach WHT certificates\\n3. DCT verifies -> approves\\n4. Refund by cheque/bank transfer\\n\\n**Time limit:** 6 years from overpayment year\\n**If DCT delays:** Complaint to Commissioner\\n\\n Keep all WHT certificates - they are your refund evidence.\\n\\n Refund guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-wht-001"],
    lastVerified: "2025-03-09",
  },
  //  PROPERTY & CAPITAL GAINS 
  {
    id: "tax-qa-018",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["land sale tax", "property tax", "  ", "capital gain tax", "property capital gain"],
    question: "Do I pay tax when selling land or property?",
    irac: {
      issue: "What tax applies on selling immovable property?",
      rule: "ITA 2023: Capital gain from property sale is taxable. At registration, Sub-Registrar deducts Advance Income Tax (AIT): Dhaka/Chattogram 4%, other city corp 3%, municipality 2%, rural 1%. AIT is tax credit against final liability.",
      application: "Selling land in Dhaka worth BDT 50 lakh: AIT at registration = BDT 2 lakh. Report capital gain in annual return. AIT already paid = credit. Pay difference if any.",
      conclusion: "**Property sale tax:**\\n\\n**AIT at registration (deducted by Sub-Registrar):**\\n* Dhaka/Chattogram: 4% of deed value\\n* Other city corp: 3%\\n* Municipality: 2%\\n* Rural: 1%\\n\\n**In annual return:** Report gain, AIT = credit.\\n\\n**Plus:** Stamp duty at registration\\n\\n Property sale tax guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-019",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["house rent income", "rental income tax", " ", "landlord tax", "rent tax"],
    question: "Do I pay tax on house rent income?",
    irac: {
      issue: "How is rental income taxed under ITA 2023?",
      rule: "ITA 2023: Rental income taxable as 'income from house property'. Standard deduction: 25% of gross rent for repairs/maintenance. Net rental income added to total income, taxed at slab rates. Commercial rent: tenant must deduct 10-15% WHT.",
      application: "Annual rent BDT 3 lakh. Deduction 25% = BDT 75,000. Net taxable = BDT 2,25,000. Added to other income and taxed at applicable slab.",
      conclusion: "**Rental income tax:**\\n\\nGross rent 25% deduction = Net taxable rent\\nNet rent added to total income -> slab rate tax\\n\\n**WHT on commercial rent:**\\nTenant deducts 10-15% at source.\\n\\n**Residential rent:** No WHT by tenant.\\n\\n Rental income guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001", "tax-wht-001"],
    lastVerified: "2025-03-09",
  },
  //  SPECIAL SITUATIONS 
  {
    id: "tax-qa-020",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["undisclosed income", "black money", " ", "undeclared income", "voluntary disclosure"],
    question: "Can I disclose undeclared income and pay tax on it?",
    irac: {
      issue: "Can undisclosed income be voluntarily declared under ITA 2023?",
      rule: "ITA 2023, Section 245: Voluntary disclosure allowed - pay normal tax + 10% surcharge. Immunity from further investigation for disclosed amount. Finance Act may provide special disclosure windows periodically.",
      application: "Undeclared income from previous years: disclose voluntarily, pay tax + 10% surcharge. Avoids the 50-100% penalty if discovered by DCT.",
      conclusion: "**Voluntary disclosure:**\\n* Pay normal tax + 10% surcharge\\n* Immunity from further investigation\\n* No prosecution for disclosed amount\\n\\n**vs. DCT discovery:**\\n* 50-100% penalty on evaded tax\\n* Possible prosecution\\n\\n Engage tax consultant before disclosing.\\n\\n Voluntary disclosure guide - BDT 2,999"
    },
    escalate: true,
    escalateReason: "Voluntary disclosure strategy requires professional guidance. WhatsApp NLC.",
    relatedRules: [],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-021",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["freelancer tax", "remote work tax", " ", "digital income tax", "online income foreign"],
    question: "Do freelancers and remote workers pay tax in Bangladesh?",
    irac: {
      issue: "How is freelance/remote work income taxed under ITA 2023?",
      rule: "Finance Act 2024: Export of IT services and ITES by individuals is tax-exempt until 2027 if received through official banking channel. Must be declared in return as exempt income.",
      application: "Bangladeshi freelancer earning USD from US client through bank: currently tax-exempt until 2027. Must have TIN and file return. Must receive via bank - not crypto/hundi.",
      conclusion: "**Freelancer tax (2024):**\\n\\n **Tax exempt until 2027:**\\n* IT services export\\n* Software development\\n* ITES (data entry, VA etc.)\\n* Received through bank\\n\\n**Must still:**\\n* Have TIN\\n* File annual return (declare as exempt)\\n* Use banking channel\\n\\n**After 2027:** Subject to Finance Act renewal.\\n\\n Freelancer tax guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-022",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["gift tax", " ", "gift money tax", "received gift taxable", "gift from family"],
    question: "Is a gift I received taxable?",
    irac: {
      issue: "Are gifts received subject to income tax under ITA 2023?",
      rule: "ITA 2023: Gifts from close relatives (parents, spouse, children, siblings) are not taxable for recipient. Gifts from non-relatives above BDT 50,000 per year are taxable as 'income from other sources'. Cash gifts from non-relatives fully taxable.",
      application: "Father gives son BDT 5 lakh: not taxable for son. Employer gives employee bonus/gift: taxable as salary. Business 'gift' from associate: taxable as other income.",
      conclusion: "**Gift taxation:**\\n\\n **Not taxable:**\\n* Gifts from parents, spouse, children, siblings\\n* Wedding gifts (generally)\\n* Inheritance received\\n\\n **Taxable:**\\n* Cash gifts from non-relatives > BDT 50,000/year\\n* Gifts from employer\\n* Business gifts\\n\\n Gift tax guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-023",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["bank interest tax", "savings interest", " ", "fd tax", "fixed deposit tax"],
    question: "How is bank interest taxed?",
    irac: {
      issue: "How is interest from bank deposits taxed under ITA 2023?",
      rule: "ITA 2023: Bank interest WHT: 10% for TIN holders (final settlement), 15% without TIN. Sanchayapatra interest: 5% (investment <= BDT 5 lakh), 10% (above BDT 5 lakh) - both final.",
      application: "FD of BDT 10 lakh at 8% = BDT 80,000 interest. Bank deducts 10% = BDT 8,000. You receive BDT 72,000. No further tax or return needed for this income.",
      conclusion: "**Bank interest WHT (final - no return needed):**\\n\\n* FD/savings (TIN holder): **10%** - FINAL\\n* FD/savings (no TIN): **15%** - FINAL\\n* Sanchayapatra (<= BDT 5 lakh): **5%** - FINAL\\n* Sanchayapatra (> BDT 5 lakh): **10%** - FINAL\\n* Prize bond prize: **20%** - FINAL\\n\\n**Action:** Register TIN with your bank - saves 5% WHT.\\n\\n Investment income guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-wht-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-024",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax penalty", "tax evasion penalty", "  ", "tax fine", "nbr penalty"],
    question: "What are the penalties for tax evasion?",
    irac: {
      issue: "What penalties apply to tax evasion under ITA 2023?",
      rule: "ITA 2023, Sections 280-298: Concealment of income: 50-100% of evaded tax as penalty. False return: up to BDT 5 lakh + up to 3 years imprisonment. Failure to deduct WHT: payer liable for full tax + 10% penalty. Non-filing after notice: BDT 10,000 per month.",
      application: "NBR discovers BDT 10 lakh undeclared income: pays tax + 50-100% penalty on that tax. Serious evasion: criminal prosecution possible.",
      conclusion: "**Tax penalties (ITA 2023):**\\n\\n| Offence | Penalty |\\n|---|---|\\n| Concealment | 50-100% of evaded tax |\\n| False return | BDT 5 lakh + 3 years imprisonment |\\n| Non-filing | BDT 10,000/month |\\n| WHT failure | Full tax + 10% |\\n| Late payment | 2%/month |\\n\\n**File honest returns - penalties far exceed tax itself.**\\n\\n Tax compliance guide - BDT 999"
    },
    escalate: false,
    relatedRules: [],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-025",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["sanchayapatra tax", "savings certificate tax", " ", "national savings tax", " "],
    question: "What tax applies on sanchayapatra?",
    irac: {
      issue: "How is sanchayapatra interest taxed and does it qualify for rebate?",
      rule: "Finance Act 2024: WHT on sanchayapatra interest: 5% (investment <= BDT 5 lakh), 10% (> BDT 5 lakh) - both final settlement. Investment qualifies for 15% investment tax rebate.",
      application: "BDT 3 lakh in sanchayapatra at 11.76% = BDT 35,280 interest. WHT 5% = BDT 1,764. Net = BDT 33,516. PLUS: BDT 3 lakh investment gives 15% x BDT 3 lakh = BDT 45,000 rebate on income tax. Double benefit.",
      conclusion: "**Sanchayapatra - double tax benefit:**\\n\\n* WHT on interest: 5% (<= BDT 5 lakh) - FINAL\\n* WHT on interest: 10% (> BDT 5 lakh) - FINAL\\n* Investment -> **15% tax rebate** on income tax\\n\\n**Purchase limit:** BDT 50 lakh per family (varies by type)\\n**Purchase at:** Post offices, banks\\n\\n Savings certificate guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-wht-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-026",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["surcharge wealth", "net wealth tax", "", "wealth surcharge", "assets surcharge"],
    question: "What is wealth surcharge in Bangladesh tax?",
    irac: {
      issue: "What surcharge applies on net wealth under ITA 2023?",
      rule: "ITA 2023, Section 163: Surcharge applies on net assets above BDT 3 crore. Rates: BDT 3-10 crore -> 10% surcharge on tax. BDT 10-20 crore -> 20%. BDT 20-50 crore -> 30%. Above BDT 50 crore -> 35%. Minimum surcharge BDT 3,000.",
      application: "Net wealth BDT 5 crore, tax BDT 5 lakh. Surcharge = 10% x BDT 5 lakh = BDT 50,000 additional. Report all assets in Schedule 25 of return.",
      conclusion: "**Wealth surcharge FY 2024-25:**\\n\\n| Net Wealth | Surcharge |\\n|---|---|\\n| BDT 3-10 crore | 10% of tax |\\n| BDT 10-20 crore | 20% of tax |\\n| BDT 20-50 crore | 30% of tax |\\n| Above BDT 50 crore | 35% of tax |\\n\\nList all assets in return (Schedule 25).\\n\\n Surcharge guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-027",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["facebook business tax", "e-commerce tax", "  ", "online shop tax", "digital business"],
    question: "Do I pay tax on Facebook or e-commerce income?",
    irac: {
      issue: "Is income from Facebook commerce or e-commerce taxable?",
      rule: "ITA 2023: All business income including social media and e-commerce sales is taxable. Physical goods sales are NOT IT export exemption. Must register TIN, file annual return, pay at slab rates. If turnover > BDT 50 lakh: VAT registration also required.",
      application: "Facebook clothing seller earning BDT 10 lakh/year: taxable business income. Must register TIN, file return, pay tax. If also VAT registered: monthly MUSHAK 9.1 return required.",
      conclusion: "**Facebook/e-commerce seller:**\\n\\n1. Register TIN - incometax.gov.bd\\n2. File annual return by 30 November\\n3. If turnover > BDT 50 lakh -> register VAT\\n4. If turnover BDT 30-50 lakh -> 4% turnover tax\\n5. Keep all sales/expense records\\n\\n**Note:** IT service export = exempt until 2027. Physical goods sale = fully taxable.\\n\\n E-commerce tax guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-028",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["remittance tax", "  ", "foreign remittance", "nrb remittance", "overseas income"],
    question: "Is foreign remittance taxable in Bangladesh?",
    irac: {
      issue: "Is remittance from abroad taxable under ITA 2023?",
      rule: "ITA 2023: Remittances received through official banking channels from abroad are NOT taxable - treated as foreign earnings. Bangladesh Bank's 2.5% cash incentive on remittance is also tax-free. Must be declared in return as exempt income.",
      application: "Worker in Saudi Arabia sends BDT 5 lakh home via bKash/bank: not taxable. 2.5% govt cash incentive on top: also not taxable.",
      conclusion: "**Remittance from abroad - TAX FREE if:**\\n* Received through official banking channel\\n* Represents foreign earnings\\n\\n**Also tax free:**\\n* 2.5% government cash incentive\\n\\n**Still required:**\\n* TIN\\n* Declare as exempt in annual return\\n* Use banking channel (not hundi/crypto)\\n\\n NRB tax guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: [],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-029",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["stamp duty", "registration fee land", " ", "deed registration cost", "land registration tax"],
    question: "What are stamp duty and registration fees for land?",
    irac: {
      issue: "What stamp duty and registration fees apply when registering a land deed?",
      rule: "Stamp Act 1899 (Finance Act 2024 updated): Stamp duty: 1.5% of deed value. Registration fee: 1%. Local govt tax: 2% (city corporation). AIT: 1-4% by location. Total in Dhaka: approximately 8-9%.",
      application: "Buying land in Dhaka worth BDT 50 lakh: Stamp BDT 75,000 + Registration BDT 50,000 + Local tax BDT 1,00,000 + AIT BDT 2,00,000 = approx BDT 4,25,000 transaction cost.",
      conclusion: "**Land registration costs:**\\n\\n| Cost | Rate |\\n|---|---|\\n| Stamp duty | 1.5% |\\n| Registration fee | 1% |\\n| Local govt tax | 2% (city corp) |\\n| AIT (Dhaka/Ctg) | 4% |\\n| **Total (Dhaka)** | **~8.5%** |\\n\\nOutside city: AIT 1-2%, lower total.\\n\\n Land transaction guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: [],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-030",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax clearance", "tax proof", "  ", "tcc certificate", "tax compliance proof"],
    question: "How do I get proof that I have paid my taxes?",
    irac: {
      issue: "How to get proof of tax compliance or tax clearance certificate?",
      rule: "ITA 2023: Annual return acknowledgement from etaxnbr.gov.bd = proof for most purposes. Tax Clearance Certificate (TCC) from DCT required for specific purposes: govt contract, some visa applications, company director with dues.",
      application: "For bank/visa/trade licence: return acknowledgement sufficient. For TCC: apply to DCT with return receipts. Processing 15-30 days.",
      conclusion: "**Proof of tax compliance:**\\n\\n**Return receipt (most common):**\\n* File at etaxnbr.gov.bd\\n* Download acknowledgement immediately\\n* Valid for: banks, visa, trade licence renewal\\n\\n**Tax Clearance Certificate (TCC):**\\n* Apply to DCT\\n* For: govt contract, specific visa, directors\\n* Processing: 15-30 days\\n\\n TCC guide - BDT 999"
    },
    escalate: false,
    relatedRules: [],
    lastVerified: "2025-03-09",
  },
  //  NEW Q&A 031-050 
  {
    id: "tax-qa-031",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["business income tax", "sole trader tax", "proprietorship tax", "  ", "business profit tax"],
    question: "How is sole proprietorship business income taxed?",
    irac: {
      issue: "How is income from a sole proprietorship ( ) taxed under ITA 2023?",
      rule: "ITA 2023: Business income of a sole proprietor is taxed at individual slab rates - same as salary income. Business expenses are deductible before calculating net profit. Must maintain proper accounts. Business income + other income = total income -> slab rate tax.",
      application: "Sole trader with BDT 12 lakh gross business income, BDT 5 lakh business expenses: Net profit = BDT 7 lakh. Added to any other income. Tax calculated at slab rates. Minimum tax BDT 5,000 (city corp) applies.",
      conclusion: "**Sole proprietorship tax:**\\n\\nGross business income\\n Allowable business expenses\\n= Net business profit\\n+ Other income\\n= Total income -> slab rate tax\\n\\n**Allowable deductions:**\\n* Staff salaries\\n* Rent, utilities\\n* Cost of goods sold\\n* Depreciation on assets\\n* Interest on business loans\\n\\n Business income tax guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-032",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["partnership tax", "firm tax", " ", "partnership income tax", "firm income"],
    question: "How is a partnership firm taxed in Bangladesh?",
    irac: {
      issue: "How is partnership firm income taxed under ITA 2023?",
      rule: "ITA 2023: A registered partnership firm is taxed as a separate entity at the individual slab rate applicable to the firm's income. Partners are taxed on their salary/drawings from the firm, but profit share is not separately taxed at partner level if firm has paid tax - avoiding double taxation.",
      application: "Firm earns BDT 20 lakh profit. Firm pays tax at applicable rate. Partners' profit shares: not taxed again in partners' individual returns. But salary paid by firm to partners: deductible for firm, taxable for partner.",
      conclusion: "**Partnership firm tax:**\\n\\n* Firm: pays tax on net profit at slab rates\\n* Partners: salary from firm = taxable in partners' hands\\n* Partners: profit share = NOT double-taxed if firm paid tax\\n\\n**Key:** File firm's separate income tax return + each partner's individual return.\\n\\n Partnership tax guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-033",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["ngo tax", "charitable trust tax", " ", "ngo income tax", "charitable income"],
    question: "Are NGOs and charitable organizations exempt from tax?",
    irac: {
      issue: "Are NGOs and charitable trusts exempt from income tax under ITA 2023?",
      rule: "ITA 2023, Section 76: Income of charitable organizations registered with the relevant authority (NBR, Social Welfare, NGO Bureau) is exempt from tax if applied for charitable purposes. Any commercial income of NGO is taxable. Registration with NBR for tax exemption status required.",
      application: "NGO receiving foreign grants and using for education/health: income exempt. Same NGO running a commercial hospital: hospital income taxable at corporate rates.",
      conclusion: "**NGO/Charitable organization tax:**\\n\\n **Exempt if:**\\n* Registered with relevant authority\\n* Income applied for charitable/religious purpose\\n* Has NBR tax exemption certificate\\n\\n **Taxable:**\\n* Commercial income of NGO\\n* Income not applied to charitable purpose\\n* Unregistered organizations\\n\\n**Apply for exemption:** NBR, Large Taxpayer Unit\\n\\n NGO tax guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-034",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["supplementary duty", "sd goods", " ", "supplementary duty vat", "sd rate"],
    question: "What is supplementary duty (SD) in Bangladesh?",
    irac: {
      issue: "What is supplementary duty and which goods does it apply to?",
      rule: "VAT and Supplementary Duty Act 2012: Supplementary Duty (SD) is an additional duty imposed on luxury goods, demerit goods, and goods with negative externalities. Rates: 10-500% depending on product. Applied on: tobacco, alcohol, vehicles, luxury cosmetics, carbonated drinks, SIM cards.",
      application: "Buying a new car: 25-350% SD depending on engine capacity. Buying cigarettes: high SD + VAT both apply. Importer must pay both SD and VAT at import stage.",
      conclusion: "**Supplementary Duty (SD):**\\n\\nApplies on top of VAT on luxury/demerit goods.\\n\\n**High SD goods:**\\n* Tobacco/cigarettes: 60-285%\\n* Cars: 25-350% (by engine CC)\\n* Carbonated drinks: 25-35%\\n* SIM cards: BDT 200 per card\\n* Alcohol: 350%\\n* Luxury cosmetics: 10-30%\\n\\nSD -> then 15% VAT on top.\\n\\n Import duty guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-035",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["custom duty import", "import tax", " ", "import duty bangladesh", "customs charge"],
    question: "What taxes apply when importing goods into Bangladesh?",
    irac: {
      issue: "What duties and taxes apply on imports into Bangladesh?",
      rule: "Customs Act 1969 (current) + VAT Act 2012 + Finance Act 2024: Import duties include: Customs Duty (CD), Regulatory Duty (RD), Supplementary Duty (SD), VAT 15%, Advance Income Tax (AIT) 3-5%, Advance Trade VAT (ATV). Total effective rate can be 30-100%+ depending on product.",
      application: "Importing a laptop: CD 10% + RD 3% + VAT 15% + AIT 5% = approximately 33% total tax on import value. Consumer goods generally face higher protection duties. Capital machinery for industries: reduced or zero CD.",
      conclusion: "**Import taxes (layered):**\\n\\n1. Customs Duty (CD): 0-25%\\n2. Regulatory Duty (RD): 0-5%\\n3. Supplementary Duty (SD): 0-500%\\n4. VAT: 15%\\n5. AIT: 3-5%\\n6. ATV: 4% (on some)\\n\\nAll calculated on CIF value (Cost + Insurance + Freight).\\n\\n**Low/zero CD:** Capital machinery, raw materials for export industries.\\n\\n Import duty guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-036",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["dividends tax", "share dividend", " ", "dividend income tax", "share income"],
    question: "How is dividend income taxed?",
    irac: {
      issue: "How is dividend income from shares taxed under ITA 2023?",
      rule: "ITA 2023: WHT on dividend: 10% for listed company shareholders, 20% for unlisted company shareholders. For individual shareholders receiving dividend from listed company: 10% WHT is FINAL - no further tax. For non-residents receiving dividend: same WHT rates apply.",
      application: "You receive BDT 10,000 dividend from a DSE-listed company. Company deducts 10% = BDT 1,000. You receive BDT 9,000. No further tax on this. No need to include in return as taxable income (already final WHT).",
      conclusion: "**Dividend income tax:**\\n\\n* Listed company dividend (individual): **10% WHT - FINAL**\\n* Unlisted company dividend: **20% WHT - FINAL**\\n* Non-resident dividend: same rates\\n\\n**No further tax or return inclusion needed** when WHT deducted.\\n\\n**Company's duty:** Deduct WHT before paying dividend, deposit within 7 days.\\n\\n Dividend tax guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-wht-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-037",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["transfer pricing", "related party transaction", " ", "multinational tax", "arm's length"],
    question: "What is transfer pricing and does it apply to my business?",
    irac: {
      issue: "What are Bangladesh's transfer pricing rules under ITA 2023?",
      rule: "ITA 2023, Chapter XVII: Transfer pricing rules apply to transactions between associated enterprises (related parties). Transactions must be at arm's length price - as if between independent parties. Applies to: multinational companies, companies with common shareholders above 50%, parent-subsidiary transactions.",
      application: "A Bangladeshi subsidiary buying raw materials from its foreign parent company at artificially high prices to shift profits: NBR can disallow excess price and tax the profit in Bangladesh.",
      conclusion: "**Transfer pricing - applies to:**\\n* Transactions with parent/subsidiary companies\\n* Companies with >50% common shareholder\\n* Import/export with related foreign parties\\n\\n**Arm's length principle:** Price must equal what unrelated parties would charge.\\n\\n**Documentation required:** Transfer pricing report if international transaction > BDT 3 crore.\\n\\n Non-compliance: significant penalties + adjustment.\\n\\n Transfer pricing guide - BDT 4,999"
    },
    escalate: true,
    escalateReason: "Transfer pricing compliance is complex. WhatsApp NLC for specialist referral.",
    relatedRules: ["tax-corporate-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-038",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax return proof bank loan", "bank requires tax return", "   ", "loan tax return requirement"],
    question: "Do I need a tax return for a bank loan?",
    irac: {
      issue: "Is income tax return submission required for bank loan applications?",
      rule: "Bangladesh Bank directives + ITA 2023: Banks and financial institutions are required to obtain income tax return acknowledgement receipts from loan applicants above certain thresholds. Personal loans above BDT 5 lakh, business loans above BDT 10 lakh: tax return typically required.",
      application: "Applying for home loan of BDT 50 lakh: bank will require 3 years' tax return acknowledgement receipts and TIN certificate. Without filed returns, loan approval is very difficult.",
      conclusion: "**Tax return for bank loan:**\\n\\n**Banks require:**\\n* TIN certificate\\n* Last 2-3 years' return acknowledgements\\n* For business loans: audited accounts\\n\\n**Threshold:** Generally loans > BDT 5 lakh\\n\\n**Start filing now** if planning to take loan - most banks require previous year returns.\\n\\n Bank loan tax requirements - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-039",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["provident fund tax", "gratuity tax", " ", "provident fund taxable", "gratuity taxable"],
    question: "Is provident fund or gratuity taxable?",
    irac: {
      issue: "Are provident fund contributions and gratuity payments taxable under ITA 2023?",
      rule: "ITA 2023: Approved Provident Fund (APF) - employer contribution exempt, employee contribution qualifies for investment rebate. APF withdrawal on retirement/resignation: exempt up to BDT 25 lakh. Gratuity from approved gratuity fund: exempt up to BDT 25 lakh. Excess: taxable.",
      application: "Employee receives BDT 30 lakh gratuity on retirement. First BDT 25 lakh: exempt. Remaining BDT 5 lakh: taxable at applicable slab rate in the year of receipt.",
      conclusion: "**Provident fund & gratuity tax:**\\n\\n**APF contribution:** Exempt (employer) + rebate eligible (employee)\\n**APF withdrawal:** Exempt up to BDT 25 lakh\\n**Gratuity (approved fund):** Exempt up to BDT 25 lakh\\n**Excess above BDT 25 lakh:** Taxable at slab rates\\n\\n**Unapproved funds:** Different rules - generally taxable.\\n\\n Employee benefits tax guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-040",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["crypto tax", "bitcoin tax", " ", "cryptocurrency bangladesh tax", "digital asset tax"],
    question: "Is cryptocurrency income taxable in Bangladesh?",
    irac: {
      issue: "How is cryptocurrency income treated under Bangladesh tax law?",
      rule: "ITA 2023 + Bangladesh Bank position: Cryptocurrency trading and transactions are not legally recognised in Bangladesh. Bangladesh Bank prohibits crypto transactions. However, any profit realised from crypto - even if received offshore - may be treated as undisclosed income by NBR if brought into the country. Risk of tax + penalty on discovery.",
      application: "If crypto income is brought into Bangladesh as foreign remittance through banking channel: may be treated as foreign income (not taxable if kept offshore). If converted and used locally: NBR may classify as undisclosed income.",
      conclusion: "**Cryptocurrency in Bangladesh:**\\n\\n **Legal status:** Prohibited by Bangladesh Bank\\n **Tax risk:** Income from crypto not declared = potential undisclosed income\\n\\n**Practical position:**\\n* Offshore crypto profits kept offshore: not immediately taxable\\n* Crypto income brought to BD: declare as foreign income\\n* Local crypto transactions: high legal + tax risk\\n\\n**Advice:** Consult tax professional before any action.\\n\\n Crypto tax advisory - BDT 2,999"
    },
    escalate: true,
    escalateReason: "Cryptocurrency tax issues carry legal and regulatory risk. WhatsApp NLC for guidance.",
    relatedRules: [],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-041",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["salary abroad income", "foreign salary tax", "  ", "overseas job tax", "foreign employment"],
    question: "I work abroad - do I pay tax in Bangladesh on my foreign salary?",
    irac: {
      issue: "Is foreign salary income of a Bangladeshi national taxable in Bangladesh?",
      rule: "ITA 2023 + Residence rules: Tax residence determines where you pay tax. A Bangladeshi spending more than 182 days outside Bangladesh per year may be non-resident for tax purposes. Non-residents: taxed only on Bangladesh-source income. Residents: worldwide income taxable.",
      application: "Engineer working in Qatar for 10 months per year (>182 days abroad): non-resident for that tax year. Foreign salary not taxable in Bangladesh. Must check residency status each year.",
      conclusion: "**Foreign employment tax:**\\n\\n**If non-resident (>182 days abroad):**\\n* Foreign salary: NOT taxable in Bangladesh\\n* Bangladesh-source income: still taxable\\n\\n**If resident (<182 days abroad):**\\n* Worldwide income taxable in Bangladesh\\n* Foreign tax paid = credit against BD tax\\n\\n**Key:** Track your days outside Bangladesh each tax year.\\n\\n Expatriate tax guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-042",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["nbr notice response", "tax notice", " ", "income tax notice", "dcit notice"],
    question: "I received a tax notice from NBR - what do I do?",
    irac: {
      issue: "How should a taxpayer respond to a notice from the Deputy Commissioner of Taxes?",
      rule: "ITA 2023: Ignoring a tax notice is the worst response - it leads to ex-parte assessment (DCT decides without your input) with maximum tax + penalty. Respond within the time stated in the notice. Request extension in writing if more time needed.",
      application: "Receive notice asking to explain why income was declared lower: gather bank statements, salary certificates, receipts. Respond in writing before deadline. If income was indeed higher - consider voluntary disclosure. If notice is wrong - provide proof.",
      conclusion: "**If you receive a tax notice:**\\n\\n1. **Read carefully** - note response deadline\\n2. **Do NOT ignore** - ignoring = ex-parte assessment\\n3. Gather all relevant documents\\n4. Respond in writing within deadline\\n5. If need extension -> write to DCT before deadline\\n6. If notice seems wrong -> provide proof, contest formally\\n\\n Always respond - even if to say you disagree.\\n\\n Tax notice response guide - BDT 1,999"
    },
    escalate: true,
    escalateReason: "Tax notice response requires professional help. WhatsApp NLC.",
    relatedRules: [],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-043",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["export income tax", "export earnings tax", "  ", "garments export tax", "export exemption"],
    question: "Is export income exempt from tax?",
    irac: {
      issue: "What tax exemptions apply to export income under Bangladesh tax law?",
      rule: "Finance Act 2024 + ITA 2023: Ready-made garments (RMG) export: 1% final tax on export proceeds (reduced rate). IT/ITES export: exempt until 2027. Jute goods export: 50% tax exemption on income. Other export income: standard corporate/individual tax rates but various SRO-based exemptions exist.",
      application: "RMG exporter receiving USD 1 million: pays 1% on export proceeds as final tax - no need to calculate profit. Simpler and lower than corporate rate. IT service exporter: fully exempt until 2027.",
      conclusion: "**Export income tax (2024-25):**\\n\\n| Export Type | Tax Rate |\\n|---|---|\\n| RMG (garments) | 1% of proceeds (final) |\\n| IT/ITES services | Exempt until 2027 |\\n| Jute goods | 50% exemption |\\n| Other exports | Standard rates |\\n\\nZero VAT on all exports.\\n\\n Export tax guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-corporate-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-044",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["pension tax", "retirement income tax", " ", "government pension", "pension taxable"],
    question: "Is pension income taxable in Bangladesh?",
    irac: {
      issue: "Is pension income taxable under ITA 2023?",
      rule: "ITA 2023: Government pension received by a government employee or their family after retirement/death: fully exempt from income tax. Private company pension from approved pension fund: exempt up to reasonable limit. Lump sum pension commutation: generally exempt.",
      application: "Retired government employee receiving monthly pension of BDT 30,000: completely exempt, no return needed unless other income exists. Private sector retiree receiving pension from company approved fund: mostly exempt.",
      conclusion: "**Pension income tax:**\\n\\n **Fully exempt:**\\n* Government pension to retired govt employee\\n* Family pension after govt employee's death\\n\\n **Mostly exempt:**\\n* Pension from approved private pension fund\\n\\n **Taxable:**\\n* Pension from unapproved fund\\n* Lump sum payment from unapproved fund\\n\\n Retirement income guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-045",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["vat input credit", "input vat", " ", "vat credit claim", "mushak input credit"],
    question: "Can I claim input VAT credit on purchases?",
    irac: {
      issue: "How does input VAT credit work under the VAT Act 2012?",
      rule: "VAT Act 2012, Section 46: VAT-registered businesses can claim credit for VAT paid on purchases (input VAT) against VAT collected on sales (output VAT). Credit only available if: purchases have valid MUSHAK 6.3 invoices, goods/services used for taxable business purposes.",
      application: "Manufacturer pays BDT 15,000 VAT on raw materials purchased. Charges BDT 25,000 VAT on finished goods sold. Net VAT payable = BDT 25,000  BDT 15,000 = BDT 10,000 only.",
      conclusion: "**Input VAT credit:**\\n\\nOutput VAT (collected from customers)\\n Input VAT (paid on business purchases)\\n= Net VAT payable to NBR\\n\\n**Conditions for input credit:**\\n* Valid MUSHAK 6.3 invoice from supplier\\n* Purchase for taxable business use\\n* Supplier must be VAT-registered\\n* Claimed within 4 months of purchase\\n\\n**Cannot claim credit on:** Personal use purchases, exempt goods\\n\\n VAT input credit guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-046",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["large taxpayer", "ltu", " ", "large taxpayer unit", "ltu registration"],
    question: "What is the Large Taxpayer Unit (LTU) and do I fall under it?",
    irac: {
      issue: "What is the NBR's Large Taxpayer Unit and what taxpayers fall under its jurisdiction?",
      rule: "NBR (Large Taxpayer Unit) Rules: LTU handles tax compliance for large businesses. Currently covers: banks, insurance companies, telecom companies, listed companies with turnover > BDT 100 crore, and others meeting LTU criteria. LTU provides dedicated tax officers and faster processing.",
      application: "A small business or individual taxpayer does not fall under LTU - files at local Circle Tax Office. A large bank or telecom company files all returns at LTU Dhaka or Chattogram.",
      conclusion: "**Large Taxpayer Unit (LTU):**\\n\\n**Who falls under LTU:**\\n* Banks and financial institutions\\n* Insurance companies\\n* Telecom companies\\n* Listed large companies (turnover > BDT 100 crore)\\n* NBR-notified entities\\n\\n**Benefits of LTU:**\\n* Dedicated tax officer\\n* Faster assessments\\n* Single-window compliance\\n\\n**Others:** File at regular Circle Tax Office.\\n\\n LTU compliance guide - BDT 2,999"
    },
    escalate: false,
    relatedRules: ["tax-corporate-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-047",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["flat apartment purchase tax", "apartment buy tax", "  ", "property purchase tax", "flat registration tax"],
    question: "What taxes do I pay when buying a flat?",
    irac: {
      issue: "What taxes and fees apply when purchasing a flat or apartment in Bangladesh?",
      rule: "Stamp Act + ITA 2023 + VAT Act: Flat purchase attracts: Registration fees + stamp duty (1-1.5%), AIT (4% Dhaka city), local govt tax (2%), VAT on REHAB price for new flats (registered developer). Plus: income tax return submission required for registration.",
      application: "Buying a flat in Dhaka for BDT 80 lakh: Stamp + registration  BDT 2 lakh, AIT  BDT 3.2 lakh, local tax  BDT 1.6 lakh. Total registration taxes  BDT 7 lakh. Plus TIN required.",
      conclusion: "**Flat purchase taxes (Dhaka):**\\n\\n| Cost | Amount (approx) |\\n|---|---|\\n| Stamp duty (1.5%) | BDT 1.2 lakh |\\n| Registration fee (1%) | BDT 0.8 lakh |\\n| Local govt tax (2%) | BDT 1.6 lakh |\\n| AIT (4%) | BDT 3.2 lakh |\\n| **Total on BDT 80 lakh** | **~BDT 6.8 lakh** |\\n\\n**Also required:**\\n* TIN certificate\\n* Tax return acknowledgement\\n\\n Flat purchase guide - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-048",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["small business vat", "cottage industry", "  ", "small business tax", "cottage vat"],
    question: "Do small businesses and cottage industries pay VAT?",
    irac: {
      issue: "What VAT obligations apply to small businesses and cottage industries under VAT Act 2012?",
      rule: "VAT Act 2012 + NBR SRO: Cottage industries and small businesses with annual turnover below BDT 30 lakh: fully exempt from VAT. BDT 30-50 lakh: turnover tax at 4% (simple, no input credit). Above BDT 50 lakh: full VAT registration and 15% VAT regime.",
      application: "Village cottage industry making handloom sarees with annual sales BDT 15 lakh: completely exempt from VAT. No registration needed. Small shop with BDT 40 lakh sales: 4% turnover tax - simpler regime.",
      conclusion: "**Small business VAT threshold:**\\n\\n| Annual Turnover | VAT Obligation |\\n|---|---|\\n| Below BDT 30 lakh | Fully exempt |\\n| BDT 30-50 lakh | 4% turnover tax |\\n| Above BDT 50 lakh | Full 15% VAT + monthly return |\\n\\n**Cottage industry + women artisans:** Often additional exemptions apply - check current SRO.\\n\\n Small business VAT guide - BDT 999"
    },
    escalate: false,
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-049",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["income tax act 2023 changes", "new tax law changes", "  ", "ita 2023 vs ordinance 1984", "tax law changes"],
    question: "What are the major changes in the Income Tax Act 2023 vs old law?",
    irac: {
      issue: "What are the key changes introduced by the Income Tax Act 2023 replacing the IT Ordinance 1984?",
      rule: "Income Tax Act 2023 (effective 1 July 2023): Major changes from the repealed IT Ordinance 1984.",
      application: "The new Act restructures the entire income tax system - new chapter structure, new filing system, higher minimum tax, new online-first approach, and tighter compliance requirements.",
      conclusion: "**Key ITA 2023 changes vs Ordinance 1984:**\\n\\n **New:**\\n* Written in Bangla (official text)\\n* Minimum tax BDT 3,000-5,000 for all TIN holders (NEW)\\n* Online filing mandatory (etaxnbr.gov.bd)\\n* Simplified one-page return for low income\\n* Transfer pricing chapter strengthened\\n* New penalty structure\\n* New voluntary disclosure provisions\\n\\n **Removed:**\\n* Various old exemptions and provisions\\n* Old IT Ordinance 1984 (fully repealed)\\n\\n ITA 2023 full summary - BDT 1,999"
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-050",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax consultant", "ca firm", "tax advisor", " ", "income tax help", "need tax help"],
    question: "When do I need a professional tax consultant in Bangladesh?",
    irac: {
      issue: "In what situations should a taxpayer engage a professional tax consultant in Bangladesh?",
      rule: "ITA 2023: There is no legal requirement for a tax consultant for basic individual returns. However, company tax returns, tax audits, appeals, large transactions, and complex situations professionally require a Chartered Accountant (CA), Cost and Management Accountant (CMA), or Tax Lawyer.",
      application: "Salaried person: can self-file at etaxnbr.gov.bd using employer's Form 108A. Business with multiple income sources, company tax, export income, or tax notices: professional help essential.",
      conclusion: "**DIY vs Professional:**\\n\\n**Can self-file:**\\n* Salaried individual with one employer\\n* Simple business (small sole trader)\\n* Online at etaxnbr.gov.bd\\n\\n**Engage professional:**\\n* Company tax return\\n* Tax audit/notice response\\n* Tax appeal\\n* Large property transactions\\n* Foreign income/NRB matters\\n* Transfer pricing\\n* VAT compliance (medium/large business)\\n\\n**NLC can refer:** CA firms, CMAs, and specialist tax lawyers.\\n\\n Full tax consultation - WhatsApp NLC"
    },
    escalate: true,
    escalateReason: "Complex tax matters require professional guidance. WhatsApp NLC for referral.",
    relatedRules: [],
    lastVerified: "2025-03-09",
  },
  {
    id: "tax-qa-051",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["vat enforcement", "vat audit", "vat inspection", "nbr vat visit", "vat officer visit", "mushak audit"],
    question: "What happens during a VAT audit by NBR?",
    irac: {
      issue: "What is the VAT audit process and what powers do VAT officers have under the VAT Act 2012?",
      rule: "VAT Act 2012, Section 75-82: VAT officers can conduct audit, inspection, and investigation of registered businesses. They can visit premises, examine books, seize records, and summon persons. VAT audit may be: desk audit (document review), field audit (premises visit), or special audit (for suspected evasion).",
      application: "VAT officer visits your shop: Must show ID and authorisation. You must provide: all MUSHAK 6.3 invoices, purchase records, bank statements, stock records. Officer examines whether output VAT = input VAT + net payable. Discrepancies lead to demand notice with penalty.",
      conclusion: "**VAT audit process:**\n\n**Types:**\n* Desk audit - document review at NBR office\n* Field audit - premises visit\n* Special audit - suspected evasion\n\n**Officer powers:**\n* Enter business premises\n* Examine books, records, computers\n* Seize documents (with receipt)\n* Summon persons for questioning\n\n**Your obligations:**\n* Cooperate fully\n* Provide all requested records\n* MUSHAK 6.3 invoices for 5 years\n* Bank statements\n\n**If demand raised:**\n* 30 days to respond\n* Appeal to Commissioner (Appeals)\n* Penalty: up to 2x evaded VAT\n\n VAT audit response guide - BDT 2,999",
    },
    escalate: true,
    escalateReason: "VAT audit requires professional response. WhatsApp NLC for CA referral.",
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "tax-qa-052",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["vat deregistration", "close vat", "vat cancellation", "bin cancel", "stop vat registration"],
    question: "How do I cancel or deregister my VAT registration?",
    irac: {
      issue: "What is the process for VAT deregistration when a business closes or turnover falls below threshold?",
      rule: "VAT Act 2012, Section 11: A registered person can apply for deregistration if: business is closed, turnover falls below BDT 30 lakh for 2 consecutive years, or business is transferred. Must file final return, pay all dues, and surrender BIN certificate. NBR may also cancel registration for non-compliance.",
      application: "Shop owner closes business: Apply for deregistration at vat.gov.bd or local VAT office. File final MUSHAK 9.1 up to closure date. Pay all outstanding VAT. Surrender BIN certificate. NBR issues deregistration certificate.",
      conclusion: "**VAT deregistration process:**\n\n**Apply when:**\n* Business permanently closed\n* Turnover < BDT 30 lakh for 2 years\n* Business transferred/sold\n\n**Steps:**\n1. File final MUSHAK 9.1\n2. Pay all outstanding VAT + penalties\n3. Submit deregistration application\n4. Surrender BIN certificate\n5. NBR issues cancellation certificate\n\n**NBR may cancel for:**\n* Non-filing for 6+ months\n* Non-payment of VAT\n* Fraudulent registration\n\n VAT deregistration guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "tax-qa-053",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["agricultural income tax", "krishi aay kor", "  ", "farm income tax", "agriculture tax bangladesh"],
    question: "Is agricultural income taxable in Bangladesh?",
    irac: {
      issue: "What is the tax treatment of income from agriculture under ITA 2023?",
      rule: "ITA 2023, Section 76: Income from agriculture is exempt from income tax if it is from traditional farming activities. However, commercial agricultural processing, agro-business, and value-added activities are taxable. Land revenue/rent from agricultural land is also exempt if below threshold.",
      application: "Farmer growing rice and selling at local market: income exempt. Same farmer setting up a rice mill and processing others' rice: milling income is taxable business income. Large commercial poultry farm: taxable.",
      conclusion: "**Agricultural income tax:**\n\n **Exempt:**\n* Traditional crop farming\n* Small-scale livestock rearing\n* Fish farming (small scale)\n* Sale of own agricultural produce\n\n **Taxable:**\n* Commercial processing (rice mill, cold storage)\n* Large-scale commercial farming\n* Agro-export business\n* Contract farming with corporations\n\n**Land revenue:** Exempt if below BDT 25,000/year\n\n Agricultural income guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["tax-slab-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "tax-qa-054",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax amnesty", "black money white", "undisclosed asset", "voluntary disclosure scheme", "tax pardon"],
    question: "Is there a current tax amnesty or voluntary disclosure scheme in Bangladesh?",
    irac: {
      issue: "What voluntary disclosure or amnesty provisions exist under ITA 2023 for undeclared income or assets?",
      rule: "ITA 2023, Section 245: Permanent voluntary disclosure provision exists - pay normal tax + 10% surcharge on undisclosed income. Immunity from prosecution for disclosed amount. Finance Act may announce special amnesty windows with reduced rates periodically. No special amnesty window is currently active as of early 2025 - but Section 245 remains available year-round.",
      application: "Person with BDT 50 lakh undeclared cash: Can voluntarily disclose, pay tax at applicable rate + 10% surcharge. No further penalty or prosecution for that amount. Must file amended return. Disclosed amount becomes 'white' for future.",
      conclusion: "**Voluntary disclosure (Section 245):**\n\n**Available year-round:**\n* Pay normal tax + 10% surcharge\n* Immunity from prosecution\n* No further investigation for disclosed amount\n\n**vs Special Amnesty Window:**\n* Finance Act may announce periodically\n* Lower rates (e.g., 10% flat in past windows)\n* Time-limited\n* No current active window (as of early 2025)\n\n**Strategy:**\n* Section 245 always available\n* Wait for special window if announced\n* Consult tax professional before disclosing\n\n NBR discovery = 50-100% penalty + prosecution risk\n\n Voluntary disclosure strategy - BDT 2,999",
    },
    escalate: true,
    escalateReason: "Voluntary disclosure strategy requires professional tax planning. WhatsApp NLC for CA referral.",
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "tax-qa-055",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["turnover tax", "4 percent tax", "small business tax", "turnover tax bangladesh", "vat turnover"],
    question: "What is turnover tax and who pays it?",
    irac: {
      issue: "What is the turnover tax regime for small businesses under VAT Act 2012?",
      rule: "VAT Act 2012: Businesses with annual turnover between BDT 30 lakh and BDT 50 lakh pay 4% turnover tax instead of 15% VAT. No input credit available. No monthly MUSHAK 9.1 - simpler quarterly or annual return. Cannot issue MUSHAK 6.3 (VAT invoice).",
      application: "Small retailer with BDT 40 lakh annual sales: Pays 4% on turnover = BDT 1.6 lakh per year. Cannot claim input VAT on purchases. Simpler compliance than full VAT regime.",
      conclusion: "**Turnover tax (4%):**\n\n**Applies to:**\n* Annual turnover BDT 30-50 lakh\n* Cannot opt for full VAT voluntarily\n\n**Features:**\n* 4% of gross turnover\n* No input VAT credit\n* Simpler return (not monthly MUSHAK 9.1)\n* Cannot issue VAT invoices\n* Cannot claim input VAT from suppliers\n\n**Below BDT 30 lakh:** Fully exempt\n**Above BDT 50 lakh:** Must register for 15% VAT\n\n Turnover tax guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "tax-qa-056",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax assessment", "self assessment", "best judgment", "dcit assessment", "tax officer assessment"],
    question: "What are the different types of tax assessment under ITA 2023?",
    irac: {
      issue: "What types of income tax assessment exist under the Income Tax Act 2023?",
      rule: "ITA 2023, Sections 170-185: Three main assessment types: (1) Self-assessment - taxpayer files return, tax is assessed based on declared income. (2) Best judgment assessment - DCT estimates income when taxpayer fails to file or cooperate. (3) Re-assessment - DCT reopens assessment within 3 years (5 for fraud) if new information emerges.",
      application: "Taxpayer files return on time with all documents: self-assessment, tax as declared. Taxpayer ignores notices and doesn't file: DCT conducts best judgment assessment - estimates higher income, imposes maximum tax + penalty. NBR later discovers hidden bank account: re-assessment opened, additional tax + 50-100% penalty.",
      conclusion: "**Types of tax assessment:**\n\n**1. Self-Assessment (default):**\n* Taxpayer files return\n* Tax based on declared income\n* Most common for compliant taxpayers\n\n**2. Best Judgment Assessment:**\n* DCT estimates income\n* When taxpayer fails to file or cooperate\n* Usually higher tax than self-assessment\n* + penalties\n\n**3. Re-assessment:**\n* Reopened within 3 years (5 for fraud)\n* New information discovered\n* Additional tax + 50-100% penalty\n\n**Goal:** File honest self-assessment - avoid other types.\n\n Assessment types guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "tax-qa-057",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax deduction certificate", "wht certificate", "source tax certificate", "form 108a", "tax credit certificate"],
    question: "How do I claim tax credit for tax already deducted at source?",
    irac: {
      issue: "How does a taxpayer claim credit for WHT already deducted by employers, banks, and tenants?",
      rule: "ITA 2023, Section 237: Taxpayer can claim credit for all WHT deducted at source against final tax liability. Must obtain certificates from deductors: Form 108A (salary WHT from employer), bank WHT certificates, tenant WHT receipts. Attach all certificates with annual return. DCT verifies and allows credit.",
      application: "Employee had BDT 48,000 WHT deducted by employer (Form 108A). Bank deducted BDT 8,000 on FD interest. Tenant deducted BDT 12,000 on rent. Total WHT credit = BDT 68,000. If final tax liability is BDT 70,000 - only BDT 2,000 additional tax due. If WHT exceeds liability - claim refund.",
      conclusion: "**Claiming WHT credit:**\n\n**Obtain certificates from:**\n* Employer: Form 108A (annual)\n* Bank: WHT certificate (annual)\n* Tenant: WHT receipt (per payment)\n* Dividend payer: WHT certificate\n\n**Attach all with annual return.**\n\n**If WHT > final tax:**\n* Claim refund in return\n* Or carry forward to next year\n\n**Keep all certificates for 5 years** - NBR may ask for verification.\n\n WHT credit guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["tax-wht-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "tax-qa-058",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["vat composition", "composition scheme", "small trader vat", "composition vat", "simplified vat"],
    question: "Is there a simplified VAT scheme for small traders?",
    irac: {
      issue: "What simplified VAT compliance options exist for small traders and retailers?",
      rule: "VAT Act 2012 + NBR SROs: Small traders with turnover BDT 30-50 lakh can opt for 4% turnover tax (simpler than full VAT). Some categories of small retailers may have special composition schemes announced by NBR from time to time. Full VAT registration mandatory above BDT 50 lakh with no simplified option.",
      application: "Small grocery shop with BDT 35 lakh turnover: Can pay 4% turnover tax instead of 15% VAT. No need to issue MUSHAK 6.3 invoices. No monthly return - simpler compliance. But cannot claim input VAT on purchases from VAT-registered suppliers.",
      conclusion: "**Simplified VAT for small traders:**\n\n**Turnover tax (4%):**\n* Turnover BDT 30-50 lakh\n* No input credit\n* No monthly MUSHAK 9.1\n* Cannot issue VAT invoices\n\n**Full VAT (15%):**\n* Turnover > BDT 50 lakh (mandatory)\n* Input credit available\n* Monthly MUSHAK 9.1\n* Must issue MUSHAK 6.3 invoices\n\n**Special schemes:**\n* NBR announces periodically for specific sectors\n* Check current SROs\n\n Small trader VAT guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["tax-vat-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "tax-qa-059",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["tax return revision", "amend return", "correct tax return", "return mistake", "revise return"],
    question: "Can I revise my tax return if I made a mistake?",
    irac: {
      issue: "Is it possible to correct or revise an already filed income tax return?",
      rule: "ITA 2023, Section 174: Taxpayer can file a revised return within 180 days of original filing if the original return was filed within the due date (30 November). Revised return replaces original. If filed after deadline - treated as late return with surcharge. If DCT has already completed assessment - revision not allowed.",
      application: "Filed return on 15 November, then discovered unclaimed investment rebate: File revised return before 15 May (180 days). Include correct investment amount. DCT processes revised return. If DCT already issued assessment order on 20 December - too late to revise.",
      conclusion: "**Revising tax return:**\n\n**Allowed if:**\n* Within 180 days of original filing\n* Original filed by due date (30 Nov)\n* DCT has not completed assessment\n\n**Process:**\n* File revised return at etaxnbr.gov.bd\n* Clearly mark as 'Revised'\n* Include explanation for changes\n* Revised return replaces original\n\n**Not allowed if:**\n* DCT assessment already completed\n* Original filed after deadline\n* Beyond 180 days\n\n**Alternative:** File objection/appeal if assessment is wrong\n\n Return revision guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["tax-ita-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "tax-qa-060",
    area: "tax",
    jurisdiction: "BD",
    triggerKeywords: ["nbr online services", "etax portal", "online tax", "digital tax bangladesh", "nbr app", "etaxnbr"],
    question: "What online services does NBR offer for taxpayers?",
    irac: {
      issue: "What digital services are available from NBR for tax compliance and filing?",
      rule: "NBR operates multiple online portals: etaxnbr.gov.bd (income tax filing), vat.gov.bd (VAT registration and filing), customs.gov.bd (customs declarations), incometax.gov.bd (TIN registration). All major tax compliance can now be done online. NBR also provides SMS alerts, mobile apps, and e-payment integration with banks.",
      application: "Taxpayer can: Register TIN online -> File income tax return -> Pay tax online -> Check refund status -> Download certificates -> File VAT returns -> Register for BIN - all without visiting NBR office. Some services still require physical submission for complex cases.",
      conclusion: "**NBR Online Services:**\n\n**Income Tax:**\n* incometax.gov.bd - TIN registration\n* etaxnbr.gov.bd - Return filing, payment, refund\n\n**VAT:**\n* vat.gov.bd - BIN registration, MUSHAK 9.1 filing\n\n**Customs:**\n* customs.gov.bd - Import declarations, duty payment\n\n**Features:**\n* Online payment via bank integration\n* SMS alerts for deadlines\n* Digital certificates download\n* Refund tracking\n* Assessment status check\n\n**Still offline:**\n* Complex appeals\n* Physical document submission for some cases\n* Tax clearance certificate (TCC)\n\n NBR digital services guide - BDT 499",
    },
    escalate: false,
    relatedRules: ["tax-ita-001", "tax-vat-001"],
    lastVerified: "2025-03-09",
  },
];

const taxModule: KnowledgeModule = {
  area: "tax",
  label: "Tax Law - Income Tax Act 2023, VAT & NBR",
  description: "Knowledge module for tax law in Bangladesh.",
  rules,
  qaBank,
};

export default taxModule;