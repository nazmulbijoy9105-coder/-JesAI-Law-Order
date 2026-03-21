// ─── JesAI Knowledge Store — Master Router ───────────────────
// NLC validates all modules. Add new modules here as built.

import type { KnowledgeResult, LawArea, QAEntry } from "./types";
import nrbModule from "./nrb";
import propertyModule from "./property";
import criminalModule from "./criminal";
// Future modules — uncomment as built:
import taxModule from "./tax";
import companyModule from "./company";
import familyModule from "./family";
// import labourModule from "./labour";
// import contractModule from "./contract";
import constitutionalModule from "./constitutional";

const MODULES = [taxModule, companyModule, familyModule, constitutionalModule,taxModule, companyModule, familyModule, constitutionalModule,
  nrbModule,
  propertyModule,
  criminalModule,
];

export function detectArea(message: string): LawArea | null {
  const msg = message.toLowerCase();

  const areaKeywords: Record<LawArea, string[]> = {
    nrb: ["nrb", "non-resident", "nonresident", "usa partner", "foreign partner",
          "repatriate", "bida", "wht", "withholding", "dtaa", "fbar",
          "overseas", "abroad", "dollar", "usd", "nrb business", "foreign investment"],
    tax: ["tax", "vat", "nbr", "income tax", "return", "assessment", "challan", "tax return"],
    company: ["company", "rjsc", "incorporation", "pvt ltd", "limited company",
              "director", "shareholder", "memorandum", "articles", "corporate"],
    criminal: ["arrest", "fir", "police", "crime", "bail", "accused",
               "case filed", "charge", "sentence", "jail", "victim"],
    property: ["land", "property", "deed", "mutation", "khatian", "plot",
               "lease", "mortgage", "tenancy", "eviction", "registration",
               "sub-registrar", "ac land", "namajaari", "title", "boundary",
               "encroach", "inheritance", "heir", "partition", "flat", "apartment",
               "cheque bounce", "cheque", "baynama", "rajuk", "rehab", "builder",
               "loan default", "foreclosure", "artha rin", "khas", "char",
               "erosion", "shafi", "preemption", "forged deed", "adverse possession",
               "survey", "rs cs bs", "probate", "will", "succession"],
    family: ["divorce", "marriage", "talaq", "custody", "maintenance",
             "dower", "mehr", "separation", "spouse", "child support", "family court"],
    labour: ["job", "employment", "salary", "fired", "termination", "labour",
             "worker", "employee", "overtime", "gratuity", "provident fund", "resignation"],
    contract: ["contract", "agreement", "breach", "payment", "refund",
               "supplier", "buyer", "deal", "sign", "obligation", "default"],
    constitutional: ["constitution", "rights", "fundamental", "writ",
                     "high court", "supreme court", "article", "freedom", "liberty"],
    administrative: ["government", "authority", "licence", "permit",
                     "ministry", "department", "public servant", "official"],
    evidence: ["evidence", "proof", "witness", "document", "admissible", "statement"],
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
