// — JesAI Family Law Knowledge Module —
// Bangladesh Family Law — Muslim, Hindu, Christian, Adibashi
// NLC validated — Md Nazmul Islam, Advocate, SCB
// Structured for ILRMF v2.0 KnowledgeResult pipeline

import type { KnowledgeBank, LegalRule, QAEntry } from "../../shared/types";

// — Legal Rules —
const rules: LegalRule[] = [
  {
    id: "fam-talaq-001",
    title: "Talaq Procedure under MFLO 1961",
    rule: "Husband must send written notice to Chairman of Union Parishad immediately. Talaq becomes effective after 90 days. Without notice, it is a criminal offence under Section 7(2).",
    source: "Muslim Family Laws Ordinance 1961, Section 7",
    certainty: "confirmed",
  },
  {
    id: "fam-khul-001",
    title: "Wife's Right to Khul Divorce",
    rule: "A Muslim wife can obtain divorce by returning her mahr (Khul) or through court under Dissolution of Muslim Marriages Act 1939 on grounds like cruelty, desertion, or impotency.",
    source: "Dissolution of Muslim Marriages Act 1939, Section 2",
    certainty: "confirmed",
  },
  {
    id: "fam-denmahr-001",
    title: "Denmahr (Mahr) Enforcement",
    rule: "Denmahr is a legal debt enforceable as a civil contract. Prompt mahr is payable on demand; deferred mahr is payable on divorce or husband's death.",
    source: "Muslim Family Laws Ordinance 1961 / Contract Act 1872",
    certainty: "confirmed",
  },
  {
    id: "fam-custody-001",
    title: "Child Custody (Hizanat) under Muslim Law",
    rule: "Mother gets custody of sons until age 7 and daughters until puberty. Father is the natural guardian. Welfare of the child is the paramount consideration under Guardians and Wards Act 1890.",
    source: "Guardians and Wards Act 1890 / Muslim Personal Law",
    certainty: "confirmed",
  },
  {
    id: "fam-maintenance-001",
    title: "Wife's Maintenance (Nafaqa)",
    rule: "Wife is entitled to maintenance during marriage and iddat period (3 months after divorce). Family Court can fix amount and enforce via property attachment.",
    source: "Family Courts Ordinance 1985, Section 9",
    certainty: "confirmed",
  },
  {
    id: "fam-hindu-001",
    title: "Hindu Marriage and Divorce Status",
    rule: "No comprehensive Hindu Marriage Act in Bangladesh. No legal provision for divorce for Hindus. Only separation allowed under Hindu Married Women's Right to Separate Residence Act 1946.",
    source: "Customary Law / Hindu Married Women's Right Act 1946",
    certainty: "arguable",
  },
  {
    id: "fam-dowry-001",
    title: "Dowry Prohibition and Punishment",
    rule: "Demanding or giving dowry is a criminal offence. Punishment up to 5 years imprisonment or BDT 50,000 fine. Dowry death within 7 years of marriage carries up to life imprisonment.",
    source: "Dowry Prohibition Act 1980 (Amended 2018)",
    certainty: "confirmed",
  },
  {
    id: "fam-dv-001",
    title: "Domestic Violence Protection",
    rule: "Court can issue Protection Order, Residence Order, and Monetary Relief within 3 working days. Punishment up to 2 years imprisonment.",
    source: "Domestic Violence (Prevention and Protection) Act 2010",
    certainty: "confirmed",
  },
];

// — Q&A Bank —
const qaBank: QAEntry[] = [
  {
    id: "fam-qa-001",
    triggerKeywords: ["talaq", "divorce", "muslim", "separation", "pronouncement"],
    question: "What is Talaq and how does it work under Bangladesh law?",
    irac: {
      issue: "What is the legal procedure for Talaq under Bangladesh law?",
      rule: "Under the Muslim Family Laws Ordinance 1961 (Section 7), Bangladesh requires: (1) Written notice to Chairman of Union Parishad immediately, (2) Copy to wife, (3) Arbitration Council within 30 days, (4) 90-day waiting period before talaq is effective. Talaq without notice is a criminal offence (S.7(2)) — up to 1 year imprisonment.",
      application: "If you or your spouse are considering talaq, the husband must send written notice to the local Union Parishad Chairman. The Chairman will form an Arbitration Council to attempt reconciliation. The talaq does NOT become legally effective until 90 days have passed from the notice. If reconciliation succeeds within 90 days, the talaq is revoked.",
      conclusion: "**Talaq Procedure:**\n1. Husband sends written notice to Union Parishad Chairman\n2. Chairman forms Arbitration Council within 30 days\n3. 90-day waiting period applies\n4. Talaq effective only after 90 days\n\n⚠ Talaq without notice is a criminal offence.\n📄 Full Muslim Divorce Guide — ৳999",
    },
    escalate: false,
    relatedRules: ["fam-talaq-001"],
  },
  {
    id: "fam-qa-002",
    triggerKeywords: ["khul", "khula", "wife divorce", "mutual", "woman divorce"],
    question: "Can a wife divorce her husband in Bangladesh?",
    irac: {
      issue: "What are the legal methods for a Muslim wife to obtain divorce in Bangladesh?",
      rule: "A Muslim wife can seek divorce through: (1) Khul (mutual divorce by returning mahr), or (2) Court divorce under Dissolution of Muslim Marriages Act 1939 on grounds: husband missing 4+ years, no maintenance for 2+ years, husband imprisoned 7+ years, cruelty, impotency, or polygamy without permission.",
      application: "If you are a wife seeking divorce, you can either negotiate a Khul (where you return your mahr in exchange for freedom) or file a petition in Family Court. You must prove one of the grounds under the 1939 Act. The court will attempt mandatory arbitration before granting the decree.",
      conclusion: "**Wife's Divorce Options:**\n• Khul: Return mahr, mutual agreement\n• Court: File under Dissolution of Muslim Marriages Act 1939\n\nGrounds include: cruelty, desertion, impotency, failure to maintain.\n📄 Wife's Divorce Petition Guide — ৳999",
    },
    escalate: false,
    relatedRules: ["fam-khul-001"],
  },
  {
    id: "fam-qa-003",
    triggerKeywords: ["denmahr", "mahr", "mehr", "kabin", "kabinanama"],
    question: "What is Denmahr (Mahr) and can a wife claim it in court?",
    irac: {
      issue: "What is the legal status and enforcement mechanism for Denmahr in Bangladesh?",
      rule: "Denmahr is a mandatory payment fixed at marriage in the Kabinanama. Prompt Mahr is payable on demand; Deferred Mahr is payable on divorce or husband's death. It is a legal debt enforceable as a civil contract (Contract Act 1872). If unpaid, wife has right of retention (habs-e-nafs) — she can refuse cohabitation.",
      application: "If your husband is refusing to pay your mahr, you can file a money suit in Family Court. Attach the Kabinanama as primary evidence. The court can attach your husband's property or salary for recovery. If it is prompt mahr, you are legally within your rights to refuse marital cohabitation until paid.",
      conclusion: "**Claiming Denmahr:**\n1. File money suit in Family Court\n2. Attach Kabinanama as evidence\n3. Court can attach husband's property/salary\n4. Unpaid prompt mahr gives right to refuse cohabitation\n\n📄 Denmahr Recovery Suit Guide — ৳999",
    },
    escalate: false,
    relatedRules: ["fam-denmahr-001"],
  },
  {
    id: "fam-qa-004",
    triggerKeywords: ["maintenance", "nafaqa", "alimony", "wife support"],
    question: "What maintenance is a Muslim wife entitled to?",
    irac: {
      issue: "What is the scope and legal procedure for claiming wife maintenance in Bangladesh?",
      rule: "Under Muslim law and Family Courts Ordinance 1985, wife is entitled to food, clothing, housing, and medical expenses during marriage. During iddat (after divorce), she gets 3 months full maintenance. Court can fix interim maintenance immediately. Failure to pay leads to property attachment or contempt proceedings.",
      application: "If your husband is not maintaining you, file a petition in Family Court. You do not need to wait for a final order — the court can grant interim (temporary) maintenance immediately. The amount depends on husband's income and social status. If he fails to pay, the court can attach his salary or bank account.",
      conclusion: "**Claiming Maintenance:**\n1. File petition in Family Court\n2. Request interim maintenance immediately\n3. Court fixes amount based on husband's income\n4. Non-payment leads to salary/property attachment\n\n⚠ Not entitled if in wilful disobedience (nushuz) without cause.\n☎ Legal Aid: 16430",
    },
    escalate: false,
    relatedRules: ["fam-maintenance-001"],
  },
  {
    id: "fam-qa-005",
    triggerKeywords: ["custody", "child", "guardianship", "hizanat", "mother", "father"],
    question: "Who gets custody of children after Muslim divorce?",
    irac: {
      issue: "What are the rules for child custody (Hizanat) after divorce in Bangladesh?",
      rule: "Mother gets physical custody (Hizanat) of sons until age 7 and daughters until puberty. Father is always the natural guardian. Mother loses custody if she remarries (to non-mahram), has bad character, or neglects child. Welfare of child is paramount under Guardians and Wards Act 1890, Section 17.",
      application: "In a divorce, custody is decided based on the child's age and welfare. For young children, the mother has priority unless she remarries or is unfit. The father must pay child maintenance regardless of who has custody. After the Hizanat period ends, custody reverts to the father, though the court may extend mother's custody if it serves the child's best interest.",
      conclusion: "**Child Custody Rules:**\n• Mother: Sons until 7, Daughters until puberty\n• Father: Always legal guardian, must pay maintenance\n• Mother loses custody if: remarries, bad character, neglects child\n\nFile custody petition in Family Court.\n📄 Child Custody Case Guide — ৳999",
    },
    escalate: false,
    relatedRules: ["fam-custody-001"],
  },
  {
    id: "fam-qa-006",
    triggerKeywords: ["polygamy", "second wife", "second marriage", "multiple wives"],
    question: "Can a Muslim man marry a second wife without permission?",
    irac: {
      issue: "What is the legal consequence of a second marriage without Arbitration Council permission?",
      rule: "Under MFLO 1961 Section 6, a Muslim man MUST apply to the Chairman for permission before a second marriage. The Arbitration Council examines existing wife's consent. Without permission, it is a criminal offence under S.6(5): up to 1 year imprisonment or BDT 10,000 fine or both. The marriage remains valid but husband is criminally liable.",
      application: "If your husband marries again without permission, he commits a criminal offence. You can file a complaint with the Union Parishad Chairman or police. You are entitled to immediate prompt denmahr and can file for divorce on this specific ground.",
      conclusion: "**Second Marriage Without Permission:**\n• Criminal offence: 1 year jail or BDT 10,000 fine\n• Marriage is valid but husband is criminally liable\n• Existing wife gets immediate prompt denmahr\n• Ground for wife to file divorce\n\nReport to Chairman or Police immediately.",
    },
    escalate: true,
    escalateReason: "Polygamy without permission requires immediate legal action to secure wife's rights and denmahr.",
    relatedRules: ["fam-talaq-001"],
  },
  {
    id: "fam-qa-007",
    triggerKeywords: ["hindu marriage", "hindu divorce"],
    question: "Can Hindus get a divorce in Bangladesh?",
    irac: {
      issue: "Is there a legal provision for divorce for Hindus in Bangladesh?",
      rule: "Bangladesh has NO comprehensive Hindu Marriage Act and NO provision for Hindu divorce. Hindu marriages are governed by Shastric texts and customs. Only separation is allowed under Hindu Married Women's Right to Separate Residence and Maintenance Act 1946 on grounds like cruelty, leprosy, or conversion.",
      application: "If you are a Hindu seeking to end your marriage, you cannot file for a civil divorce in Bangladesh. Your legal option is to file for separation under the 1946 Act, which allows you to live separately and claim maintenance. Some couples convert to Islam or use the Special Marriage Act 1872, but these have complex legal implications.",
      conclusion: "**Hindu Marriage Status:**\n• NO legal divorce available for Hindus in BD\n• Only SEPARATION under 1946 Act\n• Can claim maintenance while separated\n\n⚠ Consult advocate for alternative legal pathways.\n📄 Hindu Separation Guide — ৳999",
    },
    escalate: true,
    escalateReason: "Hindu divorce involves complex personal law issues requiring specialised legal counsel.",
    relatedRules: ["fam-hindu-001"],
  },
  {
    id: "fam-qa-008",
    triggerKeywords: ["dowry", "joutuk", "dowry demand", "dowry death"],
    question: "What are the legal consequences of demanding or giving dowry?",
    irac: {
      issue: "What offences and punishments apply to dowry under Bangladesh law?",
      rule: "Under Dowry Prohibition Act 1980 (Amended 2018): Demanding dowry = up to 5 years jail or BDT 50,000 fine. Giving dowry = up to 1 year jail. Dowry death (within 7 years of marriage due to cruelty) = up to life imprisonment. Court presumes husband/relatives caused death.",
      application: "If you are facing dowry demands, document everything (messages, recordings). File a police report immediately — delay weakens the case. You can simultaneously file under the Dowry Act and Domestic Violence Act 2010 for a protection order. Seek shelter at a One Stop Crisis Centre (OCC) if in physical danger.",
      conclusion: "**Dowry Law Actions:**\n1. Document all demands (messages, witnesses)\n2. File police report immediately\n3. File under Dowry Act + DV Act simultaneously\n4. Seek shelter at OCC if in danger\n\n☎ Women Helpline: 109 | Legal Aid: 16430",
    },
    escalate: true,
    escalateReason: "Dowry death and harassment are cognizable, non-bailable offences requiring immediate police and legal intervention.",
    relatedRules: ["fam-dowry-001"],
  },
  {
    id: "fam-qa-009",
    triggerKeywords: ["domestic violence", "abuse", "wife beating", "protection order"],
    question: "What protection does a woman have against domestic violence?",
    irac: {
      issue: "What remedies are available under the Domestic Violence Act 2010?",
      rule: "Under DV Act 2010: Physical, psychological, sexual, and economic abuse are covered. Court can issue Protection Order (within 3 days), Residence Order (abuser removed from home), and Monetary Relief. Punishment: up to 2 years imprisonment or fine.",
      application: "Go to the Magistrate Court or Family Court and file an application. You don't need a lawyer to file for a protection order. The court must hear the case within 3 working days. If granted, the abuser cannot enter your home or contact you. Violation of the order leads to arrest.",
      conclusion: "**Get Protection Fast:**\n1. File application in Magistrate/Family Court\n2. Court issues Protection Order within 3 days\n3. Abuser removed from home via Residence Order\n4. Monetary relief for medical expenses\n\n☎ 109 (24hr Women Helpline) | OCC at major hospitals",
    },
    escalate: false,
    relatedRules: ["fam-dv-001"],
  },
  {
    id: "fam-qa-010",
    triggerKeywords: ["child marriage", "age", "minor", "underage", "bal bibah"],
    question: "What is the legal age of marriage and what happens if child marriage occurs?",
    irac: {
      issue: "What are the legal age limits and penalties for child marriage in Bangladesh?",
      rule: "Under Child Marriage Restraint Act 2017: Minimum age is 21 (male) and 18 (female). Arranging/conducting child marriage = up to 2 years jail or BDT 50,000 fine. The marriage is voidable (not automatically void) — the child can annul it upon reaching majority.",
      application: "If a child marriage is being arranged, any person can report it to the UNO (Upazila Nirbahi Officer) or police. The court can issue an injunction to stop it. If the marriage has already occurred, the minor can go to court after turning 18 to have it annulled.",
      conclusion: "**Child Marriage Law:**\n• Legal age: Male 21, Female 18\n• Punishment: 2 years jail or BDT 50,000 fine\n• Marriage is voidable at option of child\n\nReport to UNO or Police to stop it.",
    },
    escalate: false,
    relatedRules: [],
  },
  {
    id: "fam-qa-son-inheritance",
    question: "Son inheritance rights against father property Bangladesh",
    area: "family",
    jurisdiction: "BD",
    triggerKeywords: [
      "son", "father", "inheritance", "property", "share", "will", "gift",
      "ancestral", "self-acquired", "maintenance", "minor", "married",
    ],
    irac: {
      issue: "A son's entitlement to his father's property under Bangladesh personal law.",
      rule: "Muslim Law (Sunni Hanafi): A son gets a fixed Quranic share — generally 2:1 ratio to daughters. A father CANNOT will away more than one-third of his estate without consent of heirs. Hindu Law: Sons have coparcenary birthright in ancestral property; self-acquired property can be willed freely but dependants can claim maintenance. Christian Law: Governed by the Succession Act 1925; sons and daughters have equal entitlement on intestacy.",
      application: "If you are a Muslim son, you are entitled to a mandatory share that cannot be overridden by a will. If Hindu, ancestral property gives you a birthright; self-acquired property depends on the will or gift validity. If Christian, check if the father died intestate (without will) or if the will is valid.",
      conclusion: "Steps: (1) Determine if property is ancestral or self-acquired via Khatian/mutation records. (2) Identify applicable personal law. (3) If will exists, verify it was made voluntarily and registered if required. (4) If share is denied, file for partition (ancestral) or probate/letter of administration (self-acquired with will). (5) Minor sons should immediately seek legal aid if maintenance is withdrawn.",
    },
    relatedRules: [],
    escalate: true,
    escalateReason: "Inheritance disputes between father and son involve personal law complexities. Immediate legal consultation is essential to protect statutory rights.",
  },
];

// — Module Export —
const familyModule: KnowledgeBank = {
  area: "family",
  label: "Family Law",
  description: "Knowledge module for family law in Bangladesh.",
  rules,
  qaBank,
};

export default familyModule;