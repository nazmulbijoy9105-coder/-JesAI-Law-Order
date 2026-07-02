/**
 * JesAI Family Law Knowledge Module
 * Bangladesh Family Law — Muslim, Hindu, Christian, Adibashi/Upojati
 * Validated by: Md Nazmul Islam (Bijoy), Advocate, Supreme Court of Bangladesh
 * Last updated: March 2026
 * Q&As: 30 (FAM-001 to FAM-030)
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

গুরুত্বপূর্ণ: তাৎক্ষণিক মোহর না পেলে স্ত্রী সহবাস অস্বীকার করতে পারেন (হাবসে নাফস)।`
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

ADVICE: Consult CHT-specialist advocate for land disputes.`,
    answer_bn: `পার্বত্য চট্টগ্রামে আদিবাসীদের জমির অধিকার CHT রেগুলেশন ১৯০০ ও CHT শান্তিচুক্তি ১৯৯৭ দ্বারা সুরক্ষিত।

মূল সুরক্ষা: অ-উপজাতি ব্যক্তি অনুমতি ছাড়া CHT-তে জমি কিনতে পারবেন না।`
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

LEGAL AID:
• National Legal Aid Services Organisation (NLASO) provides free lawyers for poor women
• Call: 16430`,
    answer_bn: `বাংলাদেশে পারিবারিক মামলা পারিবারিক আদালতে হয় (সহকারী জজ আদালত)।

এখতিয়ার: বিবাহ বিচ্ছেদ, দেনমোহর, ভরণপোষণ, শিশু হেফাজত।

ফাইল করুন: যেখানে স্ত্রী থাকেন বা বিয়ে হয়েছিল সেই জেলায়।

আপিল: জেলা জজ → হাইকোর্ট বিভাগ। আইনি সহায়তা: ১৬৪৩০।`
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

PUNISHMENT for child marriage:
• Those who arrange/conduct child marriage: Imprisonment up to 2 years or fine BDT 50,000 or both
• Parents/guardians who allow: Same punishment
• Person who marries a minor (adult): Same punishment

THE MARRIAGE IS VOIDABLE:
• Child marriage is NOT automatically void — but voidable at option of child on reaching majority
• Child can go to court to have marriage annulled

REPORTING:
• Any person can report child marriage to Upazila Nirbahi Officer (UNO) or Police
• Courts can issue injunction to stop child marriage`,
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

HOW TO GET PROTECTION:

1. PROTECTION ORDER from Court:
• File application in Magistrate Court or Family Court
• Court can issue order within 3 working days
• Order prohibits abuser from entering home, contacting victim

2. RESIDENCE ORDER:
• Court can allow victim to stay in shared home
• Can remove abuser from home

3. MONETARY RELIEF:
• Court can order abuser to pay compensation for medical expenses, loss of earnings

NATIONAL HELPLINES:
• 109 — Women and Children helpline (free, 24 hours)
• One Stop Crisis Centre (OCC) — in major hospitals
• National Legal Aid: 16430

PUNISHMENT: Up to 2 years imprisonment or fine or both`,
    answer_bn: `গৃহ নির্যাতন (প্রতিরোধ ও সুরক্ষা) আইন ২০১০:

সুরক্ষা আদেশ: ম্যাজিস্ট্রেট আদালতে আবেদন করুন — ৩ দিনের মধ্যে আদেশ পাওয়া যায়।

জাতীয় হেল্পলাইন: ১০৯ (বিনামূল্যে, ২৪ ঘণ্টা)।

শাস্তি: ২ বছর কারাদণ্ড বা জরিমানা বা উভয়।`
  },

  // ── NEW: FAM-016, FAM-017, FAM-018 ──────────────────────────────────────

  {
    id: "FAM-016",
    topic: "marriage",
    religion: "muslim",
    is_free: true,
    source_act: "Muslim Family Laws Ordinance 1961",
    source_section: "Section 6",
    keywords: ["polygamy", "second wife", "second marriage", "multiple wives", "bigamy", "arbitration council"],
    question_en: "Can a Muslim man marry a second wife in Bangladesh? What permission is needed?",
    question_bn: "বাংলাদেশে মুসলিম পুরুষ কি দ্বিতীয় বিয়ে করতে পারেন? কী অনুমতি প্রয়োজন?",
    answer_en: `Under the Muslim Family Laws Ordinance 1961 (Section 6), a Muslim man CAN marry more than one wife but MUST follow a strict legal procedure.

MANDATORY STEPS:
1. APPLY to the Chairman of Union Parishad/Ward Commissioner for permission
2. Chairman forms an ARBITRATION COUNCIL (one representative from each side)
3. Council examines whether existing wife or wives consent and whether additional marriage is justified
4. PERMISSION GRANTED or REFUSED by Chairman after council recommendation

GROUNDS FOR PERMISSION:
• Existing wife is unable to bear children
• Existing wife has serious illness
• Other just and sufficient cause

WITHOUT PERMISSION:
• Criminal offence under Section 6(5)
• Punishment: Imprisonment up to 1 year OR fine BDT 10,000 OR both
• Second marriage without permission is NOT automatically void — it is legally valid but husband is criminally liable
• Existing wife has right to immediate prompt denmahr and can apply for divorce

EXISTING WIFE'S RIGHTS:
• Right to be notified
• Right to represent in Arbitration Council
• If husband proceeds without permission — she can claim:
  - Full prompt denmahr immediately
  - Divorce on ground of polygamy without permission
  - Maintenance throughout proceedings

PRACTICAL ADVICE: Permission is rarely granted. Any second marriage without permission exposes husband to criminal prosecution. First wife should file complaint immediately with Union Parishad Chairman.`,
    answer_bn: `মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ (ধারা ৬) অনুযায়ী মুসলিম পুরুষ একাধিক বিয়ে করতে পারেন, তবে আইনি অনুমতি বাধ্যতামূলক।

বাধ্যতামূলক পদক্ষেপ: ইউনিয়ন পরিষদ চেয়ারম্যানের কাছে আবেদন → সালিশি পরিষদ গঠন → বিদ্যমান স্ত্রীর মতামত যাচাই → অনুমতি।

অনুমতি ছাড়া বিয়ে: ১ বছর কারাদণ্ড বা ১০,০০০ টাকা জরিমানা বা উভয়।

বিদ্যমান স্ত্রীর অধিকার: তাৎক্ষণিক দেনমোহর দাবি ও তালাকের আবেদন করতে পারবেন।`
  },

  {
    id: "FAM-017",
    topic: "divorce",
    religion: "muslim",
    is_free: true,
    source_act: "Muslim Personal Law / Muslim Family Laws Ordinance 1961",
    source_section: "Section 7 MFLO / Quran 2:228, 65:1-4",
    keywords: ["iddat", "iddah", "waiting period", "remarriage", "after divorce", "after death"],
    question_en: "What is Iddat (waiting period) after divorce or husband's death in Bangladesh?",
    question_bn: "বাংলাদেশে তালাক বা স্বামীর মৃত্যুর পর ইদ্দত কী?",
    answer_en: `IDDAT is the mandatory waiting period a Muslim woman must observe after divorce or husband's death before she can remarry.

THREE TYPES OF IDDAT:

1. IDDAT AFTER TALAQ (Divorce):
• If wife menstruates: 3 menstrual cycles (approx 3 months)
• If wife does not menstruate (old age/young): 3 lunar months
• If wife is pregnant: Until delivery of child

2. IDDAT AFTER HUSBAND'S DEATH:
• Normal: 4 months and 10 days
• If pregnant: Until delivery, even if longer than 4 months 10 days

3. IDDAT AFTER KHUL/MUBARAT:
• Same as after talaq — 3 menstrual cycles

LEGAL SIGNIFICANCE IN BANGLADESH:
• Under MFLO 1961 Section 7 — talaq only becomes final after 90 days (which aligns with iddat)
• Maintenance: Husband must pay full maintenance during iddat after talaq
• Housing: Wife has right to stay in matrimonial home during iddat
• After iddat ends: No more maintenance obligation (unless pregnant)
• Deferred mahr becomes payable on completion of iddat after talaq

REMARRIAGE:
• Woman CANNOT remarry during iddat — doing so is a criminal offence and makes second marriage void
• After iddat completion — free to remarry`,
    answer_bn: `ইদ্দত হলো তালাক বা স্বামীর মৃত্যুর পর মুসলিম নারীর বাধ্যতামূলক অপেক্ষাকালীন সময়।

তালাকের পর: ৩টি মাসিক চক্র (প্রায় ৩ মাস)। গর্ভবতী হলে সন্তান প্রসব পর্যন্ত।

স্বামীর মৃত্যুর পর: ৪ মাস ১০ দিন।

আইনি গুরুত্ব: ইদ্দতকালে পূর্ণ ভরণপোষণ ও বাসস্থান পাবেন। ইদ্দত শেষ হওয়ার আগে পুনরায় বিয়ে করা যাবে না।`
  },

  {
    id: "FAM-018",
    topic: "general",
    religion: "general",
    is_free: false,
    source_act: "Family Courts Ordinance 1985",
    source_section: "Section 9",
    keywords: ["restitution", "conjugal rights", "wife left", "husband left", "return home", "desertion"],
    question_en: "What is Restitution of Conjugal Rights and how to file in Bangladesh?",
    question_bn: "দাম্পত্য অধিকার পুনরুদ্ধার কী এবং বাংলাদেশে কীভাবে মামলা করবেন?",
    answer_en: `RESTITUTION OF CONJUGAL RIGHTS (RCR) is a legal remedy where a spouse can ask the court to order their partner to return to the matrimonial home and resume marital life.

LEGAL BASIS:
Family Courts Ordinance 1985, Section 9

WHO CAN FILE:
• Husband — if wife has left matrimonial home without lawful excuse
• Wife — if husband has abandoned or deserted her without cause

COURT WILL REFUSE RCR if:
• Respondent has valid reason to live separately (cruelty, non-payment of mahr, illness)
• Petitioner is guilty of cruelty or misconduct
• Petitioner failed to pay prompt denmahr (for wife's refusal)
• Cohabitation would be harmful to respondent's health or safety

PROCEDURE:
1. File plaint in Family Court (Assistant Judge) of district where wife resides
2. Mandatory mediation attempt
3. If mediation fails — trial
4. If court grants RCR — respondent must comply within time fixed

ENFORCEMENT:
• Court cannot physically force compliance
• If respondent ignores RCR order — treated as desertion
• Petitioner can then file for divorce on ground of desertion

PRACTICAL NOTE: RCR suits are used as a step before divorce proceedings. A Muslim wife can resist by proving prompt mahr is unpaid — court will not force her to return until paid.`,
    answer_bn: `দাম্পত্য অধিকার পুনরুদ্ধার: পারিবারিক আদালত অধ্যাদেশ ১৯৮৫, ধারা ৯।

কে করতে পারেন: স্বামী (স্ত্রী চলে গেলে) বা স্ত্রী (স্বামী পরিত্যাগ করলে)।

আদালত অস্বীকার করবে যদি: নিষ্ঠুর আচরণের প্রমাণ, তাৎক্ষণিক মোহর অপরিশোধিত, নিরাপত্তার ঝুঁকি।

ব্যবহারিক: এই মামলা সাধারণত তালাকের আগের পদক্ষেপ। আদালত শারীরিকভাবে ফিরতে বাধ্য করতে পারে না।`
  },
  {
    id: "FAM-019",
    topic: "general",
    religion: "general",
    is_free: true,
    source_act: "Dowry Prohibition Act 1980 / Dowry Prohibition (Amendment) Act 2018",
    source_section: "Section 2, 3, 4",
    keywords: ["dowry", "dower", "joutuk", "dowry demand", "dowry death", "dowry harassment"],
    question_en: "What is dowry and what are the legal consequences of demanding or giving dowry in Bangladesh?",
    question_bn: "যৌতুক কী এবং বাংলাদেশে যৌতুক দাবি বা দেওয়ার আইনি পরিণতি কী?",
    answer_en: `DOWRY (Joutuk) is any property or valuable security given or agreed to be given directly or indirectly by one party to a marriage to the other party, or by parents of either party, in connection with the marriage.

DOWRY PROHIBITION ACT 1980 (as amended 2018):

OFFENCES:
1. DEMANDING DOWRY: Punishable with imprisonment up to 5 years OR fine up to BDT 50,000 OR both
2. GIVING DOWRY: Punishable with imprisonment up to 1 year OR fine OR both
3. ADVERTISING for dowry: Punishable with imprisonment up to 6 months OR fine
4. DOWRY DEATH: If a woman dies within 7 years of marriage due to dowry-related cruelty — husband and in-laws can be charged with dowry death (up to life imprisonment)

DOWRY DEATH (Section 11B):
• Woman dies within 7 years of marriage
• Death caused by burns, bodily injury, or unnatural circumstances
• Soon before death, she was subjected to cruelty or harassment for dowry
• PRESUMPTION: Court shall presume husband/relatives caused death

COGNIZABLE & NON-BAILABLE:
• Police can arrest without warrant
• Bail is difficult — usually denied
• Trial in Sessions Court

PROTECTION FOR WOMEN:
• Any person can report dowry demand to police
• Court can issue protection order
• Victim can seek shelter at One Stop Crisis Centre (OCC)
• Legal aid available through NLASO (16430)

PRACTICAL ADVICE:
• Document all dowry demands (messages, recordings, witnesses)
• Report to police immediately — delay weakens case
• File case under Dowry Prohibition Act + Domestic Violence Act 2010 simultaneously
• Seek interim maintenance and protection order from court`,
    answer_bn: `যৌতুক হলো বিবাহের সাথে সম্পর্কিত কোনো সম্পত্তি বা মূল্যবান জিনিস দেওয়া বা দেওয়ার প্রতিশ্রুতি।

যৌতুক নিরোধ আইন ১৯৮০ (সংশোধিত ২০১৮):

অপরাধ: যৌতুক দাবি (৫ বছর কারাদণ্ড), যৌতুক দেওয়া (১ বছর কারাদণ্ড), যৌতুক মৃত্যু (যাবজ্জীবন)।

যৌতুক মৃত্যু: বিবাহের ৭ বছরের মধ্যে নিষ্ঠুরতায় মৃত্যু — স্বামী ও শ্বশুরবাড়ির লোকদের বিরুদ্ধে মামলা।

প্রতিরক্ষা: পুলিশে রিপোর্ট করুন, আদালতে সুরক্ষা আদেশ চান, ওয়ান স্টপ ক্রাইসিস সেন্টারে আশ্রয় নিন।`
  },

  {
    id: "FAM-020",
    topic: "general",
    religion: "general",
    is_free: true,
    source_act: "Guardians and Wards Act 1890",
    source_section: "Section 7, 12, 17",
    keywords: ["guardianship", "legal guardian", "minor", "child guardian", "property guardian", "natural guardian"],
    question_en: "Who is the legal guardian of a child in Bangladesh and how is guardianship appointed?",
    question_bn: "বাংলাদেশে শিশুর আইনি অভিভাবক কে এবং অভিভাবকত্ব কীভাবে নিয়োগ করা হয়?",
    answer_en: `GUARDIANSHIP in Bangladesh is governed by the Guardians and Wards Act 1890.

TYPES OF GUARDIANSHIP:

1. NATURAL GUARDIAN:
• Father is the natural guardian of minor children
• Mother becomes natural guardian if father is dead, unfit, or absent
• Natural guardian has authority over person AND property of minor

2. TESTAMENTARY GUARDIAN:
• Appointed by will of natural guardian (father or mother)
• Takes effect after death of appointing parent
• Can be appointed for person, property, or both

3. COURT-APPOINTED GUARDIAN:
• District Judge appoints when no natural guardian exists or natural guardian is unfit
• Application filed under Guardians and Wards Act Section 7
• Court considers: welfare of child, character of applicant, wishes of deceased parent, age/sex/religion of child

WHO CAN APPLY FOR GUARDIANSHIP:
• Any person desiring to be appointed guardian
• Relative of the minor
• Collector of the district
• Friend of the minor

COURT CONSIDERATIONS (Section 17):
• Welfare of the minor is PARAMOUNT
• Age, sex, and religion of minor
• Character and capacity of proposed guardian
• Wishes of deceased parents (if any)
• Existing relationships and affections
• Any existing custody orders

POWERS OF GUARDIAN:
• Custody and upbringing of child
• Education and religious instruction
• Management of minor's property (subject to court supervision for significant transactions)
• Cannot transfer minor's immovable property without court permission

REMOVAL OF GUARDIAN:
• Court can remove guardian for: abuse of trust, failure in duty, incapacity, ill-treatment, or if removal is in minor's interest`,
    answer_bn: `অভিভাবকত্ব: Guardians and Wards Act ১৮৯০।

প্রকার: প্রাকৃতিক অভিভাবক (বাবা), উইলের মাধ্যমে নিযুক্ত, আদালত কর্তৃক নিযুক্ত।

আদালত বিবেচনা করে: শিশুর কল্যাণ, আবেদনকারীর চরিত্র, মৃত পিতামাতার ইচ্ছা।

অভিভাবকের ক্ষমতা: লালনপালন, শিক্ষা, সম্পত্তি ব্যবস্থাপনা (আদালতের অনুমতি ছাড়া জমি বিক্রি করা যাবে না)।`
  },

  {
    id: "FAM-021",
    topic: "general",
    religion: "general",
    is_free: false,
    source_act: "Adoption Regulation Act 2022 / Guardians and Wards Act 1890",
    source_section: "Adoption Regulation Act 2022",
    keywords: ["adoption", "adopt", "foster", "dattak", "child adoption", "adopt child bangladesh"],
    question_en: "What is the law on child adoption in Bangladesh?",
    question_bn: "বাংলাদেশে শিশু দত্তক গ্রহণের আইন কী?",
    answer_en: `ADOPTION LAW IN BANGLADESH:

Bangladesh does NOT have a comprehensive adoption law that creates full parent-child legal relationship. However, there are limited mechanisms:

1. ADOPTION REGULATION ACT 2022:
• Governs inter-country adoption (foreigners adopting Bangladeshi children)
• Regulated by Ministry of Social Welfare
• Only for abandoned, orphaned, or surrendered children
• Requires court approval and home study
• Very restrictive — few adoptions granted annually

2. DE FACTO ADOPTION (Guardianship under GWA 1890):
• Most common form in Bangladesh
• Person applies to District Judge for guardianship of child
• Court appoints as guardian under Guardians and Wards Act 1890
• Does NOT create full parent-child relationship
• Child does NOT inherit as natural child
• Guardian can raise child but legal status remains different

3. MUSLIM LAW — NO ADOPTION:
• Classical Muslim law does not recognise adoption (kafala only — foster care)
• Adopted child has NO inheritance rights from adoptive parents under Muslim law
• Can make will (wasiyyat) for adopted child up to 1/3 of estate

4. HINDU LAW:
• Some Hindu communities recognise traditional adoption (dattak)
• Requires religious ceremony and community acceptance
• Adopted child gets inheritance rights in some communities

PRACTICAL ADVICE:
• For inheritance: Make will in favour of adopted child (Muslim: max 1/3)
• For custody: Apply for guardianship under GWA 1890
• Foreign adoption: Contact Ministry of Social Welfare — process takes 2+ years`,
    answer_bn: `বাংলাদেশে পূর্ণাঙ্গ দত্তক আইন নেই।

আন্তর্জাতিক দত্তক: Adoption Regulation Act ২০২২ — সীমিত ও জটিল।

বাস্তব দত্তক: Guardians and Wards Act ১৮৯০ — অভিভাবকত্ব নিয়োগ। কিন্তু দত্তক সন্তানের উত্তরাধিকারের অধিকার নেই (মুসলিম আইনে)।

মুসলিম আইন: দত্তক স্বীকৃত নয়। ওয়াসিয়াতের মাধ্যমে সর্বোচ্চ ১/৩ সম্পত্তি দেওয়া যায়।`
  },

  {
    id: "FAM-022",
    topic: "maintenance",
    religion: "general",
    is_free: true,
    source_act: "Family Courts Ordinance 1985 / Code of Civil Procedure 1908",
    source_section: "Section 9 FCO / Order 21 CPC",
    keywords: ["maintenance enforcement", "maintenance not paid", "execute maintenance order", "attachment salary", "contempt maintenance"],
    question_en: "What can I do if my ex-husband refuses to pay court-ordered maintenance?",
    question_bn: "আদালতের ভরণপোষণ আদেশ অমান্য করলে কী করব?",
    answer_en: `ENFORCEMENT OF MAINTENANCE ORDERS IN BANGLADESH:

If a husband refuses to pay court-ordered maintenance, the wife has several enforcement mechanisms:

1. EXECUTION APPLICATION (Order 21 CPC):
• File execution petition in same Family Court
• Court can attach husband's:
  - Bank accounts
  - Salary/wages (up to 50% can be attached from government salary)
  - Movable property (vehicles, jewellery, livestock)
  - Immovable property (land, house — can be sold after attachment)

2. ATTACHMENT OF SALARY:
• For government employees: Court sends garnishee notice to employer
• Employer must deduct maintenance from salary and pay to court
• Up to 50% of salary can be attached for maintenance

3. CONTEMPT OF COURT:
• Willful disobedience of court order = contempt
• Punishment: Imprisonment up to 6 months OR fine OR both
• Husband can be sent to jail until he purges contempt (pays)

4. PROCLAMATION AND ATTACHMENT:
• If husband absconds to avoid payment
• Court issues proclamation requiring appearance
• Property can be attached even in his absence

5. INTERIM MAINTENANCE:
• Even during appeal, wife can claim interim maintenance
• Court can order immediate payment pending final disposal

PRACTICAL STEPS:
1. File execution petition immediately after default
2. Provide husband's employment details, bank accounts, property information
3. Request specific attachment (salary, bank account)
4. If husband hides assets — request court commission for discovery
5. For persistent non-payment — file contempt petition

TIME LIMIT: Execution application should be filed within 3 years of decree, but maintenance is recurring — each missed payment is a fresh cause of action`,
    answer_bn: `ভরণপোষণ আদেশ বাস্তবায়ন:

১. কার্যকরণ আবেদন (CPC Order ২১): ব্যাংক অ্যাকাউন্ট, বেতন, সম্পত্তি জব্দ।
২. বেতন জব্দ: সরকারি চাকরিজীবীর বেতন থেকে ৫০% কাটা যায়।
৩. আদালত অবমাননা: ৬ মাস কারাদণ্ড বা জরিমানা।
৪. অন্তর্বর্তী ভরণপোষণ: আপিল চলাকালীনও পাওয়া যায়।

পদক্ষেপ: কার্যকরণ আবেদন দ্রুত দাখিল করুন, স্বামীর সম্পদের তথ্য দিন।`
  },

  {
    id: "FAM-023",
    topic: "marriage",
    religion: "general",
    is_free: true,
    source_act: "Special Marriage Act 1872",
    source_section: "Section 4, 5, 6",
    keywords: ["interfaith marriage", "inter religion marriage", "hindu muslim marriage", "christian muslim marriage", "civil marriage", "special marriage"],
    question_en: "Can people of different religions marry in Bangladesh? What is the Special Marriage Act?",
    question_bn: "বাংলাদেশে ভিন্ন ধর্মের মানুষ বিবাহ করতে পারেন? স্পেশাল ম্যারেজ অ্যাক্ট কী?",
    answer_en: `INTERFAITH MARRIAGE IN BANGLADESH:

Bangladesh law recognises interfaith marriage through the SPECIAL MARRIAGE ACT 1872.

WHO CAN MARRY UNDER SPECIAL MARRIAGE ACT:
• Persons of different religions
• Persons who do not wish to marry under personal religious law
• Persons who renounce their religion for marriage purposes

REQUIREMENTS:
1. One party must give NOTICE to Marriage Registrar (21 days before marriage)
2. Both parties must sign DECLARATION stating:
   - They do not profess Hindu, Muslim, Christian, Parsi, Jewish, or Buddhist religion
   - OR they intend to marry under this Act despite religious difference
3. Minimum age: 21 (male), 18 (female)
4. Neither party has living spouse
5. Parties not within prohibited degrees (consanguinity)

PROCEDURE:
1. Notice to Marriage Registrar of district where one party has resided 30+ days
2. 21-day waiting period (for objections)
3. Marriage solemnized before Registrar and 3 witnesses
4. Certificate of marriage issued
5. Marriage registered

EFFECT OF SPECIAL MARRIAGE:
• Marriage is CIVIL — not governed by personal religious law
• Parties can opt to continue under personal law for some matters (by declaration)
• Succession: Governed by Indian Succession Act 1865 (as applied to Bangladesh)
• Divorce: Governed by Divorce Act 1869

PRACTICAL CHALLENGES:
• Social and family opposition is common
• Some Registrars refuse to perform interfaith marriages
• Conversion to Islam is sometimes used as alternative (but has legal complications)
• No specific law protecting interfaith couples from family violence

IMPORTANT: Marriage under Special Marriage Act does NOT require conversion. Both parties retain their original religion.`,
    answer_bn: `বাংলাদেশে Special Marriage Act ১৮৭২ অনুযায়ী ভিন্ন ধর্মের বিবাহ সম্ভব।

প্রয়োজন: ২১ দিনের নোটিশ, নিবন্ধকের সামনে বিবাহ, ৩ সাক্ষী।

বৈবাহিক অবস্থা: নাগরিক বিবাহ — ব্যক্তিগত ধর্মীয় আইন প্রযোজ্য নয়। উত্তরাধিকার: Indian Succession Act ১৮৬৫। তালাক: Divorce Act ১৮৬৯।

বাস্তব চ্যালেঞ্জ: সামাজিক বিরোধিতা, কিছু নিবন্ধক অস্বীকার করেন, পারিবারিক সহিংসতার বিশেষ সুরক্ষা আইন নেই।`
  },

  {
    id: "FAM-024",
    topic: "general",
    religion: "general",
    is_free: false,
    source_act: "Succession Act 1925 / Muslim Personal Law",
    source_section: "Succession Act 1925",
    keywords: ["will", "testament", "wasiyyat", "property will", "write will", "inheritance will"],
    question_en: "Can I write a will in Bangladesh? What are the rules for different religions?",
    question_bn: "বাংলাদেশে আমি ওয়াসিয়াত/উইল লিখতে পারব? বিভিন্ন ধর্মের নিয়ম কী?",
    answer_en: `WILL (Wasiyyat) LAW IN BANGLADESH — varies by religion:

MUSLIM WILL:
• Governed by Muslim Personal Law
• ANY Muslim of sound mind and adult (18+) can make will
• Must be in writing (recommended) — oral will valid only in very limited circumstances
• Must be signed by testator and 2 witnesses
• LIMITATION: Can bequeath MAXIMUM 1/3 of estate to non-heirs
• CANNOT disinherit legal heirs (Quranic sharers) — will for heirs only valid with their consent
• Can give to charity, friends, adopted children, institutions
• Registration: Optional but recommended at Sub-Registry

HINDU WILL:
• Governed by Succession Act 1925 (for wills) + Hindu customary law
• Any Hindu of sound mind and adult can make will
• Must be in writing, signed by testator, attested by 2 witnesses
• Can dispose of ENTIRE property (no 1/3 limit like Muslim law)
• Can disinherit legal heirs
• Registration recommended

CHRISTIAN WILL:
• Governed by Succession Act 1925
• Any Christian of sound mind and adult
• Must be in writing, signed by testator, attested by 2 witnesses
• Can dispose of entire property
• Can disinherit heirs

GENERAL FORMALITIES (Succession Act 1925):
• Written document
• Signed by testator (or someone at testator's direction in testator's presence)
• Attested by 2 witnesses who see testator sign
• Witnesses should not be beneficiaries (recommended)

REVOCATION:
• Will can be revoked anytime during lifetime by new will or destruction
• Marriage of Muslim testator does NOT revoke will (unlike some jurisdictions)

PROBATE:
• After death, will must be proved in court (District Judge Court) for immovable property
• Executor applies for probate — court verifies authenticity
• Without probate, immovable property cannot be transferred based on will

PRACTICAL ADVICE:
• Use lawyer-drafted will to avoid ambiguity
• Register at Sub-Registry for added security
• Keep original safe, give copy to trusted person
• Review periodically and update`,
    answer_bn: `ওয়াসিয়াত/উইল — ধর্ম অনুযায়ী ভিন্ন নিয়ম:

মুসলিম: সর্বোচ্চ ১/৩ সম্পত্তি অ-উত্তরাধিকারকে দেওয়া যায়। আইনি উত্তরাধিকারকে বাদ দেওয়া যাবে না। লিখিত, ২ সাক্ষী।

হিন্দু: সম্পূর্ণ সম্পত্তি দান করা যায়। উত্তরাধিকারকে বাদ দেওয়া যায়।

খ্রিস্টান: Succession Act ১৯২৫ অনুযায়ী — সম্পূর্ণ সম্পত্তি।

সাধারণ: লিখিত, স্বাক্ষর, ২ সাক্ষী। নিবন্ধন সুপারিশযোগ্য। মৃত্যুর পর probate প্রয়োজন (অচল সম্পত্তির জন্য)।`
  },

  {
    id: "FAM-025",
    topic: "custody",
    religion: "general",
    is_free: true,
    source_act: "Guardians and Wards Act 1890 / Family Courts Ordinance 1985",
    source_section: "Section 17 GWA / Section 5 FCO",
    keywords: ["visitation rights", "access", "father see child", "mother see child", "child access", "parental access"],
    question_en: "What are the visitation/access rights of a non-custodial parent in Bangladesh?",
    question_bn: "বাংলাদেশে অ-হেফাজতকারী পিতামাতার সন্তান দেখার অধিকার কী?",
    answer_en: `VISITATION/ACCESS RIGHTS OF NON-CUSTODIAL PARENT:

Bangladesh law recognises that children benefit from contact with BOTH parents. Even if one parent has physical custody, the non-custodial parent has RIGHTS and OBLIGATIONS.

FATHER'S ACCESS RIGHTS (when mother has custody):
• Regular visitation — typically weekends, holidays, school vacations
• Right to information about child's education, health, welfare
• Right to be consulted on major decisions (education, religion, medical)
• Cannot be denied access without court order

MOTHER'S ACCESS RIGHTS (when father has custody):
• Same rights as father above
• Particularly important for young children — courts encourage frequent contact

COURT CAN ORDER:
• Specific visitation schedule (e.g., every Saturday 10am–6pm)
• Holiday and vacation access
• Telephone/video call rights
• Right to attend school events and medical appointments
• Prohibition on taking child outside jurisdiction without consent

DENIAL OF ACCESS:
• Custodial parent CANNOT unilaterally deny access
• If access is denied — non-custodial parent can:
  1. File execution petition in Family Court
  2. Seek contempt of court if access was court-ordered
  3. Apply for variation of custody if denial is persistent and harmful

CHILD'S WISHES:
• Courts increasingly consider child's views, especially for children 12+
• Child's welfare is paramount — if access causes distress, court may limit or supervise

SUPERVISED ACCESS:
• In cases of domestic violence, substance abuse, or risk to child
• Access occurs at designated centre or in presence of third party
• Graduated approach — may become unsupervised over time

MODIFICATION:
• Either parent can apply to Family Court to vary access arrangements
• Change in circumstances (relocation, remarriage, child's needs) justifies review`,
    answer_bn: `অ-হেফাজতকারী পিতামাতার সন্তান দেখার অধিকার স্বীকৃত।

অধিকার: নিয়মিত দেখা, শিক্ষা-স্বাস্থ্য তথ্য, বড় সিদ্ধান্তে পরামর্শ।

আদালত আদেশ দিতে পারে: নির্দিষ্ট সময়সূচি, ছুটিতে দেখা, ফোন/ভিডিও কল।

অ্যাক্সেস অস্বীকার: একতরফাভাবে অস্বীকার করা যাবে না। আদালতে কার্যকরণ বা আদালত অবমাননার আবেদন করতে পারেন।

পরিবর্তন: পরিস্থিতি পরিবর্তন হলে পারিবারিক আদালতে আবেদন করুন।`
  },

  {
    id: "FAM-026",
    topic: "general",
    religion: "general",
    is_free: true,
    source_act: "Family Courts Ordinance 1985 / Code of Civil Procedure 1908",
    source_section: "Section 10 FCO / Order 32A CPC",
    keywords: ["family court procedure", "how to file family case", "family case steps", "family court process", "family litigation"],
    question_en: "What is the step-by-step procedure for filing a case in Family Court in Bangladesh?",
    question_bn: "বাংলাদেশে পারিবারিক আদালতে মামলা দায়েরের ধাপগুলো কী?",
    answer_en: `STEP-BY-STEP FAMILY COURT PROCEDURE:

STEP 1: PRE-FILING CONSULTATION
• Consult with family law advocate
• Gather documents (marriage certificate, kabinanama, birth certificates, evidence)
• Determine correct court jurisdiction (where wife resides OR where marriage took place)

STEP 2: DRAFT PLAINT
• Advocate drafts plaint (written statement of case)
• Includes: parties, facts, cause of action, relief sought
• Court fee: BDT 100–500 depending on relief

STEP 3: FILE IN FAMILY COURT
• Submit plaint to Assistant Judge Court (Family Court)
• Court assigns case number
• Date fixed for first hearing

STEP 4: SERVICE OF NOTICE
• Court sends notice to defendant (spouse)
• If defendant avoids service — substituted service by publication
• If defendant absent — ex parte proceedings possible

STEP 5: MANDATORY MEDIATION (Section 10 FCO)
• Court refers parties to mediation
• Trained mediator attempts settlement
• If settlement reached — recorded as court decree
• If mediation fails — case proceeds to trial

STEP 6: WRITTEN STATEMENT & REPLICATION
• Defendant files written statement (defence)
• Plaintiff files replication (reply to defence)
• Issues framed by court

STEP 7: EVIDENCE & TRIAL
• Plaintiff evidence (affidavit + oral examination)
• Defendant evidence
• Cross-examination of both sides
• Documentary evidence

STEP 8: ARGUMENTS & JUDGMENT
• Both sides present oral arguments
• Court delivers judgment
• Decree issued

STEP 9: APPEAL (if dissatisfied)
• Appeal to District Judge within 30 days
• Then to High Court Division

TIME FRAME:
• Simple cases: 6–12 months
• Contested cases: 2–5 years
• Expedited in domestic violence and child custody matters`,
    answer_bn: `পারিবারিক আদালতে মামলার ধাপ:

১. আইনজীবীর পরামর্শ ও নথি সংগ্রহ
২. প্ল্যান্ট খসড়া — আদালতে দাখিল
৩. বিবাদীকে নোটিশ পাঠানো
৪. বাধ্যতামূলক সালিশি — সমঝোতা হলে রেকর্ড, না হলে বিচার
৫. লিখিত বিবৃতি ও পাল্টা জবাব
৬. প্রমাণ ও বিচারকাজ — সাক্ষ্য, জেরা
৭. যুক্তি উপস্থাপন ও রায়
৮. আপিল: জেলা জজ → হাইকোর্ট

সময়: সহজ মামলা ৬–১২ মাস, জটিল ২–৫ বছর।`
  },

  {
    id: "FAM-027",
    topic: "general",
    religion: "general",
    is_free: false,
    source_act: "Code of Criminal Procedure 1898 / Family Courts Ordinance 1985",
    source_section: "Section 125 CrPC / Section 5 FCO",
    keywords: ["crpc 125", "maintenance crpc", "wife maintenance criminal", "poor wife maintenance", "quick maintenance"],
    question_en: "What is the difference between maintenance under CrPC Section 125 and Family Court?",
    question_bn: "CrPC ধারা ১২৫ ও পারিবারিক আদালতে ভরণপোষণের পার্থক্য কী?",
    answer_en: `MAINTENANCE UNDER CrPC SECTION 125 vs FAMILY COURT:

CRPC SECTION 125 (Magistrate Court):
• PURPOSE: Quick relief for destitute wives, children, parents
• WHO CAN CLAIM: Wife (including divorced wife during iddat), minor children, aged parents
• STANDARD: Person must be unable to maintain themselves
• HUSBAND'S DEFENCE: Can prove wife is living in adultery, or has sufficient means
• AMOUNT: Up to BDT 500 per month (fixed by law — very low, outdated)
• SPEED: Faster — Magistrate can order within weeks
• NO COURT FEE: Free to file
• ENFORCEMENT: Non-payment = imprisonment up to 1 month per default
• LIMITATION: Only for persons who cannot maintain themselves — not for affluent claimants

FAMILY COURT (Family Courts Ordinance 1985):
• PURPOSE: Comprehensive family dispute resolution
• WHO CAN CLAIM: Wife, children, parents — regardless of financial status
• STANDARD: Based on husband's income, social status, wife's needs
• AMOUNT: No fixed limit — court has discretion (can be BDT 5,000–50,000+ per month)
• SPEED: Slower — 6 months to 2 years
• COURT FEE: BDT 100–500
• ENFORCEMENT: Execution petition, attachment, contempt
• ALSO COVERS: Denmahr, custody, divorce, restitution of conjugal rights

WHICH TO CHOOSE:
• Need quick, emergency relief AND have no means → CrPC 125
• Need substantial maintenance AND can wait → Family Court
• Need denmahr, custody, or divorce → Family Court only
• Can file BOTH simultaneously — CrPC 125 for interim, Family Court for final

IMPORTANT: CrPC 125 maintenance ceases if wife remarries or if divorced wife's iddat period ends (for Muslims).`,
    answer_bn: `CrPC ১২৫ বনাম পারিবারিক আদালত:

CrPC ১২৫: দ্রুত, বিনামূল্যে, সর্বোচ্চ ৫০০ টাকা/মাস, দরিদ্রদের জন্য।

পারিবারিক আদালত: ব্যাপক, ধীর, সীমাহীন পরিমাণ, সবার জন্য।

কী করবেন: জরুরি ও দরিদ্র হলে CrPC ১২৫; পূর্ণাঙ্গ সমাধান চাইলে পারিবারিক আদালত। উভয় একসাথে করা যায়।`
  },

  {
    id: "FAM-028",
    topic: "general",
    religion: "general",
    is_free: true,
    source_act: "Muslim Family Laws Ordinance 1961 / Hindu Married Women's Right to Separate Residence Act 1946",
    source_section: "Section 6 MFLO / Section 2 HMWRA",
    keywords: ["separation", "live separately", "wife leave husband", "husband leave wife", "separate residence", "desertion"],
    question_en: "Can a wife live separately from her husband without divorce in Bangladesh?",
    question_bn: "বাংলাদেশে স্ত্রী তালাক ছাড়া স্বামীর থেকে আলাদা থাকতে পারেন?",
    answer_en: `SEPARATE RESIDENCE WITHOUT DIVORCE:

A wife CAN live separately from her husband without obtaining divorce, but the legal consequences vary by religion and circumstances.

MUSLIM WIFE:
• Right to separate residence if:
  1. Husband fails to pay prompt denmahr (can refuse cohabitation until paid — habs-e-nafs)
  2. Husband is cruel or abusive
  3. Husband fails to provide maintenance
  4. Husband marries another wife without permission
  5. Husband is impotent
• Can file for maintenance while living separately
• Can file for divorce on these grounds
• Living separately without valid reason may affect maintenance claim

HINDU WIFE:
• Under Hindu Married Women's Right to Separate Residence and Maintenance Act 1946:
  - Can live separately and claim maintenance if:
    1. Husband has another wife living
    2. Husband has deserted her
    3. Husband is guilty of cruelty
    4. Husband has leprosy
    5. Husband converted to another religion
    6. Husband has treated her with such cruelty as to cause reasonable apprehension of injury

CHRISTIAN WIFE:
• Can seek judicial separation (not full divorce) under Divorce Act 1869
• Judicial separation allows living apart while marriage remains valid
• Can claim maintenance during separation

PRACTICAL CONSIDERATIONS:
• Separate residence without court order does NOT automatically entitle to maintenance
• Must prove valid grounds
• Property rights in matrimonial home: wife has right to residence even if she leaves (in some circumstances)
• For safety: Obtain protection order under Domestic Violence Act 2010
• Document reasons for separation — needed for future legal proceedings

CHILDREN:
• Wife can take children with her when separating
• Father still has guardianship rights
• Custody dispute may arise — file in Family Court`,
    answer_bn: `তালাক ছাড়া আলাদা থাকা সম্ভব, তবে আইনি পরিণতি ধর্ম অনুযায়ী ভিন্ন।

মুসলিম স্ত্রী: তাৎক্ষণিক মোহর না পেলে, নিষ্ঠুরতা, ভরণপোষণ না দিলে আলাদা থাকতে পারেন।

হিন্দু স্ত্রী: Hindu Married Women's Right Act ১৯৪৬ অনুযায়ে নিষ্ঠুরতা, পরিত্যাগ, অন্য স্ত্রী থাকলে আলাদা থাকতে ও ভরণপোষণ দাবি করতে পারেন।

খ্রিস্টান: Divorce Act ১৮৬৯ অনুযায়ে বিচারিক পৃথকীকরণ (judicial separation) সম্ভব।

প্রয়োজনীয়: সুরক্ষা আদেশ, কারণ নথিভুক্ত করা, পারিবারিক আদালতে মামলা।`
  },

  {
    id: "FAM-029",
    topic: "marriage",
    religion: "muslim",
    is_free: true,
    source_act: "Muslim Family Laws Ordinance 1961",
    source_section: "Section 5",
    keywords: ["kabinanama", "marriage contract", "nikah", "nikahnama", "marriage registration", "muslim marriage requirements"],
    question_en: "What is a Kabinanama and what are the legal requirements for a valid Muslim marriage in Bangladesh?",
    question_bn: "কাবিননামা কী এবং বাংলাদেশে বৈধ মুসলিম বিবাহের আইনি প্রয়োজনীয়তা কী?",
    answer_en: `VALID MUSLIM MARRIAGE REQUIREMENTS IN BANGLADESH:

ESSENTIAL ELEMENTS:
1. OFFER (Ijab): Bride's guardian (wali) or bride herself proposes marriage
2. ACCEPTANCE (Qabul): Groom accepts
3. CONSIDERATION (Mahr): Denmahr fixed and agreed
4. WITNESSES: Two adult Muslim witnesses
5. CAPACITY: Both parties must be adult (18+), of sound mind, not within prohibited degrees

KABINANAMA (Marriage Contract):
• LEGAL DOCUMENT recording all terms of marriage
• Registered with Union Parishad/Kazi Office
• Contains: names, ages, denmahr amount (prompt and deferred), conditions, signatures of parties and witnesses
• Must be signed by bride, groom, wali, kazi, and 2 witnesses

REGISTRATION (Mandatory under MFLO 1961):
• Marriage must be registered with Kazi/Union Parishad
• Unregistered marriage is NOT void but creates legal complications
• Registration required for: passport, visa, inheritance, divorce proceedings, maintenance claims
• Late registration possible with penalty and additional procedure

DENMAHR IN KABINANAMA:
• Must specify prompt mahr (payable on demand) and deferred mahr (payable on divorce/death)
• Minimum denmahr: No fixed minimum — but should be reasonable
• Can include property, gold, cash, or any valuable

CONDITIONS IN KABINANAMA:
• Parties can add conditions (e.g., husband will not take second wife, will live in specific city)
• Conditions must be: lawful, reasonable, and not against Islamic principles
• Breach of condition may give wife right to divorce

CONSEQUENCES OF UNREGISTERED MARRIAGE:
• Difficult to prove marriage in court
• Cannot claim maintenance or denmahr easily
• Children may face legitimacy issues
• Cannot obtain legal documents based on marriage

PRACTICAL ADVICE:
• Always register marriage immediately
• Keep original kabinanama safe
• Ensure denmahr is realistic and specified clearly
• Consider adding protective conditions`,
    answer_bn: `বৈধ মুসলিম বিবাহের প্রয়োজনীয়তা:

ইজাব, কবুল, মোহর, ২ সাক্ষী, প্রাপ্তবয়স্ক ও সুস্থ মন।

কাবিননামা: আইনি নথি — ইউনিয়ন পরিষদ/কাজী অফিসে নিবন্ধন বাধ্যতামূলক।

নিবন্ধন না করলে: আদালতে বিবাহ প্রমাণ কঠিন, ভরণপোষণ-দেনমোহর দাবি জটিল, সন্তানের বৈধতা সমস্যা।

কাবিননামায়: তাৎক্ষণিক ও বিলম্বিত মোহর স্পষ্ট উল্লেখ করুন, সুরক্ষামূলক শর্ত যোগ করতে পারেন।`
  },

  {
    id: "FAM-030",
    topic: "general",
    religion: "general",
    is_free: false,
    source_act: "Family Courts Ordinance 1985 / Limitation Act 1908",
    source_section: "Section 5 FCO / Article 104 Limitation Act",
    keywords: ["time limit", "limitation", "when to file", "deadline family case", "how long to file", "prescription"],
    question_en: "What is the time limit for filing family law cases in Bangladesh?",
    question_bn: "বাংলাদেশে পারিবারিক মামলা দায়েরের সময়সীমা কত?",
    answer_en: `TIME LIMITS (LIMITATION) FOR FAMILY CASES:

LIMITATION ACT 1908 applies to family cases filed in civil courts:

DIVORCE / DISSOLUTION OF MARRIAGE:
• No fixed limitation period
• Should be filed within REASONABLE TIME after cause arises
• Delay may be excused if justified (e.g., attempts at reconciliation)

MAINTENANCE:
• No fixed limitation for future maintenance
• Arrears (past due maintenance): 3 years from date each payment fell due
• Each missed payment is a separate cause of action

DENMAHR (MAHR):
• Prompt mahr: No limitation while marriage subsists
• Deferred mahr: 3 years from date it becomes due (divorce or death)
• If marriage still subsisting — can claim anytime

RESTORATION OF CONJUGAL RIGHTS:
• No fixed limitation — but should file promptly after separation
• Delay weakens case (implies acceptance of separation)

CHILD CUSTODY:
• No fixed limitation
• Should file promptly — delay may be seen as acquiescence
• Child's welfare is paramount — courts act even with delay if child at risk

GUARDIANSHIP:
• No fixed limitation for appointment of guardian
• But delay may affect court's view of applicant's commitment

GENERAL RULE:
• Family Court can condone (excuse) delay if sufficient cause shown
• Must explain delay in application
• Courts are generally lenient in family matters

ENFORCEMENT OF DECREES:
• Execution petition: 3 years from date of decree
• Each installment of maintenance: 3 years from due date
• Contempt application: No fixed limitation but should be filed promptly

PRACTICAL ADVICE:
• Do NOT delay — file as soon as cause arises
• Document reasons for any delay
• Consult advocate immediately — delay harms your case`,
    answer_bn: `পারিবারিক মামলার সময়সীমা:

তালাক: নির্দিষ্ট সময়সীমা নেই, তবু দ্রুত করুন।
ভরণপোষণ: ভবিষ্যতের জন্য সীমাহীন, বকেয়ার জন্য ৩ বছর।
দেনমোহর: তাৎক্ষণিক — বিবাহ চলাকালীন সীমাহীন; বিলম্বিত — ৩ বছর।
হেফাজত: নির্দিষ্ট সীমা নেই, কিন্তু দেরি ক্ষতিকর।

সাধারণ: আদালত যুক্তিসংগত কারণে দেরি ক্ষমা করতে পারে। তবু দ্রুত মামলা করুন।`
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
  return familyLaw
    .filter(q =>
      q.keywords.some(k => lower.includes(k.toLowerCase())) ||
      q.question_en.toLowerCase().includes(lower) ||
      q.question_bn.includes(query) ||
      q.topic.includes(lower) ||
      q.religion.includes(lower)
    )
    .map(q => ({
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
  { key: "divorce",          label_en: "Divorce",           label_bn: "তালাক/বিচ্ছেদ" },
  { key: "denmahr",          label_en: "Denmahr (Mahr)",    label_bn: "দেনমোহর" },
  { key: "maintenance",      label_en: "Maintenance",        label_bn: "ভরণপোষণ" },
  { key: "custody",          label_en: "Child Custody",      label_bn: "শিশু হেফাজত" },
  { key: "inheritance",      label_en: "Inheritance",        label_bn: "উত্তরাধিকার" },
  { key: "marriage",         label_en: "Marriage Law",       label_bn: "বিবাহ আইন" },
  { key: "domestic_violence",label_en: "Domestic Violence",  label_bn: "গৃহ নির্যাতন" },
  { key: "child_marriage",   label_en: "Child Marriage",     label_bn: "বাল্যবিবাহ" },
  { key: "general",          label_en: "Family Court",       label_bn: "পারিবারিক আদালত" },
  { key: "child_marriage",   label_en: "Child Marriage",     label_bn: "বাল্যবিবাহ" },
  { key: "domestic_violence",label_en: "Domestic Violence",  label_bn: "গৃহ নির্যাতন" },
]

export const FAMILY_RELIGIONS = [
  { key: "muslim",    label: "Muslim (মুসলিম)" },
  { key: "hindu",     label: "Hindu (হিন্দু)" },
  { key: "christian", label: "Christian (খ্রিস্টান)" },
  { key: "adibashi",  label: "Adibashi/Upojati (আদিবাসী)" },
  { key: "general",   label: "General (সাধারণ)" },
]

import type { KnowledgeModule } from './types';

const familyModule: KnowledgeModule = {
  area: "family",
  label: "Family Law — Muslim, Hindu, Christian, Adibashi",
  description: "30 Q&As covering Bangladesh family law for all religions: Muslim, Hindu, Christian, and Adibashi/Upojati. Includes marriage, divorce, maintenance, custody, inheritance, dowry, adoption, guardianship, interfaith marriage, wills, and enforcement.",
  rules: [],
  qaBank: familyLaw.map(q => ({
    id: q.id,
    area: "family" as const,
    jurisdiction: "BD" as const,
    triggerKeywords: q.keywords,
    question: q.question_en,
    irac: { issue: q.question_en, rule: q.source_act, application: q.answer_en, conclusion: q.answer_en },
    escalate: false,
    relatedRules: [],
    lastVerified: "2026-03-20",
  })),
};

export default familyModule;