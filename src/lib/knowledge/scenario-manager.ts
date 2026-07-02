// ─── JesAI Scenario Manager ───────────────────────────────────
// NLC validated — Nazmul, Advocate, Supreme Court of Bangladesh
// Handles multi-step legal scenarios that require sequential guidance
// Works with: types.ts (QAEntry, LawArea, KnowledgeResult)
//             index.ts (queryKnowledge, detectArea)
// Last verified: 2025-04-10

import type { LawArea, KnowledgeResult } from "./types";
import { detectArea } from "./index";

// ─── Types ────────────────────────────────────────────────────

export interface ScenarioStep {
  stepId: string;           // e.g. "company-reg-step-2"
  title: string;            // short label shown in UI
  instruction: string;      // what user should do at this step
  documents?: string[];     // documents needed at this step
  office?: string;          // physical office / portal to visit
  estimatedTime?: string;   // "3-5 working days"
  cost?: string;            // approximate cost
  warningNote?: string;     // if something can go wrong
  nextStepHint?: string;    // brief preview of next step
  tips?: string[];          // practical tips for this step
}

export interface Scenario {
  scenarioId: string;
  area: LawArea;
  title: string;
  titleBn?: string;         // Bengali title for bilingual support
  description: string;
  triggerPhrases: string[];   // lowercased phrase fragments
  triggerPhrasesBn?: string[]; // Bengali trigger phrases
  totalSteps: number;
  steps: ScenarioStep[];
  finalNote: string;          // shown after all steps complete
  escalate: boolean;
  escalateReason?: string;
  prerequisites?: string[];  // conditions before starting this scenario
  relatedScenarios?: string[]; // IDs of related scenarios
}

export interface ScenarioResult {
  matched: true;
  scenario: Scenario;
  currentStep: ScenarioStep;
  stepNumber: number;         // 1-indexed for display
  totalSteps: number;
  progressPercent: number;
  isComplete: boolean;
  summary: string;            // formatted response string
}

export interface ScenarioNoMatch {
  matched: false;
}

export type ScenarioQueryResult = ScenarioResult | ScenarioNoMatch;

// ─── Scenario Definitions ─────────────────────────────────────

const SCENARIOS: Scenario[] = [

  // ══════════════════════════════════════════════════════════
  // 1. PRIVATE LIMITED COMPANY REGISTRATION
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "company-pvt-registration",
    area: "company",
    title: "Private Limited Company Registration",
    titleBn: "প্রাইভেট লিমিটেড কোম্পানি নিবন্ধন",
    description: "Step-by-step guide to register a Pvt Ltd company with RJSC Bangladesh",
    triggerPhrases: [
      "register company step",
      "how to register a company",
      "incorporate company steps",
      "company registration process",
      "rjsc registration steps",
      "form a pvt ltd",
      "start a company",
      "open a company",
      "company incorporation guide",
    ],
    triggerPhrasesBn: [
      "কোম্পানি নিবন্ধনের ধাপ",
      "কোম্পানি কিভাবে খুলবো",
      "কোম্পানি গঠন",
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
        instruction:
          "Apply for company name clearance online at roc.gov.bd. Submit 3 proposed names in order of preference. RJSC checks existing registered names for conflicts.",
        documents: ["3 proposed company names", "Brief description of business activity"],
        office: "roc.gov.bd (online only)",
        estimatedTime: "1–3 working days",
        cost: "~BDT 200",
        warningNote:
          "Clearance is valid for only 90 days — begin MOA/AOA drafting immediately after approval.",
        nextStepHint: "Next: Prepare Memorandum of Association (MOA) and Articles of Association (AOA).",
        tips: [
          "Choose a name that reflects your business activity",
          "Avoid names similar to existing well-known companies",
          "Check trademark availability if you plan to build a brand",
          "Keep 2-3 backup names ready",
        ],
      },
      {
        stepId: "company-reg-step-2",
        title: "Draft MOA and AOA",
        instruction:
          "Prepare Memorandum of Association (MOA) and Articles of Association (AOA). MOA defines business objects, share capital, and members' liability. AOA governs internal management — director powers, meetings, share transfers, dividends.",
        documents: [
          "Cleared company name",
          "Decided business objects (objects clause)",
          "Authorized capital amount",
          "Names and NID of all shareholders and directors",
          "Registered office address",
        ],
        office: "Drafting — can engage NLC or CA for assistance",
        estimatedTime: "1–3 days",
        cost: "Lawyer/CA fee BDT 3,000–10,000 (if professional help used)",
        warningNote:
          "Draft MOA objects broadly — an overly narrow objects clause will require expensive amendment later when you expand business.",
        nextStepHint: "Next: Submit online application at roc.gov.bd with all documents.",
        tips: [
          "Include multiple business objects to allow future expansion",
          "Standard authorized capital: BDT 10 lakh (can be increased later)",
          "Consider including e-commerce, IT services, trading as objects",
        ],
      },
      {
        stepId: "company-reg-step-3",
        title: "Online Submission at RJSC",
        instruction:
          "Log in to roc.gov.bd and submit the incorporation application. Upload MOA, AOA, and fill Form I (statutory declaration), Form VI (registered office), Form XII (directors). All subscribers must sign MOA/AOA — e-signatures accepted on the portal.",
        documents: [
          "Signed MOA and AOA",
          "Form I (statutory declaration by subscriber)",
          "Form VI (notice of registered office)",
          "Form XII (list of directors)",
          "NID copies of all directors and shareholders",
          "TIN certificates of all directors and shareholders",
          "Utility bill / lease for registered office",
          "Passport-size photos of directors",
        ],
        office: "roc.gov.bd (fully online)",
        estimatedTime: "Submission: 1 day; RJSC processing: 7–15 working days",
        cost: "RJSC fee based on authorized capital (BDT 3,200 for ≤1 lakh capital)",
        warningNote:
          "Double-check all NID numbers and TINs before submission — errors delay the entire process.",
        nextStepHint: "Next: Pay RJSC registration fees online.",
        tips: [
          "Create a checklist of all required documents before starting",
          "Have all signers ready with their NID/TIN handy",
          "Save the application reference number for tracking",
        ],
      },
      {
        stepId: "company-reg-step-4",
        title: "Pay RJSC Fees",
        instruction:
          "Pay the RJSC registration fee online via Sonali Bank sePay or SSL Commerz on the roc.gov.bd payment gateway. Fee amount depends on your authorized capital. Keep the payment receipt — you will need it.",
        documents: ["RJSC application reference number", "Payment method (online banking / card)"],
        office: "roc.gov.bd payment gateway",
        estimatedTime: "Immediate",
        cost:
          "≤BDT 1 lakh capital: BDT 3,200 | BDT 1–5 lakh: BDT 5,000 | BDT 5 lakh–1 crore: BDT 10,000 | BDT 1–5 crore: BDT 20,000",
        warningNote:
          "Keep fee payment receipt. RJSC will not process without confirmed payment.",
        nextStepHint: "Next: Collect Certificate of Incorporation from roc.gov.bd after RJSC approval.",
        tips: [
          "Payment gateway sometimes has timeouts — try again if failed",
          "Screenshot the payment confirmation page",
        ],
      },
      {
        stepId: "company-reg-step-5",
        title: "Receive Certificate of Incorporation",
        instruction:
          "After RJSC reviews and approves your application, download the Certificate of Incorporation from roc.gov.bd. The certificate contains your unique Company Registration Number (CRN). Also download the certified copies of MOA and AOA from the portal.",
        documents: ["Certificate of Incorporation (download from roc.gov.bd)"],
        office: "roc.gov.bd (download online)",
        estimatedTime: "7–15 working days after payment",
        cost: "Included in registration fee",
        warningNote:
          "Verify company name and CRN on the certificate carefully before proceeding.",
        nextStepHint: "Next: Post-incorporation steps — TIN, trade licence, bank account.",
        tips: [
          "Download multiple copies of the certificate for different purposes",
          "Verify all details on the certificate match your application",
        ],
      },
      {
        stepId: "company-reg-step-6",
        title: "Post-Incorporation Setup",
        instruction:
          "Complete these mandatory post-incorporation steps: (1) Register company TIN at incometax.gov.bd. (2) Obtain trade licence from ward office of city corporation / municipality. (3) Open company bank account — all directors must visit the bank for KYC with Certificate of Incorporation, MOA/AOA, board resolution, and TIN. (4) Get company common seal made. (5) Register for VAT at vat.gov.bd if annual turnover expected above BDT 50 lakh.",
        documents: [
          "Certificate of Incorporation",
          "MOA and AOA (certified copies)",
          "Board resolution for bank account opening",
          "NID + TIN of all directors",
          "Trade licence",
          "Utility bill of registered office",
        ],
        office:
          "incometax.gov.bd (TIN) | Ward office (trade licence) | Bank branch (account) | vat.gov.bd (VAT if needed)",
        estimatedTime: "TIN: instant | Trade licence: 7–30 days | Bank account: 3–7 days",
        cost:
          "TIN: free | Trade licence: BDT 1,000–5,000 | Bank: nil | Common seal: BDT 500–2,000",
        warningNote:
          "Do not begin business operations before opening the company bank account — all company funds must flow through the company account.",
        nextStepHint:
          "Company is now fully operational. Annual compliance: hold AGM within 120 days of financial year end, file annual return at RJSC within 21 days of AGM.",
        tips: [
          "Prioritize bank account opening — it enables all other steps",
          "Get common seal with company name and 'Limited' engraved",
          "Create a compliance calendar for the year",
        ],
      },
    ],
    finalNote:
      "✅ Company registration complete. Annual obligations: RJSC annual return (21 days after AGM), income tax return by 15 July, VAT monthly return by 15th (if VAT registered), trade licence renewal by 30 June each year.\n\n📄 Full compliance calendar — NLC can assist.",
    escalate: false,
    relatedScenarios: ["company-opc-registration", "partnership-registration"],
  },

  // ══════════════════════════════════════════════════════════
  // 2. LAND PURCHASE
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "property-purchase",
    area: "property",
    title: "Land / Property Purchase",
    titleBn: "জমি/সম্পত্তি ক্রয়",
    description: "Step-by-step process for legally buying land or property in Bangladesh",
    triggerPhrases: [
      "buy land steps",
      "purchase land process",
      "how to buy property",
      "land buying procedure",
      "property purchase steps",
      "register a land deed",
      "how to purchase land",
      "land deed registration",
    ],
    triggerPhrasesBn: [
      "জমি কেনার ধাপ",
      "জমি কেনার প্রক্রিয়া",
      "জমি কিনতে চাই",
      "দলিল রেজিস্ট্রেশন",
    ],
    totalSteps: 7,
    prerequisites: [
      "Sufficient funds for purchase + registration costs (typically 5-9% additional)",
      "Time for document verification (1-2 weeks)",
    ],
    steps: [
      {
        stepId: "property-buy-step-1",
        title: "Verify Title and Check Documents",
        instruction:
          "Before paying any money, verify the seller's title to the land. Obtain: CS/SA/RS Khatian (record of rights), Mutation Khatian (current owner), Bain Kabala (certified copy of original deed), DCR (payment receipts for land development tax). Check if land is recorded in seller's name.",
        documents: [
          "CS Khatian (original survey record)",
          "SA Khatian (state acquisition record)",
          "RS Khatian (revisional survey record)",
          "Mutation Khatian (current owner)",
          "Latest certified copy of deed",
          "DCR (land development tax receipts)",
        ],
        office: "Sub-Registry office | AC Land office | Survey office",
        estimatedTime: "1–2 weeks (for certified copies)",
        cost: "BDT 200–1,000 for certified copies",
        warningNote:
          "Never pay advance money before completing title verification. Fraudulent land sales are common — the Khatian in seller's name is the minimum check.",
        nextStepHint: "Next: Check for encumbrances (loans, mortgages on the land).",
        tips: [
          "Cross-verify CS, RS, and BS khatians if available",
          "Check if there's any litigation involving the land",
          "Visit the land physically to verify boundaries",
          "Talk to neighbours about ownership history",
        ],
      },
      {
        stepId: "property-buy-step-2",
        title: "Check for Encumbrances",
        instruction:
          "Search the Sub-Registry office Non-Encumbrance Certificate (NEC) to confirm the land has no existing mortgage, charge, or lien. Also check with local banks whether the seller has mortgaged the land.",
        documents: ["Khatian details", "Mouza name", "Dag (plot) number"],
        office: "Sub-Registry office (NEC section)",
        estimatedTime: "3–7 working days",
        cost: "BDT 200–500 per application",
        warningNote:
          "If NEC shows an existing mortgage, the land is pledged to a bank — purchasing without clearing the mortgage is legally risky.",
        nextStepHint: "Next: Negotiate price and draft Sale Agreement (Baina Nama).",
        tips: [
          "Apply for NEC for at least last 15 years",
          "Check court records for any pending cases",
          "Verify with multiple banks in the area",
        ],
      },
      {
        stepId: "property-buy-step-3",
        title: "Sign Sale Agreement (Baina Nama)",
        instruction:
          "Execute a written Sale Agreement (Baina Nama) setting out: price, payment schedule, possession date, and conditions. Pay advance (bayana) — typically 10–30% of price. Baina Nama should be notarised and may be registered at Sub-Registry. Sets legal rights in case of default.",
        documents: [
          "Draft Baina Nama (sale agreement)",
          "NID of both buyer and seller",
          "Witness NIDs",
          "Agreed advance amount (cheque/bank transfer)",
        ],
        office: "Notary office | Sub-Registry (optional registration)",
        estimatedTime: "1 day",
        cost: "Notarisation: BDT 500–2,000 | Registration of Baina: BDT 1,000–5,000",
        warningNote:
          "Always pay advance via cheque or bank transfer — cash payment is difficult to prove in court if seller defaults.",
        nextStepHint: "Next: Prepare sale deed and calculate registration costs.",
        tips: [
          "Include specific penalty clause for seller's default",
          "Mention exact possession handover date",
          "List all documents seller must provide at registration",
          "Include clause for bearing registration costs",
        ],
      },
      {
        stepId: "property-buy-step-4",
        title: "Prepare Sale Deed",
        instruction:
          "Engage a licensed deed writer or lawyer to draft the sale deed (Kabala). The deed must accurately describe the land by Dag number, Khatian number, mouza, area, and boundaries. The deed must match the Khatian description exactly.",
        documents: [
          "Khatian and Dag details",
          "NID and TIN of buyer and seller",
          "Previous deed (certified copy)",
          "Baina Nama",
          "Agreed sale price",
        ],
        office: "Licensed deed writer | Lawyer",
        estimatedTime: "1–3 days",
        cost: "Deed writer fee: BDT 2,000–10,000",
        warningNote:
          "Errors in Dag or Khatian number in the deed cause legal complications during mutation — verify all details carefully before registration.",
        nextStepHint: "Next: Pay registration costs and register the deed at Sub-Registry.",
        tips: [
          "Read the drafted deed carefully before signing",
          "Verify all boundary descriptions match physical reality",
          "Ensure consideration (price) is written in both words and figures",
        ],
      },
      {
        stepId: "property-buy-step-5",
        title: "Pay Registration Costs",
        instruction:
          "Calculate and pay all registration-related taxes before the deed registration appointment. Costs in Dhaka: Stamp duty 1.5% + Registration fee 1% + Local govt tax 2% + AIT 4% = approximately 8.5% of deed value. Pay via bank challan (Sonali Bank or designated bank).",
        documents: [
          "Bank challan for: stamp duty, registration fee, local tax, AIT",
          "TIN of buyer",
          "Deed value declared",
        ],
        office: "Sonali Bank | Sub-Registry designated bank",
        estimatedTime: "1 day",
        cost:
          "Dhaka city: ~8.5% of deed value | Other city corp: ~7% | Municipality: ~5% | Rural: ~4%",
        warningNote:
          "AIT (Advance Income Tax) paid here is a tax credit — include it in your income tax return. Keep all challans.",
        nextStepHint: "Next: Register the deed at Sub-Registry office.",
        tips: [
          "Calculate costs based on SUB-REGISTRAR's circle rate, not your negotiated price",
          "Keep photocopies of all challans",
          "Pay a day before registration to avoid last-minute issues",
        ],
      },
      {
        stepId: "property-buy-step-6",
        title: "Register Deed at Sub-Registry",
        instruction:
          "Attend Sub-Registry office with seller for deed registration. Both buyer and seller (or authorised attorneys) must be present with NIDs. Sub-Registrar verifies identities, witnesses sign deed, photographs taken. Deed registered and returned with registration endorsement.",
        documents: [
          "Original sale deed (2 copies)",
          "NID originals of buyer and seller",
          "All payment challans (stamp, reg fee, AIT, local tax)",
          "NID of 2 witnesses",
          "TIN certificate of buyer",
          "Previous deed (certified copy)",
        ],
        office: "Sub-Registry office (jurisdiction based on land location)",
        estimatedTime: "1 day (appointment needed in some offices)",
        cost: "Already paid in Step 5",
        warningNote:
          "Both parties must physically appear — or execute notarised Power of Attorney (POA) in advance. Sub-Registrar can reject deed if documents missing.",
        nextStepHint: "Next: Apply for mutation in your name at AC Land office.",
        tips: [
          "Reach Sub-Registry office early morning",
          "Carry original NIDs — photocopies not accepted",
          "Ensure witnesses have their original NIDs",
          "Take 2 witnesses who are not family members if possible",
        ],
      },
      {
        stepId: "property-buy-step-7",
        title: "Mutation (Namjari) and Tax Transfer",
        instruction:
          "After deed registration, apply for mutation (namjari) at the AC Land office to transfer the land record into your name. Submit: registered deed, application, court fee. Mutation completes your legal ownership in government records. Also transfer land development tax (khajna) payment into your name.",
        documents: [
          "Registered deed (original)",
          "Application for mutation (namjari)",
          "Court fee: BDT 100–500",
          "Copy of Khatian",
          "NID of buyer",
        ],
        office: "AC Land office (Upazila/Union Land Office) for mutation | DC office for some cases",
        estimatedTime: "30–90 days",
        cost: "Court fee: BDT 100–500",
        warningNote:
          "Mutation without registered deed is not legally valid. If mutation is delayed — follow up at AC Land office. Always get Mutation Khatian in writing.",
        nextStepHint:
          "✅ Purchase complete after mutation. Pay annual land development tax (khajna) each year to maintain record.",
        tips: [
          "Apply for e-mutation where available (faster processing)",
          "Follow up regularly at AC Land office",
          "Get Mutation Khatian certified copy once issued",
          "Update all your personal records with new property details",
        ],
      },
    ],
    finalNote:
      "✅ Land purchase complete. Keep all documents permanently: registered deed, mutation Khatian, all challans.\n\n**Annual obligation:** Pay land development tax (khajna) at Union Parishad / municipality each year.\n\n📄 Full property purchase guide with document templates — NLC can assist.",
    escalate: false,
    relatedScenarios: ["property-mutation", "flat-purchase"],
  },

  // ══════════════════════════════════════════════════════════
  // 3. FIR AND CRIMINAL CASE
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "criminal-fir-process",
    area: "criminal",
    title: "Filing an FIR and Criminal Case Process",
    titleBn: "এফআইআর দায়ের ও ফৌজদারি মামলা প্রক্রিয়া",
    description: "Step-by-step guide for filing FIR and following through a criminal case in Bangladesh",
    triggerPhrases: [
      "how to file fir",
      "file a case police",
      "criminal case steps",
      "police complaint steps",
      "file complaint against someone",
      "fir process",
      "gd number",
    ],
    triggerPhrasesBn: [
      "থানায় মামলা করতে চাই",
      "এফআইআর কিভাবে করবো",
      "মামলার ধাপ",
      "জিডি নম্বর",
    ],
    totalSteps: 5,
    prerequisites: [
      "Knowledge of the crime incident (date, time, place)",
      "Names/descriptions of accused if known",
      "Any available evidence",
    ],
    steps: [
      {
        stepId: "fir-step-1",
        title: "File FIR at Police Station",
        instruction:
          "Go to the police station (thana) that has jurisdiction over the area where the crime occurred — not where you live. Describe the incident clearly to the Officer-in-Charge (OC). FIR must be written, read back to you, and signed by you. Insist on a copy of the FIR with GD (General Diary) number.",
        documents: [
          "NID (your own)",
          "Any evidence available (photos, screenshots, medical report if assault)",
          "Names and descriptions of accused if known",
        ],
        office: "Police station (thana) with territorial jurisdiction",
        estimatedTime: "Same day — officer must record FIR immediately under CrPC",
        cost: "No fee for FIR filing",
        warningNote:
          "If OC refuses to record FIR: file written complaint to SP (Superintendent of Police). OC is legally bound to record cognizable offences. Refusal = dereliction of duty.",
        nextStepHint: "Next: Police investigation begins automatically after FIR registration.",
        tips: [
          "Write down your statement before going to police station",
          "Be precise about dates, times, and locations",
          "Mention all witnesses by name and address",
          "Don't exaggerate — stick to facts",
          "Get GD number immediately and keep it safe",
        ],
      },
      {
        stepId: "fir-step-2",
        title: "Police Investigation",
        instruction:
          "After FIR, the Investigating Officer (IO) assigned to your case conducts investigation: visits crime scene, records witness statements, collects evidence, may arrest accused. Cooperate fully with IO. Provide all evidence and witness information promptly.",
        documents: [
          "Any additional evidence you collect (call records, CCTV footage, documents)",
          "Witness contact information",
        ],
        office: "Police station (investigation by IO)",
        estimatedTime: "15–180 days depending on case complexity",
        cost: "No direct cost",
        warningNote:
          "If IO is not investigating properly: file written complaint to SP or approach court for direction. You can apply to Magistrate Court for investigation order.",
        nextStepHint: "Next: IO files charge sheet or final report after investigation.",
        tips: [
          "Maintain regular contact with IO",
          "Provide new evidence as you find it",
          "Keep a diary of all communications with IO",
          "If IO is unresponsive, escalate to SP in writing",
        ],
      },
      {
        stepId: "fir-step-3",
        title: "Charge Sheet and Court Process",
        instruction:
          "If IO finds sufficient evidence: files Charge Sheet (CS) in Magistrate Court. If evidence insufficient: files Final Report (FR). If FR filed: you can file a Narazi petition objecting to FR within 30 days. If charge sheet filed: Magistrate takes cognizance and case proceeds to trial.",
        documents: [
          "Copy of FIR (GD number)",
          "Any certified documents from investigation",
        ],
        office: "Magistrate Court (Chief Metropolitan Magistrate / Chief Judicial Magistrate)",
        estimatedTime: "IO investigation: up to 120 days | Charge sheet filing: within investigation period",
        cost: "No direct cost",
        warningNote:
          "If Final Report (FR) filed and you disagree — you have 30 days to file a Narazi (protest petition). Missing this deadline means the case is dropped.",
        nextStepHint: "Next: Trial begins — prosecution and defence present evidence.",
        tips: [
          "Monitor case progress regularly at court",
          "Keep all case documents organized",
          "Engage a lawyer after charge sheet is filed",
        ],
      },
      {
        stepId: "fir-step-4",
        title: "Trial",
        instruction:
          "At trial: prosecution presents evidence and witnesses. Accused has right to cross-examine. Defence presents their case. You as complainant may be called as prosecution witness — attend all hearings. Engage a lawyer to represent the prosecution case alongside the public prosecutor.",
        documents: [
          "All original evidence",
          "Witness list",
          "Copy of FIR and charge sheet",
        ],
        office: "Magistrate Court (for offences up to 7 years imprisonment) | Sessions Court (for serious offences)",
        estimatedTime: "6 months – 5+ years depending on case complexity and court workload",
        cost: "Lawyer fees vary widely",
        warningNote:
          "Attend all hearing dates — absence can delay the case and in some cases lead to ex-parte proceedings. Engage a private lawyer alongside state prosecutor for better case management.",
        nextStepHint: "Next: Judgment — conviction or acquittal.",
        tips: [
          "Never miss a hearing date",
          "Keep your lawyer updated on any developments",
          "Prepare witnesses before their court appearance",
          "Document everything that happens in court",
        ],
      },
      {
        stepId: "fir-step-5",
        title: "Judgment and Appeal",
        instruction:
          "After trial: Magistrate or Sessions Judge delivers judgment. If conviction: sentence imposed (fine, imprisonment, or both). If acquittal: accused discharged. If unsatisfied with judgment: complainant can appeal to Sessions Court (from Magistrate decision) or High Court Division (from Sessions Court decision) within prescribed time.",
        documents: [
          "Certified copy of judgment (obtain from court)",
          "Appeal petition prepared by lawyer",
        ],
        office:
          "Sessions Court (appeal from Magistrate) | High Court Division (appeal from Sessions Court) | Appellate Division (final)",
        estimatedTime: "Judgment: after trial concludes | Appeal: file within 30–60 days of judgment",
        cost: "Appeal lawyer fees",
        warningNote:
          "Appeal deadlines are strict — missing the limitation period bars the appeal entirely. Engage lawyer immediately after judgment if planning to appeal.",
        nextStepHint:
          "✅ Criminal case process complete. Keep all certified court documents permanently.",
        tips: [
          "Get certified copy of judgment immediately",
          "Decide on appeal within first few days",
          "If appealing, file before deadline expires",
        ],
      },
    ],
    finalNote:
      "⚠️ Criminal cases are complex — always engage a qualified criminal lawyer to assist at every stage.\n\nNLC can refer specialist criminal advocates for:\n• FIR assistance\n• Investigation monitoring\n• Trial representation\n• Appeal preparation",
    escalate: true,
    escalateReason:
      "Criminal cases require specialist criminal lawyer. WhatsApp NLC for referral.",
    relatedScenarios: ["criminal-bail"],
  },

  // ══════════════════════════════════════════════════════════
  // 4. TAX RETURN FILING
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "tax-return-filing",
    area: "tax",
    title: "Income Tax Return Filing (Individual)",
    titleBn: "আয়কর রিটার্ন দাখিল (ব্যক্তিগত)",
    description: "Step-by-step guide to file annual income tax return under Income Tax Act 2023",
    triggerPhrases: [
      "how to file tax return steps",
      "income tax return process",
      "tax return filing guide",
      "file my tax return step",
      "tax return procedure",
      "eit return",
    ],
    triggerPhrasesBn: [
      "আয়কর রিটার্ন দাখিলের ধাপ",
      "রিটার্ন জমার প্রক্রিয়া",
      "আয়কর রিটার্ন কিভাবে দেবো",
    ],
    totalSteps: 5,
    prerequisites: [
      "Valid TIN (Tax Identification Number)",
      "Access to etaxnbr.gov.bd portal",
      "Income and investment documents for the tax year",
    ],
    steps: [
      {
        stepId: "tax-return-step-1",
        title: "Collect All Income Documents",
        instruction:
          "Gather all income documents for the tax year (1 July – 30 June). Salaried person: get salary certificate (Form 108A) from employer — employer is legally required to provide it. Self-employed: prepare income/expense summary. Other income: bank interest certificates, rental income details, dividend certificates.",
        documents: [
          "Form 108A — salary certificate from employer",
          "Bank statements (all accounts) for the year",
          "Bank interest/FD certificates",
          "Rental income details (rent receipts)",
          "Dividend certificates (from companies)",
          "Any other income documents",
        ],
        office: "From employer (Form 108A) | From banks | From companies (dividend)",
        estimatedTime: "1–7 days to collect all documents",
        cost: "No cost to collect",
        warningNote:
          "Employer must provide Form 108A by July 31 each year. If employer does not provide: demand in writing. This is your legal right under Income Tax Act 2023.",
        nextStepHint: "Next: Gather investment proof to claim investment tax rebate.",
        tips: [
          "Request Form 108A from employer in June itself",
          "Download bank statements by June 30",
          "Collect all investment receipts throughout the year",
        ],
      },
      {
        stepId: "tax-return-step-2",
        title: "Gather Investment Proof for Rebate",
        instruction:
          "Collect documents for all qualifying investments made during the tax year — these reduce your tax by 15% of investment amount. Qualifying investments: Sanchayapatra (savings certificates), DPS receipts, life insurance premium receipts, provident fund contribution receipts, shares purchase statement.",
        documents: [
          "Sanchayapatra certificates / encashment receipts",
          "DPS passbook / statement",
          "Life insurance premium receipt",
          "Approved provident fund certificate",
          "Share purchase statements from broker",
          "Govt Treasury Bond certificates",
        ],
        office: "From relevant institutions (Post Office, Bank, Insurance Co., Broker)",
        estimatedTime: "1–3 days",
        cost: "No cost to collect",
        warningNote:
          "Investment rebate cap: 15% of investment, maximum 3% of total income or BDT 10 lakh — whichever is lower. Declare investments to maximise rebate.",
        nextStepHint: "Next: Calculate your tax liability.",
        tips: [
          "Make investments before June 30 to claim in current year",
          "Keep all investment receipts organized",
          "Check which investments qualify for rebate",
        ],
      },
      {
        stepId: "tax-return-step-3",
        title: "Calculate Tax and Prepare Return",
        instruction:
          "Calculate total income from all sources. Apply slab rates (0%–25%). Deduct investment rebate (15% of qualifying investment). Calculate net tax payable. Check if advance tax or WHT already deducted exceeds tax due (if yes: claim refund). Prepare return form — simplified one-page form available for salaried persons with income below BDT 5 lakh.",
        documents: [
          "All income documents from Step 1",
          "All investment documents from Step 2",
          "Previous year return (for comparison)",
          "TIN certificate",
        ],
        office: "Can use NBR's online calculator at etaxnbr.gov.bd",
        estimatedTime: "1 day",
        cost: "No cost",
        warningNote:
          "If you have income from multiple sources or investment rebate to claim: use etaxnbr.gov.bd's calculation tool or get help from CA/tax consultant to avoid errors.",
        nextStepHint: "Next: Pay any tax due and file the return.",
        tips: [
          "Use NBR's online calculator to double-check",
          "Don't forget to include all income sources",
          "Verify WHT deducted matches your form 108A",
        ],
      },
      {
        stepId: "tax-return-step-4",
        title: "Pay Tax Due",
        instruction:
          "If net tax calculated exceeds WHT already deducted: pay the balance before filing. Pay via: etaxnbr.gov.bd online payment (card, mobile banking, bank transfer) or bank challan at Sonali Bank. Keep payment receipt. If WHT already deducted is MORE than tax due: you will claim refund in the return — no payment needed.",
        documents: [
          "Tax calculation from Step 3",
          "Payment method (online / bank challan)",
        ],
        office: "etaxnbr.gov.bd (online payment) | Sonali Bank (challan)",
        estimatedTime: "Same day",
        cost: "Tax amount calculated in Step 3 | Minimum BDT 5,000 (city corp) / BDT 3,000 (other areas)",
        warningNote:
          "Pay tax BEFORE filing — the return system checks payment. Late payment after 30 November: 2% per month surcharge applies.",
        nextStepHint: "Next: Submit the return online or physically.",
        tips: [
          "Pay at least 1-2 days before filing",
          "Keep payment receipt screenshot/printed",
          "Online payment is faster and more convenient",
        ],
      },
      {
        stepId: "tax-return-step-5",
        title: "Submit Return and Get Acknowledgement",
        instruction:
          "File the return at etaxnbr.gov.bd (online) or submit physical form at the Circle Tax Office under your TIN jurisdiction. Download the acknowledgement receipt immediately after online filing. Physical filing: get stamped copy of return as acknowledgement.",
        documents: [
          "Completed return form",
          "Tax payment challan",
          "TIN certificate",
          "Supporting documents (not attached to return — but keep for 6 years)",
        ],
        office: "etaxnbr.gov.bd (online) | Circle Tax Office (physical)",
        estimatedTime: "Same day | Deadline: 30 November each year",
        cost: "No filing fee",
        warningNote:
          "The acknowledgement receipt is your proof of compliance — needed for bank loans, visa applications, trade licence renewal. Download and store it.",
        nextStepHint:
          "✅ Return filed. Next year: repeat by 30 November.",
        tips: [
          "File online — faster and more reliable",
          "Download and save acknowledgement immediately",
          "Keep soft copy in multiple locations",
        ],
      },
    ],
    finalNote:
      "✅ Tax return complete. Keep acknowledgement receipt — valid proof of compliance for 1 year.\n\n**Annual deadline:** 30 November\n\n**Next steps:** If refund claimed → DCT will verify and issue refund in 1–3 months. If additional tax assessed → DCT will send notice — respond within deadline.\n\n📄 Full tax compliance guide — NLC can assist.",
    escalate: false,
    relatedScenarios: ["tax-tin-registration"],
  },

  // ══════════════════════════════════════════════════════════
  // 5. CHEQUE BOUNCE CASE
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "criminal-cheque-bounce",
    area: "criminal",
    title: "Cheque Bounce (Dishonour) Case",
    titleBn: "চেক বাউন্স মামলা",
    description: "Step-by-step process for filing a criminal case for cheque dishonour under Section 138 NI Act",
    triggerPhrases: [
      "cheque bounce case steps",
      "file cheque bounce case",
      "dishonoured cheque process",
      "cheque returned case",
      "section 138 case",
      "bad cheque case",
    ],
    triggerPhrasesBn: [
      "চেক বাউন্স মামলার ধাপ",
      "চেক ফেরত মামলা",
      "ডিশনার চেক মামলা",
    ],
    totalSteps: 4,
    prerequisites: [
      "Original bounced cheque",
      "Bank dishonour memo/slip",
      "Cheque must have been presented within 6 months of issue",
    ],
    steps: [
      {
        stepId: "cheque-step-1",
        title: "Get Dishonour Memo from Bank",
        instruction:
          "When the cheque is bounced, your bank will send a dishonour memo/slip stating the reason (insufficient funds, account closed, etc.). Collect this memo immediately — it is the primary evidence. The clock starts ticking from this date.",
        documents: [
          "Dishonour memo/slip from bank",
          "Original bounced cheque",
          "Bank statement showing cheque deposit attempt",
        ],
        office: "Your bank branch",
        estimatedTime: "1-3 days after cheque bounce",
        cost: "No cost",
        warningNote:
          "This is Day 0. You have exactly 30 days from this date to send legal notice. Missing this deadline destroys your case.",
        nextStepHint: "Next: Send legal notice to the cheque issuer within 30 days.",
        tips: [
          "Visit bank immediately to collect memo",
          "Keep the original cheque safe — don't write anything on it",
          "Note down exact date of dishonour",
        ],
      },
      {
        stepId: "cheque-step-2",
        title: "Send Legal Notice (Demand Notice)",
        instruction:
          "Engage a lawyer to draft and send a legal notice to the cheque issuer demanding payment of the cheque amount within 15-30 days. Notice must be sent by registered post with acknowledgment (AD) or courier with delivery receipt. Keep the AD card/receipt as proof of delivery.",
        documents: [
          "Legal notice drafted by lawyer",
          "Copy of bounced cheque",
          "Copy of dishonour memo",
          "Your bank account details",
          "Address of cheque issuer",
        ],
        office: "Lawyer's office (drafting) | Post office / courier (dispatch)",
        estimatedTime: "1-2 days to draft and send",
        cost: "Lawyer fee: BDT 3,000-10,000",
        warningNote:
          "Notice must be sent within 30 days of dishonour. Count carefully — even one day late can destroy your case. The notice must clearly state the amount and demand payment within specified time (usually 15 days).",
        nextStepHint: "Next: If payment not received within notice period, file criminal complaint within 30 days.",
        tips: [
          "Send notice via both AD post and courier for safety",
          "Track the AD card return — if undelivered, take immediate action",
          "Keep copy of notice with lawyer's seal and signature",
        ],
      },
      {
        stepId: "cheque-step-3",
        title: "File Criminal Complaint",
        instruction:
          "If the cheque issuer does not pay within the notice period, file a criminal complaint under Section 138 of Negotiable Instruments Act in the Court of Chief Judicial Magistrate or Metropolitan Magistrate. Complaint must be filed within 30 days of notice expiry (i.e., within 60 days total of dishonour).",
        documents: [
          "Criminal complaint petition (drafted by lawyer)",
          "Original bounced cheque (to be produced in court)",
          "Dishonour memo (original/certified copy)",
          "Legal notice sent",
          "AD card / courier receipt proving notice delivery",
          "Copy of your bank statement",
          "Affidavit",
          "Court fee stamps",
        ],
        office: "Court of Chief Judicial Magistrate / Metropolitan Magistrate",
        estimatedTime: "1 day to file | Hearing may take 1-3 months",
        cost: "Court fee: BDT 200-500 | Lawyer fee: BDT 10,000-30,000",
        warningNote:
          "STRICT DEADLINE: File within 30 days of notice expiry. This means total 60 days from dishonour date. Courts rarely condone delay in cheque bounce cases. File even if on the last day.",
        nextStepHint: "Next: Court process — summons, hearing, and judgment.",
        tips: [
          "File well before the deadline — don't wait for last day",
          "Keep original cheque very safe — required in court",
          "Be present on every hearing date",
        ],
      },
      {
        stepId: "cheque-step-4",
        title: "Court Process and Recovery",
        instruction:
          "Court issues summons to accused. At hearing, accused may plead guilty (faster resolution) or not guilty (trial). If convicted: court may impose imprisonment up to 2 years and/or fine up to twice the cheque amount. The fine amount becomes payable to you — you can execute it like a money decree.",
        documents: [
          "All documents from Step 3",
          "Witness list (if any)",
        ],
        office: "Magistrate Court | Execution Court (for recovery of fine)",
        estimatedTime: "6 months - 2 years for completion",
        cost: "Additional lawyer fees for hearings",
        warningNote:
          "Even if accused is imprisoned, you may not recover the money if they have no assets. Consider filing a parallel civil suit for money recovery as backup.",
        nextStepHint: "✅ Case complete. If fine imposed, execute for recovery.",
        tips: [
          "Consider filing parallel money recovery suit",
          "Check if accused has attachable assets before filing",
          "Attend all hearings without fail",
        ],
      },
    ],
    finalNote:
      "⚠️ Cheque bounce cases have THREE STRICT DEADLINES:\n1. Legal notice: within 30 days of dishonour\n2. Criminal complaint: within 30 days of notice expiry\n3. Total: 60 days from dishonour date\n\nMissing any deadline = case dismissed.\n\nNLC can refer specialist advocates for cheque bounce cases.",
    escalate: true,
    escalateReason: "Cheque bounce cases require precise deadline management. WhatsApp NLC for urgent referral.",
    relatedScenarios: ["money-recovery-suit"],
  },

  // ══════════════════════════════════════════════════════════
  // 6. BAIL APPLICATION
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "criminal-bail",
    area: "criminal",
    title: "Bail Application Process",
    titleBn: "জামিনের আবেদন প্রক্রিয়া",
    description: "Step-by-step process for applying for bail in Bangladesh courts",
    triggerPhrases: [
      "how to get bail",
      "bail application steps",
      "bail procedure bangladesh",
      "apply for bail",
      "bail court process",
      "jail bail",
    ],
    triggerPhrasesBn: [
      "জামিনের আবেদন",
      "জামিন পাওয়ার উপায়",
      "জামিন প্রক্রিয়া",
      "কারাগার থেকে জামিন",
    ],
    totalSteps: 4,
    prerequisites: [
      "Accused must be in custody or facing imminent arrest",
      "Details of the case (FIR, charges)",
      "A suitable surety (guarantor) with assets",
    ],
    steps: [
      {
        stepId: "bail-step-1",
        title: "Determine Bail Type and Court",
        instruction:
          "First determine whether the offence is bailable or non-bailable. Bailable offences (Schedule II of CrPC — lighter offences): accused has right to bail — police can grant at police station. Non-bailable offences (serious crimes — murder, rape, dacoity): only a Magistrate or Sessions Judge can grant bail. For anticipatory bail (before arrest): apply to Sessions Court or High Court.",
        documents: ["Copy of FIR / GD number", "Name of offence charged"],
        office: "Police Station (bailable) | Magistrate Court | Sessions Court | High Court Division",
        estimatedTime: "Bailable: immediate | Non-bailable: 1–7 days",
        cost: "No cost at this stage",
        warningNote:
          "Non-bailable offence bail is discretionary — court considers: nature of offence, criminal record, flight risk, likelihood of tampering with evidence. Engage lawyer before appearing.",
        nextStepHint: "Next: Engage a criminal lawyer and prepare bail application.",
        tips: [
          "For serious offences, directly approach Sessions Court or High Court",
          "Anticipatory bail needed if arrest is imminent but not yet made",
        ],
      },
      {
        stepId: "bail-step-2",
        title: "Prepare and File Bail Petition",
        instruction:
          "Engage a criminal lawyer to draft the bail petition. The petition must state: name of accused, offence, grounds for bail (health, livelihood, clean record, cooperation with investigation, weak evidence), and bail conditions offered. File petition in the appropriate court (Magistrate/Sessions/High Court).",
        documents: [
          "Bail petition (drafted by lawyer)",
          "Copy of FIR",
          "NID of accused",
          "Character certificates if available",
          "Medical certificates if health ground",
          "Surety details (bail bond guarantor)",
        ],
        office: "Court filing section | Magistrate / Sessions / High Court",
        estimatedTime: "Filing: 1 day | Hearing: 1–7 days after filing",
        cost: "Lawyer fee: BDT 5,000–50,000+ depending on court level and case seriousness",
        warningNote:
          "Bail petition quality matters significantly — a well-argued petition with strong grounds succeeds; a poorly drafted one is rejected. Engage an experienced criminal lawyer.",
        nextStepHint: "Next: Court hearing on bail application.",
        tips: [
          "Gather all supporting documents before meeting lawyer",
          "Inform lawyer of any special circumstances",
          "Arrange surety in advance",
        ],
      },
      {
        stepId: "bail-step-3",
        title: "Bail Hearing",
        instruction:
          "At the hearing: accused's lawyer argues grounds for bail. Prosecution (Public Prosecutor or complainant's lawyer) may oppose. Judge considers: severity of offence, evidence strength, accused's record, flight risk, and public interest. If granted: court sets bail amount (bond) and conditions.",
        documents: ["All documents from Step 2", "Lawyer presence mandatory"],
        office: "Magistrate / Sessions / High Court",
        estimatedTime: "Hearing: 30 minutes–2 hours | Decision: same day or next hearing",
        cost: "No additional cost",
        warningNote:
          "For serious offences (murder, rape, corruption): Magistrate may not have jurisdiction to grant bail — must go to Sessions Court. For High Court bail: requires senior advocate.",
        nextStepHint: "Next: If bail granted — execute bail bond with surety.",
        tips: [
          "Accused should be well-dressed and respectful in court",
          "Family members should attend if possible",
          "Be prepared for multiple hearings in serious cases",
        ],
      },
      {
        stepId: "bail-step-4",
        title: "Execute Bail Bond",
        instruction:
          "If bail granted: execute bail bond in court. Surety (guarantor) must appear in court with their NID and proof of property/assets (to value of bail bond amount). Accused signs personal bond. After bond executed: court issues release order to jail/police. Accused released.",
        documents: [
          "Bail order (court certified copy)",
          "Surety's NID",
          "Surety's property documents (if property bail bond)",
          "Surety's bank statement (if cash bond)",
          "Accused's NID",
        ],
        office: "Court filing section | Jail (release order delivered here)",
        estimatedTime: "Bond execution: same day | Release from jail: within 24 hours of order",
        cost: "Bail bond amount (varies) | Lawyer fee for bond execution",
        warningNote:
          "Accused must comply with all bail conditions (attend all hearings, not leave jurisdiction without permission, not contact witnesses). Violation = bail cancelled + re-arrest.",
        nextStepHint:
          "✅ Bail secured. Attend all court dates — missing hearings cancels bail automatically.",
        tips: [
          "Arrange surety with sufficient assets before bail hearing",
          "Keep certified copy of bail order safe",
          "Note all bail conditions carefully",
          "Never violate bail conditions under any circumstance",
        ],
      },
    ],
    finalNote:
      "⚠️ Bail conditions must be strictly followed:\n• Attend every court hearing date\n• Do not leave the country without court permission\n• Do not contact prosecution witnesses\n• Surrender passport if ordered\n\nViolating bail conditions → immediate re-arrest and bail cancelled.\n\n**NLC can refer:** Specialist criminal advocates for bail hearings.",
    escalate: true,
    escalateReason:
      "Bail applications require experienced criminal lawyer. WhatsApp NLC for urgent referral.",
    relatedScenarios: ["criminal-fir-process"],
  },

  // ══════════════════════════════════════════════════════════
  // 7. MUTATION PROCESS
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "property-mutation",
    area: "property",
    title: "Land Mutation (Namjari) Process",
    titleBn: "জমি মিউটেশন (নামজারি) প্রক্রিয়া",
    description: "Step-by-step guide for completing mutation after land purchase or inheritance",
    triggerPhrases: [
      "mutation process",
      "namjari process",
      "how to do mutation",
      "land mutation steps",
      "name transfer land",
      "khatian update",
    ],
    triggerPhrasesBn: [
      "মিউটেশন প্রক্রিয়া",
      "নামজারি করার ধাপ",
      "খাতিয়ানে নাম পরিবর্তন",
      "জমি মিউটেশন",
    ],
    totalSteps: 5,
    prerequisites: [
      "Registered sale deed / inheritance documents",
      "All previous Khatian records",
      "NID of new owner",
    ],
    steps: [
      {
        stepId: "mutation-step-1",
        title: "Collect Required Documents",
        instruction:
          "Gather all documents needed for mutation application: registered deed (original), existing Khatian (CS/RS/BS), previous mutation records, NID of new owner, TIN certificate, passport-size photos, and any inheritance documents if applicable.",
        documents: [
          "Registered sale deed (original)",
          "Previous Khatian (CS/RS/BS)",
          "Previous mutation records",
          "NID of new owner(s)",
          "TIN certificate",
          "Passport-size photos (2 copies)",
          "Inheritance documents (if applicable): death certificate, succession certificate, heir list",
        ],
        office: "Your records | Sub-Registry office (for certified copies)",
        estimatedTime: "2-5 days",
        cost: "Certified copies: BDT 200-500 each",
        warningNote:
          "Original registered deed is mandatory — certified copy not accepted for mutation in most cases.",
        nextStepHint: "Next: Fill mutation application form.",
        tips: [
          "Get 2-3 extra certified copies of deed as backup",
          "Verify all names and details match across documents",
        ],
      },
      {
        stepId: "mutation-step-2",
        title: "Fill Application Form",
        instruction:
          "Fill the mutation application form available at AC Land office or online (e-mutation portal where available). Form requires: applicant details, land details (Mouza, Dag, Khatian number), transaction details, and reason for mutation (sale, inheritance, gift, etc.).",
        documents: [
          "Mutation application form",
          "All documents from Step 1",
        ],
        office: "AC Land office | e-mutation portal (where available)",
        estimatedTime: "1 day",
        cost: "No form cost",
        warningNote:
          "Ensure all Dag numbers, Khatian numbers, and areas match exactly with records. Any mismatch causes rejection.",
        nextStepHint: "Next: Submit application and pay fees.",
        tips: [
          "Double-check all numbers before submission",
          "For e-mutation: create account and follow online process",
          "Keep a copy of submitted application",
        ],
      },
      {
        stepId: "mutation-step-3",
        title: "Submit and Pay Fees",
        instruction:
          "Submit the application with all documents to AC Land office. Pay the required fees: court fee stamp (BDT 100-500), and any other applicable fees. Get acknowledgement receipt with application number and tentative hearing date.",
        documents: [
          "Completed application with all attachments",
          "Court fee stamp",
          "All original documents for verification",
        ],
        office: "AC Land office (Upazila Land Office)",
        estimatedTime: "1 day for submission",
        cost: "Court fee: BDT 100-500 | Other fees vary by area",
        warningNote:
          "Get an acknowledgement receipt with date and application number. This is your proof of submission.",
        nextStepHint: "Next: Public notice period and hearing.",
        tips: [
          "Submit in person if possible",
          "Get receipt signed and stamped by receiving officer",
          "Note down the tentative hearing date",
        ],
      },
      {
        stepId: "mutation-step-4",
        title: "Public Notice and Hearing",
        instruction:
          "AC Land office issues a public notice (Jachcha) in the local area and newspaper allowing 15-30 days for any objections. Neighbours or other claimants can file objections. On hearing date, if no valid objection: mutation proceeds. If objection filed: AC Land conducts inquiry and decides.",
        documents: [
          "Acknowledgement receipt",
          "Any objection received (if applicable)",
          "Evidence to counter objection (if applicable)",
        ],
        office: "AC Land office | Local notice board area",
        estimatedTime: "15-30 days for notice period | 1-7 days for hearing",
        cost: "No additional cost usually",
        warningNote:
          "If valid objection is raised (e.g., someone claims co-ownership), the process may be delayed or require court order. Be prepared with all your title documents.",
        nextStepHint: "Next: Mutation order and new Khatian.",
        tips: [
          "Visit the land office periodically to check for objections",
          "Be present on the hearing date",
          "Carry all original documents to the hearing",
        ],
      },
      {
        stepId: "mutation-step-5",
        title: "Receive Mutation Khatian",
        instruction:
          "After successful hearing with no valid objection, AC Land issues mutation order. New Khatian is prepared showing your name as owner. Collect certified copy of new Khatian. Update land tax (khajna) payment record in your name.",
        documents: [
          "Mutation order",
          "New Mutation Khatian (get certified copies)",
          "Previous Khatian (returned)",
        ],
        office: "AC Land office | Union Parishad / Municipality (for khajna update)",
        estimatedTime: "7-30 days after hearing",
        cost: "Certified copy: BDT 100-200",
        warningNote:
          "Keep the new Mutation Khatian safe — this is your primary ownership proof along with the deed.",
        nextStepHint: "✅ Mutation complete. Pay annual khajna to maintain record.",
        tips: [
          "Get 2-3 certified copies of new Khatian",
          "Update khajna record immediately",
          "Keep mutation order with your deed",
        ],
      },
    ],
    finalNote:
      "✅ Mutation complete. Your name is now recorded as owner in government records.\n\n**Important:**\n• Pay annual khajna (land tax) to maintain record\n• Keep Mutation Khatian with your deed permanently\n• Mutation without registered deed can be challenged in court\n\n📄 Full mutation document pack — NLC can assist.",
    escalate: false,
    relatedScenarios: ["property-purchase", "property-inheritance"],
  },

  // ══════════════════════════════════════════════════════════
  // 8. FLAT/APARTMENT PURCHASE
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "flat-purchase",
    area: "property",
    title: "Flat/Apartment Purchase Process",
    titleBn: "ফ্ল্যাট/অ্যাপার্টমেন্ট ক্রয় প্রক্রিয়া",
    description: "Step-by-step guide for buying an apartment from a real estate developer in Bangladesh",
    triggerPhrases: [
      "buy flat steps",
      "apartment purchase process",
      "how to buy flat",
      "flat buying guide",
      "developer flat purchase",
      "real estate purchase",
    ],
    triggerPhrasesBn: [
      "ফ্ল্যাট কেনার ধাপ",
      "অ্যাপার্টমেন্ট কিনতে চাই",
      "ফ্ল্যাট ক্রয়",
    ],
    totalSteps: 6,
    prerequisites: [
      "Budget for flat + registration costs",
      "Research on developer reputation",
    ],
    steps: [
      {
        stepId: "flat-buy-step-1",
        title: "Developer Due Diligence",
        instruction:
          "Before paying any money, verify the developer: Check RAJUK approval for the building plan, verify developer's land ownership, check if developer is registered with REHAB/RERA, search for any complaints or cases against developer, visit their previous projects.",
        documents: [
          "Developer's trade licence",
          "RAJUK approved building plan",
          "Developer's land ownership documents",
          "REHAB membership status",
        ],
        office: "RAJUK office | REHAB | Court records (for cases)",
        estimatedTime: "1-2 weeks",
        cost: "No cost for verification",
        warningNote:
          "Many buyers lose money to fraudulent developers. Never pay based on brochure alone — verify all documents.",
        nextStepHint: "Next: Verify flat-specific documents.",
        tips: [
          "Visit developer's previous projects",
          "Talk to existing buyers in the project",
          "Check online reviews and complaints",
        ],
      },
      {
        stepId: "flat-buy-step-2",
        title: "Flat-Specific Verification",
        instruction:
          "For the specific flat: Verify it's not already sold to someone else, check there's no bank mortgage on the flat, verify the flat size matches what's advertised, check floor plan approval, confirm utility connections are available.",
        documents: [
          "Flat booking list (to confirm availability)",
          "Floor plan for the specific flat",
          "Encumbrance status",
          "Utility connection status",
        ],
        office: "Developer's office | RAJUK | Banks (for mortgage check)",
        estimatedTime: "3-5 days",
        cost: "No cost",
        warningNote:
          "Get written confirmation of flat availability from developer with signature and seal.",
        nextStepHint: "Next: Review and sign the sale agreement.",
        tips: [
          "Take measurements of the flat if possible",
          "Verify carpet area vs super area",
          "Check for any hidden charges",
        ],
      },
      {
        stepId: "flat-buy-step-3",
        title: "Sign Sale Agreement and Pay Advance",
        instruction:
          "Review the sale agreement carefully. Key clauses to check: possession date, penalty for delay, payment schedule, specifications of flat (size, materials, fittings), common area usage, parking space. Pay booking money (typically 10-20%) via cheque/bank transfer.",
        documents: [
          "Sale agreement (read thoroughly)",
          "Payment receipt for advance",
          "Developer's undertaking/commitment letter",
        ],
        office: "Developer's office",
        estimatedTime: "1-3 days for review and signing",
        cost: "Booking amount: 10-20% of flat price",
        warningNote:
          "Ensure agreement has specific penalty clause for delayed handover. Without this, you have limited remedy if developer delays for years.",
        nextStepHint: "Next: Make installment payments as per schedule.",
        tips: [
          "Have a lawyer review the agreement if possible",
          "Ensure all verbal promises are written in agreement",
          "Pay only by cheque or bank transfer",
          "Get signed copy of agreement immediately",
        ],
      },
      {
        stepId: "flat-buy-step-4",
        title: "Make Installment Payments",
        instruction:
          "Pay installments as per the agreed schedule (usually linked to construction milestones). Keep all payment receipts. Visit construction site periodically to verify progress matches payment schedule.",
        documents: [
          "All payment receipts",
          "Construction progress photographs",
          "Payment schedule from agreement",
        ],
        office: "Developer's office | Construction site",
        estimatedTime: "6-36 months (depending on project)",
        cost: "As per payment schedule",
        warningNote:
          "Link your payments to construction milestones. If construction stops, stop payments until resolved.",
        nextStepHint: "Next: Flat handover and final payment.",
        tips: [
          "Visit site at least monthly",
          "Take dated photographs of construction progress",
          "Keep a log of all payments with dates",
        ],
      },
      {
        stepId: "flat-buy-step-5",
        title: "Flat Handover and Final Payment",
        instruction:
          "Before taking possession: inspect flat thoroughly for defects, verify specifications match agreement, check all fittings and fixtures, test utilities (water, electricity, gas). Note any defects in writing and get developer to acknowledge. Make final payment only after satisfactory inspection.",
        documents: [
          "Handover checklist",
          "Defect list (if any)",
          "All previous payment receipts",
          "Final payment receipt",
        ],
        office: "Developer's office | Flat",
        estimatedTime: "1-3 days for inspection and handover",
        cost: "Final payment (remaining 10-20%)",
        warningNote:
          "Don't pay final amount if major defects exist. Get written commitment from developer to fix defects with timeline.",
        nextStepHint: "Next: Property registration and mutation.",
        tips: [
          "Hire an engineer for professional inspection",
          "Test all switches, taps, and fixtures",
          "Check wall finish, flooring, doors, windows",
          "Get keys and all warranties/manuals",
        ],
      },
      {
        stepId: "flat-buy-step-6",
        title: "Registration and Mutation",
        instruction:
          "Register the sale deed at Sub-Registry office (similar to land purchase). Pay stamp duty, registration fee, AIT, local taxes (typically 5-8% of deed value). After registration, apply for mutation of your flat at AC Land office. Also apply for holding number from City Corporation.",
        documents: [
          "Sale deed",
          "All previous payment receipts",
          "Mutation documents",
          "NID and TIN",
          "Developer's documents",
        ],
        office: "Sub-Registry office | AC Land office | City Corporation",
        estimatedTime: "Registration: 1 day | Mutation: 30-90 days",
        cost: "Registration costs: 5-8% of deed value",
        warningNote:
          "Without registration and mutation, your legal ownership is not complete. Prioritize this step.",
        nextStepHint: "✅ Flat purchase complete. Pay annual property tax.",
        tips: [
          "Use the same process as land registration",
          "Get holding number immediately after mutation",
          "Keep all documents in a safe deposit box",
        ],
      },
    ],
    finalNote:
      "✅ Flat purchase complete.\n\n**Post-purchase:**\n• Join the building's owners' association/management committee\n• Pay monthly maintenance charges\n• Pay annual property tax\n• Keep all warranties for appliances and fittings\n\n📄 Complete flat purchase checklist — NLC can assist.",
    escalate: false,
    relatedScenarios: ["property-purchase"],
  },

  // ══════════════════════════════════════════════════════════
  // 9. INHERITANCE & SUCCESSION CERTIFICATE
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "property-inheritance",
    area: "property",
    title: "Inheritance & Succession Certificate",
    titleBn: "উত্তরাধিকার ও উত্তরাধিকার সনদেশ প্রক্রিয়া",
    description: "Process for claiming inheritance and obtaining Succession Certificate for movable assets",
    triggerPhrases: [
      "inheritance process",
      "succession certificate",
      "claim inheritance",
      "after death property",
      "heir certificate",
      "probate process",
    ],
    triggerPhrasesBn: [
      "উত্তরাধিকার প্রক্রিয়া",
      "উত্তরাধিকার সনদেশ",
      "মৃত্যুর পর সম্পত্তি",
      "ওয়ারিশ সনদেশ",
    ],
    totalSteps: 5,
    prerequisites: [
      "Death certificate of deceased",
      "Knowledge of all legal heirs",
      "Information about deceased's assets",
    ],
    steps: [
      {
        stepId: "inherit-step-1",
        title: "Obtain Death Certificate",
        instruction:
          "Get death certificate from local government authority (City Corporation/Municipality/Union Parishad) where the death occurred. If death was in hospital, hospital may issue certificate. This is the foundational document for all inheritance matters.",
        documents: [
          "Hospital death certificate (if applicable)",
          "Identity of deceased (NID)",
          "Information about date/time/place of death",
          "Informant's NID",
        ],
        office: "City Corporation / Municipality / Union Parishad",
        estimatedTime: "1-7 days",
        cost: "BDT 100-500",
        warningNote:
          "Without death certificate, no inheritance process can begin. Get multiple certified copies.",
        nextStepHint: "Next: Prepare list of legal heirs with relationship proof.",
        tips: [
          "Get 5-10 certified copies",
          "Verify all details on certificate are correct",
        ],
      },
      {
        stepId: "inherit-step-2",
        title: "Prepare Heir List and Relationship Proof",
        instruction:
          "Prepare comprehensive list of all legal heirs: spouse, children, parents, grandchildren (if child predeceased). For each heir: collect relationship proof (birth certificate, marriage certificate, NID showing parentage). Calculate shares according to Muslim personal law (if Muslim) or applicable personal law.",
        documents: [
          "Death certificate of deceased",
          "Birth certificates of all children",
          "Marriage certificate of deceased couple",
          "NIDs of all heirs (showing relationship)",
          "Death certificates of any predeceased children",
          "Family tree document",
        ],
        office: "Your records | Registrar of Births and Deaths",
        estimatedTime: "1-2 weeks to collect all documents",
        cost: "Certified copies: BDT 100-200 each",
        warningNote:
          "Missing even one heir can invalidate the entire distribution. Be thorough in identifying all legal heirs.",
        nextStepHint: "Next: Apply for Succession Certificate for movable assets.",
        tips: [
          "Create a family tree diagram",
          "Get extra certified copies of all documents",
          "For complex family situations, consult a lawyer",
        ],
      },
      {
        stepId: "inherit-step-3",
        title: "Apply for Succession Certificate",
        instruction:
          "File petition in District Judge Court for Succession Certificate. This is required to access deceased's movable assets: bank accounts, fixed deposits, shares, vehicles, etc. Petition must list all heirs, their shares, and all assets of deceased.",
        documents: [
          "Petition for Succession Certificate",
          "Death certificate",
          "All heir documents from Step 2",
          "List of deceased's assets (bank accounts, FDs, shares, etc.)",
          "Affidavit",
          "Court fee stamps",
        ],
        office: "District Judge Court",
        estimatedTime: "Filing: 1 day | Court process: 3-6 months",
        cost: "Court fee: Based on asset value (typically BDT 500-5,000) | Lawyer fee: BDT 5,000-20,000",
        warningNote:
          "Succession Certificate is only for movable assets. For immovable property (land), separate mutation process is required.",
        nextStepHint: "Next: Court hearing and certificate issuance.",
        tips: [
          "List ALL assets even if you don't know exact amounts",
          "All heirs must be made parties to the petition",
          "Newspaper notice may be required in some cases",
        ],
      },
      {
        stepId: "inherit-step-4",
        title: "Court Hearing and Certificate Issuance",
        instruction:
          "Court issues notice to all parties. On hearing date, if no objection: court issues Succession Certificate. If objection raised: court conducts inquiry and decides. Once issued, this certificate authorizes the certificate holders to access and distribute movable assets.",
        documents: [
          "All documents from Step 3",
          "Identity of all heirs appearing in court",
        ],
        office: "District Judge Court",
        estimatedTime: "1-3 months for hearing and issuance",
        cost: "No additional cost",
        warningNote:
          "If there's dispute among heirs, the process can take years. Consider family settlement (Raji Naama) as alternative.",
        nextStepHint: "Next: Access assets and complete distribution.",
        tips: [
          "All heirs should attend the hearing",
          "If compromise possible, inform court for faster process",
          "Get multiple certified copies of the certificate",
        ],
      },
      {
        stepId: "inherit-step-5",
        title: "Asset Access and Distribution",
        instruction:
          "With Succession Certificate: approach each institution (banks, share registrars, vehicle authorities) to transfer or access assets. For banks: submit certificate to unfreeze accounts. For shares: submit to company/share registrar. For vehicles: submit to BRTA for ownership transfer.",
        documents: [
          "Certified copies of Succession Certificate",
          "Death certificate",
          "Heirs' NIDs",
          "Original asset documents (where available)",
          "Indemnity bond (required by some banks)",
        ],
        office: "Banks | Share registrars | BRTA | Other asset-holding institutions",
        estimatedTime: "2-4 weeks for all institutions",
        cost: "No direct cost | Some institutions may charge processing fees",
        warningNote:
          "Different institutions have different procedures. Some may require additional documents or court orders.",
        nextStepHint: "✅ Succession process complete. For land: file mutation separately.",
        tips: [
          "Apply to all institutions simultaneously",
          "Get written acknowledgment from each institution",
          "For disputed assets, may need separate court order",
        ],
      },
    ],
    finalNote:
      "✅ Succession Certificate process complete.\n\n**For Land/Property:**\nSeparate mutation process required — see 'Land Mutation' scenario.\n\n**Important Notes:**\n• Succession Certificate doesn't distribute assets — it only authorizes access\n• Family settlement deed (Raji Naama) is faster if all heirs agree\n• For complex disputes, file partition suit in Civil Court\n\n📄 Inheritance document pack — NLC can assist.",
    escalate: false,
    relatedScenarios: ["property-mutation", "property-purchase"],
  },

  // ══════════════════════════════════════════════════════════
  // 10. PARTNERSHIP FIRM RECONSTITUTION
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "partnership-reconstitution",
    area: "company",
    title: "Partnership Firm Reconstitution",
    titleBn: "অংশীদারিত্ব পুনর্গঠন",
    description: "Step-by-step guide to reconstitute a partnership firm after partner exit, entry, or death",
    triggerPhrases: [
      "reconstitute partnership",
      "partner leaving firm",
      "change partners rjsc",
      "partnership reconstitution",
      "partner exit firm",
      "partner died firm",
      "add partner firm",
    ],
    triggerPhrasesBn: [
      "অংশীদারিত্ব পুনর্গঠন",
      "পার্টনার পরিবর্তন",
    ],
    totalSteps: 5,
    prerequisites: [
      "Existing registered partnership deed",
      "Consent of all partners",
      "Settlement amount for exiting partner (if applicable)",
    ],
    steps: [
      {
        stepId: "recon-step-1",
        title: "Execute Reconstitution Deed",
        instruction:
          "Draft and execute a Deed of Reconstitution (also called Supplemental Deed) signed by all continuing partners and the retiring/incoming partner. The deed must specify: retiring partner's name and share, effective date of exit, settlement of capital, new profit/loss ratio among continuing partners, and confirmation that firm continues.",
        documents: [
          "Existing registered partnership deed",
          "Deed of Reconstitution (new)",
          "Capital settlement agreement",
          "NIDs of all partners",
          "Resignation letter from retiring partner (if voluntary)",
        ],
        office: "Signed at lawyer's office | Notarised",
        estimatedTime: "1–3 days to draft and execute",
        cost: "Lawyer/CA fee: BDT 5,000–20,000",
        warningNote:
          "The deed must be signed by the retiring partner — if they refuse to sign, legal action may be required before reconstitution can proceed.",
        nextStepHint: "Next: Hold Partners' Meeting and record minutes of reconstitution decision.",
        tips: [
          "Clearly specify the effective date",
          "Include all terms of capital settlement",
          "Get deed notarized for additional authenticity",
        ],
      },
      {
        stepId: "recon-step-2",
        title: "Partners' Meeting and Minutes",
        instruction:
          "Hold a formal Partners' Meeting. Pass resolution confirming: (1) retirement/entry of partner, (2) new profit/loss ratio, (3) authority of continuing Managing Partner, (4) bank signatory update. Record signed minutes.",
        documents: [
          "Minutes of Partners' Meeting",
          "Signatures of all continuing partners",
          "New profit/loss ratio table",
        ],
        office: "Firm's office / any agreed location",
        estimatedTime: "1 day",
        warningNote:
          "Minutes must be dated correctly — the reconstitution date in minutes must match the Deed of Reconstitution effective date.",
        nextStepHint: "Next: File reconstitution documents with RJSC.",
        tips: [
          "Use firm's letterhead for minutes",
          "All continuing partners must sign",
          "Keep minutes in firm's minute book",
        ],
      },
      {
        stepId: "recon-step-3",
        title: "File Amendment at RJSC",
        instruction:
          "File the Deed of Reconstitution and updated Form I at RJSC to amend the partnership registration. RJSC will update the certificate to reflect the new partner composition. Filing must be done within 90 days of reconstitution date.",
        documents: [
          "Form I (amended partnership application)",
          "Deed of Reconstitution (original + 2 copies)",
          "Partners' Meeting minutes",
          "Updated partner list with NID copies",
          "Current firm TIN",
          "Existing registration certificate (original)",
        ],
        office: "RJSC (Registrar of Joint Stock Companies, Dhaka or regional offices)",
        estimatedTime: "RJSC processing: 7–15 working days",
        cost: "RJSC amendment fee: BDT 1,000–3,000",
        warningNote:
          "If RJSC filing is delayed beyond 90 days: penalty applies. File even if late — an unfiled reconstitution leaves the retired partner on the legal record.",
        nextStepHint: "Next: Update bank signatories and notify regulatory authorities.",
        tips: [
          "File as soon as possible after deed execution",
          "Keep RJSC acknowledgment receipt",
          "Track status on roc.gov.bd",
        ],
      },
      {
        stepId: "recon-step-4",
        title: "Update Bank and Notify Authorities",
        instruction:
          "Update the firm's bank account signatories with the new partner composition: submit board resolution equivalent (Partners' Meeting minutes) + Deed of Reconstitution + new partner's NID to the bank. Also notify: NBR (tax office) by filing updated TIN form, and any other regulators (BIDA if registered, trade licence authority).",
        documents: [
          "Partners' Meeting minutes",
          "Deed of Reconstitution",
          "NID of new Managing Partner",
          "Updated TIN form",
          "RJSC amended certificate (once received)",
        ],
        office:
          "Bank branch | NBR Circle Tax Office | BIDA (if applicable) | City Corporation / Municipality (trade licence)",
        estimatedTime: "Bank update: 3–7 days | NBR: 7–15 days",
        cost: "No direct cost",
        warningNote:
          "Do not use old signatories after reconstitution — the retired partner can still operate the account until bank records are updated. Prioritise bank update.",
        nextStepHint: "Next: Complete capital settlement with the retiring partner.",
        tips: [
          "Visit bank in person with all original documents",
          "Update all utility connections if in firm's name",
          "Update trade licence if required",
        ],
      },
      {
        stepId: "recon-step-5",
        title: "Capital Settlement with Retiring Partner",
        instruction:
          "Pay the retiring partner their capital account balance + undistributed profit share as agreed in the Deed of Reconstitution. Payment via bank transfer. Get a No-Claim Certificate from the retiring partner confirming full settlement. File amended tax return if capital settlement changes firm's tax position.",
        documents: [
          "Capital account calculation",
          "Bank transfer receipt",
          "No-Claim Certificate from retiring partner",
          "Updated profit/loss ratio (for continuing partners' tax returns)",
        ],
        office: "Bank | Retiring partner | CA (for capital calculation)",
        estimatedTime: "As per deed agreement (typically 30–90 days)",
        cost: "Capital settlement amount as agreed",
        warningNote:
          "Without a written No-Claim Certificate — the retiring partner can later claim additional amounts. Always get it in writing and signed.",
        nextStepHint: "✅ Reconstitution complete. Firm continues with new partner composition.",
        tips: [
          "Calculate capital balance as of effective date",
          "Get No-Claim Certificate on stamped paper",
          "Keep all settlement documents permanently",
        ],
      },
    ],
    finalNote:
      "✅ Partnership reconstitution complete. Firm continues legally under new composition.\n\n**Post-reconstitution:**\n• File firm's next income tax return under new partner composition\n• Update all letterheads and documents\n• Ensure retiring partner's personal tax return excludes firm income from reconstitution date\n\n📄 Full reconstitution document drafting — NLC can assist.",
    escalate: true,
    escalateReason:
      "Partnership reconstitution involves legal drafting and RJSC filing. WhatsApp NLC for full document preparation.",
    relatedScenarios: ["company-pvt-registration"],
  },

  // ══════════════════════════════════════════════════════════
  // 11. ONE PERSON COMPANY (OPC) REGISTRATION
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "company-opc-registration",
    area: "company",
    title: "One Person Company (OPC) Registration",
    titleBn: "ওয়ান পার্সন কোম্পানি নিবন্ধন",
    description: "Step-by-step guide to register a One Person Company in Bangladesh",
    triggerPhrases: [
      "register opc",
      "one person company steps",
      "opc registration process",
      "single person company",
      "solo company registration",
    ],
    triggerPhrasesBn: [
      "ওপিসি নিবন্ধন",
      "একক ব্যক্তি কোম্পানি",
      "একাকী কোম্পানি",
    ],
    totalSteps: 5,
    prerequisites: [
      "Single Bangladeshi individual (not a company or foreign national)",
      "TIN and NID",
      "Registered office address in Bangladesh",
      "Name of nominee director",
    ],
    steps: [
      {
        stepId: "opc-step-1",
        title: "Name Clearance and Nominee Selection",
        instruction:
          "Apply for name clearance at roc.gov.bd with 3 name options (must include 'OPC' or indicate One Person Company). Simultaneously, select a nominee director who will take over if the sole member dies or becomes incapacitated. Obtain nominee's written consent.",
        documents: [
          "3 proposed OPC names",
          "Nominee director's NID and TIN",
          "Nominee's written consent letter",
          "Brief business description",
        ],
        office: "roc.gov.bd (online)",
        estimatedTime: "1-3 days",
        cost: "~BDT 200",
        warningNote:
          "OPC name should indicate it's a one-person company. The nominee cannot be a minor or a company.",
        nextStepHint: "Next: Draft MOA and AOA with OPC-specific clauses.",
        tips: [
          "Choose nominee you trust completely",
          "Get nominee's consent on stamped paper",
        ],
      },
      {
        stepId: "opc-step-2",
        title: "Draft OPC-Specific MOA and AOA",
        instruction:
          "Draft MOA and AOA with OPC-specific clauses: (1) Declaration that it's an OPC, (2) Nominee director details and circumstances of their appointment, (3) Restriction that OPC cannot add members, (4) Conversion clause (to Pvt Ltd if members added later).",
        documents: [
          "Cleared name",
          "MOA with OPC clauses",
          "AOA with OPC clauses",
          "Nominee consent letter",
          "Sole member's NID and TIN",
        ],
        office: "Lawyer/CA for drafting",
        estimatedTime: "2-3 days",
        cost: "BDT 5,000-15,000",
        warningNote:
          "Standard MOA/AOA templates may not have OPC clauses — ensure these are specifically included.",
        nextStepHint: "Next: Submit online application at RJSC.",
        tips: [
          "Clearly state OPC nature in MOA object clause",
          "Include detailed nominee provisions in AOA",
        ],
      },
      {
        stepId: "opc-step-3",
        title: "Online Submission at RJSC",
        instruction:
          "Submit incorporation application at roc.gov.bd. Forms required: Form I, Form VI, Form XII (with nominee details). Upload MOA, AOA, nominee consent, and all standard documents. Select OPC as company type in the portal.",
        documents: [
          "All standard incorporation documents",
          "OPC-specific MOA and AOA",
          "Nominee consent letter",
          "Nominee's NID and TIN",
          "Declaration of OPC nature",
        ],
        office: "roc.gov.bd",
        estimatedTime: "Submission: 1 day | Processing: 7-15 days",
        cost: "RJSC fee based on authorized capital",
        warningNote:
          "Ensure OPC type is correctly selected — wrong selection creates wrong company type.",
        nextStepHint: "Next: Pay fees and receive Certificate.",
        tips: [
          "Double-check OPC type selection",
          "Keep nominee details consistent across all documents",
        ],
      },
      {
        stepId: "opc-step-4",
        title: "Pay Fees and Receive Certificate",
        instruction:
          "Pay RJSC fees online (same fee structure as Pvt Ltd). Download Certificate of Incorporation once approved. The certificate will indicate it's a One Person Company.",
        documents: ["Payment receipt", "Certificate of Incorporation"],
        office: "roc.gov.bd",
        estimatedTime: "Payment: immediate | Certificate: 7-15 days",
        cost: "Same as Pvt Ltd",
        warningNote: "Verify 'OPC' designation on the certificate.",
        nextStepHint: "Next: Post-incorporation steps.",
        tips: [
          "Download multiple copies of certificate",
          "Verify all details carefully",
        ],
      },
      {
        stepId: "opc-step-5",
        title: "Post-Incorporation Setup",
        instruction:
          "Complete standard post-incorporation steps: TIN registration, trade licence, bank account, common seal. Additionally, maintain OPC register at registered office showing: sole member details, nominee details, and any changes. If sole member dies/disabled: nominee automatically becomes director.",
        documents: [
          "Certificate of Incorporation",
          "MOA/AOA",
          "All standard post-incorporation documents",
        ],
        office: "Standard offices (TIN, trade licence, bank)",
        estimatedTime: "7-30 days for all setup",
        cost: "Standard costs",
        warningNote:
          "OPC must convert to Pvt Ltd if you want to add members. Cannot continue as OPC after adding second person.",
        nextStepHint: "✅ OPC registered. Remember conversion requirement if expanding ownership.",
        tips: [
          "Maintain OPC register at registered office",
          "Inform nominee of their role and responsibilities",
          "Track OPC status carefully",
        ],
      },
    ],
    finalNote:
      "✅ OPC registration complete.\n\n**Key Restrictions:**\n• Cannot add new members (must convert to Pvt Ltd)\n• Cannot do banking business\n• Nominee takes over if member dies/disabled\n\n**Conversion:** If you later want partners, file conversion to Pvt Ltd.\n\n📄 OPC registration document pack — NLC can assist.",
    escalate: false,
    relatedScenarios: ["company-pvt-registration"],
  },

  // ══════════════════════════════════════════════════════════
  // 12. EVICTION SUIT PROCESS
  // ══════════════════════════════════════════════════════════
  {
    scenarioId: "property-eviction",
    area: "property",
    title: "Tenant Eviction Suit Process",
    titleBn: "ভাড়াটে উচ্ছাদন মামলা প্রক্রিয়া",
    description: "Step-by-step process for legally evicting a tenant under Rent Control Act",
    triggerPhrases: [
      "evict tenant steps",
      "eviction case process",
      "tenant eviction suit",
      "file eviction case",
      "rent control case",
      "remove tenant legally",
    ],
    triggerPhrasesBn: [
      "ভাড়াটে উচ্ছাদন",
      "ভাড়াটে বের করা",
      "ভাড়াটি মামলা",
    ],
    totalSteps: 5,
    prerequisites: [
      "Valid tenancy agreement",
      "Evidence of rent default or tenancy expiry",
      "Patience (process takes 1-3 years)",
    ],
    steps: [
      {
        stepId: "eviction-step-1",
        title: "Send Notice to Vacate",
        instruction:
          "Send a formal written notice to tenant demanding vacation of premises within 30 days (or as per agreement). For non-payment of rent: specify arrears and demand payment + vacation. For tenancy expiry: state that tenancy has ended. Send via registered post AD with acknowledgment.",
        documents: [
          "Notice to vacate (drafted by lawyer)",
          "Copy of tenancy agreement",
          "Rent arrears calculation (if applicable)",
          "Property documents",
        ],
        office: "Lawyer's office (drafting) | Post office (dispatch)",
        estimatedTime: "1-2 days",
        cost: "Lawyer fee: BDT 2,000-5,000",
        warningNote:
          "Do NOT cut utilities, change locks, or use force — these are criminal offences. Notice period is mandatory.",
        nextStepHint: "Next: If tenant doesn't comply, file eviction petition.",
        tips: [
          "Send notice via both AD post and courier",
          "Keep AD card return safe",
          "Notice period varies — check your agreement",
        ],
      },
      {
        stepId: "eviction-step-2",
        title: "File Eviction Petition",
        instruction:
          "If tenant doesn't vacate after notice period, file eviction petition in Rent Controller Court (for premises covered by Rent Control Act) or Civil Court (for non-covered premises). Grounds: non-payment of rent (2+ months arrears), tenancy expiry, sub-letting without permission, misuse of premises.",
        documents: [
          "Eviction petition",
          "Copy of notice to vacate with AD proof",
          "Tenancy agreement",
          "Rent receipts / arrears evidence",
          "Property ownership proof",
          "Affidavit",
          "Court fee stamps",
        ],
        office: "Rent Controller Court | Civil Court",
        estimatedTime: "1 day to file",
        cost: "Court fee: varies | Lawyer fee: BDT 10,000-30,000",
        warningNote:
          "For commercial premises in some areas, Rent Control Act may not apply — file in Civil Court instead.",
        nextStepHint: "Next: Court issues summons to tenant.",
        tips: [
          "Include all supporting documents",
          "Be specific about grounds for eviction",
          "Mention exact amount of rent arrears",
        ],
      },
      {
        stepId: "eviction-step-3",
        "title": "Tenant Receives Summons",
        instruction:
          "Court issues summons to tenant. Tenant has opportunity to file written statement opposing eviction. Tenant may claim: rent is not in arrears, landlord refused repairs, or other defences. Tenant may also file counter-claims.",
        documents: ["All documents from Step 2"],
        office: "Rent Controller Court | Civil Court",
        estimatedTime: "30-60 days for tenant to respond",
        cost: "No additional cost",
        warningNote:
          "If tenant files counter-claims, the case becomes more complex. Be prepared with evidence to counter their claims.",
        nextStepHint: "Next: Hearing and evidence presentation.",
        tips: [
          "Track case progress regularly",
          "Be present on all hearing dates",
          "Prepare witnesses if needed",
        ],
      },
      {
        stepId: "eviction-step-4",
        title: "Hearing and Evidence",
        instruction:
          "Both parties present evidence at hearings. Landlord proves: ownership, tenancy, default/expiry. Tenant may present defences. Rent Controller/Civil Judge evaluates evidence and may attempt mediation.",
        documents: [
          "All evidence documents",
          "Witness list",
          "Rent receipts/ledger",
          "Property documents",
        ],
        office: "Rent Controller Court | Civil Court",
        estimatedTime: "3-12 months for hearings to complete",
        cost: "Lawyer fees for hearings",
        warningNote:
          "Attend all hearings without fail. Absence delays case significantly.",
        nextStepHint: "Next: Judgment and execution.",
        tips: [
          "Bring original rent receipts/ledger",
          "Be prepared to answer judge's questions",
          "Dress formally for court appearances",
        ],
      },
      {
        stepId: "eviction-step-5",
        title: "Judgment and Execution",
        instruction:
          "If court rules in landlord's favor: eviction order issued. Tenant given time to vacate (usually 30-60 days). If tenant still doesn't leave: file execution petition. Court can order police assistance for physical eviction. Tenant's belongings removed under court supervision.",
        documents: [
          "Certified copy of eviction order",
          "Execution petition",
          "Police assistance request (if needed)",
        ],
        office: "Same court | Police station (for assistance)",
        estimatedTime: "Execution: 1-3 months",
        cost: "Execution fees | Police assistance (if applicable)",
        warningNote:
          "Even with court order, physical eviction must be done through proper channels. Using goondas or force is illegal.",
        nextStepHint: "✅ Eviction complete. Take possession of premises.",
        tips: [
          "Get certified copy of judgment immediately",
          "File execution petition promptly",
          "Coordinate with court-appointed officers for physical eviction",
        ],
      },
    ],
    finalNote:
      "✅ Eviction complete.\n\n**Important Reminders:**\n• Never use force or illegal methods to evict\n• Process takes 1-3 years — be patient\n• Consider settlement/mediation as alternative\n\n⚠️ Using goondas or forceful eviction is a criminal offence.\n\n📄 Eviction case document pack — NLC can assist.",
    escalate: true,
    escalateReason: "Eviction cases require experienced property lawyer. WhatsApp NLC for referral.",
    relatedScenarios: ["property-purchase"],
  },
];

// ─── Session State (in-memory per request — stateless) ─────────

export interface ScenarioSession {
  scenarioId: string;
  currentStepIndex: number;   // 0-indexed internally
}

// ─── Core Functions ────────────────────────────────────────────

/**
 * Try to match the user's message to a scenario.
 * Returns the matched scenario and step, or {matched: false}.
 */
export function matchScenario(
  message: string,
  session?: ScenarioSession
): ScenarioQueryResult {
  const msg = message.toLowerCase();

  // If an active session provided, continue that scenario
  if (session) {
    const scenario = SCENARIOS.find((s) => s.scenarioId === session.scenarioId);
    if (scenario) {
      return buildScenarioResult(scenario, session.currentStepIndex);
    }
  }

  // Otherwise try to match by trigger phrases
  for (const scenario of SCENARIOS) {
    // Check English trigger phrases
    const triggered = scenario.triggerPhrases.some(
      (phrase) => msg.includes(phrase)
    );
    if (triggered) {
      return buildScenarioResult(scenario, 0);
    }

    // Check Bengali trigger phrases
    if (scenario.triggerPhrasesBn) {
      const triggeredBn = scenario.triggerPhrasesBn.some(
        (phrase) => msg.includes(phrase)
      );
      if (triggeredBn) {
        return buildScenarioResult(scenario, 0);
      }
    }
  }

  // Also try area-based detection for "steps" or "process" requests
  const area = detectArea(message);
  const isProcessRequest =
    msg.includes("step") ||
    msg.includes("steps") ||
    msg.includes("process") ||
    msg.includes("procedure") ||
    msg.includes("how to") ||
    msg.includes("ধাপ") ||
    msg.includes("প্রক্রিয়া") ||
    msg.includes("গাইড") ||
    msg.includes("উপায");

  if (area && isProcessRequest) {
    const areaScenario = SCENARIOS.find((s) => s.area === area);
    if (areaScenario) {
      return buildScenarioResult(areaScenario, 0);
    }
  }

  return { matched: false };
}

/**
 * Advance to the next step in a scenario session.
 * Returns updated ScenarioResult or completion.
 */
export function nextStep(
  scenarioId: string,
  currentStepIndex: number
): ScenarioQueryResult {
  const scenario = SCENARIOS.find((s) => s.scenarioId === scenarioId);
  if (!scenario) return { matched: false };

  const nextIndex = currentStepIndex + 1;
  if (nextIndex >= scenario.steps.length) {
    // Already at final step — return completion
    return buildScenarioResult(scenario, scenario.steps.length - 1, true);
  }
  return buildScenarioResult(scenario, nextIndex);
}

/**
 * Go back to previous step.
 */
export function prevStep(
  scenarioId: string,
  currentStepIndex: number
): ScenarioQueryResult {
  const scenario = SCENARIOS.find((s) => s.scenarioId === scenarioId);
  if (!scenario) return { matched: false };
  const prevIndex = Math.max(0, currentStepIndex - 1);
  return buildScenarioResult(scenario, prevIndex);
}

/**
 * Jump directly to a specific step.
 */
export function goToStep(
  scenarioId: string,
  stepIndex: number
): ScenarioQueryResult {
  const scenario = SCENARIOS.find((s) => s.scenarioId === scenarioId);
  if (!scenario) return { matched: false };
  const clampedIndex = Math.max(0, Math.min(stepIndex, scenario.steps.length - 1));
  return buildScenarioResult(scenario, clampedIndex);
}

/**
 * Get all available scenario titles and IDs (for listing).
 */
export function listScenarios(): { scenarioId: string; title: string; area: LawArea; titleBn?: string }[] {
  return SCENARIOS.map((s) => ({
    scenarioId: s.scenarioId,
    title: s.title,
    titleBn: s.titleBn,
    area: s.area,
  }));
}

/**
 * Get scenarios by area.
 */
export function getScenariosByArea(area: LawArea): Scenario[] {
  return SCENARIOS.filter((s) => s.area === area);
}

/**
 * Get a specific scenario by ID.
 */
export function getScenarioById(scenarioId: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.scenarioId === scenarioId);
}

// ─── Internal Builder ──────────────────────────────────────────

function buildScenarioResult(
  scenario: Scenario,
  stepIndex: number,
  forceComplete = false
): ScenarioResult {
  const step = scenario.steps[stepIndex];
  const isComplete = forceComplete || stepIndex === scenario.steps.length - 1;
  const stepNumber = stepIndex + 1;
  const progressPercent = Math.round((stepNumber / scenario.totalSteps) * 100);

  const summary = formatScenarioStep(scenario, step, stepNumber, isComplete);

  return {
    matched: true,
    scenario,
    currentStep: step,
    stepNumber,
    totalSteps: scenario.totalSteps,
    progressPercent,
    isComplete,
    summary,
  };
}

function formatScenarioStep(
  scenario: Scenario,
  step: ScenarioStep,
  stepNumber: number,
  isComplete: boolean
): string {
  const progress = `▶ Step ${stepNumber} of ${scenario.totalSteps}`;
  const progressBar = buildProgressBar(stepNumber, scenario.totalSteps);

  // Add Bengali title if available
  let titleLine = `### ${scenario.title}`;
  if (scenario.titleBn) {
    titleLine += ` (${scenario.titleBn})`;
  }

  let out = `${titleLine}\n`;
  out += `${progressBar} ${progress}\n\n`;
  out += `## Step ${stepNumber}: ${step.title}\n\n`;
  out += `${step.instruction}\n`;

  if (step.documents && step.documents.length > 0) {
    out += `\n**Documents needed:**\n`;
    step.documents.forEach((doc) => { out += `• ${doc}\n`; });
  }

  if (step.office) {
    out += `\n**Where:** ${step.office}`;
  }

  if (step.estimatedTime) {
    out += `\n**Time:** ${step.estimatedTime}`;
  }

  if (step.cost) {
    out += `\n**Cost:** ${step.cost}`;
  }

  if (step.warningNote) {
    out += `\n\n⚠️ **Important:** ${step.warningNote}`;
  }

  if (step.tips && step.tips.length > 0) {
    out += `\n\n💡 **Tips:**\n`;
    step.tips.forEach((tip) => { out += `• ${tip}\n`; });
  }

  if (!isComplete && step.nextStepHint) {
    out += `\n\n_Reply **"next"** to continue to Step ${stepNumber + 1}._`;
  }

  if (isComplete) {
    out += `\n\n---\n${scenario.finalNote}`;
    if (scenario.escalate && scenario.escalateReason) {
      out += `\n\n⚠️ **Professional help recommended:** ${scenario.escalateReason}`;
    }
  }

  return out;
}

function buildProgressBar(current: number, total: number): string {
  const filled = Math.round((current / total) * 10);
  const empty = 10 - filled;
  return `[${"█".repeat(filled)}${"░".repeat(empty)}]`;
}

/**
 * Detect if a message is a "next step" command.
 */
export function isNextStepCommand(message: string): boolean {
  const msg = message.toLowerCase().trim();
  return (
    msg === "next" ||
    msg === "next step" ||
    msg === "continue" ||
    msg === "পরবর্তী" ||
    msg === "পরের ধাপ" ||
    msg.startsWith("next step") ||
    msg === "go on" ||
    msg === "ok next" ||
    msg === "proceed" ||
    msg === "চলুন" ||
    msg === "এগিয়ে চলুন"
  );
}

/**
 * Detect if a message is a "previous step" command.
 */
export function isPrevStepCommand(message: string): boolean {
  const msg = message.toLowerCase().trim();
  return (
    msg === "back" ||
    msg === "previous" ||
    msg === "previous step" ||
    msg === "আগের ধাপ" ||
    msg === "go back" ||
    msg === "পেছনে"
  );
}

/**
 * Detect if a message is a "list scenarios" command.
 */
export function isListScenariosCommand(message: string): boolean {
  const msg = message.toLowerCase().trim();
  return (
    msg === "list scenarios" ||
    msg === "show scenarios" ||
    msg === "what scenarios" ||
    msg === "available guides" ||
    msg === "সব স্কিনারিও" ||
    msg === "কি কি গাইড আছে"
  );
}

/**
 * Detect if a message is a "go to step" command.
 */
export function isGoToStepCommand(message: string): { isCommand: boolean; stepNumber?: number } {
  const msg = message.toLowerCase().trim();
  
  // Match patterns like "go to step 3", "jump to step 5", "ধাপ ৩ এ যান"
  const goToMatch = msg.match(/(?:go to|jump to|ধাপ)\s*(\d+)/);
  if (goToMatch) {
    return { isCommand: true, stepNumber: parseInt(goToMatch[1]) };
  }

  return { isCommand: false };
}