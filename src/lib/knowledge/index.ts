// ─── JesAI Knowledge Store — Master Router ───────────────────
// NLC validates all modules. Add new modules here as built.

import type { KnowledgeResult, LawArea, QAEntry } from "./types";
import nrbModule from "./nrb";
import propertyModule from "./property";
import criminalModule from "./criminal";
import taxModule from "./tax";
import companyModule from "./company";
import familyModule from "./family";
import labourModule from "./labour";
import contractModule from "./contract";
import constitutionalModule from "./constitutional";

const MODULES = [
  constitutionalModule,
  criminalModule,
  propertyModule,
  familyModule,
  labourModule,
  contractModule,
  companyModule,
  taxModule,
  nrbModule,
];

export function detectArea(message: string): LawArea | null {
  const msg = message.toLowerCase();

  const areaKeywords: Record<LawArea, string[]> = {
    nrb: ["nrb", "non-resident", "nonresident", "usa partner", "foreign partner",
          "repatriate", "bida", "wht", "withholding", "dtaa", "fbar",
          "overseas", "abroad", "dollar", "usd", "nrb business", "foreign investment",
          // Bengali
          "প্রবাসী", "বিদেশি বিনিয়োগ", "রেমিট্যান্স", "বিদেশ", "ডলার", "প্রত্যাবাসন"],
    tax: ["tax", "vat", "nbr", "income tax", "return", "assessment", "challan", "tax return",
          "tin", "advance tax", "withholding", "ait", "mushak", "bin", "corporate tax",
          // Bengali
          "কর", "ভ্যাট", "আয়কর", "রিটার্ন", "টিন", "এনবিআর", "উৎসে কর",
          "অগ্রিম কর", "ট্যাক্স", "মূসক", "শুল্ক", "করমুক্ত", "কর রেয়াত",
          "আয়কর আইন", "ভ্যাট নিবন্ধন", "করদাতা"],
    company: ["company", "rjsc", "incorporation", "pvt ltd", "limited company",
              "director", "shareholder", "memorandum", "articles", "corporate",
              // Bengali
              "কোম্পানি", "নিবন্ধন", "পরিচালক", "শেয়ার", "শেয়ারহোল্ডার",
              "কর্পোরেট", "ব্যবসা প্রতিষ্ঠান", "আরজেএসসি"],
    criminal: ["arrest", "fir", "police", "crime", "bail", "accused",
               "case filed", "charge", "sentence", "jail", "victim",
               // Bengali
               "গ্রেফতার", "এফআইআর", "পুলিশ", "অপরাধ", "জামিন", "আসামি",
               "মামলা", "রিমান্ড", "কারাগার", "ভিকটিম", "চার্জশিট",
               "ফৌজদারি", "দণ্ডবিধি", "সাজা", "জেল", "থানা", "ওসি"],
    property: ["land", "property", "deed", "mutation", "khatian", "plot",
               "lease", "mortgage", "tenancy", "eviction", "registration",
               "sub-registrar", "ac land", "namajaari", "title", "boundary",
               "encroach", "inheritance", "heir", "partition", "flat", "apartment",
               "cheque bounce", "cheque", "baynama", "rajuk", "rehab", "builder",
               "loan default", "foreclosure", "artha rin", "khas", "char",
               "erosion", "shafi", "preemption", "forged deed", "adverse possession",
               "survey", "rs cs bs", "probate", "will", "succession",
               // Bengali
               "জমি", "সম্পত্তি", "দলিল", "নামজারি", "খতিয়ান", "প্লট",
               "ইজারা", "বন্ধক", "উচ্ছেদ", "ভাড়া", "রেজিস্ট্রেশন",
               "উত্তরাধিকার", "ভাগ", "ফ্ল্যাট", "বায়নামা", "রাজউক",
               "জাল দলিল", "দখল", "সীমানা", "অর্থ ঋণ", "জরিপ",
               "দেওয়ানি", "ক্রয়", "বিক্রয়"],
    family: ["divorce", "marriage", "talaq", "custody", "maintenance",
             "dower", "mehr", "separation", "spouse", "child support", "family court",
             // Bengali
             "তালাক", "বিবাহ", "বিচ্ছেদ", "হেফাজত", "ভরণপোষণ",
             "দেনমোহর", "মোহর", "স্বামী", "স্ত্রী", "সন্তান",
             "পারিবারিক আদালত", "খোরপোশ", "বিবাহ বিচ্ছেদ",
             "নিকাহ", "নিকাহনামা", "বহুবিবাহ"],
    labour: ["job", "employment", "salary", "fired", "termination", "labour",
             "worker", "employee", "overtime", "gratuity", "provident fund", "resignation",
             // Bengali
             "চাকরি", "কর্মসংস্থান", "বেতন", "বরখাস্ত", "চাকরিচ্যুত",
             "শ্রমিক", "কর্মী", "ওভারটাইম", "গ্র্যাচুইটি", "প্রভিডেন্ট ফান্ড",
             "পদত্যাগ", "মাতৃত্বকালীন", "ছাঁটাই", "নোটিশ", "শ্রম আইন",
             "ছুটি", "বার্ষিক ছুটি", "শ্রমিক অধিকার", "নিয়োগকর্তা"],
    contract: ["contract", "agreement", "breach", "payment", "refund",
               "supplier", "buyer", "deal", "sign", "obligation", "default",
               // Bengali
               "চুক্তি", "চুক্তিভঙ্গ", "অগ্রিম", "অগ্রিম ফেরত",
               "জামিনদার", "গ্যারান্টার", "মৌখিক চুক্তি", "লিখিত চুক্তি",
               "স্ট্যাম্প", "চুক্তি বাতিল", "ক্ষতিপূরণ"],
    constitutional: ["constitution", "rights", "fundamental", "writ",
                     "high court", "supreme court", "article", "freedom", "liberty",
                     // Bengali
                     "সংবিধান", "মৌলিক অধিকার", "রিট", "হাইকোর্ট",
                     "সুপ্রিম কোর্ট", "স্বাধীনতা", "অধিকার লঙ্ঘন",
                     "হেবিয়াস কর্পাস", "আটক", "নাগরিক অধিকার"],
    administrative: ["government", "authority", "licence", "permit",
                     "ministry", "department", "public servant", "official",
                     // Bengali
                     "সরকার", "কর্তৃপক্ষ", "লাইসেন্স", "অনুমতি", "মন্ত্রণালয়"],
    evidence: ["evidence", "proof", "witness", "document", "admissible", "statement",
               // Bengali
               "সাক্ষ্য", "প্রমাণ", "সাক্ষী", "দলিলাদি"],
    general: [],
  };

  for (const [area, keywords] of Object.entries(areaKeywords)) {
    if (keywords.some((kw) => msg.includes(kw))) {
      return area as LawArea;
    }
  }

  return null;
}

function matchQA(message: string, area: LawArea | null): QAEntry | null {
  const msg = message.toLowerCase();
  let bestMatch: QAEntry | null = null;
  let bestScore = 0;

  for (const module of MODULES) {
    const entries = area
      ? module.qaBank.filter((e) => e.area === area || e.area === "general")
      : module.qaBank;

    for (const entry of entries) {
      const score = entry.triggerKeywords.filter((kw) =>
        msg.includes(kw.toLowerCase())
      ).length;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

export function queryKnowledge(
  message: string,
  lockedArea: LawArea | null = null
): KnowledgeResult {
  const area = lockedArea ?? detectArea(message);
  const qaEntry = matchQA(message, area);

  const rules = area
    ? MODULES.flatMap((m) =>
        m.rules.filter(
          (r) =>
            r.area === area &&
            (lockedArea ? true : r.tags.some((t) => message.toLowerCase().includes(t)))
        )
      ).slice(0, 5)
    : [];

  let confidence: "high" | "medium" | "low" = "low";
  if (qaEntry && area) confidence = "high";
  else if (qaEntry || area) confidence = "medium";

  return {
    matched: !!qaEntry,
    area,
    qaEntry,
    rules,
    escalate: qaEntry?.escalate ?? false,
    escalateReason: qaEntry?.escalateReason,
    confidence,
  };
}

export function getActiveAreas(): { area: LawArea; label: string; description: string }[] {
  return MODULES.map((m) => ({
    area: m.area,
    label: m.label,
    description: m.description,
  }));
}

export function formatIRACResponse(result: KnowledgeResult): string {
  if (!result.qaEntry) return "";
  const { irac, escalate, escalateReason } = result.qaEntry;

  let response = `${irac.issue}\n\n`;
  response += `**What the law says**\n${irac.rule}\n\n`;
  response += `**How this applies**\n${irac.application}\n\n`;
  response += `**What you should do**\n${irac.conclusion}`;

  if (escalate && escalateReason) {
    response += `\n\n⚠️ **Professional Help Required**\n${escalateReason}`;
  }

  if (result.rules.length > 0) {
    response += `\n\n**Applicable Laws**\n`;
    result.rules.slice(0, 3).forEach((r) => {
      response += `• ${r.title} — ${r.source}\n`;
    });
  }

  return response;
}

// Aliases for route.ts compatibility
export const formatResponse = formatIRACResponse;

export const TIER_PRICING: Record<string, { price: number; label: string }> = {
  property:       { price: 999,  label: "Property Law Full Guide" },
  criminal:       { price: 999,  label: "Criminal Law Full Guide" },
  family:         { price: 999,  label: "Family Law Full Guide"   },
  company:        { price: 1999, label: "Company Law Full Guide"  },
  tax:            { price: 1999, label: "Tax Law Full Guide"      },
  nrb:            { price: 1999, label: "NRB Investment Guide"    },
  constitutional: { price: 999,  label: "Constitutional Law Guide"},
  labour:         { price: 999,  label: "Labour Law Full Guide"   },
  general:        { price: 99,   label: "Legal Guide"             },
};
