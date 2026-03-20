/**
 * JesAI Family Law Knowledge Module
 * Bangladesh Family Law — Muslim, Hindu, Christian, Adibashi/Upojati
 * Validated by: Md Nazmul Islam (Bijoy), Advocate, Supreme Court of Bangladesh
 * Last updated: March 2026
 */

export interface FamilyQA {
  id: string
  question_en: string
  question_bn: string
  answer_en: string
  answer_bn: string
  topic: string
  religion: "muslim" | "hindu" | "christian" | "adibashi" | "general"
  source_act: string
  source_section: string
  is_free: boolean
  keywords: string[]
}

export const familyLaw: FamilyQA[] = [

  // ── MUSLIM DIVORCE ────────────────────────────────────────────────────────

  {
    id: "FAM-001",
    topic: "divorce",
    religion: "muslim",
    is_free: true,
    source_act: "Muslim Family Laws Ordinance 1961",
    source_section: "Section 7",
    keywords: ["talaq", "divorce", "muslim", "separation", "pronouncement"],
    question_en: "What is Talaq and how does it work under Bangladesh law?",
    question_bn: "তালাক কী এবং বাংলাদেশ আইনে কীভাবে কাজ করে?",
    answer_en: `Talaq is the right of a Muslim husband to dissolve marriage by pronouncement.

Under the Muslim Family Laws Ordinance 1961 (Section 7), Bangladesh requires:

1. NOTICE: Husband must send written notice to the Chairman of the Union Parishad/Ward Commissioner immediately after pronouncing talaq
2. COPY: A copy must be sent to the wife
3. ARBITRATION: Chairman must constitute an Arbitration Council within 30 days
4. WAITING PERIOD: Talaq becomes effective after 90 days from notice — not immediately
5. RECONCILIATION: During 90 days, arbitration council attempts reconciliation

TYPES:
• Talaq-ul-Sunnat (revocable): Talaq-e-ahsan (single pronouncement + waiting period) or Talaq-e-hasan (3 pronouncements in 3 months)
• Talaq-ul-Biddat (triple talaq): 3 in one sitting — debated but technically effective in Bangladesh

IMPORTANT: Talaq without notice to Chairman is a criminal offence under Section 7(2) — punishable with imprisonment up to 1 year or fine or both.

Denmahr (mahr): Full prompt denmahr becomes immediately payable upon talaq.`,
    answer_bn: `তালাক হলো মুসলিম স্বামীর বিবাহ বিচ্ছেদের অধিকার।

মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ (ধারা ৭) অনুযায়ী:

১. নোটিশ: তালাক উচ্চারণের পরপরই ইউনিয়ন পরিষদ/ওয়ার্ড কমিশনারকে লিখিত নোটিশ দিতে হবে
২. কপি: স্ত্রীকেও কপি দিতে হবে
৩. সালিশি: চেয়ারম্যান ৩০ দিনের মধ্যে সালিশি পরিষদ গঠন করবেন
৪. অপেক্ষার সময়: নোটিশের ৯০ দিন পর তালাক কার্যকর হবে
৫. পুনর্মিলন: ৯০ দিনে সালিশি পরিষদ পুনর্মিলনের চেষ্টা করবে

গুরুত্বপূর্ণ: চেয়ারম্যানকে নোটিশ না দিয়ে তালাক দেওয়া ধারা ৭(২) অনুযায়ী ফৌজদারি অপরাধ।`
  },

  {
    id: "FAM-002",
    topic: "divorce",
    religion: "muslim",
    is_free: true,
    source_act: "Dissolution of Muslim Marriages Act 1939",
    source_section: "Section 2",
    keywords: ["khul", "khula", "wife divorce", "mutual", "woman divorce"],
    question_en: "What is Khul (Khula) divorce? Can a wife divorce her husband in Bangladesh?",
    question_bn: "খুলা তালাক কী? বাংলাদেশে স্ত্রী কি স্বামীকে তালাক দিতে পারেন?",
    answer_en: `Yes. A Muslim wife has the right to seek divorce through two methods:

1. KHUL (Mutual Divorce):
• Wife returns her mahr/denmahr to husband in exchange for release
• Requires husband's consent
• Applied to Family Court or directly agreed between parties

2. COURT DIVORCE (Dissolution of Muslim Marriages Act 1939, Section 2):
Wife can file in Family Court for dissolution on these grounds:
• Husband's whereabouts unknown for 4+ years
• Husband failed to provide maintenance for 2+ years
• Husband imprisoned for 7+ years
• Husband has physical/mental disability preventing marriage duties
• Husband's cruelty (physical or mental)
• Husband married another wife without court permission (polygamy)
• Husband impotent at time of marriage
• Any other ground recognised by Muslim law

PROCEDURE:
• File petition in Family Court (Assistant Judge Court)
• Service on husband
• Arbitration attempt mandatory
• Court decree absolute after reconciliation period

DENMAHR: Upon court dissolution, full prompt mahr is payable.`,
    answer_bn: `হ্যাঁ। মুসলিম স্ত্রী দুটি পদ্ধতিতে তালাক পেতে পারেন:

১. খুলা তালাক: স্ত্রী মহর ফেরত দিয়ে স্বামীর সম্মতিতে বিচ্ছেদ
২. আদালতের মাধ্যমে: মুসলিম বিবাহ বিচ্ছেদ আইন ১৯৩৯ এর ধারা ২ অনুযায়ী পারিবারিক আদালতে মামলা করতে পারবেন।

কারণগুলো: স্বামীর খোঁজ না থাকা (৪ বছর), ভরণপোষণ না দেওয়া (২ বছর), কারাদণ্ড (৭+ বছর), নিষ্ঠুর আচরণ, দ্বিতীয় বিবাহ ইত্যাদি।`
  },

  {
    id: "FAM-003",
    topic: "divorce",
    religion: "muslim",
    is_free: false,
    source_act: "Muslim Family Laws Ordinance 1961",
    source_section: "Section 7 & 8",
    keywords: ["mubarat", "mutual divorce", "consent", "both parties"],
    question_en: "What is Mubarat divorce and how is it different from Khul?",
    question_bn: "মুবারাত তালাক কী এবং এটি খুলার থেকে কীভাবে আলাদা?",
    answer_en: `MUBARAT is a mutual divorce where BOTH husband and wife agree to end the marriage by mutual consent — unlike Khul where only the wife initiates.

KEY DIFFERENCES:
• Mubarat: Mutual dislike and consent from both sides
• Khul: Wife initiates, returns mahr, husband agrees

BANGLADESH PROCEDURE for Mubarat:
1. Both parties sign a mutual divorce deed
2. Notice sent to Union Parishad Chairman (Section 7, MFLO 1961)
3. 90-day waiting period applies same as talaq
4. During waiting period, Chairman attempts reconciliation
5. After 90 days — divorce absolute

MAHR ON MUBARAT:
• Parties negotiate — wife may waive deferred mahr as consideration
• Prompt mahr already paid cannot be returned unless agreed

CHILDREN: Custody arrangements should be specified in divorce deed.
MAINTENANCE: Wife entitled to iddat maintenance (3 months).

PRACTICAL ADVICE: Execute a formal Deed of Mubarat with witnesses. Register at Sub-Registry if property involved.`,
    answer_bn: `মুবারাত হলো উভয় পক্ষের সম্মতিতে বিবাহ বিচ্ছেদ। খুলায় শুধু স্ত্রী উদ্যোগ নেন, মুবারাতে উভয়েই চান।

বাংলাদেশে পদ্ধতি: উভয় পক্ষ তালাকনামায় স্বাক্ষর করবেন → ইউনিয়ন পরিষদে নোটিশ → ৯০ দিন অপেক্ষা → তালাক কার্যকর।`
  },

  // ── DENMAHR / MAHR ────────────────────────────────────────────────────────

  {
    id: "FAM-004",
    topic: "denmahr",
    religion: "muslim",
    is_free: true,
    source_act: "Muslim Family Laws Ordinance 1961 / Contract Act 1872",
    source_section: "Section 10 MFLO",
    keywords: ["denmahr", "mahr", "mehr", "dowry", "kabin", "kabinanama"],
    question_en: "What is Denmahr (Mahr) and can a wife claim it in court?",
    question_bn: "দেনমোহর কী এবং স্ত্রী কি আদালতে দাবি করতে পারেন?",
    answer_en: `DENMAHR (Mahr) is a mandatory payment from husband to wife under Islamic law, fixed at time of marriage in the Kabinanama (marriage contract).

TWO TYPES:
1. PROMPT MAHR (Mahr-e-Muajjal): Payable immediately on demand
2. DEFERRED MAHR (Mahr-e-Muwajjal): Payable on divorce or death

LEGAL STATUS IN BANGLADESH:
• Denmahr is a legal debt — enforceable as a civil contract (Contract Act 1872)
• Wife can sue in Family Court to recover denmahr
• Denmahr is NOT taxable
• No time limit to claim deferred denmahr while marriage subsists

WHEN DENMAHR BECOMES DUE:
• Prompt: On demand at any time during marriage
• Deferred: On divorce (by husband) or on husband's death

HOW TO CLAIM:
• File money suit in Family Court (Assistant Judge Court)
• Attach Kabinanama as evidence
• Court can attach husband's property for recovery

IMPORTANT: If husband refuses to pay prompt mahr, wife has right to refuse marital cohabitation (right of retention — habs-e-nafs).

If wife dies before collecting deferred mahr — her heirs can claim it from husband's estate.`,
    answer_bn: `দেনমোহর হলো বিবাহে স্বামীর পক্ষ থেকে স্ত্রীকে প্রদেয় বাধ্যতামূলক অর্থ, কাবিননামায় নির্ধারিত।

প্রকার: তাৎক্ষণিক মোহর (চাইলেই পাবেন) এবং বিলম্বিত মোহর (তালাক বা মৃত্যুতে)।

দাবির উপায়: পারিবারিক আদালতে মামলা করুন। কাবিননামা প্রধান প্রমাণ। আদালত স্বামীর সম্পদ জব্দ করতে পারে।

গুরুত্বপূর্ণ: তাৎক্ষণিক মোহর না পেলে স্ত্রী সহবাস অস্বীকার করতে পারেন।`
  },

  // ── MAINTENANCE ──────────────────────────────────────────────────────────

  {
    id: "FAM-005",
    topic: "maintenance",
    religion: "muslim",
    is_free: true,
    source_act: "Muslim Family Laws Ordinance 1961 / Family Courts Ordinance 1985",
    source_section: "Section 9 MFLO",
    keywords: ["maintenance", "nafaqa", "nafaqah", "alimony", "wife support"],
    question_en: "What maintenance is a Muslim wife entitled to from her husband?",
    question_bn: "মুসলিম স্ত্রী স্বামীর কাছ থেকে কী ভরণপোষণ পাওয়ার অধিকার রাখেন?",
    answer_en: `Under Muslim law and Bangladesh law, a wife has the right to maintenance (nafaqa) from her husband.

WHAT MAINTENANCE INCLUDES:
• Food and clothing
• Housing (or rent)
• Medical expenses
• Reasonable comforts as per husband's status

WHEN WIFE IS ENTITLED:
• During marriage — always
• During iddat (after talaq) — 3 months full maintenance
• During pregnancy — until delivery
• NOT entitled if wife is in wilful disobedience (nushuz) without just cause

HOW TO CLAIM:
File in Family Court (Assistant Judge Court) under Family Courts Ordinance 1985
Court can fix maintenance amount and enforce by attachment of property

INTERIM MAINTENANCE:
• Family Court can order interim (temporary) maintenance immediately pending full hearing
• Wife need not wait for final order

AMOUNT:
• No fixed rate — depends on husband's income, social status, wife's needs
• Court has discretion — must be reasonable

FAILURE TO PAY:
• Court issues execution — can attach salary, bank account, property
• Contempt of court proceedings possible

AFTER DIVORCE:
• Maintenance for iddat period only (3 months)
• After iddat — maintenance only if pregnant (until delivery)`,
    answer_bn: `মুসলিম স্ত্রী স্বামীর কাছ থেকে ভরণপোষণ পাওয়ার আইনি অধিকার রাখেন।

অন্তর্ভুক্ত: খাদ্য, বস্ত্র, বাসস্থান, চিকিৎসা।

দাবির উপায়: পারিবারিক আদালতে মামলা। আদালত তাৎক্ষণিক অন্তর্বর্তী ভরণপোষণ দিতে পারে।

তালাকের পর: শুধু ইদ্দত কালীন (৩ মাস) ভরণপোষণ।`
  },

  // ── CHILD CUSTODY ─────────────────────────────────────────────────────────

  {
    id: "FAM-006",
    topic: "custody",
    religion: "muslim",
    is_free: true,
    source_act: "Guardians and Wards Act 1890 / Muslim Personal Law",
    source_section: "Section 17 GWA",
    keywords: ["custody", "child", "guardianship", "hizanat", "mother", "father"],
    question_en: "Who gets custody of children after Muslim divorce in Bangladesh?",
    question_bn: "মুসলিম তালাকের পর বাংলাদেশে শিশুর হেফাজত কে পাবেন?",
    answer_en: `Under Bangladesh law (Guardians and Wards Act 1890 + Muslim Personal Law):

WELFARE OF CHILD is the paramount consideration — courts always prioritise this.

HIZANAT (Custody Rights):
MOTHER gets custody of:
• Sons: Until age 7 years
• Daughters: Until puberty (generally age 15-16)

FATHER is the natural guardian for all purposes but mother has physical custody.

MOTHER LOSES CUSTODY if she:
• Remarries (to a non-mahram of the child)
• Is of bad character (proven in court)
• Neglects the child's welfare
• Lives far away making father's access impossible

FATHER'S RIGHTS:
• Always the legal guardian even if mother has physical custody
• Must pay maintenance for children regardless of custody
• Has right to regular access/visitation

AFTER CUSTODY AGES:
• Children go to father after age 7 (son) / puberty (daughter)
• Court may vary this based on child's welfare and wishes

COURT ORDER:
• Family Court grants custody order
• Guardians and Wards Act 1890 Section 17 — welfare of child is the standard
• Court can appoint any person as guardian if both parents unfit

GRANDPARENTS: If both parents unfit — maternal grandmother has priority under Muslim law.`,
    answer_bn: `শিশুর কল্যাণই আদালতের প্রধান বিবেচনা।

মা পাবেন: ছেলে — ৭ বছর পর্যন্ত, মেয়ে — বালেগা হওয়া পর্যন্ত।
বাবা: সবসময় আইনি অভিভাবক, সন্তানের ভরণপোষণ দিতে বাধ্য।

মা হেফাজত হারাবেন যদি: পুনরায় বিবাহ করেন, অসৎ চরিত্রের প্রমাণ হয়।`
  },

  // ── MUSLIM INHERITANCE ────────────────────────────────────────────────────

  {
    id: "FAM-007",
    topic: "inheritance",
    religion: "muslim",
    is_free: false,
    source_act: "Muslim Personal Law (Shariat) Application Act 1937",
    source_section: "Section 2",
    keywords: ["inheritance", "waris", "estate", "death", "property", "faraid"],
    question_en: "How is inheritance distributed under Muslim law in Bangladesh?",
    question_bn: "বাংলাদেশে মুসলিম আইনে সম্পত্তি কীভাবে ভাগ হয়?",
    answer_en: `Muslim inheritance in Bangladesh is governed by Muslim Personal Law (Shariat) Application Act 1937 and classical Hanafi Fiqh (Faraid).

BASIC RULES:
• Male heir gets double the share of female heir of same class
• Wife: 1/8 if children exist, 1/4 if no children
• Husband: 1/4 if children exist, 1/2 if no children
• Son: Residuary (asaba) — gets remainder after fixed shares
• Daughter: Half of son's share

BEFORE DISTRIBUTION — deduct:
1. Funeral expenses
2. Debts of deceased
3. Specific bequests (wasiyyat) — max 1/3 of estate

PRIMARY HEIRS:
• Spouse (husband/wife)
• Children (sons + daughters)
• Parents (father/mother)

KEY RULES:
• Cannot disinherit a legal heir by will
• Will (wasiyyat) valid only for non-heirs and max 1/3 of estate
• Adopted children have NO inheritance rights under Muslim law
• Illegitimate children cannot inherit from father

SUCCESSION CERTIFICATE:
• Required to collect bank deposits, shares, government dues
• Apply at District Judge Court
• Required documents: death certificate, list of heirs, relationship proof`,
    answer_bn: `বাংলাদেশে মুসলিম উত্তরাধিকার হানাফি ফিকাহ (ফারায়েজ) অনুযায়ী।

মূল নিয়ম: ছেলে পাবে মেয়ের দ্বিগুণ। স্ত্রী পাবেন ১/৮ (সন্তান থাকলে) বা ১/৪ (না থাকলে)।

বিতরণের আগে: জানাজার খরচ, ঋণ, ওয়াসিয়াত (সর্বোচ্চ ১/৩) বাদ দিতে হবে।

সাকসেশন সার্টিফিকেট: ব্যাংক আমানত তুলতে জেলা জজ আদালতে আবেদন করুন।`
  },

  // ── HINDU LAW ─────────────────────────────────────────────────────────────

  {
    id: "FAM-008",
    topic: "marriage",
    religion: "hindu",
    is_free: true,
    source_act: "Hindu Marriage Act (custom) / Special Marriage Act 1872",
    source_section: "Custom and usage",
    keywords: ["hindu marriage", "hindu", "saptapadi", "vivah", "registration"],
    question_en: "What law governs Hindu marriage in Bangladesh? Can Hindus divorce?",
    question_bn: "বাংলাদেশে হিন্দু বিবাহ কোন আইনে হয়? হিন্দুরা কি তালাক নিতে পারেন?",
    answer_en: `HINDU MARRIAGE IN BANGLADESH:

Bangladesh has NO comprehensive codified Hindu Marriage Act (unlike India's Hindu Marriage Act 1955).

Hindu marriages in Bangladesh are governed by:
• Hindu personal law based on Shastric texts and customs
• Local customs and usage of the community
• Hindu Married Women's Right to Separate Residence and Maintenance Act 1946

VALID HINDU MARRIAGE requires:
• Proper Hindu religious ceremonies (Saptapadi — 7 steps, or local custom)
• Parties of Hindu faith
• Not within prohibited degrees of relationship (varies by community)

REGISTRATION:
• No mandatory registration system for Hindu marriages in Bangladesh
• Can register under Special Marriage Act 1872 (rare in practice)

DIVORCE — CRITICAL POINT:
• Traditional Hindu law has NO provision for divorce
• Bangladesh has NOT enacted a Hindu Divorce law
• Hindu couples CANNOT get a civil divorce in Bangladesh
• SEPARATION only — under Hindu Married Women's Right Act 1946

SEPARATION RIGHTS (Hindu Married Women's Right to Separate Residence Act 1946):
Wife can live separately and claim maintenance if:
• Husband has another wife living
• Husband is guilty of cruelty
• Husband has leprosy
• Husband has treated her with cruelty
• Husband converted to another religion

PRACTICAL ADVICE: Hindu couples seeking divorce convert to Islam or register under Special Marriage Act. Consult a qualified advocate.`,
    answer_bn: `বাংলাদেশে হিন্দু বিবাহ শাস্ত্রীয় আইন ও স্থানীয় প্রথা অনুযায়ী।

গুরুত্বপূর্ণ: বাংলাদেশে হিন্দুদের জন্য কোনো তালাক আইন নেই। হিন্দু দম্পতি আনুষ্ঠানিকভাবে বিবাহ বিচ্ছেদ করতে পারেন না।

পৃথক বাসস্থান: হিন্দু বিবাহিত নারীর পৃথক বাসস্থান ও ভরণপোষণ আইন ১৯৪৬ অনুযায়ী স্ত্রী আলাদা থাকতে ও ভরণপোষণ দাবি করতে পারেন।`
  },

  {
    id: "FAM-009",
    topic: "inheritance",
    religion: "hindu",
    is_free: false,
    source_act: "Hindu Succession (custom) / Dayabhaga School",
    source_section: "Dayabhaga customary law",
    keywords: ["hindu inheritance", "dayabhaga", "estate", "succession", "stridhan"],
    question_en: "How does inheritance work for Hindus in Bangladesh?",
    question_bn: "বাংলাদেশে হিন্দুদের উত্তরাধিকার কীভাবে কাজ করে?",
    answer_en: `Bangladesh follows the DAYABHAGA school of Hindu law (unlike Northern India which follows Mitakshara).

KEY FEATURES OF DAYABHAGA:
• No concept of joint family property (coparcenary) — property belongs to individual
• Sons do NOT have automatic birth right to father's property
• Father can dispose of property freely during lifetime
• Property devolves on death

ORDER OF INHERITANCE (son's property):
1. Sons
2. Daughters (in absence of sons)
3. Widow (wife)
4. Mother
5. Father
6. Brothers

WIDOW'S RIGHTS:
• Widow inherits husband's property — but as LIMITED ESTATE
• She cannot alienate (sell/gift) without legal necessity
• Property reverts to husband's heirs on her death
• STRIDHAN (woman's own property) — full ownership, she can dispose freely

DAUGHTERS:
• Daughters inherit only in absence of sons (unlike Muslim law where daughters always inherit)
• Married daughters have weaker claim than unmarried daughters in some communities

STRIDHAN (Woman's Own Property):
• Gifts received at marriage from parents, husband, in-laws
• Earnings, savings
• Wife has absolute ownership of stridhan

NOTE: Hindu succession law in Bangladesh is still largely customary — no comprehensive statute. Court applies Dayabhaga principles.`,
    answer_bn: `বাংলাদেশে হিন্দু উত্তরাধিকারে দায়ভাগ মতবাদ প্রযোজ্য।

মূল নিয়ম: সম্পত্তি ব্যক্তির — যৌথ পরিবারের স্বয়ংক্রিয় দাবি নেই।

উত্তরাধিকারের ক্রম: পুত্র → কন্যা → বিধবা স্ত্রী → মাতা → পিতা।

স্ত্রীধন: বিয়েতে পাওয়া উপহার, নিজের আয় — স্ত্রীর সম্পূর্ণ মালিকানা।`
  },

  // ── CHRISTIAN LAW ─────────────────────────────────────────────────────────

  {
    id: "FAM-010",
    topic: "marriage",
    religion: "christian",
    is_free: true,
    source_act: "Christian Marriage Act 1872 / Divorce Act 1869",
    source_section: "Christian Marriage Act 1872",
    keywords: ["christian marriage", "church", "divorce", "christian", "cross"],
    question_en: "What law governs Christian marriage and divorce in Bangladesh?",
    question_bn: "বাংলাদেশে খ্রিস্টান বিবাহ ও বিবাহ বিচ্ছেদ কোন আইনে হয়?",
    answer_en: `CHRISTIAN MARRIAGE IN BANGLADESH:
Governed by: Christian Marriage Act 1872

REQUIREMENTS:
• Solemnized by a Minister of Religion, Marriage Registrar, or before Marriage Registrar
• Notice required to Marriage Registrar (21 days)
• Registration mandatory
• Minimum age: 18 (male), 16 (female) — though Child Marriage Restraint Act 2017 applies

CHRISTIAN DIVORCE:
Governed by: Divorce Act 1869

GROUNDS FOR DIVORCE (Christian couples):
For husband: Wife's adultery
For wife:
• Husband's adultery combined with cruelty
• Husband's adultery combined with desertion (2+ years)
• Rape, sodomy, bestiality by husband
• Husband's cruelty causing danger to life

MUTUAL CONSENT DIVORCE:
• Not available under Divorce Act 1869 for Christians in Bangladesh
• Must prove specific grounds

PROCEDURE:
• File petition in District Court (Family Court jurisdiction)
• Serve notice on respondent
• If adultery — co-respondent must be joined
• Court may order separation before full divorce

MAINTENANCE:
• Court can award maintenance to wife during and after divorce proceedings
• Alimony (permanent maintenance) can be fixed

REMARRIAGE:
• Only after divorce decree is absolute
• Church permission may also be required by denomination`,
    answer_bn: `খ্রিস্টান বিবাহ: খ্রিস্টান বিবাহ আইন ১৮৭২।
খ্রিস্টান তালাক: ডিভোর্স অ্যাক্ট ১৮৬৯।

তালাকের কারণ: ব্যভিচার, নিষ্ঠুরতা, পরিত্যাগ (২+ বছর), ধর্ষণ।
পদ্ধতি: জেলা আদালতে মামলা।`
  },

  // ── ADIBASHI / UPOJATI ───────────────────────────────────────────────────

  {
    id: "FAM-011",
    topic: "marriage",
    religion: "adibashi",
    is_free: true,
    source_act: "Customary Law / CHT Regulation 1900",
    source_section: "Customary practice",
    keywords: ["adibashi", "upojati", "chakma", "marma", "tribal", "indigenous", "custom"],
    question_en: "What family law applies to Adibashi (indigenous/tribal) people in Bangladesh?",
    question_bn: "বাংলাদেশে আদিবাসী/উপজাতি মানুষদের পারিবারিক আইন কী?",
    answer_en: `ADIBASHI/UPOJATI FAMILY LAW IN BANGLADESH:

Indigenous/tribal communities in Bangladesh have their own customary laws for marriage, divorce, and inheritance.

MAJOR GROUPS AND THEIR LAW:

1. CHT (Chittagong Hill Tracts) Communities — Chakma, Marma, Tripura, Tanchangya etc.:
• Governed by CHT Regulation 1900 — customary law applies
• Traditional hereditary chiefs (Raja, Headman, Karbari) have authority
• Marriages solemnized according to community custom
• Divorce — customary — through community headman/karbari
• Inheritance — customary — varies by community

2. CHAKMA:
• Marriage: Community ceremony + payment of bride price or dowry per custom
• Divorce: Possible through traditional procedure
• Inheritance: Patrilineal — sons inherit, daughters get maintenance

3. MARMA:
• Marriage: Buddhist ceremony
• Divorce: Recognised under custom
• Inheritance: Patrilineal custom

4. PLAINS ADIBASHI — Santal, Garo, Manipuri etc.:
• Garo: MATRILINEAL — property passes through mother's line
• Santal: Patrilineal custom applies
• Each group has distinct customary rules

COURT JURISDICTION:
• For CHT — Traditional courts (Headman, Karbari) have primary jurisdiction for personal law
• District courts have appellate jurisdiction
• For Plains adibashi — Civil courts apply customary law as proved

CONSTITUTIONAL PROTECTION:
• Article 23A of Bangladesh Constitution recognises indigenous culture
• CHT Peace Accord 1997 protects customary rights

IMPORTANT: If customary law conflicts with national law (e.g., Child Marriage Restraint Act) — national law prevails in most cases.`,
    answer_bn: `বাংলাদেশের আদিবাসী/উপজাতি জনগোষ্ঠীর নিজস্ব প্রথাগত আইন রয়েছে।

পার্বত্য চট্টগ্রাম: CHT রেগুলেশন ১৯০০ প্রযোজ্য। রাজা, হেডম্যান, কারবারির কর্তৃত্ব।
চাকমা: পিতৃতান্ত্রিক উত্তরাধিকার।
গারো: মাতৃতান্ত্রিক — মায়ের বংশে সম্পত্তি যায়।
সাংবিধানিক সুরক্ষা: অনুচ্ছেদ ২৩ক আদিবাসী সংস্কৃতি স্বীকার করে।`
  },

  {
    id: "FAM-012",
    topic: "marriage",
    religion: "adibashi",
    is_free: false,
    source_act: "CHT Regulation 1900 / Customary Law",
    source_section: "CHT Regulation 1900",
    keywords: ["CHT", "parbatya", "hill tracts", "land", "customary", "adibashi rights"],
    question_en: "What are the land and property rights of CHT indigenous people?",
    question_bn: "পার্বত্য চট্টগ্রামের আদিবাসীদের জমি ও সম্পত্তির অধিকার কী?",
    answer_en: `CHT LAND RIGHTS — ADIBASHI:

LEGAL FRAMEWORK:
• CHT Regulation 1900 — primary law for CHT land
• CHT Land Dispute Resolution Commission Act 2001
• CHT Peace Accord 1997 — recognises traditional land rights

KEY PROTECTIONS:
• Non-tribal people CANNOT purchase land in CHT without permission
• Traditional land rights (jum land, homestead) recognised
• Customary rights to forests and common land recognised

TYPES OF LAND TENURE:
• Khas land — government land
• Jum land — traditional shifting cultivation land (no permanent title)
• Homestead land — private ownership
• Reserved forest — restricted

LAND DISPUTES:
• Traditional circle chiefs (Raja) have primary jurisdiction
• CHT Land Dispute Resolution Commission — for post-1947 disputes
• District court has appellate jurisdiction

CONSTITUTIONAL STATUS:
• Bangladesh Constitution Article 23A — protects indigenous culture
• BUT land rights not fully codified — major ongoing dispute

PRACTICAL ISSUES:
• Many adibashi landless due to settlement of Bengali settlers (post-1971)
• CHT Peace Accord 1997 promised land restoration — implementation incomplete
• Adibashi can file land dispute in both traditional and civil courts

ADVICE: Consult CHT-specialist advocate for land disputes.`,
    answer_bn: `পার্বত্য চট্টগ্রামে আদিবাসীদের জমির অধিকার CHT রেগুলেশন ১৯০০ ও CHT শান্তিচুক্তি ১৯৯৭ দ্বারা সুরক্ষিত।

মূল সুরক্ষা: অ-উপজাতি ব্যক্তি অনুমতি ছাড়া CHT-তে জমি কিনতে পারবেন না।
ঐতিহ্যবাহী অধিকার: জুম চাষের জমি, বসতভিটা স্বীকৃত।`
  },

  // ── GENERAL FAMILY LAW ────────────────────────────────────────────────────

  {
    id: "FAM-013",
    topic: "general",
    religion: "general",
    is_free: true,
    source_act: "Family Courts Ordinance 1985",
    source_section: "Section 5",
    keywords: ["family court", "jurisdiction", "procedure", "which court"],
    question_en: "Which court handles family law cases in Bangladesh?",
    question_bn: "বাংলাদেশে পারিবারিক মামলা কোন আদালতে হয়?",
    answer_en: `FAMILY COURTS IN BANGLADESH:

Under Family Courts Ordinance 1985 — each district has a Family Court.

FAMILY COURT JURISDICTION (Section 5):
• Dissolution of marriage (divorce)
• Restitution of conjugal rights
• Dower (denmahr)
• Maintenance
• Guardianship and custody of children

WHICH COURT:
• Assistant Judge Court in every district = Family Court
• File in the district where wife resides OR where marriage took place

PROCEDURE:
1. File plaint with court fees
2. Serve notice on defendant (spouse)
3. Mandatory mediation attempt by court
4. If mediation fails — trial proceeds
5. Evidence, witnesses
6. Final decree

APPEAL:
• District Judge Court
• Then High Court Division

SPECIAL FEATURES:
• No court fees on denmahr suits (affordable for women)
• Speedy trial intended — 6 months target (rarely achieved in practice)
• Mediation mandatory before trial

LEGAL AID:
• National Legal Aid Services Organisation (NLASO) provides free lawyers for poor women
• Women and Children Repression Prevention Act cases — free legal aid available`,
    answer_bn: `বাংলাদেশে পারিবারিক মামলা পারিবারিক আদালতে হয় (সহকারী জজ আদালত)।

এখতিয়ার: বিবাহ বিচ্ছেদ, দেনমোহর, ভরণপোষণ, শিশু হেফাজত।

ফাইল করুন: যেখানে স্ত্রী থাকেন বা বিয়ে হয়েছিল সেই জেলায়।

আপিল: জেলা জজ → হাইকোর্ট বিভাগ।`
  },

  {
    id: "FAM-014",
    topic: "child_marriage",
    religion: "general",
    is_free: true,
    source_act: "Child Marriage Restraint Act 2017",
    source_section: "Section 2 & 7",
    keywords: ["child marriage", "age", "minor", "underage", "bal bibah"],
    question_en: "What is the legal age of marriage in Bangladesh and what happens if child marriage occurs?",
    question_bn: "বাংলাদেশে বিবাহের বৈধ বয়স কত এবং বাল্যবিবাহ হলে কী হয়?",
    answer_en: `CHILD MARRIAGE RESTRAINT ACT 2017:

LEGAL MINIMUM AGE:
• Male: 21 years
• Female: 18 years

SPECIAL EXCEPTION (Controversial):
• Section 19 — "Special cases" — court can allow marriage below minimum age in "best interest of minor" — criticized as allowing child marriage loophole

PUNISHMENT for child marriage:
• Those who arrange/conduct child marriage: Imprisonment up to 2 years or fine BDT 50,000 or both
• Parents/guardians who allow: Same punishment
• Person who marries a minor (adult): Same punishment

THE MARRIAGE IS VOIDABLE:
• Child marriage is NOT automatically void — but voidable at option of child on reaching majority
• Child can go to court to have marriage annulled

REPORTING:
• Any person can report child marriage to Upazila Nirbahi Officer (UNO) or Police
• Courts can issue injunction to stop child marriage

PROTECTION:
• Women and Children Repression Prevention Act also applies
• Child Rights Act 2013 provides additional protection

PRACTICAL REALITY:
• Child marriage remains widespread in rural Bangladesh despite law
• Enforcement is weak
• NGOs and local government officers can intervene`,
    answer_bn: `বাল্যবিবাহ নিরোধ আইন ২০১৭:

বিবাহের বয়স: ছেলে ২১ বছর, মেয়ে ১৮ বছর।

শাস্তি: যারা বিয়ে দেন বা করেন — ২ বছর কারাদণ্ড বা ৫০,০০০ টাকা জরিমানা বা উভয়।

বিবাহ বাতিল: সাবালকত্বে পৌঁছে শিশু নিজেই আদালতে বিয়ে বাতিলের আবেদন করতে পারবে।`
  },

  {
    id: "FAM-015",
    topic: "domestic_violence",
    religion: "general",
    is_free: true,
    source_act: "Domestic Violence (Prevention and Protection) Act 2010",
    source_section: "Section 3 & 12",
    keywords: ["domestic violence", "abuse", "wife beating", "protection order", "shelter"],
    question_en: "What protection does a woman have against domestic violence in Bangladesh?",
    question_bn: "বাংলাদেশে গৃহ নির্যাতন থেকে নারীর কী সুরক্ষা আছে?",
    answer_en: `DOMESTIC VIOLENCE (PREVENTION AND PROTECTION) ACT 2010:

WHAT IS DOMESTIC VIOLENCE (Section 3):
• Physical abuse (hitting, beating, injury)
• Psychological/emotional abuse (threats, humiliation)
• Sexual abuse
• Economic abuse (denying money, destroying property)
• Any harm by family member in shared household

WHO CAN FILE:
• Wife, ex-wife, female partner
• Mother, daughter, sister living in same house
• Any woman in domestic relationship

HOW TO GET PROTECTION:

1. PROTECTION ORDER from Court:
• File application in Magistrate Court or Family Court
• Court can issue order within 3 working days
• Order prohibits abuser from entering home, contacting victim

2. RESIDENCE ORDER:
• Court can allow victim to stay in shared home
• Can remove abuser from home

3. MONETARY RELIEF:
• Court can order abuser to pay compensation
• Medical expenses, loss of earnings

4. CUSTODY ORDER during violence proceedings

ENFORCEMENT:
• Magistrate can take cognizance immediately
• Police must assist — failure to assist is misconduct

NATIONAL HELPLINES:
• 109 — Women and Children helpline (free, 24 hours)
• One Stop Crisis Centre (OCC) — in major hospitals
• National Legal Aid: 16430

PUNISHMENT for domestic violence:
• Up to 2 years imprisonment or fine or both`,
    answer_bn: `গৃহ নির্যাতন (প্রতিরোধ ও সুরক্ষা) আইন ২০১০:

সুরক্ষা আদেশ: ম্যাজিস্ট্রেট আদালতে আবেদন করুন — ৩ দিনের মধ্যে আদেশ পাওয়া যায়।

জাতীয় হেল্পলাইন: ১০৯ (বিনামূল্যে, ২৪ ঘণ্টা)।

শাস্তি: ২ বছর কারাদণ্ড বা জরিমানা বা উভয়।`
  },
]

// ── HELPERS ──────────────────────────────────────────────────────────────────

export function getFamilyQA(lang: "en" | "bn" = "en") {
  return familyLaw.map(q => ({
    id: q.id,
    question: lang === "bn" ? q.question_bn : q.question_en,
    answer: lang === "bn" ? q.answer_bn : q.answer_en,
    topic: q.topic,
    religion: q.religion,
    source: `${q.source_act}, ${q.source_section}`,
    is_free: q.is_free,
    keywords: q.keywords,
  }))
}

export function searchFamilyLaw(query: string, lang: "en" | "bn" = "en") {
  const lower = query.toLowerCase()
  return familyLaw.filter(q =>
    q.keywords.some(k => k.includes(lower)) ||
    q.question_en.toLowerCase().includes(lower) ||
    q.topic.includes(lower) ||
    q.religion.includes(lower)
  ).map(q => ({
    id: q.id,
    question: lang === "bn" ? q.question_bn : q.question_en,
    answer: lang === "bn" ? q.answer_bn : q.answer_en,
    topic: q.topic,
    religion: q.religion,
    source: `${q.source_act}, ${q.source_section}`,
    is_free: q.is_free,
  }))
}

export const FAMILY_TOPICS = [
  { key: "divorce",         label_en: "Divorce",          label_bn: "তালাক/বিচ্ছেদ" },
  { key: "denmahr",         label_en: "Denmahr (Mahr)",   label_bn: "দেনমোহর" },
  { key: "maintenance",     label_en: "Maintenance",       label_bn: "ভরণপোষণ" },
  { key: "custody",         label_en: "Child Custody",     label_bn: "শিশু হেফাজত" },
  { key: "inheritance",     label_en: "Inheritance",       label_bn: "উত্তরাধিকার" },
  { key: "marriage",        label_en: "Marriage Law",      label_bn: "বিবাহ আইন" },
  { key: "domestic_violence",label_en:"Domestic Violence", label_bn: "গৃহ নির্যাতন" },
  { key: "child_marriage",  label_en: "Child Marriage",    label_bn: "বাল্যবিবাহ" },
]

export const FAMILY_RELIGIONS = [
  { key: "muslim",   label: "Muslim (মুসলিম)" },
  { key: "hindu",    label: "Hindu (হিন্দু)" },
  { key: "christian",label: "Christian (খ্রিস্টান)" },
  { key: "adibashi", label: "Adibashi/Upojati (আদিবাসী)" },
  { key: "general",  label: "General (সাধারণ)" },
]
