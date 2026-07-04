//  JesAI Knowledge Index — RAG Layer
// Returns KnowledgeResult which flows directly into ILRMFInput.knowledge

import type { LawArea, KnowledgeResult, KnowledgeBank, LegalRule, QAEntry } from "./types";
import { propertyData } from "./property";
import { criminalData } from "./criminal";
import { familyData } from "./family";
import { labourData } from "./labour";
import { companyData } from "./company";
import { taxData } from "./tax";
import { nrbData } from "./nrb";
import { constitutionalData } from "./constitutional";
import { contractData } from "./contract";

// ─── Area Metadata ──────────────────────────────────────────

const AREA_META: Record<string, { label: string; description: string }> = {
  property:       { label: "Land & Property",       description: "Deeds, mutation, khatian, possession disputes" },
  criminal:       { label: "Criminal Law",          description: "FIR, bail, penal code offences, cyber crime" },
  family:         { label: "Family Law",            description: "Marriage, divorce, custody, maintenance" },
  labour:         { label: "Labour & Employment",   description: "Termination, salary, gratuity, labour court" },
  company:        { label: "Company Law",           description: "RJSC registration, director duties, shares" },
  tax:            { label: "Tax Law",               description: "Income tax, VAT, NBR proceedings" },
  nrb:            { label: "NRB Investment",        description: "FC account, remittance, Sanchayapatra" },
  constitutional: { label: "Constitutional Law",    description: "Fundamental rights, writ, HCD" },
  consumer:       { label: "Consumer Rights",       description: "CPA 2009, defective goods, services" },
  cyber:          { label: "Cyber Law",             description: "ICT Act 2006, online fraud, data" },
  contract:       { label: "Contract Law",          description: "Agreements, breach, specific performance" },
};

// ─── Consolidated Banks ─────────────────────────────────────

const ALL_BANKS: KnowledgeBank[] = [
  propertyData,
  criminalData,
  familyData,
  labourData,
  companyData,
  taxData,
  nrbData,
  constitutionalData,
  contractData,
];

// ─── Dual-Language Area Detection ───────────────────────────

const AREA_KEYWORDS: Record<string, { en: string[]; bn: string[] }> = {
  property: {
    en: ["land", "property", "deed", "khatian", "mutation", "dag", "mouza", "possession", "boundary", "namjari", "purchase", "sale deed", "register", "encroached", "adverse possession"],
    bn: ["জমি", "সম্পত্তি", "দলিল", "খতিয়ান", "মিউটেশন", "দাগ", "মৌজা", "দখল", "সীমানা", "নামজারি", "ক্রয়", "বিক্রয় দলিল", "রেজিস্ট্রি", "ভোগদখল", "জব্দ", "দখলদারিকরণ"],
  },
  criminal: {
    en: ["fir", "police", "criminal", "murder", "theft", "fraud", "bail", "arrest", "penal code", "crpc", "cheque bounce", "dishonour", "case", "accused"],
    bn: ["এফআইআর", "পুলিশ", "ফৌজদারি", "হত্যা", "চুরি", "জালিয়াতি", "জামিন", "গ্রেফতার", "দণ্ডবিধি", "মামলা", "আসামি", "বাদী", "থানা", "জিডি", "চেক বাউন্স"],
  },
  family: {
    en: ["divorce", "marriage", "wife", "husband", "child custody", "maintenance", "mahr", "dower", "family court"],
    bn: ["তালাক", "বিবাহ", "স্ত্রী", "স্বামী", "সন্তান হেফাজত", "ভরণপোষণ", "মোহরানা", "দেনমোহর", "পারিবারিক আদালত"],
  },
  labour: {
    en: ["labour", "salary", "termination", "gratuity", "employee", "employer", "labour court", "overtime", "notice period", "fired"],
    bn: ["শ্রম", "বেতন", "বরখাস্ত", "গ্র্যাচুইটি", "কর্মী", "মালিক", "শ্রম আদালত", "ওভারটাইম", "নোটিশ", "ছাঁটাই", "চাকরি হারানো"],
  },
  company: {
    en: ["company", "rjsc", "director", "shareholder", "memorandum", "articles", "incorporation", "annual return", "share"],
    bn: ["কোম্পানি", "আরজেএসসি", "পরিচালক", "শেয়ারহোল্ডার", "মেমোরেন্ডাম", "আর্টিকেল", "নিবন্ধন", "বার্ষিক প্রতিবেদন", "শেয়ার"],
  },
  tax: {
    en: ["tax", "tin", "vat", "nbr", "income tax", "return", "assessment", "customs", "duty"],
    bn: ["কর", "টিআইএন", "ভ্যাট", "এনবিআর", "আয়কর", "রিটার্ন", "মূল্যায়ন", "কাস্টমস", "শুল্ক"],
  },
  nrb: {
    en: ["nrb", "expatriate", "remittance", "fc account", "foreign exchange", "sanchayapatra", "wage earner"],
    bn: ["এনআরবি", "প্রবাসী", "রেমিট্যান্স", "বৈদেশিক হিসাব", "সঞ্চয়পত্র", "বৈদেশিক বিনিময়", "মজুরি উপার্জনকারী"],
  },
  constitutional: {
    en: ["writ", "fundamental right", "constitution", "high court", "hcd", "supreme court", "article"],
    bn: ["রিট", "মৌলিক অধিকার", "সংবিধান", "হাইকোর্ট", "সুপ্রিম কোর্ট", "অনুচ্ছেদ"],
  },
  consumer: {
    en: ["consumer", "defective", "warranty", "refund", "cpa", "seller", "product quality"],
    bn: ["ভোক্তা", "ত্রুটিপূর্ণ", "ওয়ারেন্টি", "ফেরত", "বিক্রেতা", "পণ্যের মান"],
  },
  cyber: {
    en: ["cyber", "hack", "online fraud", "ict act", "digital", "facebook", "social media", "data theft"],
    bn: ["সাইবার", "হ্যাক", "অনলাইন জালিয়াতি", "আইসিটি আইন", "ডিজিটাল", "ফেসবুক", "সোশ্যাল মিডিয়া", "তথ্য চুরি"],
  },
  contract: {
    en: ["contract", "agreement", "breach", "specific performance", "damages", "void", "valid"],
    bn: ["চুক্তি", "চুক্তিভঙ্গ", "ক্ষতিপূরণ", "বাতিল", "অবৈধ", "বৈধ"],
  },
};

export function detectArea(message: string): LawArea | null {
  const msg = message.toLowerCase();
  let bestArea: LawArea | null = null;
  let bestCount = 0;

  for (const [area, keywords] of Object.entries(AREA_KEYWORDS)) {
    const count =
      keywords.en.filter((kw) => msg.includes(kw)).length +
      keywords.bn.filter((kw) => msg.includes(kw)).length;
    if (count > bestCount) {
      bestCount = count;
      bestArea = area as LawArea;
    }
  }

  return bestCount >= 1 ? bestArea : null;
}

// ─── Knowledge Query (RAG) ──────────────────────────────────

export function queryKnowledge(
  message: string,
  selectedArea: LawArea | null
): KnowledgeResult {
  const msg = message.toLowerCase();
  const searchArea = selectedArea ?? detectArea(message);

  if (!searchArea) {
    return { matched: false, area: null, qaEntry: null, rules: [], escalate: false, confidence: "low" };
  }

  const bank = ALL_BANKS.find((b) => b.area === searchArea);
  if (!bank) {
    return { matched: false, area: searchArea, qaEntry: null, rules: [], escalate: false, confidence: "low" };
  }

  let bestEntry: QAEntry | null = null;
  let bestScore = 0;

  for (const entry of bank.qaBank) {
    const matchCount = entry.triggerKeywords.filter((kw) =>
      msg.includes(kw.toLowerCase())
    ).length;
    const score = entry.triggerKeywords.length > 0
      ? matchCount / entry.triggerKeywords.length
      : 0;
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (!bestEntry || bestScore < 0.15) {
    return { matched: false, area: searchArea, qaEntry: null, rules: [], escalate: false, confidence: "low" };
  }

  const relatedRules: LegalRule[] = bestEntry.relatedRules
    .map((rid) => bank.rules.find((r) => r.id === rid))
    .filter((r): r is LegalRule => r !== undefined);

  return {
    matched: true,
    area: searchArea,
    qaEntry: bestEntry,
    rules: relatedRules,
    escalate: bestEntry.escalate,
    escalateReason: bestEntry.escalateReason,
    confidence: bestScore >= 0.5 ? "high" : bestScore >= 0.25 ? "medium" : "low",
  };
}

// ─── Exports ────────────────────────────────────────────────

export function getActiveAreas() {
  return ALL_BANKS.map((b) => ({
    area: b.area,
    label: AREA_META[b.area]?.label ?? b.area,
    description: AREA_META[b.area]?.description ?? "",
  }));
}

export function formatIRACResponse(result: KnowledgeResult): string {
  if (!result.qaEntry) return "No matching legal information found.";
  const { irac } = result.qaEntry;
  return `**${irac.issue}**\n\n${irac.rule}\n\n${irac.application}\n\n${irac.conclusion}`;
}

export const formatResponse = formatIRACResponse;

export const TIER_PRICING: Record<string, { price: number; label: string }> = {
  property:       { price: 999,  label: "Full Property Guide" },
  criminal:       { price: 1299, label: "Full Criminal Defence Guide" },
  family:         { price: 899,  label: "Full Family Law Guide" },
  labour:         { price: 799,  label: "Full Labour Rights Guide" },
  company:        { price: 1499, label: "Full Company Law Guide" },
  tax:            { price: 999,  label: "Full Tax Compliance Guide" },
  nrb:            { price: 1299, label: "Full NRB Investment Guide" },
  constitutional: { price: 1499, label: "Full Constitutional Rights Guide" },
  consumer:       { price: 599,  label: "Full Consumer Rights Guide" },
  cyber:          { price: 999,  label: "Full Cyber Law Guide" },
  contract:       { price: 899,  label: "Full Contract Law Guide" },
  general:        { price: 999,  label: "Full Legal Guide" },
};