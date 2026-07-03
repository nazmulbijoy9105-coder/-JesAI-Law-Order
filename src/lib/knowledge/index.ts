//  JesAI Knowledge Store  Master Router
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
    nrb: [
      "nrb", "non-resident", "nonresident", "usa partner", "foreign partner",
      "repatriate", "bida", "wht", "withholding", "dtaa", "fbar",
      "overseas", "abroad", "dollar", "usd", "nrb business", "foreign investment",
      "\u09aa\u09cd\u09b0\u09ac\u09be\u09b8\u09c0", "\u09ac\u09bf\u09a6\u09c7\u09b6\u09c0",
      "\u09b0\u09bf\u09ae\u09bf\u099f\u09c7\u09a8\u09cd\u09b8",
    ],
    tax: [
      "tax", "vat", "nbr", "income tax", "return", "assessment", "challan", "tax return",
      "tin", "advance tax", "withholding", "ait", "mushak", "bin", "corporate tax",
      "\u0995\u09b0", "\u09ad\u09cd\u09af\u09be\u099f", "\u0986\u09af\u09bc\u0995\u09b0",
      "\u099f\u09bf\u098f\u0987\u098f\u09a8", "\u09ae\u09be\u09b8\u09c1\u0995",
      "\u09b8\u09be\u09b0\u09cd\u099a\u09be\u09b0\u09cd\u099c",
    ],
    company: [
      "company", "rjsc", "incorporation", "pvt ltd", "limited company",
      "director", "shareholder", "memorandum", "articles", "corporate",
      "\u0995\u09cb\u09ae\u09cd\u09aa\u09be\u09a8\u09c0", "\u09b0\u099c\u09bf\u09b8\u09cd\u099f\u09cd\u09b0\u09c7\u09b6\u09a8",
    ],
    criminal: [
      "arrest", "fir", "police", "crime", "bail", "accused",
      "case filed", "charge", "sentence", "jail", "victim",
      "\u0997\u09cd\u09b0\u09c7\u09ab\u09cd\u09a4\u09be\u09b0", "\u09ea\u09be\u09b0", "\u09aa\u09c1\u09b2\u09bf\u09b6",
      "\u099c\u09be\u09ae\u09bf\u09a8\u09be\u09a4", "\u099c\u09c7\u09b2",
    ],
    property: [
      "land", "property", "deed", "mutation", "khatian", "plot",
      "lease", "mortgage", "tenancy", "eviction", "registration",
      "sub-registrar", "ac land", "namjaari", "title", "boundary",
      "encroach", "inheritance", "heir", "partition", "flat", "apartment",
      "cheque bounce", "cheque", "baynama", "rajuk", "rehab", "builder",
      "loan default", "foreclosure", "artha rin", "khas", "char",
      "erosion", "shafi", "preemption", "forged deed", "adverse possession",
      "survey", "rs cs bs", "probate", "will", "succession",
      "\u099c\u09ae\u09bf", "\u09b8\u09ae\u09cd\u09aa\u09a4\u09cd\u09a4\u09bf", "\u09a6\u09b2\u09bf\u09b2",
      "\u09ae\u09c1\u09a4\u09be\u09af\u09bc\u09a8", "\u0996\u09a4\u09bf\u09af\u09bc\u09be\u09a8",
      "\u09ac\u09be\u09af\u09bc\u09a8\u09be\u09ae\u09be", "\u09ad\u09cb\u0997\u09be\u09a8\u09cd\u09a4\u09b0",
      "\u0989\u09a4\u09cd\u09a4\u09b0\u09be\u09a7\u09bf\u0995\u09be\u09b0", "\u09ad\u09be\u0997",
    ],
    family: [
      "divorce", "marriage", "talaq", "talak", "khola", "custody", "maintenance",
      "dower", "mehr", "separation", "spouse", "child support", "family court",
      "\u09a4\u09b2\u09be\u0995", "\u0996\u09cb\u09b2\u09be", "\u09ac\u09bf\u09ac\u09be\u09b9",
      "\u09af\u09c1\u09a4\u09bf\u09b8\u09cd\u09ac\u09be\u09b0", "\u09ae\u09cb\u09b9\u09b0\u09be\u09a8\u09be",
      "\u0997\u09cb\u09af\u09bc\u09c7\u09b0 \u09b9\u0995\u09bf\u0995", "\u0995\u09c1\u09b2",
    ],
    labour: [
      "job", "employment", "salary", "fired", "termination", "labour",
      "worker", "employee", "overtime", "gratuity", "provident fund", "resignation",
      "\u099a\u09be\u0995\u09b0\u09c0", "\u09ac\u09c7\u09a4\u09a8", "\u099b\u09c1\u099f\u09c7 \u09af\u09be\u0993\u09af\u09bc\u09be",
      "\u09b6\u09cd\u09b0\u09ae\u09bf\u0995", "\u0997\u09cd\u09b0\u09c7\u099a\u09c1\u0987\u099f\u09bf",
    ],
    contract: [
      "contract", "agreement", "breach", "payment", "refund",
      "supplier", "buyer", "deal", "sign", "obligation", "default",
      "\u099a\u09c1\u0995\u09cd\u09a4\u09bf", "\u099a\u09c1\u0995\u09cd\u09a4\u09bf\u09a8\u09be\u09ae\u09be",
      "\u09ad\u0999\u09cd\u0997\u09c1\u09b0", "\u09a6\u09c7\u09a8\u09be\u09a6\u09be\u09b0",
    ],
    constitutional: [
      "constitution", "rights", "fundamental", "writ",
      "high court", "supreme court", "article", "freedom", "liberty",
      "\u09b8\u0982\u09ac\u09bf\u09a7\u09be\u09a8", "\u0985\u09a7\u09bf\u0995\u09be\u09b0",
      "\u09b0\u09bf\u099f", "\u09b9\u09be\u0987\u0995\u09cb\u09b0\u09cd\u099f",
    ],
    administrative: [
      "government", "authority", "licence", "permit",
      "ministry", "department", "public servant", "official",
      "\u09b8\u09b0\u0995\u09be\u09b0", "\u09b2\u09be\u0987\u09b8\u09c7\u09a8\u09cd\u09b8",
    ],
    evidence: [
      "evidence", "proof", "witness", "document", "admissible", "statement",
      "\u09aa\u09cd\u09b0\u09ae\u09be\u09a3", "\u09b8\u09be\u0995\u09cd\u09b7\u09cd\u09af",
    ],
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

  for (const mod of MODULES) {
    const entries = area
      ? mod.qaBank.filter((e) => e.area === area || e.area === "general")
      : mod.qaBank;

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

  let response = `${irac.issue}

`;
  response += `**What the law says**
${irac.rule}

`;
  response += `**How this applies**
${irac.application}

`;
  response += `**What you should do**
${irac.conclusion}`;

  if (escalate && escalateReason) {
    response += `

 **Professional Help Required**
${escalateReason}`;
  }

  if (result.rules.length > 0) {
    response += `

**Applicable Laws**
`;
    result.rules.slice(0, 3).forEach((r) => {
      response += ` ${r.title}  ${r.source}
`;
    });
  }

  return response;
}

export const formatResponse = formatIRACResponse;

export const TIER_PRICING: Record<string, { price: number; label: string }> = {
  property:       { price: 999,  label: "Property Law Full Guide" },
  criminal:       { price: 999,  label: "Criminal Law Full Guide" },
  family:         { price: 999,  label: "Family Law Full Guide"   },
  labour:         { price: 999,  label: "Labour Law Full Guide"   },
  contract:       { price: 999,  label: "Contract Law Full Guide" },
  company:        { price: 1999, label: "Company Law Full Guide"  },
  tax:            { price: 1999, label: "Tax Law Full Guide"      },
  nrb:            { price: 1999, label: "NRB Investment Guide"    },
  constitutional: { price: 999,  label: "Constitutional Law Guide"},
  general:        { price: 99,   label: "Legal Guide"             },
};
