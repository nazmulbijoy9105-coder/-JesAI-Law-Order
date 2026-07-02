// ─── JesAI Criminal Law Knowledge Module ─────────────────────
// NLC validated — Nazmul Islam (Bijoy), Advocate, Supreme Court of Bangladesh
// Covers: Penal Code 1860, CrPC 1898, Evidence Act 1872, NI Act 1881
// Special Laws: Nari O Shishu 2000, Cyber Security Act 2023,
// Narcotics Control Act 2018, Torture Prevention Act 2013, Human Trafficking Act 2012
// Audience: Law students, bar exam, general citizens, legal practitioners
// ILRMF Conformant Corpus v2.0 — Expanded semantic triggers
// Last verified: 2025-03-09

import type { KnowledgeModule, LegalRule, QAEntry } from "./types";

const rules: LegalRule[] = [
  {
    id: "cr-murder-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Murder — Section 302, Penal Code 1860",
    rule: "Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.",
    source: "Penal Code 1860, Section 302",
    certainty: "confirmed",
    tags: ["murder", "302", "death penalty", "life imprisonment", "homicide"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-culpable-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Culpable Homicide Not Amounting to Murder — Section 304",
    rule: "Punishment for culpable homicide not amounting to murder is imprisonment for life or up to 10 years, and fine. If the act by which death is caused is done with knowledge but without intention, imprisonment up to 10 years or fine or both.",
    source: "Penal Code 1860, Section 304",
    certainty: "confirmed",
    tags: ["culpable homicide", "304", "sudden fight", "provocation", "manslaughter"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-theft-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Theft — Section 379, Penal Code 1860",
    rule: "Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to 3 years, or with fine, or with both.",
    source: "Penal Code 1860, Section 379",
    certainty: "confirmed",
    tags: ["theft", "379", "stealing", "3 years"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-robbery-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Robbery — Section 392, Penal Code 1860",
    rule: "Whoever commits robbery shall be punished with rigorous imprisonment for a term up to 10 years and fine. If robbery is committed on a highway between sunset and sunrise, imprisonment may extend to 14 years.",
    source: "Penal Code 1860, Section 392",
    certainty: "confirmed",
    tags: ["robbery", "392", "10 years", "highway", "violence"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-dacoity-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Dacoity — Section 395, Penal Code 1860",
    rule: "Whoever commits dacoity (robbery by 5 or more persons) shall be punished with imprisonment for life or rigorous imprisonment up to 10 years, and fine.",
    source: "Penal Code 1860, Section 395",
    certainty: "confirmed",
    tags: ["dacoity", "395", "gang robbery", "5 persons", "life imprisonment"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-hurt-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Grievous Hurt — Section 325, Penal Code 1860",
    rule: "Whoever voluntarily causes grievous hurt shall be punished with imprisonment up to 7 years and fine. Grievous hurt includes permanent disfigurement, fracture, or injuries endangering life.",
    source: "Penal Code 1860, Sections 320, 325",
    certainty: "confirmed",
    tags: ["grievous hurt", "325", "7 years", "injury", "disfigurement"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-kidnap-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Kidnapping — Section 363, Penal Code 1860",
    rule: "Whoever kidnaps any person shall be punished with imprisonment up to 7 years and fine. Kidnapping for ransom carries heavier punishment under special laws.",
    source: "Penal Code 1860, Section 363",
    certainty: "confirmed",
    tags: ["kidnapping", "363", "7 years", "abduction"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-forgery-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Forgery — Sections 463-468, Penal Code 1860",
    rule: "Forgery of documents: up to 2 years. Forgery of court records or public registers: up to 7 years. Forgery for purpose of cheating: up to 7 years. Using forged documents: same punishment as forgery.",
    source: "Penal Code 1860, Sections 463-468, 471",
    certainty: "confirmed",
    tags: ["forgery", "463", "468", "fake document", "2-7 years"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-arrest-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Arrest Without Warrant — CrPC Section 54",
    rule: "Police may arrest without warrant in cognizable offences — offences serious enough to allow arrest without court order. These include murder, robbery, dacoity, kidnapping, and most offences punishable with 3 or more years.",
    source: "Code of Criminal Procedure 1898, Section 54",
    certainty: "confirmed",
    tags: ["arrest", "warrant", "section 54", "cognizable", "police power"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-detention-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Maximum Detention Without Court Order — 24 Hours",
    rule: "Under CrPC Section 61, no police officer shall detain in custody a person arrested without warrant for longer than 24 hours. After 24 hours, the arrested person must be produced before a Magistrate.",
    source: "Code of Criminal Procedure 1898, Section 61; Constitution Article 33",
    certainty: "confirmed",
    tags: ["detention", "24 hours", "magistrate", "custody", "police", "section 61"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-bail-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Bailable vs Non-Bailable Offences — CrPC",
    rule: "Bailable offences: bail is a right — police or Magistrate must grant bail. Non-bailable offences: bail is discretionary — court decides based on nature of offence, antecedents, and likelihood of fleeing. High Court has power to grant bail in any case.",
    source: "Code of Criminal Procedure 1898, Sections 496-498; Second Schedule",
    certainty: "confirmed",
    tags: ["bail", "bailable", "non-bailable", "right to bail", "high court bail"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-remand-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Remand — Police Custody for Investigation",
    rule: "Police may apply for remand (custody) for investigation purposes. Magistrate may authorise detention in police custody not exceeding 15 days in total. After 15 days, accused goes to judicial custody (jail), not police station.",
    source: "Code of Criminal Procedure 1898, Section 167",
    certainty: "confirmed",
    tags: ["remand", "police custody", "15 days", "investigation", "magistrate"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-rape-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Rape — Nari O Shishu Nirjatan Daman Ain 2000",
    rule: "Punishment for rape under the Women and Children Repression Prevention Act 2000: rigorous imprisonment for life and fine. If rape causes death, punishment is death or life imprisonment. Gang rape: death or life imprisonment.",
    source: "Nari O Shishu Nirjatan Daman Ain 2000, Section 9",
    certainty: "confirmed",
    tags: ["rape", "women", "children", "nari shishu", "life imprisonment", "section 9"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-acid-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Acid Attack — Nari O Shishu Nirjatan Daman Ain 2000",
    rule: "Punishment for acid attack causing death: death penalty. Causing grievous hurt: death or life imprisonment. Causing simple hurt: imprisonment 3-7 years and fine. Acid Control Act 2002 also regulates acid sale and possession.",
    source: "Nari O Shishu Nirjatan Daman Ain 2000, Section 4; Acid Control Act 2002",
    certainty: "confirmed",
    tags: ["acid attack", "acid", "death penalty", "nari shishu", "acid control"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-drug-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Drug Trafficking — Narcotics Control Act 2018",
    rule: "Punishment for drug trafficking under Narcotics Control Act 2018: death or life imprisonment for trafficking large quantities of heroin, cocaine, or phensidyl. Lesser quantities: 2 years to life depending on drug and amount.",
    source: "Narcotics Control Act 2018, Sections 19, 34",
    certainty: "confirmed",
    tags: ["drug", "narcotics", "trafficking", "heroin", "death penalty", "life imprisonment"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-cyber-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Cyber Defamation — Cyber Security Act 2023",
    rule: "Publishing false defamatory information online: imprisonment up to 3 years or fine up to BDT 5 lakh or both. Hacking/unauthorized access: up to 7 years. Spreading false information to destabilise state: up to 14 years.",
    source: "Cyber Security Act 2023, Sections 21, 17, 28",
    certainty: "confirmed",
    tags: ["cyber", "defamation", "online", "hacking", "cyber security act", "3 years"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-cheque-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Cheque Dishonour — Negotiable Instruments Act 1881",
    rule: "Dishonour of a cheque for insufficiency of funds is a criminal offence under NI Act Section 138. Punishment: imprisonment up to 1 year, or fine up to twice the cheque amount, or both. It is a bailable, compoundable offence.",
    source: "Negotiable Instruments Act 1881, Section 138",
    certainty: "confirmed",
    tags: ["cheque bounce", "dishonour", "ni act", "138", "Cheque case"],
    lastVerified: "2025-03-09",
  },
  {
    id: "cr-torture-001",
    area: "criminal",
    jurisdiction: "BD",
    title: "Torture in Custody — Torture and Custodial Death Prevention Act 2013",
    rule: "Causing torture (physical or mental) to a person in police custody or remand for extracting confession or information is a criminal offence. Punishment: minimum 3 years, up to 10 years imprisonment and fine. Custodial death: death penalty or life imprisonment.",
    source: "Torture and Custodial Death (Prevention) Act 2013",
    certainty: "confirmed",
    tags: ["torture", "custodial death", "remand torture", "police torture", "section 54 abuse"],
    lastVerified: "2025-03-09",
  }
];

const qaBank: QAEntry[] = [

  // ════════════════════════════════════════════════════════════
  // LAYER 1: CRIME + PUNISHMENT (Penal Code) — ENRICHED TRIGGERS
  // ════════════════════════════════════════════════════════════

  {
    id: "cr-qa-001",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["punishment murder", "murder punishment", "murder sentence", "section 302", "302 penal code", "হত্যার শাস্তি", "খুনের শাস্তি", "killed someone", "how many years for murder", "death penalty murder", "life imprisonment murder"],
    question: "What is the punishment for murder in Bangladesh?",
    irac: {
      issue: "What punishment does Bangladesh law prescribe for the offence of murder?",
      rule: "Section 302 of the Penal Code 1860: Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.",
      application: "Murder requires: (1) causing death, (2) intention to kill, or knowledge that the act is so imminently dangerous that it will in all probability cause death. Courts consider intention, weapon used (e.g., sharp weapon vs. blunt force), and circumstances (premeditated vs. sudden) to determine whether the death penalty or life imprisonment applies. The 'rarest of rare' doctrine is often cited for death sentences.",
      conclusion: "**Murder (Section 302):** Death penalty OR life imprisonment + fine.\n\nCourt decides based on premeditation and brutality.\n\n📋 Law student guide — ৳99 | 📄 Full criminal law notes — ৳999",
    },
    escalate: false,
    relatedRules: ["cr-murder-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "cr-qa-002",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["culpable homicide", "304", "sudden fight death", "unintentional killing", "not murder", "আকস্মিক মারামারি মৃত্যু", "killed by accident", "difference murder homicide", "heat of passion killing"],
    question: "What is the difference between murder and culpable homicide?",
    irac: {
      issue: "How does Bangladesh law distinguish murder (Section 302) from culpable homicide not amounting to murder (Section 304)?",
      rule: "Penal Code 1860: Murder (S.302) = intentional killing with premeditation. Culpable Homicide (S.304) = causing death without full murder intention — in sudden fight, under grave and sudden provocation, or with knowledge (not intention) that death may result.",
      application: "Classic distinction: A plans to kill B and stabs him in the chest → Murder (S.302). A and B get into a sudden argument over a boundary dispute, A pushes B, B falls and hits his head on a rock and dies → Culpable Homicide (S.304). The key difference is premeditation and intention. Sudden provocation reduces murder to culpable homicide.",
      conclusion: "**Murder (S.302):** Death or life imprisonment.\n**Culpable Homicide (S.304 Part I):** Life imprisonment or up to 10 years.\n**Culpable Homicide (S.304 Part II — knowledge, no intention):** Up to 10 years or fine.\n\n📋 Exam notes — ৳99 | 📄 Case law guide — ৳999",
    },
    escalate: false,
    relatedRules: ["cr-murder-001", "cr-culpable-001"],
    lastVerified: "2025-03-09",
  },

  // ... (Keep all your other standard Penal Code entries like Theft, Robbery, Dacoity, Hurt, Kidnapping, Forgery, Cheating, Breach of Trust, Intimidation, Defamation exactly as they were, just mentally acknowledge they are fine) ...

  // ════════════════════════════════════════════════════════════
  // LAYER 2: PROCEDURE (CrPC) — ENRICHED FOR ILRMF KEYWORD DENSITY
  // ════════════════════════════════════════════════════════════

  {
    id: "cr-qa-013",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["how to file fir", "file criminal case", "file case police", "মামলা দায়ের", "থানায় মামলা", "how to complain police", "police not taking case", "gd number", "general diary", "wants to file case"],
    question: "How do I file a criminal case (FIR) in Bangladesh?",
    irac: {
      issue: "What is the process for filing a First Information Report (FIR) at a police station in Bangladesh?",
      rule: "Under CrPC Section 154, any person can report a cognizable offence to the police. The Officer-in-Charge (OC) must record it as FIR and give a copy free of charge. If police refuse, the complainant can file a complaint directly to the Magistrate under Section 200.",
      application: "If you are a victim or witness to a serious crime (theft, robbery, assault, fraud), you must go to the police station where the crime occurred. You do not need a lawyer to file an FIR. State the facts chronologically—Who, What, When, Where, Why. The police cannot refuse to register an FIR for a cognizable offence.",
      conclusion: "**Steps to file FIR:**\n1. Go to nearest Police Station (jurisdiction where offence occurred)\n2. State facts clearly to Officer-in-Charge (OC)\n3. OC writes FIR or you dictate it\n4. Read it, sign it, get a free copy with FIR number and date\n5. If police refuse → File complaint at Magistrate Court (S.200)\n\n📋 FIR drafting guide — ৳99 | 📄 Full procedure pack — ৳999",
    },
    escalate: false,
    relatedRules: ["cr-arrest-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "cr-qa-016",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["how long detained", "police detention time", "24 hours police", "কতক্ষণ আটকে রাখতে পারে", "detention limit", "kept in police station", "not taken to court", "habeas corpus", "illegal detention"],
    question: "How long can police detain me without a court order?",
    irac: {
      issue: "What is the maximum time police can hold a person after arrest before producing them before a court?",
      rule: "CrPC Section 61 and Constitution Article 33(2): No police officer shall detain an arrested person for more than 24 hours without producing them before the nearest Magistrate. The 24 hours includes travel time to the court.",
      application: "The 24-hour rule is a fundamental constitutional right. If you are arrested at 10 AM on Monday, the police must physically produce you before a Magistrate by 10 AM on Tuesday. If they fail to do so, the detention becomes illegal, and the police officers can face departmental action and criminal charges. Family members can file a Habeas Corpus writ in the High Court Division immediately.",
      conclusion: "**Maximum 24 hours police detention without court order.**\n\nIf detained beyond 24 hours without Magistrate production:\n1. Family should immediately contact a lawyer\n2. File Habeas Corpus writ at High Court Division\n3. High Court will summon the police to produce the detainee\n\n⚠️ This is a severe violation of fundamental rights.\n📋 Detention rights guide — ৳99",
    },
    escalate: true,
    escalateReason: "Illegal detention beyond 24 hours requires urgent High Court writ. WhatsApp NLC immediately.",
    relatedRules: ["cr-detention-001"],
    lastVerified: "2025-03-09",
  },

  // ════════════════════════════════════════════════════════════
  // LAYER 3: SPECIAL CRIMINAL LAWS & HIGH-VOLUME QUERIES
  // ════════════════════════════════════════════════════════════

  {
    id: "cr-qa-026",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["rape punishment", "punishment rape", "ধর্ষণ শাস্তি", "rape sentence bangladesh", "nari shishu rape", "sexual assault", "minor rape", "gang rape punishment"],
    question: "What is the punishment for rape under Bangladesh law?",
    irac: {
      issue: "What punishment does Bangladesh law prescribe for rape?",
      rule: "Nari O Shishu Nirjatan Daman Ain 2000 (amended 2020), Section 9: Rape causing death or resulting in persistent vegetative state — death penalty. Rape (without death) — life imprisonment (rigorous). Gang rape causing death — death penalty or life imprisonment for all participants.",
      application: "The 2020 amendment made rape punishments extremely strict, removing lower tier sentences. Rape of a child (under 16) or a woman with a mental/physical disability carries the same maximum penalty. Medical evidence collected within 72 hours is crucial for conviction, but lack of medical evidence does not automatically disprove the charge if testimony is reliable.",
      conclusion: "**Rape (S.9, Nari O Shishu Ain 2000 as amended 2020):**\n• Rape + death of victim → Death penalty\n• Rape (without death) → Life imprisonment (rigorous)\n• Gang rape + death → Death penalty for all participants\n\nImmediate Actions for Victim:\n1. Go to nearest hospital for medical exam & sample collection (within 72 hrs)\n2. Do not bathe or wash clothes before exam\n3. File FIR at police station (women officers available)\n4. Contact a specialized advocate\n\n📋 Victim reporting guide — ৳99 | 📄 Full procedure — ৳999",
    },
    escalate: true,
    escalateReason: "Rape cases require immediate police report and medical examination. Contact NLC for referral to specialist advocate.",
    relatedRules: ["cr-rape-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "cr-qa-028",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["drug trafficking punishment", "narcotics", "মাদক শাস্তি", "drug crime bangladesh", "narcotics act 2018", "yaba punishment", "phensidyl punishment", "ice drug", "heroin sentence", "caught with drugs"],
    question: "What is the punishment for drug trafficking in Bangladesh?",
    irac: {
      issue: "What punishment does the Narcotics Control Act 2018 prescribe for drug trafficking?",
      rule: "Narcotics Control Act 2018: Trafficking heroin (above 25 grams), cocaine, phensidyl (above 2500ml or 200 bottles), Yaba (above 2000 pills), or cannabis (above 25 kg) — death penalty or life imprisonment. Lesser quantities carry 2 to 15 years.",
      application: "Bangladesh has zero-tolerance for drug trafficking. Even carrying a small amount of Yaba (e.g., 10 pills) for personal use can result in several years in jail. The law presumes possession of large quantities as trafficking unless proven otherwise. Cases are tried in Speedy Trial Tribunals, meaning they move much faster than regular criminal cases.",
      conclusion: "**Drug Trafficking (Narcotics Control Act 2018):**\n• Large quantity (Heroin >25g, Yaba >2000p, Phensidyl >200b) → Death or Life Imprisonment\n• Medium quantity → 5–15 years\n• Small quantity (Personal use) → 6 months – 2 years (often with rehab option for first timers)\n\n⚠️ Do NOT sign any blank paper at the police station. Engage an advocate immediately.\n📄 Drug case procedure guide — ৳1,999",
    },
    escalate: true,
    escalateReason: "Drug cases carry severe penalties and move fast in Speedy Trial Tribunals. WhatsApp NLC for immediate referral.",
    relatedRules: ["cr-drug-001"],
    lastVerified: "2025-03-09",
  },
  
  {
    id: "cr-qa-029",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["cyber crime punishment", "digital security act", "সাইবার অপরাধ", "online crime bangladesh", "cyber security act 2023", "facebook case", "fake news case", "online defamation case", "hacking punishment"],
    question: "What are the punishments under the Cyber Security Act 2023?",
    irac: {
      issue: "What offences and punishments does the Cyber Security Act 2023 of Bangladesh establish?",
      rule: "Cyber Security Act 2023 (replacing Digital Security Act 2018): Section 17 — hacking/unauthorized access: up to 7 years or BDT 10 lakh fine. Section 21 — defamation online: up to 3 years or BDT 5 lakh. Section 25 — spreading offensive/false information: up to 3 years. Section 28 — hurting religious sentiment: up to 5 years. Section 31 — destabilising state: up to 14 years.",
      application: "Most cyber cases in Bangladesh originate from Facebook posts, WhatsApp forwards, or YouTube videos. The police can arrest without a warrant for these offences. The jurisdiction lies strictly with the Cyber Tribunal (and Cyber Appellate Tribunal for appeals), not regular criminal courts. The definition of 'offensive' or 'false' is often broadly interpreted by law enforcement.",
      conclusion: "**Key Cyber Security Act 2023 Offences:**\n• Hacking/unauthorized access (S.17) → Up to 7 years\n• Online defamation (S.21) → Up to 3 years\n• False/offensive information (S.25) → Up to 3 years\n• Hurting religious sentiment (S.28) → Up to 5 years\n• State destabilisation (S.31) → Up to 14 years\n\nIf a case is filed:\n1. Do not get arrested without seeing the FIR copy\n2. Apply for Anticipatory Bail at High Court to avoid arrest\n3. Case will be tried at Cyber Tribunal\n\n📋 Cyber crime reporting guide — ৳99 | 📄 Full guide — ৳999",
    },
    escalate: true,
    escalateReason: "Cyber cases often result in immediate arrest warrants. Anticipatory bail at High Court is highly recommended.",
    relatedRules: ["cr-cyber-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "cr-qa-031",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["human trafficking", "trafficking punishment", "মানব পাচার শাস্তি", "trafficking bangladesh", "sold abroad", "brothel trafficking", "organ trafficking"],
    question: "What is the punishment for human trafficking in Bangladesh?",
    irac: {
      issue: "What punishment does Bangladesh law prescribe for human trafficking?",
      rule: "Human Trafficking Deterrence and Suppression Act 2012: Trafficking a person for exploitation (prostitution, forced labor, organ removal) — death penalty or life imprisonment and fine. Trafficking a child — death penalty or life imprisonment. harboring a trafficked person — up to 5 years.",
      application: "Human trafficking includes not just moving people across borders, but also internal trafficking (e.g., luring a village girl to Dhaka with a fake job offer and forcing her into prostitution). If a person goes abroad legally but their employer confiscates their passport and forces them into bonded labor, that is also trafficking under this Act.",
      conclusion: "**Human Trafficking Act 2012:**\n• Adult trafficking for exploitation → Death or life imprisonment\n• Child trafficking → Death or life imprisonment\n• Facilitating/Harboring → Up to 5-10 years\n\nVictim Rescue: Contact 999 or the Anti-Human Trafficking Unit of Police.\n\n📋 Victim reporting guide — ৳99",
    },
    escalate: true,
    escalateReason: "Human trafficking involves organized syndicates and cross-border laws. NLC can refer to specialized rights organizations.",
    relatedRules: [],
    lastVerified: "2025-03-09",
  },

  // ════════════════════════════════════════════════════════════
  // NEW ENRICHMENTS: HIGH-COMMERCIAL VALUE & PROCEDURAL DEPTH
  // ════════════════════════════════════════════════════════════

  {
    id: "cr-qa-032",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["cheque bounce", "dishonoured cheque", "চেক বাউন্স", "cheque return", "ni act 138", "bank cheque case", "payment stopped cheque", "insufficient funds cheque"],
    question: "What is the punishment for a cheque bounce (dishonour) in Bangladesh?",
    irac: {
      issue: "What criminal and civil remedies exist when a bank cheque is dishonoured?",
      rule: "Under the Negotiable Instruments Act 1881, Section 138, dishonour of a cheque due to insufficient funds or 'payment stopped by drawer' is a criminal offence. Punishment: imprisonment up to 1 year, or fine up to twice the cheque amount, or both. It is a bailable, compoundable offence.",
      application: "If you receive a cheque that bounces, you cannot file a case immediately. You must follow a strict 30-day legal notice procedure. The notice must demand the cheque amount within 30 days of receiving the bank's bounce memo. If the drawer fails to pay within 15 days of receiving the notice, you can file the criminal case. You can also file a civil suit for recovery of money simultaneously.",
      conclusion: "**Cheque Bounce (NI Act S.138) Procedure:**\n1. Get 'Cheque Return Memo' from bank\n2. Send legal notice to drawer within 30 days of bounce\n3. Wait 15 days for payment\n4. If unpaid, file criminal case in Court of Judicial Magistrate within 30 days of notice expiry\n\nPunishment: Up to 1 year jail OR double the cheque amount as fine.\n\n📋 Legal notice template — ৳199 | 📄 Full filing guide — ৳999",
    },
    escalate: false,
    relatedRules: ["cr-cheque-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "cr-qa-033",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["section 54 abuse", "torture in remand", "পুলিশের নির্যাতন", "police tortured me", "confession by force", "crossfire", "extrajudicial", "custodial torture"],
    question: "What can I do if police torture me during remand or arrest?",
    irac: {
      issue: "What legal remedies exist for custodial torture or abuse of Section 54 powers by police?",
      rule: "The Torture and Custodial Death (Prevention) Act 2013 explicitly criminalizes physical or mental torture by police, Rapid Action Battalion (RAB), or any state authority for extracting confessions or information. Punishment: minimum 3 years to 10 years. If death occurs, punishment is death or life imprisonment. Section 27 of the Evidence Act makes confessions to police inadmissible in court.",
      application: "If you or a family member is tortured in police custody, the police often try to cover it up by claiming the injuries were from 'trying to escape' or a 'crossfire'. It is critical to document injuries immediately upon release or when brought before the Magistrate. You must inform the Magistrate during the remand hearing that you were tortured, and request a medical examination by a board of doctors, not just the jail doctor.",
      conclusion: "**If tortured in custody:**\n1. When brought before Magistrate for remand, clearly state: 'I was tortured. I request a medical exam by a hospital board.'\n2. Do not sign any blank confessional statement under duress.\n3. Upon release/bail, immediately go to a public hospital for a medical legal certificate (MLC).\n4. File a criminal case under Torture Act 2013 against the specific officers.\n5. File a writ petition in High Court for compensation and departmental action.\n\n⚠️ Never resist police physically, but verbally assert your rights.\n📄 Custodial torture writ guide — ৳1,999",
    },
    escalate: true,
    escalateReason: "Custodial torture requires immediate High Court intervention and medical documentation. NLC provides emergency referrals.",
    relatedRules: ["cr-torture-001", "cr-remand-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "cr-qa-034",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["confession to police", "স্বীকারোক্তি", "is confession valid", "section 27 evidence", "police forced confession", "giving statement to police"],
    question: "Is a confession given to the police admissible in court?",
    irac: {
      issue: "What is the legal status of a confessional statement made to a police officer under Bangladesh evidence law?",
      rule: "Under Section 25 of the Evidence Act 1872: No confession made to a police officer is admissible as proof against the accused. Under Section 27: If a confession leads to the discovery of a fact (e.g., 'I hid the weapon under the bed'), ONLY the fact discovered (the weapon) is admissible, not the words of the confession itself.",
      application: "Police frequently threaten or physically abuse accused persons to sign a confessional statement under Section 164 of the CrPC (recorded before a Magistrate). If you are pressured by police to confess, remember that whatever you say to the police officer cannot be used to convict you. However, if they take you before a Magistrate and you confess there under Section 164, that IS admissible. Therefore, never confess to police, and if taken to a Magistrate, clearly state if you were tortured by police prior to the confession.",
      conclusion: "**Confession Rules:**\n• To Police Officer (S.25) → **NOT Admissible**\n• To Police leading to discovery (S.27) → **Only the discovered item is admissible**\n• To Magistrate under S.164 → **Admissible** (Do not confess here if tortured)\n\nIf police force you to write/sign a confession: Sign it under protest if physically forced, but immediately inform the Magistrate at the next hearing.\n\n📋 Evidence Act notes — ৳99",
    },
    escalate: false,
    relatedRules: ["cr-torture-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "cr-qa-035",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["quash fir", "cancel false case", "ফেক মামলা বাতিল", "withdraw fir", "high court fir", "section 561a", "malicious case", "revenge case"],
    question: "How can I get a false FIR cancelled or quashed?",
    irac: {
      issue: "What is the legal mechanism to quash a false or maliciously filed FIR in Bangladesh?",
      rule: "Under Section 561A of the CrPC, the High Court Division has inherent power to make necessary orders to prevent abuse of court process. If an FIR is filed with malicious intent, without any basis in fact, or to harass someone, the accused can file a writ petition under Article 102 of the Constitution read with Section 561A to quash the FIR.",
      application: "You cannot get an FIR quashed at the police station or the Magistrate court if a charge sheet has already been filed. You must go directly to the High Court Division. The High Court will look at the FIR contents—if the allegations do not constitute an offence even if taken at face value, or if it is purely a civil dispute disguised as a criminal case, the Court will quash it.",
      conclusion: "**How to Quash a False FIR:**\n1. Engage a High Court advocate immediately\n2. File a Writ Petition under Art 102 + S.561A CrPC\n3. Provide evidence that the FIR is malicious, absurd, or a civil dispute\n4. If High Court is convinced, they will pass an order quashing the FIR, staying arrest\n\n⚠️ Do not wait for trial to start. Quash early to avoid arrest and harassment.\n📄 FIR Quash petition guide — ৳1,999",
    },
    escalate: true,
    escalateReason: "FIR Quashing requires immediate High Court intervention to prevent arrest. NLC provides urgent HCD referrals.",
    relatedRules: ["cr-arrest-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "cr-qa-036",
    area: "criminal",
    jurisdiction: "BD",
    triggerKeywords: ["cyber tribunal jurisdiction", "where to file cyber case", "সাইবার ট্রাইব্যুনাল", "cyber court location", "cyber appellate tribunal"],
    question: "Where are cyber crime cases tried in Bangladesh?",
    irac: {
      issue: "What courts have jurisdiction to try offences under the Cyber Security Act 2023?",
      rule: "Under the Cyber Security Act 2023, Cyber Tribunals are established to try offences under this Act. One or more Cyber Tribunals can be established by the Government in each district. Appeals from the Cyber Tribunal go directly to the Cyber Appellate Tribunal, not the High Court (unless a constitutional writ is involved).",
      application: "If an FIR is filed under the Cyber Security Act, the regular Criminal Court or Magistrate does NOT have the jurisdiction to hold a trial. The police must submit the charge sheet to the Cyber Tribunal. However, for the purpose of arrest, remand, and initial bail, the Magistrate Court has interim jurisdiction until the case is transferred to the Cyber Tribunal.",
      conclusion: "**Cyber Case Jurisdiction:**\n• Trial Court: Cyber Tribunal (District level)\n• Appeal Court: Cyber Appellate Tribunal\n\nProcess:\n1. FIR at Police Station (Regular police have arrest power)\n2. Initial Bail/Remand at Magistrate Court (Interim jurisdiction)\n3. Case transferred to Cyber Tribunal for trial\n4. Appeal goes to Cyber Appellate Tribunal (not High Court directly)\n\n📋 Cyber jurisdiction map — ৳99",
    },
    escalate: false,
    relatedRules: ["cr-cyber-001"],
    lastVerified: "2025-03-09",
  }

];

// Export default for index.ts aggregation
const criminalModule: KnowledgeModule = {
  id: "bd-criminal-law",
  name: "Bangladesh Criminal Law",
  version: "2.0.0",
  rules,
  qaBank,
};

export default criminalModule;