import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LawSubject {
  id: string;
  icon: string;
  title: string;
  titleBn: string;
  subtitle: string;
  color: string;
  border: string;
  keyLaws: string[];
  commonQuestions: {
    q: string;
    a: string;
  }[];
}

const LAW_SUBJECTS: LawSubject[] = [
  {
    id: "property",
    icon: "🏠",
    title: "Land & Property Law",
    titleBn: "ভূমি ও সম্পত্তি আইন",
    subtitle: "Transfer of Property, Mutation, Deed Registration, Tenancy",
    color: "from-amber-900/30 to-amber-800/10",
    border: "border-amber-700/30",
    keyLaws: [
      "Transfer of Property Act 1882",
      "Registration Act 1908",
      "State Acquisition and Tenancy Act 1950",
      "Non-Agricultural Tenancy Act 1949",
      "Artha Rin Adalat Act 2003",
      "Specific Relief Act 1877",
    ],
    commonQuestions: [
      {
        q: "What is namajaari (mutation) and how do I do it for inherited land?",
        a: "Namajaari (land mutation) means recording your name in the government land register (khatian) as the new owner. After inheriting land, you file a mutation application at the AC Land office with: death certificate, succession certificate, existing deed/khatian, and identity proof. The AC Land officer conducts a hearing and updates the record. This is essential before selling or mortgaging the land.",
      },
      {
        q: "What happens if land is sold with a forged deed?",
        a: "Under the Registration Act 1908 and Penal Code, selling land with a forged deed is both a civil wrong and a criminal offence. The aggrieved owner can: (1) file a civil suit to cancel the fraudulent deed and restore title, (2) file a criminal complaint for forgery under Sections 463–467 of the Penal Code. Courts regularly set aside fraudulent deeds. A limitation period of 3 years applies from discovery of the fraud.",
      },
      {
        q: "Can a landlord evict a tenant without notice or reason?",
        a: "Under the Non-Agricultural Tenancy Act 1949, a landlord cannot evict a tenant arbitrarily. Legal grounds for eviction include: non-payment of rent for 3+ months, subletting without permission, or causing damage to the property. A court order is required for eviction. The tenant must be given proper notice and opportunity to respond. Forcible eviction without a court order is illegal and actionable.",
      },
      {
        q: "What is pre-emption (shafi) and who can claim it?",
        a: "Pre-emption (shafi) is the right of certain persons to purchase land before an outsider, when the owner decides to sell. Under the State Acquisition and Tenancy Act 1950, co-sharer tenants, adjoining land holders (contiguous plot owners), and in some cases shareholders have pre-emption rights. A pre-emption case must be filed within 4 months of the sale registration date.",
      },
      {
        q: "I have a baynama (sale agreement) but the seller refuses to execute the final deed — what can I do?",
        a: "A registered baynama (sale agreement) is a valid contract. If the seller refuses to execute the final sale deed, you can file a suit for specific performance under the Specific Relief Act 1877. The court can compel the seller to execute the deed. You must file within 3 years of the seller's refusal. An unregistered baynama can also be enforced but is harder to rely upon as evidence.",
      },
      {
        q: "What is adverse possession and can someone claim my land by occupying it?",
        a: "Adverse possession allows someone who has openly, continuously, and exclusively occupied land for 12 years (or more) to acquire title to it, even without a deed. However, there is no adverse possession against government khas land. If you discover someone is occupying your land, file a suit for declaration and recovery of possession immediately — time runs against you from the date of dispossession.",
      },
    ],
  },
  {
    id: "criminal",
    icon: "🔒",
    title: "Criminal Law",
    titleBn: "ফৌজদারি আইন",
    subtitle: "Penal Code, CrPC, FIR, Bail, Arrest, Trial",
    color: "from-red-900/30 to-red-800/10",
    border: "border-red-700/30",
    keyLaws: [
      "Penal Code 1860",
      "Code of Criminal Procedure (CrPC) 1898",
      "Evidence Act 1872",
      "Nari O Shishu Nirjatan Daman Act 2000",
      "Cyber Security Act 2023",
      "Narcotics Control Act 2018",
    ],
    commonQuestions: [
      {
        q: "What are my rights when police arrest me?",
        a: "Under Article 33 of the Constitution and CrPC: (1) You must be informed of the reason for arrest immediately. (2) You have the right to consult and be defended by a lawyer. (3) You must be produced before a magistrate within 24 hours. (4) You cannot be tortured or coerced. (5) You have the right to remain silent. Police must record the arrest in the diary. Demand to know which section you are arrested under.",
      },
      {
        q: "How do I get bail after arrest?",
        a: "For bailable offences, bail is a right — police must grant it. For non-bailable offences, apply to the Sessions Judge or Magistrate's Court. Submit: application with surety names, accused's connection to the area, no flight risk. For High Court bail, instruct an advocate to file a bail application. Courts consider: gravity of offence, criminal record, likelihood of fleeing. First-time accused with strong local ties usually get bail.",
      },
      {
        q: "What is remand and can police keep me in remand indefinitely?",
        a: "Remand (police custody interrogation) is authorised by a magistrate under Section 167 CrPC. Maximum initial custody before charge: 24 hours by police, then must be produced before magistrate. Magistrate can grant police remand in 15-day installments, with total remand not exceeding 15 days in cognizable cases. After 60 days (murder) or 30 days (other cases), if no chargesheet is filed, the accused is entitled to bail as of right under Section 167(2).",
      },
      {
        q: "I am a victim of a crime — how do I file an FIR?",
        a: "An FIR (First Information Report) is filed at the police station where the offence occurred. Write the facts clearly: date, time, place, who did what. The OC (Officer-in-Charge) is legally bound to register the FIR for cognizable offences. If police refuse, you can: (1) approach the Superintendent of Police, (2) file a Naraji (complaint) petition directly before the Magistrate under Section 200 CrPC. Keep a copy of the FIR.",
      },
      {
        q: "What is the difference between a cognizable and non-cognizable offence?",
        a: "Cognizable offences (e.g., murder, rape, robbery) allow police to arrest without a warrant and investigate without magistrate permission. Non-cognizable offences (e.g., assault, cheating, fraud below threshold) require police to obtain a magistrate's order before investigation and cannot arrest without a warrant. Most serious crimes are cognizable. For non-cognizable offences, file a complaint before the Magistrate directly.",
      },
      {
        q: "Can police search my home without a warrant?",
        a: "Generally no. Under Section 165 CrPC, a police officer needs a search warrant from a magistrate before searching a home. Exceptions: (1) hot pursuit — if a suspect is believed to be inside, (2) if the magistrate gives verbal order (must be confirmed in writing within 24 hours), (3) during arrest of a person at the premises. Police must make a list of everything seized (seizure list) and give you a copy. An illegal search can be challenged in court.",
      },
    ],
  },
  {
    id: "family",
    icon: "👨‍👩‍👧",
    title: "Family Law",
    titleBn: "পারিবারিক আইন",
    subtitle: "Marriage, Divorce, Custody, Maintenance, Inheritance",
    color: "from-purple-900/30 to-purple-800/10",
    border: "border-purple-700/30",
    keyLaws: [
      "Muslim Family Laws Ordinance 1961",
      "Family Courts Ordinance 1985",
      "Dissolution of Muslim Marriages Act 1939",
      "Dowry Prohibition Act 1980",
      "Child Marriage Restraint Act 2017",
      "Hindu Marriage Registration Act 2012",
    ],
    commonQuestions: [
      {
        q: "How does a Muslim wife get divorce (khul) in Bangladesh?",
        a: "A Muslim wife can seek divorce by: (1) Khul — giving up the dower (mehr) in exchange for the husband agreeing to divorce; (2) Judicial dissolution under the Dissolution of Muslim Marriages Act 1939 — grounds include: husband's cruelty, desertion, failure to maintain, imprisonment, or impotency. File in the Family Court. The court process takes 3–6 months typically. A husband can also give talaq which requires registration with the Chairman of the Union Council and 90-day reconciliation notice.",
      },
      {
        q: "Who gets custody of children after divorce?",
        a: "Under Muslim personal law, the mother has the right of hizanat (custody) until: boy reaches 7 years, girl reaches puberty. After these ages, the father generally gets custody. However, the Family Court applies the 'best interest of the child' principle, which often keeps children with the mother if she can provide better care. Custody can be varied by court order if circumstances change. The non-custodial parent always retains visitation rights.",
      },
      {
        q: "What is dower (mehr) and when must it be paid?",
        a: "Dower (mehr) is the mandatory payment from husband to wife as part of the Islamic marriage contract. It has two parts: prompt dower (mahr muajjal — due on demand or dissolution) and deferred dower (mahr muajjal — due on death or divorce). An unpaid dower is a debt recoverable by the wife. The wife can refuse cohabitation until prompt dower is paid. The Family Court can award a decree for unpaid dower.",
      },
      {
        q: "How much maintenance (nafaqa) is a divorced wife entitled to?",
        a: "The Family Court determines maintenance based on: husband's income and means, wife's needs, standard of living during marriage. During marriage, the wife is entitled to maintenance as a right. After divorce, iddat maintenance (typically 3 months) is mandatory. The court can also award a one-time comprehensive sum. Children are always entitled to maintenance from the father regardless of custody arrangements.",
      },
      {
        q: "Is a marriage valid without registration?",
        a: "Under the Muslim Family Laws Ordinance 1961, every Muslim marriage must be registered with the local Union Parishad/City Corporation Nikah Registrar. An unregistered marriage is still valid under Islamic law but the husband can face a fine and imprisonment of up to 2 years. Practically, registration is crucial for women's rights — it's evidence of the marriage, dower amount, and witnesses for any future legal proceedings.",
      },
      {
        q: "How is inheritance divided after a Muslim person dies?",
        a: "Muslim inheritance follows the Quran: son gets double a daughter's share; surviving spouse gets 1/4 (no children) or 1/8 (with children) for wife, or 1/2 (no children) or 1/4 (with children) for husband. Parents also get fixed shares. Heirs are divided into 'sharers' (fixed shares) and 'residuaries' (remainder). A succession certificate from the court is required to collect assets from banks and government institutions.",
      },
    ],
  },
  {
    id: "labour",
    icon: "🏭",
    title: "Labour Law",
    titleBn: "শ্রম আইন",
    subtitle: "Employment, Termination, Wages, Gratuity, Maternity",
    color: "from-teal-900/30 to-teal-800/10",
    border: "border-teal-700/30",
    keyLaws: [
      "Bangladesh Labour Act 2006 (amended 2013, 2018)",
      "Bangladesh Labour Rules 2015",
      "EPZ Labour Act 2019",
      "Minimum Wage Board Orders (sector-wise)",
      "Employees Provident Fund Ordinance 1961",
    ],
    commonQuestions: [
      {
        q: "What notice and gratuity am I owed if my employment is terminated?",
        a: "For permanent (confirmed) workers: 120 days' written notice (monthly-rated) or 60 days (others), or equivalent wages in lieu. Gratuity: 30 days' last basic wage per completed year of service (minimum 1 year required). If no provident fund scheme: 45 days per year. Dismissed for misconduct: no gratuity. Resigned: 30 days' notice required, gratuity still payable after 5 years of service in most cases.",
      },
      {
        q: "My employer has not paid my salary for months — what can I do?",
        a: "Section 120 requires wages within 7 days (up to 1,000 workers) or 10 days (over 1,000). File: (1) Complaint with DIFE (Department of Inspection for Factories and Establishments), (2) Labour Court complaint for recovery with interest. Wages are a priority debt in insolvency. Evidence needed: salary slips, attendance records, bank statements showing non-payment, appointment letter.",
      },
      {
        q: "Can my employer dismiss me without a domestic enquiry?",
        a: "No. Section 23 of the Labour Act requires: (1) issue of written charge sheet specifying the misconduct, (2) give reasonable time to respond (usually 7–14 days), (3) conduct a domestic enquiry with an impartial officer where the employee can defend themselves. Dismissal without this procedure is void even if the misconduct actually occurred. Courts regularly reinstate workers dismissed without a proper enquiry.",
      },
      {
        q: "Is overtime at double rate mandatory in Bangladesh?",
        a: "Yes. Section 108 of the Labour Act requires overtime at double the ordinary rate for hours beyond 8 hours/day or 48 hours/week. Maximum total hours including overtime: 60 per week. Overtime must be voluntary (except in genuine emergency). Record your extra working hours. If your employer pays single rate for overtime, you can claim the difference at the Labour Court for the past 2 years.",
      },
      {
        q: "What maternity leave and benefits am I entitled to?",
        a: "Female workers get 16 weeks maternity leave: 8 weeks before and 8 weeks after delivery, with full wages. Requirement: 6 months' continuous employment with the current employer. Maternity benefit is due 8 weeks before expected delivery — the employer must pay upfront. Dismissal during maternity leave is unlawful. Benefit not available for a third or subsequent child (Labour Act 2006, Sections 45–50).",
      },
      {
        q: "What is the minimum wage in Bangladesh and which sectors have higher rates?",
        a: "The national minimum wage is set by the Minimum Wage Board by sector. As of 2023: Ready Made Garments (RMG) workers: BDT 12,500/month (Grade 7). Other sectors have different rates set by Wage Board orders. All employers must comply with sector-specific minimum wages. Violation is a criminal offence. Check the current Minimum Wage Board gazette for your industry.",
      },
    ],
  },
  {
    id: "company",
    icon: "💼",
    title: "Company Law",
    titleBn: "কোম্পানি আইন",
    subtitle: "RJSC Registration, Directors, Shareholders, Compliance",
    color: "from-indigo-900/30 to-indigo-800/10",
    border: "border-indigo-700/30",
    keyLaws: [
      "Companies Act 1994",
      "Securities and Exchange Ordinance 1969",
      "Financial Reporting Act 2015",
      "Foreign Private Investment Promotion and Protection Act 1980",
      "BIDA Act 2016",
    ],
    commonQuestions: [
      {
        q: "How do I register a private limited company in Bangladesh?",
        a: "Steps: (1) Name clearance from RJSC (Registrar of Joint Stock Companies) — search and reserve the name. (2) Draft Memorandum of Association (MOA) and Articles of Association (AOA). (3) Complete Form I (application) and pay prescribed fee. (4) File with RJSC for incorporation certificate. Minimum: 2 shareholders, 2 directors. No minimum paid-up capital required. Timeline: 7–14 working days. Consider using RJSC's online portal for faster processing.",
      },
      {
        q: "What are the annual compliance obligations of a registered company?",
        a: "Every company must: (1) Hold Annual General Meeting (AGM) within 6 months of financial year end. (2) File Annual Return with RJSC within 21 days of AGM (Form XII). (3) Prepare and file audited financial statements. (4) Renew Trade License with the City Corporation/Municipality. (5) File income tax return with NBR. (6) Maintain company books, minutes book, share register. Failure: fines and potential striking off.",
      },
      {
        q: "Can a director be removed and how?",
        a: "A director can be removed by: (1) Shareholder resolution at a general meeting (Section 108 Companies Act) — ordinary resolution (simple majority) with special notice of 28 days. (2) The removed director has the right to circulate a statement to shareholders. (3) Court order for fraudulent/wrongful conduct. A director cannot prevent their removal by the shareholders who appointed them, unless the Articles of Association restrict this.",
      },
      {
        q: "What are minority shareholders' rights against oppression by majority?",
        a: "Minority shareholders (at least 1/5 of total shares) can petition the High Court under Section 233 of the Companies Act for relief against oppressive or prejudicial conduct by the majority. The court can: alter the company's constitution, regulate future affairs, order purchase of minority's shares at fair value, or wind up the company. Oppressive conduct includes: exclusion from management, diversion of company assets, diluting shares, refusing dividends.",
      },
      {
        q: "What is a partnership vs a private limited company — which is better?",
        a: "Partnership (under the Partnership Act 1932): simple to form, partners have unlimited personal liability, minimal compliance burden, not a separate legal entity. Private Ltd Company (Companies Act 1994): shareholders have limited liability (only lose their investment), separate legal entity, more compliance burden (RJSC filings, audit), better credibility with banks and investors. For significant business or external investment — a private limited company is strongly recommended for liability protection.",
      },
      {
        q: "How do I wind up (close) a company in Bangladesh?",
        a: "Voluntary winding up: (1) Pass a special resolution (3/4 majority), (2) appoint a liquidator, (3) liquidator realises assets and pays creditors, (4) file dissolution documents with RJSC. Compulsory winding up: High Court order on petition — usually for inability to pay debts or deadlock. Alternatively, an inactive company can apply for voluntary striking off (dormant company) with RJSC if no assets, liabilities, or operations.",
      },
    ],
  },
  {
    id: "tax",
    icon: "💰",
    title: "Tax Law",
    titleBn: "কর আইন",
    subtitle: "Income Tax, VAT, NBR, TIN, Returns, Assessment",
    color: "from-yellow-900/30 to-yellow-800/10",
    border: "border-yellow-700/30",
    keyLaws: [
      "Income Tax Act 2023",
      "Value Added Tax and Supplementary Duty Act 2012",
      "Customs Act 1969",
      "Stamp Act 1899",
      "NBR Statutory Regulatory Orders (SROs)",
    ],
    commonQuestions: [
      {
        q: "What is the income tax-free threshold for individuals in Bangladesh 2024-25?",
        a: "For FY 2024-25: Tax-free income threshold: BDT 3,50,000 (general). Women and senior citizens (65+): BDT 4,00,000. Physically challenged persons: BDT 4,75,000. Freedom fighters: BDT 5,00,000. Income above these thresholds is taxed at graduated rates: 5% (up to 1 lakh above threshold), 10%, 15%, 20%, 25%, 30% (top rate). Verify the current budget notification each fiscal year as these change annually.",
      },
      {
        q: "When is the deadline to file income tax return?",
        a: "For individuals and companies: 30 November each year (for July–June fiscal year). For companies with a different accounting year: 6 months after the year-end. Late filing: no specific penalty if TIN is held, but late submission of company returns attracts fines. Electronically filed returns through the NBR portal are accepted. You can seek a 2-month extension by application.",
      },
      {
        q: "What is TIN and who must get one?",
        a: "TIN (Taxpayer Identification Number) is mandatory for: any person earning above the tax-free threshold, anyone opening a bank account above BDT 1 lakh, importing/exporting goods, registering vehicles, purchasing property above BDT 10 lakh, entering government contracts, getting trade licences, and many other transactions. Apply online at NBR's e-TIN portal (etaxnbr.gov.bd) — it is free and instant.",
      },
      {
        q: "When does a business need to register for VAT?",
        a: "Registration is mandatory if your annual turnover exceeds BDT 30 lakh (simplified scheme) or BDT 80 lakh (standard rate scheme). The standard VAT rate is 15%. Reduced rates apply to certain goods/services. Register at the local VAT Commissionerate. Once registered, file monthly VAT returns (Mushak 9.1) by the 15th of the following month. Failure to register when required: penalty and retrospective VAT assessment.",
      },
      {
        q: "What are advance income tax (AIT) and withholding tax?",
        a: "Advance Income Tax (AIT): collected at source at the time of certain transactions — including import of goods, sale of goods by manufacturers, and at export. Withholding tax: deducted from payments to suppliers, contractors, employees (salary tax) before paying them. The payer is responsible for deducting and depositing within 7 days into the government treasury. Both AIT and withholding tax are credits against your final tax liability. Keep all chalan receipts.",
      },
      {
        q: "I disagree with my tax assessment — how do I appeal?",
        a: "Appeal Process: (1) First appeal: Commissioner of Taxes (Appeals) within 45 days of the assessment order, with a 10% deposit of disputed tax. (2) Second appeal: Appellate Tribunal (Bangladesh Tax Tribunal) within 60 days of the first appeal order. (3) Third: High Court on a point of law (reference application). At each stage, you can stay recovery by depositing a portion of the disputed tax. Engage a tax advocate or Chartered Accountant for complex appeals.",
      },
    ],
  },
  {
    id: "constitutional",
    icon: "⚖️",
    title: "Constitutional Law",
    titleBn: "সাংবিধানিক আইন",
    subtitle: "Fundamental Rights, Writ Jurisdiction, Detention",
    color: "from-green-900/30 to-green-800/10",
    border: "border-green-700/30",
    keyLaws: [
      "Constitution of Bangladesh 1972 (as amended)",
      "Special Powers Act 1974",
      "Code of Criminal Procedure 1898 (Section 54, 167)",
      "Public Interest Litigation principles",
      "Supreme Court Rules 1973",
    ],
    commonQuestions: [
      {
        q: "What are the fundamental rights guaranteed by the Bangladesh Constitution?",
        a: "Part III of the 1972 Constitution guarantees: Equality before law (Art. 27), Right to life and personal liberty (Art. 32), Protection from arbitrary arrest (Art. 33), Right to fair trial (Art. 35), Freedom of thought and conscience (Art. 39), Freedom of speech and press (Art. 39), Freedom of association (Art. 38), Freedom of movement (Art. 36), Right to property (Art. 42), Right to vote (Art. 65). These are enforceable by writ petition in the High Court.",
      },
      {
        q: "What is a writ petition and what writs are available?",
        a: "A writ petition is filed in the High Court Division to enforce constitutional rights or challenge unlawful state action. Types available: (1) Habeas Corpus — release from unlawful detention. (2) Mandamus — compel a public authority to perform a duty. (3) Certiorari — quash an unlawful decision. (4) Prohibition — stop a court/body from exceeding jurisdiction. (5) Quo Warranto — challenge a person's right to hold public office. File at the High Court through a registered advocate.",
      },
      {
        q: "What are the rights of an arrested person under Article 33?",
        a: "Under Article 33 of the Constitution: (1) Must be informed immediately of the grounds of arrest. (2) Must not be denied the right to consult and be defended by a lawyer. (3) Must be produced before the nearest magistrate within 24 hours. (4) Cannot be detained beyond 24 hours without magistrate's order. Note: Article 33 does not apply to enemy aliens or persons arrested under preventive detention law. Police custody beyond 24 hours without magistrate order is unconstitutional.",
      },
      {
        q: "When can the government detain someone without trial (preventive detention)?",
        a: "Under the Special Powers Act 1974, the government can detain a person without trial for up to 30 days (extendable to 120 days with advisory board approval) if there is a credible threat to state security, public order, or essential services. The detenu must be informed of grounds within 15 days. The detenu can challenge the detention by habeas corpus in the High Court. Preventive detention is frequently challenged and courts scrutinise the grounds carefully.",
      },
      {
        q: "Can I challenge a government action as unconstitutional?",
        a: "Yes. File a writ petition (writ of certiorari or mandamus) in the High Court Division within a reasonable time. The court reviews whether the action was: within the authority's legal powers, followed required procedures, infringed fundamental rights, was arbitrary or unreasonable. Government actions — including laws, orders, rules, and administrative decisions — can all be challenged. Public interest litigation (PIL) allows any citizen to challenge actions affecting the general public.",
      },
      {
        q: "What is the right to fair trial and what does it include?",
        a: "Article 35 of the Constitution guarantees: no punishment for an act not criminal when committed (no ex post facto laws), no double jeopardy for the same offence, right not to be compelled to be a witness against oneself, right to speedy trial, right to know charges, right to legal representation. The Evidence Act 1872 and CrPC 1898 provide detailed procedural protections. Confessions obtained through torture are inadmissible.",
      },
    ],
  },
  {
    id: "nrb",
    icon: "✈️",
    title: "NRB & Foreign Investment",
    titleBn: "প্রবাসী ও বিদেশি বিনিয়োগ আইন",
    subtitle: "Repatriation, BIDA, WHT, DTAA, Cross-border Investment",
    color: "from-blue-900/30 to-blue-800/10",
    border: "border-blue-700/30",
    keyLaws: [
      "Foreign Private Investment (Promotion and Protection) Act 1980",
      "BIDA Act 2016",
      "Foreign Exchange Regulation Act 1947",
      "Income Tax Act 2023 (NRB provisions)",
      "Bangladesh-US Double Taxation Avoidance Agreement",
    ],
    commonQuestions: [
      {
        q: "Can a Non-Resident Bangladeshi (NRB) invest in Bangladesh freely?",
        a: "Yes. The Foreign Private Investment Act 1980 guarantees NRBs the right to invest, repatriate capital, profits, and dividends freely. NRBs can invest in: shares (including stock exchange), government bonds, real estate (subject to restrictions), business through companies. BIDA (Bangladesh Investment Development Authority) registration may be required for certain industrial investments. NRBs also get tax benefits on remittance income.",
      },
      {
        q: "How do I repatriate investment income from Bangladesh abroad?",
        a: "Through an authorised dealer bank (AD Bank) or Bangladesh Bank approval: (1) Dividends from company shares: repatriate after withholding tax deduction with BIDA/Bangladesh Bank approval. (2) Capital gains from selling shares: freely repatriable for NRBs using foreign currency accounts. (3) Business profits: through nominee/authorised remittance channels after paying taxes. Keep documentation: investment proof, tax clearance, BIDA registration. Processing time: 2–4 weeks.",
      },
      {
        q: "What is withholding tax (WHT) on payments to foreign entities?",
        a: "When a Bangladesh company pays fees, royalties, technical services, or interest to a foreign entity, withholding tax must be deducted at source. Standard rate: 20% on technical services, 20% on royalties, 20% on dividends to foreign shareholders. However, if there is a Double Taxation Avoidance Agreement (DTAA) between Bangladesh and the recipient's country, the DTAA rate applies (often 10–15%). The DTAA rate requires the foreign entity to provide tax residency certificate.",
      },
      {
        q: "What is the DTAA between Bangladesh and the US/UK — how does it help?",
        a: "Bangladesh has DTAAs with many countries including the US, UK, Japan, India, and others. Key benefits: (1) Reduced withholding tax rates on dividends, interest, royalties paid across borders. (2) Avoidance of double taxation on the same income in both countries. (3) Tiebreaker rules determine tax residency when income is earned in multiple countries. To use DTAA benefits, the foreign entity must provide a Tax Residency Certificate from their home country's tax authority.",
      },
      {
        q: "Do NRBs need to report foreign bank accounts (FBAR) if they have US residency?",
        a: "If you are a US person (citizen, green card holder, or resident) with foreign bank accounts exceeding $10,000 in total at any point during the year, you must file FinCEN Form 114 (FBAR) with the US Treasury. This is separate from the tax return. Failure to file: civil penalty up to $10,000 per violation, criminal penalties for wilful violations. Bangladesh accounts are foreign accounts for FBAR purposes. Consult a US-licensed tax professional.",
      },
      {
        q: "I am an NRB planning to buy land in Bangladesh — what are the rules?",
        a: "NRBs can purchase land/property in Bangladesh using remitted foreign currency. Requirements: (1) Purchase through a bank transfer (not cash) — encashment certificate required. (2) Property registration follows normal procedure — power of attorney (POA) can be given to a trusted person in Bangladesh if you cannot attend in person. (3) NRBs cannot purchase khas (government) land. (4) Rental income from the property: repatriation requires Bangladesh Bank permission. Keep foreign currency remittance proof for future repatriation of sale proceeds.",
      },
    ],
  },
  {
    id: "contract",
    icon: "📝",
    title: "Contract Law",
    titleBn: "চুক্তি আইন",
    subtitle: "Agreements, Breach, Guarantee, Remedies, Limitation",
    color: "from-cyan-900/30 to-cyan-800/10",
    border: "border-cyan-700/30",
    keyLaws: [
      "Contract Act 1872",
      "Specific Relief Act 1877",
      "Sale of Goods Act 1930",
      "Limitation Act 1908",
      "Stamp Act 1899",
      "Arbitration Act 2001",
    ],
    commonQuestions: [
      {
        q: "Is a verbal (oral) agreement legally enforceable in Bangladesh?",
        a: "Yes — oral contracts are valid under Section 10 of the Contract Act 1872. The problem is proof: you must show the agreement existed and its terms in court. Best evidence for oral contracts: WhatsApp/SMS messages, emails, bank transfers showing payment, witnesses, part-performance (delivery of goods, commencement of work). For contracts involving land or real estate above BDT 100, a written and registered agreement is legally required.",
      },
      {
        q: "What can I do if someone breaches a written contract?",
        a: "Step 1: Send a formal legal demand notice. Step 2: Try negotiation/mediation. Step 3: If unresolved, file: (a) money suit in Civil Court for compensation and contractual damages within 3 years of breach, (b) specific performance suit if money cannot compensate (e.g., unique land), (c) if the contract includes an arbitration clause — go to arbitration instead. You can recover actual losses, consequential losses (if foreseeable), and liquidated damages if pre-agreed.",
      },
      {
        q: "I paid an advance for work that was not done — how do I recover it?",
        a: "Under Section 65 of the Contract Act, when a contract fails or is rescinded, the party who received an advance must restore it. File: money suit in Civil Court seeking refund of advance + interest + damages. Before filing, send a legal demand notice giving 15–30 days to respond. Keep: payment receipt, bank transfer record, contract/agreement, any communications about non-performance. Limitation period: 3 years from breach/demand.",
      },
      {
        q: "I signed as a guarantor for someone's bank loan — can I be sued?",
        a: "Yes — under Section 128 of the Contract Act, a guarantor's liability is co-extensive with the principal debtor. The bank can sue you directly without first exhausting remedies against the borrower. If you pay, you can then sue the borrower to recover. To defend: check if guarantee was obtained by fraud/misrepresentation, whether the terms have materially changed without your consent, or whether the principal debt is legitimately disputed. Act quickly — guarantee suits have strict timelines.",
      },
      {
        q: "Does a contract need a stamp to be admissible in court?",
        a: "Under the Stamp Act 1899, many commercial documents (loans, mortgages, leases, sale agreements, partnership deeds) require stamping. An unstamped document is inadmissible as evidence unless the stamp deficiency + 10× penalty is paid at the time of filing in court. Courts allow cure of stamp deficiency at the time of litigation. So an unstamped contract is not void — it can still be enforced after paying the penalty. Always stamp commercial contracts at the time of execution.",
      },
      {
        q: "What is the time limit to sue for breach of contract?",
        a: "Under the Limitation Act 1908, the general limitation period for breach of contract is 3 years from the date of breach (or when the breach was discovered). For specific performance: 3 years from the date the plaintiff was refused performance. For recovery of money on bond: 3 years. Courts cannot entertain suits filed after limitation — even if the claim is valid. Partial acknowledgment of the debt (in writing) can restart the limitation clock.",
      },
    ],
  },
];

export const metadata = {
  title: "Law Areas — Bangladesh Legal Guide | JesAI",
  description: "Plain-language answers to common legal questions in Bangladesh. NLC-validated, grounded in actual legislation.",
};

export default function LawsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-gray-100 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[12px] font-bold text-[#006A4E] uppercase tracking-widest mb-3">NLC-Validated Legal Knowledge</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">All Areas of Bangladesh Law</h1>
          <p className="text-gray-500 max-w-xl mx-auto mb-8 text-[14px] leading-relaxed">
            Plain-language answers to the most common legal questions in Bangladesh — grounded in actual Acts, sections, and procedures.
          </p>
          <Link href="/consult"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#006A4E] text-white font-semibold text-[14px] hover:bg-[#005a40] transition-all shadow-sm">
            Ask JesAI Your Question →
          </Link>
        </div>
      </section>

      {/* Quick nav */}
      <div className="sticky top-14 z-30 bg-white border-b border-gray-100 py-3">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 justify-center">
          {LAW_SUBJECTS.map(s => (
            <a key={s.id} href={`#${s.id}`}
              className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-[#006A4E] hover:text-[#006A4E] hover:bg-[#006A4E]/5 transition-all font-medium">
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.title.split(" ").slice(0, 2).join(" ")}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <main className="flex-1 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
          {LAW_SUBJECTS.map(subject => (
            <section key={subject.id} id={subject.id} className="scroll-mt-24">

              {/* Header */}
              <div className="flex items-start gap-4 mb-6 pb-5 border-b border-gray-100">
                <div className="text-3xl">{subject.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-gray-900">{subject.title}</h2>
                    <span className="text-[12px] text-gray-400">{subject.titleBn}</span>
                  </div>
                  <p className="text-[13px] text-gray-500 mb-2">{subject.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {subject.keyLaws.map(law => (
                      <span key={law} className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">{law}</span>
                    ))}
                  </div>
                </div>
                <Link href="/consult"
                  className="hidden sm:flex flex-shrink-0 items-center gap-1.5 text-[12px] px-4 py-2 rounded-xl border border-[#006A4E]/20 text-[#006A4E] hover:bg-[#006A4E]/5 transition-all font-medium">
                  Ask JesAI →
                </Link>
              </div>

              {/* Q&A accordion */}
              <div className="space-y-2">
                {subject.commonQuestions.map((qa, i) => (
                  <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all">
                    <summary className="flex items-start justify-between gap-3 px-5 py-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-bold text-[#C8A84B] mt-0.5 flex-shrink-0 tabular-nums w-5">Q{i + 1}</span>
                        <span className="text-[13px] text-gray-800 font-medium leading-relaxed">{qa.q}</span>
                      </div>
                      <svg className="flex-shrink-0 h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 border-t border-gray-100">
                      <p className="text-[13px] text-gray-600 leading-relaxed pt-4 mb-3">{qa.a}</p>
                      <Link href="/consult"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#006A4E] hover:underline">
                        Ask JesAI about my specific situation →
                      </Link>
                    </div>
                  </details>
                ))}
              </div>

              <div className="mt-4 sm:hidden">
                <Link href="/consult"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#006A4E]/20 text-[#006A4E] text-[13px] font-semibold hover:bg-[#006A4E]/5 transition-all">
                  Ask JesAI about {subject.title} →
                </Link>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="py-16 border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Get a personalised legal analysis</h2>
          <p className="text-gray-500 text-[14px] mb-6 leading-relaxed">
            These answers cover common scenarios. Your specific facts may change the legal outcome.
            Ask JesAI for an analysis tailored to your exact situation.
          </p>
          <Link href="/consult"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#006A4E] text-white font-semibold text-[14px] hover:bg-[#005a40] transition-all shadow-sm">
            Start Free Consultation →
          </Link>
          <p className="mt-4 text-[11px] text-gray-400">
            ⚠️ Legal information only — not legal advice. Consult a Bar Council advocate for representation.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
