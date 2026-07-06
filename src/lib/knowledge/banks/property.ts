//  JesAI Knowledge Bank — Land & Property Law
// Uses types from ./types directly (Option D — zero transformation).

import type { KnowledgeBank, LegalRule, QAEntry } from "../../shared/types";

const rules: LegalRule[] = [
  {
    id: "prop-r1",
    title: "Registration of Deeds",
    source: "Transfer of Property Act 1882, s.48",
    rule: "All documents transferring immovable property must be registered. An unregistered document cannot affect the property and cannot be received as evidence of any transaction affecting such property.",
    certainty: "confirmed",
  },
  {
    id: "prop-r2",
    title: "Limitation for Property Suits",
    source: "Limitation Act 1908, Art.65 & Sch.III",
    rule: "A suit for possession of immovable property based on title must be filed within 12 years from the date the right to sue accrues.",
    certainty: "confirmed",
  },
  {
    id: "prop-r3",
    title: "Adverse Possession",
    source: "Limitation Act 1908, Art.65; Supreme Court precedent",
    rule: "If a person possesses immovable property openly and continuously for 12 years without the owner's permission, they may acquire title through adverse possession. However, this is highly fact-dependent and courts scrutinize claims strictly.",
    certainty: "arguable",
  },
  {
    id: "prop-r4",
    title: "Easement Rights",
    source: "Easement Act 1882, s.2 & s.15",
    rule: "An easement is a right which the owner or occupier of certain land possesses for the beneficial enjoyment of that land. It includes right of way, right to light, etc.",
    certainty: "confirmed",
  },
    relatedRules: ["prop-r1", "prop-r2"],
    escalate: true,
    escalateReason: "Family property disputes involving father-son conflicts require careful legal assessment under personal law. Immediate consultation recommended.",
  }

];

const qaBank: QAEntry[] = [
  {
    id: "prop-qa1",
    question: "I bought land but the seller did not register the deed. What are my rights?",
    area: "property",
    jurisdiction: "BD",
    triggerKeywords: [
      "bought land", "seller", "not register", "unregistered deed",
      "property", "deed", "registration", "transfer",
    ],
    irac: {
      issue: "Validity and legal standing of an unregistered sale deed for immovable property.",
      rule: "Under the Transfer of Property Act 1882, Section 48, all documents transferring immovable property must be registered. An unregistered document cannot affect the property and cannot be received as evidence of any transaction affecting such property (Section 49).",
      application: "Since your sale deed was not registered, it does not legally transfer ownership from the seller to you. You cannot use this unregistered deed as evidence in court to claim ownership. The seller still holds the legal title in government records. However, you may have a claim to recover the purchase money paid to the seller based on the agreement to sell.",
      conclusion: "Your unregistered deed does not give you legal ownership. You should: (1) Request the seller to execute a registered deed immediately. (2) If the seller refuses, file a suit for specific performance to compel registration. (3) If the property was already sold to a third party with a registered deed, your position is significantly weaker — consult an advocate immediately.",
    },
    relatedRules: ["prop-r1"],
    escalate: true,
    escalateReason: "Unregistered property transactions are high-risk. Immediate legal consultation required to prevent loss of investment.",
  },
  {
    id: "prop-qa2",
    question: "My neighbor has encroached on my land for 15 years. Can I evict them?",
    area: "property",
    jurisdiction: "BD",
    triggerKeywords: [
      "encroached", "neighbor", "evict", "boundary", "possession",
      "land", "years", "adverse possession",
    ],
    irac: {
      issue: "Whether a 15-year encroachment extinguishes the owner's right to recover possession through adverse possession.",
      rule: "Under Article 65 of the Limitation Act 1908, the limitation period for a suit for possession of immovable property based on title is 12 years. If the true owner does not file a suit within 12 years of the dispossession, their right to recover may be barred. However, the burden of proving adverse possession is strictly on the claimant.",
      application: "The encroacher has been in possession for 15 years, which exceeds the 12-year limitation period. If the encroacher can prove their possession was: (a) hostile/adverse (not with permission), (b) open and notorious, (c) continuous and uninterrupted for the full 12 years — they may have a valid adverse possession claim. However, courts in Bangladesh apply this doctrine strictly.",
      conclusion: "You may face an adverse possession defense if you file a standard eviction suit. (1) Consult an advocate immediately — this is time-sensitive. (2) Gather evidence that the possession was NOT adverse (e.g., you gave permission, or you protested within the 12-year period). (3) Check if there are any recent GD entries or written protests you made. (4) File a declarative suit if the encroacher has not yet obtained mutation in their name.",
    },
    relatedRules: ["prop-r2", "prop-r3"],
    escalate: true,
    escalateReason: "Adverse possession cases are complex and fact-heavy. A 15-year encroachment requires immediate legal assessment.",
  },
  {
    id: "prop-qa3",
    question: "How do I check if a property has valid title before buying?",
    area: "property",
    jurisdiction: "BD",
    triggerKeywords: [
      "check title", "verify title", "before buying", "property search",
      "khatian", "mutation", "due diligence", "buy land",
    ],
    irac: {
      issue: "Process and documents required for title verification before purchasing immovable property in Bangladesh.",
      rule: "Title verification requires examining the chain of ownership through government records: CS/SA/RS Khatians (survey records), current Mutation Khatian, Bain Kabala (certified copy of the last registered deed), and Non-Encumbrance Certificate (NEC) from the Sub-Registry office.",
      application: "Before paying any advance, you must verify: (1) The seller's name appears in the latest Mutation Khatian. (2) The Bain Kabala chain is unbroken for at least the last 30 years. (3) NEC from the Sub-Registry shows no mortgage, lien, or court injunction. (4) The physical possession matches the Khatian boundaries (Dag numbers). (5) No pending litigation involving the property.",
      conclusion: "Title verification steps: (1) Obtain CS, SA, and RS Khatians for the property. (2) Get certified copy of the current seller's deed (Bain Kabala). (3) Apply for NEC from Sub-Registry. (4) Visit the property and verify boundaries with local survey. (5) Search court records for any pending cases. (6) Only after ALL checks clear, proceed with Sale Agreement (Baina Nama) and advance payment.",
    },
    relatedRules: ["prop-r1", "prop-r4"],
    escalate: false,
  },
,
  {
    id: "prop-qa-son-father",
    question: "Son needs legal information against father property",
    area: "property",
    jurisdiction: "BD",
    triggerKeywords: [
      "son", "father", "property", "against", "inheritance", "share",
      "ancestral", "self-acquired", "paternal", "family property",
    ],
    irac: {
      issue: "A son's legal rights and remedies regarding his father's property in Bangladesh.",
      rule: "Under Bangladesh law, a son's rights differ based on: (1) whether the property is ancestral (inherited from paternal grandfather) or self-acquired by the father; (2) the family's personal law (Muslim, Hindu, or Christian). For ancestral property, sons generally have a birthright by coparcenary (Hindu) or inheritance share (Muslim). For self-acquired property, a father typically has testamentary freedom, but must provide maintenance to dependants and cannot completely disinherit minor children.",
      application: "If the property is ancestral, the son has a stronger claim to a definite share regardless of the father's wishes. If self-acquired, the father can gift or will it, but minor sons and unmarried daughters have maintenance rights. If the father is transferring property to deprive a son of his legal share, the son may challenge the transfer in court.",
      conclusion: "Your rights depend on: (1) Property type (ancestral vs self-acquired), (2) Your religion/personal law, (3) Your age and dependency status. Gather: Khatian records, mutation documents, any will or gift deed, and proof of your relationship. If the father is disposing of ancestral property without your consent, consult an advocate immediately to file for partition or injunction.",
    },
    relatedRules: ["prop-r1", "prop-r2"],
    escalate: true,
    escalateReason: "Family property disputes involving father-son conflicts require careful legal assessment under personal law. Immediate consultation recommended.",
  }];

export const propertyData: KnowledgeBank = {
  area: "property",
  rules,
  qaBank,
};