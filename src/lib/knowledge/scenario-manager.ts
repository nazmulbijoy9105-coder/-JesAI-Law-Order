//  JesAI Scenario Manager
// NLC validated — Md Nazmul Islam, Advocate, Supreme Court of Bangladesh
//
// ARCHITECTURAL BOUNDARY: SCENARIOS ARE ILRMF-AGNOSTIC
// This module imports ONLY LawArea from ./types.
// It has NO dependency on ilrmf-engine.ts or ilrmf-types.ts.
// route.ts decides the flow — scenarios never trigger ILRMF scoring.

import type { LawArea } from "./types";

export interface ScenarioStep {
  stepId: string;
  title: string;
  instruction: string;
  documents?: string[];
  office?: string;
  estimatedTime?: string;
  cost?: string;
  warningNote?: string;
  nextStepHint?: string;
  tips?: string[];
}

export interface Scenario {
  scenarioId: string;
  area: LawArea;
  title: string;
  titleBn?: string;
  description: string;
  triggerPhrases: string[];
  triggerPhrasesBn?: string[];
  totalSteps: number;
  steps: ScenarioStep[];
  finalNote: string;
  escalate: boolean;
  escalateReason?: string;
  prerequisites?: string[];
  relatedScenarios?: string[];
}

export interface ScenarioResult {
  matched: true;
  scenario: Scenario;
  currentStep: ScenarioStep;
  stepNumber: number;
  totalSteps: number;
  progressPercent: number;
  isComplete: boolean;
  summary: string;
}

export interface ScenarioNoMatch {
  matched: false;
}

export type ScenarioQueryResult = ScenarioResult | ScenarioNoMatch;

export interface ScenarioSession {
  scenarioId: string;
  currentStepIndex: number;
}

const SCENARIOS: Scenario[] = [
  {
    scenarioId: "company-pvt-registration",
    area: "company",
    title: "Private Limited Company Registration",
    titleBn: "প্রাইভেট লিমিটেড কোম্পানি রেজিস্ট্রেশন",
    description: "Step-by-step guide to register a Pvt Ltd company with RJSC Bangladesh",
    triggerPhrases: [
      "register company step", "how to register a company", "incorporate company steps",
      "company registration process", "rjsc registration steps", "form a pvt ltd",
      "start a company", "open a company", "company incorporation guide",
    ],
    triggerPhrasesBn: [
      "কোম্পানি রেজিস্ট্রেশন ধাপ", "কিভাবে কোম্পানি নিবন্ধন করব",
      "প্রাইভেট লিমিটেড কোম্পানি গঠন", "আরজেএসসি রেজিস্ট্রেশন", "কোম্পানি খোলার নিয়ম",
    ],
    totalSteps: 6,
    prerequisites: [
      "At least 2 shareholders and 2 directors (can be same persons)",
      "TIN for all directors and shareholders",
      "NID for Bangladeshi nationals",
      "Registered office address in Bangladesh",
    ],
    steps: [
      {
        stepId: "company-reg-step-1",
        title: "Name Clearance",
        instruction: "Apply for company name clearance online at roc.gov.bd. Submit 3 proposed names in order of preference. RJSC checks existing registered names for conflicts.",
        documents: ["3 proposed company names", "Brief description of business activity"],
        office: "roc.gov.bd (online only)",
        estimatedTime: "1-3 working days",
        cost: "~BDT 200",
        warningNote: "Clearance is valid for only 90 days — begin MOA/AOA drafting immediately after approval.",
        nextStepHint: "Next: Prepare Memorandum of Association (MOA) and Articles of Association (AOA).",
        tips: ["Choose a name that reflects your business activity", "Avoid names similar to existing well-known companies", "Keep 2-3 backup names ready"],
      },
      {
        stepId: "company-reg-step-2",
        title: "Draft MOA and AOA",
        instruction: "Prepare Memorandum of Association (MOA) and Articles of Association (AOA). MOA defines business objects, share capital, and members' liability. AOA governs internal management.",
        documents: ["Cleared company name", "Decided business objects", "Authorized capital amount", "Names and NID of all shareholders and directors", "Registered office address"],
        office: "Drafting — can engage lawyer or CA for assistance",
        estimatedTime: "1-3 days",
        cost: "Lawyer/CA fee BDT 3,000-10,000",
        warningNote: "Draft MOA objects broadly — an overly narrow objects clause will require expensive amendment later.",
        nextStepHint: "Next: Submit online application at roc.gov.bd with all documents.",
        tips: ["Include multiple business objects to allow future expansion", "Standard authorized capital: BDT 10 lakh"],
      },
      {
        stepId: "company-reg-step-3",
        title: "Online Submission at RJSC",
        instruction: "Log in to roc.gov.bd and submit the incorporation application. Upload MOA, AOA, and fill Form I, Form VI, Form XII. All subscribers must sign MOA/AOA — e-signatures accepted.",
        documents: ["Signed MOA and AOA", "Form I (statutory declaration)", "Form VI (notice of registered office)", "Form XII (list of directors)", "NID copies of all directors and shareholders", "TIN certificates", "Utility bill / lease for registered office"],
        office: "roc.gov.bd (fully online)",
        estimatedTime: "Submission: 1 day; RJSC processing: 7-15 working days",
        cost: "RJSC fee based on authorized capital (BDT 3,200 for 1 lakh capital)",
        warningNote: "Double-check all NID numbers and TINs before submission — errors delay the entire process.",
        nextStepHint: "Next: Pay RJSC registration fees online.",
        tips: ["Create a checklist of all required documents before starting", "Save the application reference number for tracking"],
      },
      {
        stepId: "company-reg-step-4",
        title: "Pay RJSC Fees",
        instruction: "Pay the RJSC registration fee online via Sonali Bank sePay or SSL Commerz on the roc.gov.bd payment gateway. Keep the payment receipt.",
        documents: ["RJSC application reference number", "Payment method (online banking / card)"],
        office: "roc.gov.bd payment gateway",
        estimatedTime: "Immediate",
        cost: "BDT 1 lakh capital: BDT 3,200 | BDT 15 lakh: BDT 5,000 | BDT 5 lakh-1 crore: BDT 10,000",
        warningNote: "Keep fee payment receipt. RJSC will not process without confirmed payment.",
        nextStepHint: "Next: Collect Certificate of Incorporation from roc.gov.bd.",
        tips: ["Payment gateway sometimes has timeouts — try again if failed", "Screenshot the payment confirmation page"],
      },
      {
        stepId: "company-reg-step-5",
        title: "Receive Certificate of Incorporation",
        instruction: "After RJSC approves your application, download the Certificate of Incorporation from roc.gov.bd. The certificate contains your unique Company Registration Number (CRN).",
        documents: ["Certificate of Incorporation (download from roc.gov.bd)"],
        office: "roc.gov.bd (download online)",
        estimatedTime: "7-15 working days after payment",
        cost: "Included in registration fee",
        warningNote: "Verify company name and CRN on the certificate carefully.",
        nextStepHint: "Next: Post-incorporation steps — TIN, trade licence, bank account.",
        tips: ["Download multiple copies for different purposes", "Verify all details match your application"],
      },
      {
        stepId: "company-reg-step-6",
        title: "Post-Incorporation Setup",
        instruction: "Complete these mandatory steps: (1) Register company TIN at incometax.gov.bd. (2) Obtain trade licence from ward office. (3) Open company bank account — all directors must visit for KYC. (4) Get company common seal. (5) Register for VAT at vat.gov.bd if turnover expected above BDT 50 lakh.",
        documents: ["Certificate of Incorporation", "MOA and AOA (certified copies)", "Board resolution for bank account", "NID + TIN of all directors", "Utility bill of registered office"],
        office: "incometax.gov.bd (TIN) | Ward office (trade licence) | Bank branch (account) | vat.gov.bd (VAT)",
        estimatedTime: "TIN: instant | Trade licence: 7-30 days | Bank account: 3-7 days",
        cost: "TIN: free | Trade licence: BDT 1,000-5,000 | Common seal: BDT 500-2,000",
        warningNote: "Do not begin business operations before opening the company bank account.",
        nextStepHint: "Company is now fully operational. Annual compliance: hold AGM within 120 days of financial year end.",
        tips: ["Prioritize bank account opening", "Get common seal with company name and 'Limited' engraved", "Create a compliance calendar"],
      },
    ],
    finalNote: "✅ Company registration complete. Annual obligations: RJSC annual return (21 days after AGM), income tax return by 15 July, VAT monthly return by 15th (if registered), trade licence renewal by 30 June.",
    escalate: false,
    relatedScenarios: ["company-opc-registration"],
  },
  {
    scenarioId: "property-purchase",
    area: "property",
    title: "Land / Property Purchase",
    titleBn: "জমি / সম্পত্তি ক্রয়",
    description: "Step-by-step process for legally buying land or property in Bangladesh",
    triggerPhrases: [
      "buy land steps", "purchase land process", "how to buy property",
      "land buying procedure", "property purchase steps", "register a land deed",
      "how to purchase land", "land deed registration",
    ],
    triggerPhrasesBn: [
      "জমি কেনার ধাপ", "জমি ক্রয় প্রক্রিয়া", "সম্পত্তি কেনার নিয়ম",
      "দলিল রেজিস্ট্রেশন ধাপ", "জমি কেনার নিয়ম",
    ],
    totalSteps: 7,
    prerequisites: ["Sufficient funds for purchase + registration costs (typically 5-9% additional)", "Time for document verification (1-2 weeks)"],
    steps: [
      {
        stepId: "property-buy-step-1", title: "Verify Title and Check Documents",
        instruction: "Before paying any money, verify the seller's title. Obtain: CS/SA/RS Khatian, Mutation Khatian, Bain Kabala, DCR. Check if land is recorded in seller's name.",
        documents: ["CS Khatian", "SA Khatian", "RS Khatian", "Mutation Khatian", "Latest certified copy of deed", "DCR receipts"],
        office: "Sub-Registry office | AC Land office | Survey office",
        estimatedTime: "1-2 weeks", cost: "BDT 200-1,000 for certified copies",
        warningNote: "Never pay advance money before completing title verification. Fraudulent land sales are common.",
        nextStepHint: "Next: Check for encumbrances (loans, mortgages on the land).",
        tips: ["Cross-verify CS, RS, and BS khatians if available", "Check if there's any litigation involving the land", "Visit the land physically to verify boundaries"],
      },
      {
        stepId: "property-buy-step-2", title: "Check for Encumbrances",
        instruction: "Search the Sub-Registry office Non-Encumbrance Certificate (NEC) to confirm the land has no existing mortgage, charge, or lien.",
        documents: ["Khatian details", "Mouza name", "Dag (plot) number"],
        office: "Sub-Registry office (NEC section)",
        estimatedTime: "3-7 working days", cost: "BDT 200-500 per application",
        warningNote: "If NEC shows an existing mortgage, the land is pledged to a bank — purchasing without clearing the mortgage is legally risky.",
        nextStepHint: "Next: Negotiate price and draft Sale Agreement (Baina Nama).",
        tips: ["Apply for NEC for at least last 15 years", "Check court records for any pending cases"],
      },
      {
        stepId: "property-buy-step-3", title: "Sign Sale Agreement (Baina Nama)",
        instruction: "Execute a written Sale Agreement (Baina Nama) setting out: price, payment schedule, possession date, and conditions. Pay advance (bayana) — typically 10-30% of price.",
        documents: ["Draft Baina Nama", "NID of both buyer and seller", "Witness NIDs", "Agreed advance amount (cheque/bank transfer)"],
        office: "Notary office | Sub-Registry (optional registration)",
        estimatedTime: "1 day", cost: "Notarisation: BDT 500-2,000",
        warningNote: "Always pay advance via cheque or bank transfer — cash payment is difficult to prove in court.",
        nextStepHint: "Next: Prepare sale deed and calculate registration costs.",
        tips: ["Include specific penalty clause for seller's default", "Mention exact possession handover date", "List all documents seller must provide"],
      },
      {
        stepId: "property-buy-step-4", title: "Prepare Sale Deed",
        instruction: "Engage a licensed deed writer or lawyer to draft the sale deed (Kabala). The deed must accurately describe the land by Dag number, Khatian number, mouza, area, and boundaries.",
        documents: ["Khatian and Dag details", "NID and TIN of buyer and seller", "Previous deed (certified copy)", "Baina Nama", "Agreed sale price"],
        office: "Licensed deed writer | Lawyer",
        estimatedTime: "1-3 days", cost: "Deed writer fee: BDT 2,000-10,000",
        warningNote: "Errors in Dag or Khatian number in the deed cause legal complications during mutation.",
        nextStepHint: "Next: Pay registration costs and register the deed at Sub-Registry.",
        tips: ["Read the drafted deed carefully before signing", "Verify all boundary descriptions match physical reality"],
      },
      {
        stepId: "property-buy-step-5", title: "Pay Registration Costs",
        instruction: "Calculate and pay all registration-related taxes. Costs in Dhaka: Stamp duty 1.5% + Registration fee 1% + Local govt tax 2% + AIT 4% = approximately 8.5% of deed value.",
        documents: ["Bank challan for: stamp duty, registration fee, local tax, AIT", "TIN of buyer"],
        office: "Sonali Bank | Sub-Registry designated bank",
        estimatedTime: "1 day", cost: "Dhaka city: ~8.5% | Other city corp: ~7% | Municipality: ~5% | Rural: ~4%",
        warningNote: "AIT paid here is a tax credit — include it in your income tax return.",
        nextStepHint: "Next: Register the deed at Sub-Registry office.",
        tips: ["Calculate costs based on SUB-REGISTRAR's circle rate, not your negotiated price", "Pay a day before registration to avoid last-minute issues"],
      },
      {
        stepId: "property-buy-step-6", title: "Register Deed at Sub-Registry",
        instruction: "Attend Sub-Registry office with seller for deed registration. Both parties (or authorised attorneys) must be present with NIDs. Sub-Registrar verifies identities, witnesses sign, photographs taken.",
        documents: ["Original sale deed (2 copies)", "NID originals of buyer and seller", "All payment challans", "NID of 2 witnesses", "TIN certificate of buyer", "Previous deed (certified copy)"],
        office: "Sub-Registry office (jurisdiction based on land location)",
        estimatedTime: "1 day", cost: "Already paid in Step 5",
        warningNote: "Both parties must physically appear — or execute notarised Power of Attorney in advance.",
        nextStepHint: "Next: Apply for mutation in your name at AC Land office.",
        tips: ["Reach Sub-Registry office early morning", "Carry original NIDs — photocopies not accepted", "Take 2 witnesses who are not family members"],
      },
      {
        stepId: "property-buy-step-7", title: "Mutation (Namjari) and Tax Transfer",
        instruction: "After deed registration, apply for mutation (namjari) at the AC Land office to transfer the land record into your name. Also transfer land development tax (khajna) payment into your name.",
        documents: ["Registered deed (original)", "Application for mutation", "Court fee: BDT 100-500", "Copy of Khatian", "NID of buyer"],
        office: "AC Land office (Upazila/Union Land Office)",
        estimatedTime: "30-90 days", cost: "Court fee: BDT 100-500",
        warningNote: "Mutation without registered deed is not legally valid. Always get Mutation Khatian in writing.",
        nextStepHint: "Purchase complete after mutation. Pay annual land development tax (khajna) each year.",
        tips: ["Apply for e-mutation where available (faster processing)", "Follow up regularly at AC Land office", "Get Mutation Khatian certified copy once issued"],
      },
    ],
    finalNote: "✅ Land purchase complete. Keep all documents permanently: registered deed, mutation Khatian, all challans.\n\n**Annual obligation:** Pay land development tax (khajna) at Union Parishad / municipality each year.",
    escalate: false,
    relatedScenarios: ["property-mutation", "flat-purchase"],
  },
  {
    scenarioId: "criminal-fir-process",
    area: "criminal",
    title: "Filing an FIR and Criminal Case Process",
    titleBn: "এফআইআর দায়ের ও ফৌজদারি মামলা প্রক্রিয়া",
    description: "Step-by-step guide for filing FIR and following through a criminal case",
    triggerPhrases: ["how to file fir", "file a case police", "criminal case steps", "police complaint steps", "file complaint against someone", "fir process", "gd number"],
    triggerPhrasesBn: ["এফআইআর কিভাবে করব", "মামলা দায়ের ধাপ", "জিডি করার নিয়ম", "থানায় মামলা করব"],
    totalSteps: 5,
    prerequisites: ["Knowledge of the crime incident (date, time, place)", "Names/descriptions of accused if known", "Any available evidence"],
    steps: [
      {
        stepId: "fir-step-1", title: "File FIR at Police Station",
        instruction: "Go to the police station (thana) that has jurisdiction over the area where the crime occurred. Describe the incident clearly to the OC. FIR must be written, read back to you, and signed. Insist on a copy with GD number.",
        documents: ["NID (your own)", "Any evidence (photos, screenshots, medical report if assault)", "Names and descriptions of accused if known"],
        office: "Police station (thana) with territorial jurisdiction",
        estimatedTime: "Same day", cost: "No fee for FIR filing",
        warningNote: "If OC refuses to record FIR: file written complaint to SP. OC is legally bound to record cognizable offences.",
        nextStepHint: "Next: Police investigation begins automatically after FIR registration.",
        tips: ["Write down your statement before going to police station", "Be precise about dates, times, and locations", "Get GD number immediately and keep it safe"],
      },
      {
        stepId: "fir-step-2", title: "Police Investigation",
        instruction: "After FIR, the Investigating Officer (IO) conducts investigation: visits crime scene, records witness statements, collects evidence, may arrest accused. Cooperate fully with IO.",
        documents: ["Any additional evidence you collect", "Witness contact information"],
        office: "Police station (investigation by IO)",
        estimatedTime: "15-180 days", cost: "No direct cost",
        warningNote: "If IO is not investigating properly: file written complaint to SP or approach court for direction.",
        nextStepHint: "Next: IO files charge sheet or final report after investigation.",
        tips: ["Maintain regular contact with IO", "Keep a diary of all communications with IO"],
      },
      {
        stepId: "fir-step-3", title: "Charge Sheet and Court Process",
        instruction: "If IO finds sufficient evidence: files Charge Sheet in Magistrate Court. If insufficient: files Final Report. If Final Report filed: you can file a Narazi petition within 30 days.",
        documents: ["Copy of FIR (GD number)", "Any certified documents from investigation"],
        office: "Magistrate Court (CMM / CJM)",
        estimatedTime: "IO investigation: up to 120 days", cost: "No direct cost",
        warningNote: "If Final Report filed and you disagree — you have 30 days to file a Narazi petition. Missing this deadline means the case is dropped.",
        nextStepHint: "Next: Trial begins — prosecution and defence present evidence.",
        tips: ["Monitor case progress regularly at court", "Keep all case documents organized", "Engage a lawyer after charge sheet is filed"],
      },
      {
        stepId: "fir-step-4", title: "Trial",
        instruction: "At trial: prosecution presents evidence and witnesses. Accused has right to cross-examine. Defence presents their case. You as complainant may be called as prosecution witness.",
        documents: ["All original evidence", "Witness list", "Copy of FIR and charge sheet"],
        office: "Magistrate Court (offences up to 7 years) | Sessions Court (serious offences)",
        estimatedTime: "6 months - 5+ years", cost: "Lawyer fees vary widely",
        warningNote: "Attend all hearing dates — absence can delay the case and lead to ex-parte proceedings.",
        nextStepHint: "Next: Judgment — conviction or acquittal.",
        tips: ["Never miss a hearing date", "Keep your lawyer updated on any developments", "Document everything that happens in court"],
      },
      {
        stepId: "fir-step-5", title: "Judgment and Appeal",
        instruction: "After trial: Magistrate or Sessions Judge delivers judgment. If unsatisfied: complainant can appeal to Sessions Court (from Magistrate) or High Court Division (from Sessions) within prescribed time.",
        documents: ["Certified copy of judgment", "Appeal petition prepared by lawyer"],
        office: "Sessions Court (appeal from Magistrate) | High Court Division (appeal from Sessions)",
        estimatedTime: "Appeal: file within 30-60 days of judgment", cost: "Appeal lawyer fees",
        warningNote: "Appeal deadlines are strict — missing the limitation period bars the appeal entirely.",
        nextStepHint: "Criminal case process complete. Keep all certified court documents permanently.",
        tips: ["Get certified copy of judgment immediately", "Decide on appeal within first few days", "If appealing, file before deadline expires"],
      },
    ],
    finalNote: "⚠️ Criminal cases are complex — always engage a qualified criminal lawyer at every stage.\n\nNLC can refer specialist criminal advocates.",
    escalate: true,
    escalateReason: "Criminal cases require specialist criminal lawyer. WhatsApp NLC for referral.",
    relatedScenarios: ["criminal-bail"],
  },
  {
    scenarioId: "tax-return-filing",
    area: "tax",
    title: "Income Tax Return Filing (Individual)",
    titleBn: "আয়কর রিটার্ন দাখিল (ব্যক্তি)",
    description: "Step-by-step guide to file annual income tax return under Income Tax Act 2023",
    triggerPhrases: ["how to file tax return steps", "income tax return process", "tax return filing guide", "file my tax return step", "tax return procedure", "eit return"],
    triggerPhrasesBn: ["ট্যাক্স রিটার্ন কিভাবে দিব", "আয়কর রিটার্ন ধাপ", "এনবিআর রিটার্ন"],
    totalSteps: 5,
    prerequisites: ["Valid TIN", "Access to etaxnbr.gov.bd portal", "Income and investment documents for the tax year"],
    steps: [
      {
        stepId: "tax-return-step-1", title: "Collect All Income Documents",
        instruction: "Gather all income documents for the tax year (1 July – 30 June). Salaried: get salary certificate (Form 108A) from employer. Self-employed: prepare income/expense summary.",
        documents: ["Form 108A — salary certificate", "Bank statements (all accounts)", "Bank interest/FD certificates", "Rental income details", "Dividend certificates"],
        office: "From employer (Form 108A) | From banks | From companies",
        estimatedTime: "1-7 days", cost: "No cost to collect",
        warningNote: "Employer must provide Form 108A by July 31 each year. If not provided: demand in writing.",
        nextStepHint: "Next: Gather investment proof to claim investment tax rebate.",
        tips: ["Request Form 108A from employer in June itself", "Download bank statements by June 30"],
      },
      {
        stepId: "tax-return-step-2", title: "Gather Investment Proof for Rebate",
        instruction: "Collect documents for all qualifying investments — these reduce your tax by 15% of investment amount. Qualifying: Sanchayapatra, DPS, life insurance premium, provident fund, shares.",
        documents: ["Sanchayapatra certificates", "DPS passbook / statement", "Life insurance premium receipt", "Provident fund certificate", "Share purchase statements"],
        office: "From relevant institutions",
        estimatedTime: "1-3 days", cost: "No cost to collect",
        warningNote: "Investment rebate cap: 15% of investment, maximum 3% of total income or BDT 10 lakh — whichever is lower.",
        nextStepHint: "Next: Calculate your tax liability.",
        tips: ["Make investments before June 30 to claim in current year", "Keep all investment receipts organized"],
      },
      {
        stepId: "tax-return-step-3", title: "Calculate Tax and Prepare Return",
        instruction: "Calculate total income from all sources. Apply slab rates (0-25%). Deduct investment rebate. Calculate net tax payable. Check if advance tax or WHT already deducted exceeds tax due.",
        documents: ["All income documents from Step 1", "All investment documents from Step 2", "Previous year return", "TIN certificate"],
        office: "Can use NBR's online calculator at etaxnbr.gov.bd",
        estimatedTime: "1 day", cost: "No cost",
        warningNote: "Use etaxnbr.gov.bd's calculation tool or get help from CA/tax consultant to avoid errors.",
        nextStepHint: "Next: Pay any tax due and file the return.",
        tips: ["Use NBR's online calculator to double-check", "Don't forget to include all income sources"],
      },
      {
        stepId: "tax-return-step-4", title: "Pay Tax Due",
        instruction: "If net tax exceeds WHT already deducted: pay the balance before filing. Pay via etaxnbr.gov.bd online payment or bank challan at Sonali Bank. Keep payment receipt.",
        documents: ["Tax calculation from Step 3", "Payment method (online / bank challan)"],
        office: "etaxnbr.gov.bd (online payment) | Sonali Bank (challan)",
        estimatedTime: "Same day", cost: "Tax amount calculated in Step 3",
        warningNote: "Pay tax BEFORE filing — the return system checks payment. Late payment after 30 November: 2% per month surcharge.",
        nextStepHint: "Next: Submit the return online or physically.",
        tips: ["Pay at least 1-2 days before filing", "Keep payment receipt screenshot/printed"],
      },
      {
        stepId: "tax-return-step-5", title: "Submit Return and Get Acknowledgement",
        instruction: "File the return at etaxnbr.gov.bd (online) or submit physical form at Circle Tax Office. Download acknowledgement receipt immediately after online filing.",
        documents: ["Completed return form", "Tax payment challan", "TIN certificate", "Supporting documents (keep for 6 years)"],
        office: "etaxnbr.gov.bd (online) | Circle Tax Office (physical)",
        estimatedTime: "Same day | Deadline: 30 November each year", cost: "No filing fee",
        warningNote: "The acknowledgement receipt is your proof of compliance — needed for bank loans, visa applications, trade licence renewal.",
        nextStepHint: "Return filed. Next year: repeat by 30 November.",
        tips: ["File online — faster and more reliable", "Download and save acknowledgement immediately", "Keep soft copy in multiple locations"],
      },
    ],
    finalNote: "✅ Tax return complete. Keep acknowledgement receipt — valid proof of compliance for 1 year.\n\n**Annual deadline:** 30 November",
    escalate: false,
    relatedScenarios: ["tax-tin-registration"],
  },
  {
    scenarioId: "criminal-cheque-bounce",
    area: "criminal",
    title: "Cheque Bounce (Dishonour) Case",
    titleBn: "চেক বাউন্স (অনাদায়ী) মামলা",
    description: "Step-by-step process for filing a criminal case for cheque dishonour under Section 138 NI Act",
    triggerPhrases: ["cheque bounce case steps", "file cheque bounce case", "dishonoured cheque process", "cheque returned case", "section 138 case", "bad cheque case"],
    triggerPhrasesBn: ["চেক বাউন্স মামলা ধাপ", "চেক ডিশনার মামলা", "সেকশন ১৩৮ মামলা"],
    totalSteps: 4,
    prerequisites: ["Original bounced cheque", "Bank dishonour memo/slip", "Cheque must have been presented within 6 months of issue"],
    steps: [
      {
        stepId: "cheque-step-1", title: "Get Dishonour Memo from Bank",
        instruction: "When the cheque is bounced, your bank will send a dishonour memo/slip. Collect this memo immediately — it is the primary evidence. The clock starts ticking from this date.",
        documents: ["Dishonour memo/slip from bank", "Original bounced cheque", "Bank statement showing cheque deposit attempt"],
        office: "Your bank branch",
        estimatedTime: "1-3 days after bounce", cost: "No cost",
        warningNote: "This is Day 0. You have exactly 30 days from this date to send legal notice. Missing this deadline destroys your case.",
        nextStepHint: "Next: Send legal notice to the cheque issuer within 30 days.",
        tips: ["Visit bank immediately to collect memo", "Keep the original cheque safe — don't write anything on it", "Note down exact date of dishonour"],
      },
      {
        stepId: "cheque-step-2", title: "Send Legal Notice (Demand Notice)",
        instruction: "Engage a lawyer to draft and send a legal notice demanding payment within 15-30 days. Notice must be sent by registered post with acknowledgment (AD) or courier with delivery receipt.",
        documents: ["Legal notice drafted by lawyer", "Copy of bounced cheque", "Copy of dishonour memo", "Your bank account details", "Address of cheque issuer"],
        office: "Lawyer's office (drafting) | Post office / courier (dispatch)",
        estimatedTime: "1-2 days", cost: "Lawyer fee: BDT 3,000-10,000",
        warningNote: "Notice must be sent within 30 days of dishonour. Even one day late can destroy your case.",
        nextStepHint: "Next: If payment not received, file criminal complaint within 30 days of notice expiry.",
        tips: ["Send notice via both AD post and courier for safety", "Track the AD card return", "Keep copy of notice with lawyer's seal"],
      },
      {
        stepId: "cheque-step-3", title: "File Criminal Complaint",
        instruction: "If the cheque issuer does not pay within the notice period, file a criminal complaint under Section 138 NI Act in the Court of CJM/MM. Must be filed within 30 days of notice expiry (60 days total from dishonour).",
        documents: ["Criminal complaint petition", "Original bounced cheque", "Dishonour memo", "Legal notice sent", "AD card / courier receipt", "Bank statement", "Affidavit", "Court fee stamps"],
        office: "Court of Chief Judicial Magistrate / Metropolitan Magistrate",
        estimatedTime: "1 day to file | Hearing: 1-3 months", cost: "Court fee: BDT 200-500 | Lawyer fee: BDT 10,000-30,000",
        warningNote: "STRICT DEADLINE: File within 30 days of notice expiry. Total 60 days from dishonour date. Courts rarely condone delay.",
        nextStepHint: "Next: Court process — summons, hearing, and judgment.",
        tips: ["File well before the deadline", "Keep original cheque very safe — required in court", "Be present on every hearing date"],
      },
      {
        stepId: "cheque-step-4", title: "Court Process and Recovery",
        instruction: "Court issues summons to accused. If convicted: imprisonment up to 2 years and/or fine up to twice the cheque amount. The fine amount becomes payable to you.",
        documents: ["All documents from Step 3", "Witness list (if any)"],
        office: "Magistrate Court | Execution Court (for recovery of fine)",
        estimatedTime: "6 months - 2 years", cost: "Additional lawyer fees for hearings",
        warningNote: "Even if accused is imprisoned, you may not recover the money if they have no assets. Consider filing a parallel civil suit for money recovery as backup.",
        nextStepHint: "Case complete. If fine imposed, execute for recovery.",
        tips: ["Consider filing parallel money recovery suit", "Check if accused has attachable assets before filing", "Attend all hearings without fail"],
      },
    ],
    finalNote: "⚠️ Cheque bounce cases have THREE STRICT DEADLINES:\n1. Legal notice: within 30 days of dishonour\n2. Criminal complaint: within 30 days of notice expiry\n3. Total: 60 days from dishonour date\n\nMissing any deadline = case dismissed.",
    escalate: true,
    escalateReason: "Cheque bounce cases require precise deadline management. WhatsApp NLC for urgent referral.",
    relatedScenarios: ["money-recovery-suit"],
  },
  {
    scenarioId: "criminal-bail",
    area: "criminal",
    title: "Bail Application Process",
    titleBn: "জামিন আবেদন প্রক্রিয়া",
    description: "Step-by-step process for applying for bail in Bangladesh courts",
    triggerPhrases: ["how to get bail", "bail application steps", "bail procedure bangladesh", "apply for bail", "bail court process", "jail bail"],
    triggerPhrasesBn: ["জামিন কিভাবে পাব", "জামিন আবেদন ধাপ", "জেল থেকে জামিন"],
    totalSteps: 4,
    prerequisites: ["Accused must be in custody or facing imminent arrest", "Details of the case (FIR, charges)", "A suitable surety (guarantor) with assets"],
    steps: [
      {
        stepId: "bail-step-1", title: "Determine Bail Type and Court",
        instruction: "Determine whether the offence is bailable or non-bailable. Bailable offences: police can grant at police station. Non-bailable offences: only Magistrate/Sessions/High Court can grant. For anticipatory bail: apply to Sessions Court or High Court.",
        documents: ["Copy of FIR / GD number", "Name of offence charged"],
        office: "Police Station (bailable) | Magistrate Court | Sessions Court | High Court Division",
        estimatedTime: "Bailable: immediate | Non-bailable: 1-7 days", cost: "No cost at this stage",
        warningNote: "Non-bailable offence bail is discretionary — court considers: nature of offence, criminal record, flight risk, evidence tampering risk.",
        nextStepHint: "Next: Engage a criminal lawyer and prepare bail application.",
        tips: ["For serious offences, directly approach Sessions Court or High Court", "Anticipatory bail needed if arrest is imminent but not yet made"],
      },
      {
        stepId: "bail-step-2", title: "Prepare and File Bail Petition",
        instruction: "Engage a criminal lawyer to draft the bail petition. Must state: name, offence, grounds for bail (health, livelihood, clean record, cooperation), and bail conditions offered.",
        documents: ["Bail petition (drafted by lawyer)", "Copy of FIR", "NID of accused", "Character certificates if available", "Medical certificates if health ground", "Surety details"],
        office: "Court filing section",
        estimatedTime: "Filing: 1 day | Hearing: 1-7 days", cost: "Lawyer fee: BDT 5,000-50,000+",
        warningNote: "Bail petition quality matters significantly — a well-argued petition with strong grounds succeeds.",
        nextStepHint: "Next: Court hearing on bail application.",
        tips: ["Gather all supporting documents before meeting lawyer", "Inform lawyer of any special circumstances", "Arrange surety in advance"],
      },
      {
        stepId: "bail-step-3", title: "Bail Hearing",
        instruction: "Accused's lawyer argues grounds for bail. Prosecution may oppose. Judge considers: severity of offence, evidence strength, accused's record, flight risk, public interest.",
        documents: ["All documents from Step 2", "Lawyer presence mandatory"],
        office: "Magistrate / Sessions / High Court",
        estimatedTime: "30 minutes - 2 hours | Decision: same day or next hearing", cost: "No additional cost",
        warningNote: "For serious offences (murder, rape, corruption): Magistrate may not have jurisdiction — must go to Sessions Court.",
        nextStepHint: "Next: If bail granted — execute bail bond with surety.",
        tips: ["Accused should be well-dressed and respectful in court", "Family members should attend if possible", "Be prepared for multiple hearings in serious cases"],
      },
      {
        stepId: "bail-step-4", title: "Execute Bail Bond",
        instruction: "If bail granted: execute bail bond in court. Surety must appear with NID and proof of property/assets. Accused signs personal bond. After bond executed: court issues release order to jail. Accused released.",
        documents: ["Bail order (certified copy)", "Surety's NID", "Surety's property documents", "Surety's bank statement", "Accused's NID"],
        office: "Court filing section | Jail (release order delivered here)",
        estimatedTime: "Bond execution: same day | Release: within 24 hours", cost: "Bail bond amount (varies) | Lawyer fee for bond execution",
        warningNote: "Accused must comply with all bail conditions (attend all hearings, not leave jurisdiction, not contact witnesses). Violation = bail cancelled + re-arrest.",
        nextStepHint: "Bail secured. Attend all court dates — missing hearings cancels bail automatically.",
        tips: ["Arrange surety with sufficient assets before bail hearing", "Keep certified copy of bail order safe", "Note all bail conditions carefully", "Never violate bail conditions under any circumstance"],
      },
    ],
    finalNote: "⚠️ Bail conditions must be strictly followed:\n• Attend every court hearing date\n• Do not leave the country without court permission\n• Do not contact witnesses or tamper with evidence\n• Report to investigating officer as directed\n\nViolation of any condition = bail cancellation + immediate re-arrest.",
    escalate: true,
    escalateReason: "Bail matters are urgent — WhatsApp NLC for immediate advocate referral.",
    relatedScenarios: ["criminal-fir-process"],
  },
];

// ─── Matching Functions ─────────────────────────────────────

export function matchScenario(
  message: string,
  activeSession: ScenarioSession | null | undefined
): ScenarioQueryResult {
  const msg = message.toLowerCase();

  if (activeSession) {
    const scenario = SCENARIOS.find((s) => s.scenarioId === activeSession.scenarioId);
    if (scenario) {
      const idx = activeSession.currentStepIndex;
      if (idx >= 0 && idx < scenario.steps.length) {
        return buildResult(scenario, idx);
      }
    }
  }

  let bestScenario: Scenario | null = null;
  let bestMatchCount = 0;

  for (const scenario of SCENARIOS) {
    const enMatches = scenario.triggerPhrases.filter((p) => msg.includes(p)).length;
    const bnMatches = scenario.triggerPhrasesBn?.filter((p) => msg.includes(p)).length ?? 0;
    const total = enMatches + bnMatches;
    if (total > bestMatchCount) {
      bestMatchCount = total;
      bestScenario = scenario;
    }
  }

  if (bestScenario && bestMatchCount >= 1) {
    return buildResult(bestScenario, 0);
  }

  return { matched: false };
}

export function nextStep(scenarioId: string, currentStepIndex: number): ScenarioResult {
  const scenario = SCENARIOS.find((s) => s.scenarioId === scenarioId);
  if (!scenario) throw new Error(`Scenario not found: ${scenarioId}`);
  return buildResult(scenario, currentStepIndex);
}

export function isNextStepCommand(message: string): boolean {
  const msg = message.toLowerCase().trim();
  return (
    msg === "next" ||
    msg === "next step" ||
    msg === "পরবর্তী" ||
    msg === "পরবর্তী ধাপ" ||
    /^next[\s\-]*\d+$/i.test(msg)
  );
}

export function isPrevStepCommand(message: string): boolean {
  const msg = message.toLowerCase().trim();
  return (
    msg === "previous" ||
    msg === "prev" ||
    msg === "back" ||
    msg === "পূর্ববর্তী" ||
    msg === "আগে" ||
    msg === "পেছনে"
  );
}

function buildResult(scenario: Scenario, index: number): ScenarioResult {
  const step = scenario.steps[index];
  const stepNumber = index + 1;
  const progressPercent = Math.round((stepNumber / scenario.totalSteps) * 100);
  const isComplete = stepNumber >= scenario.totalSteps;

  const lines: string[] = [];
  lines.push(`**${scenario.title}** — Step ${stepNumber} of ${scenario.totalSteps}`);
  lines.push(`_Progress: ${"█".repeat(Math.floor(progressPercent / 10))}${"░".repeat(10 - Math.floor(progressPercent / 10))} ${progressPercent}%_\n`);
  lines.push(`### ${step.title}\n`);
  lines.push(step.instruction + "\n");

  if (step.documents?.length) {
    lines.push("**Documents needed:**");
    step.documents.forEach((d) => lines.push(`• ${d}`));
    lines.push("");
  }
  if (step.office) lines.push(`📍 **Where:** ${step.office}\n`);
  if (step.estimatedTime) lines.push(`⏱️ **Time:** ${step.estimatedTime}`);
  if (step.cost) lines.push(`💰 **Cost:** ${step.cost}`);
  if (step.estimatedTime || step.cost) lines.push("");
  if (step.warningNote) lines.push(`> ⚠️ **Warning:** ${step.warningNote}\n`);
  if (step.tips?.length) {
    lines.push("**Tips:**");
    step.tips.forEach((t) => lines.push(`💡 ${t}`));
    lines.push("");
  }
  if (step.nextStepHint) lines.push(`➡️ ${step.nextStepHint}\n`);
  if (isComplete && scenario.finalNote) lines.push("---\n" + scenario.finalNote);
  if (scenario.escalate && scenario.escalateReason) lines.push(`\n🚨 **${scenario.escalateReason}**`);
  if (!isComplete) lines.push("\n_Type **next** for next step, **back** for previous step._");
  else lines.push("\n_Type **back** to review previous steps, or ask a new question._");

  return { matched: true, scenario, currentStep: step, stepNumber, totalSteps: scenario.totalSteps, progressPercent, isComplete, summary: lines.join("\n") };
}