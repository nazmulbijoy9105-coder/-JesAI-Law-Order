//  JesAI Constitutional Law Knowledge Module 
// NLC validated - Nazmul, Advocate, Supreme Court of Bangladesh
// COVERAGE: Constitution of Bangladesh 1972 - all amendments through 2026
//
// Amendment History:
// 1st  (1973) - War crimes tribunal indemnity
// 2nd  (1973) - Emergency provisions, Art.33/35 suspension
// 3rd  (1974) - Berubari territory transfer indemnity
// 4th  (1975) - Presidential system, one-party BAKSAL (later reversed)
// 5th  (1979) - Ratified martial law 1975-1979, added Bismillah, secularism removed
// 6th  (1981) - VP election by direct vote
// 7th  (1986) - Ratified Ershad martial law 1982-1986
// 8th  (1988) - Islam declared state religion, HC bench decentralisation
// 9th  (1989) - Direct VP election (later reversed)
// 10th (1990) - Women reserved seats in parliament (30 seats)
// 11th (1991) - Shahabuddin Ahmed caretaker retroactive validation
// 12th (1991) - Return to parliamentary system from presidential
// 13th (1996) - Caretaker Government system for elections
// 14th (2004) - Women seats increased to 45, voter photos, retirement age 65
// 15th (2011) - Secularism restored, caretaker system abolished, basic structure doctrine
// 16th (2014) - Parliament power to remove judges (SC declared unconstitutional 2017)
// 17th (2018) - Women reserved seats extended 25 more years
//
// Post-2024: Interim government under Dr. Muhammad Yunus (from August 2024)
// after mass uprising. Constitution Review Commission formed 2024.
// Last verified: 2025-03-09

import type { KnowledgeBank, LegalRule, QAEntry } from "./types";

const rules: LegalRule[] = [
  {
    id: "con-001",
    jurisdiction: "BD",
    title: "Constitution of Bangladesh 1972 - Supreme Law",
    rule: "The Constitution of the People's Republic of Bangladesh was adopted on 4 November 1972 and came into force on 16 December 1972 (Victory Day). It is the supreme law of Bangladesh - any law inconsistent with the Constitution is void to the extent of the inconsistency (Article 7).",
    source: "Constitution of Bangladesh 1972, Articles 1, 7",
    certainty: "confirmed",
    tags: ["constitution", "supreme law", "1972", "article 7", "void"],
    lastVerified: "2025-03-09",
  },
  {
    id: "con-002",
    jurisdiction: "BD",
    title: "Fundamental Rights - Articles 26-47A",
    rule: "Part III (Articles 26-47A) contains Fundamental Rights. Article 26: all laws inconsistent with fundamental rights are void. Rights include: equality (27), right to life (32), freedom of movement (36), freedom of assembly (37), freedom of association (38), freedom of thought (39), freedom of profession (40), religion (41), property (42).",
    source: "Constitution of Bangladesh, Part III, Articles 26-47A",
    certainty: "confirmed",
    tags: ["fundamental rights", "part iii", "article 26", "article 32", "rights"],
    lastVerified: "2025-03-09",
  },
  {
    id: "con-003",
    jurisdiction: "BD",
    title: "Writ Jurisdiction - Article 102",
    rule: "Article 102: The High Court Division has power to issue writs of: Mandamus, Prohibition, Certiorari, Habeas Corpus, Quo Warranto - to enforce fundamental rights or control unlawful government action. Any aggrieved person can file a writ petition directly in the High Court Division.",
    source: "Constitution of Bangladesh, Article 102",
    certainty: "confirmed",
    tags: ["writ", "article 102", "habeas corpus", "mandamus", "high court division"],
    lastVerified: "2025-03-09",
  },
  {
    id: "con-004",
    jurisdiction: "BD",
    title: "State Religion - Article 2A (8th Amendment 1988)",
    rule: "Article 2A (inserted by 8th Amendment 1988): The state religion of the Republic is Islam, but other religions may be practised in peace and harmony. This was inserted during Ershad's government. The 15th Amendment 2011 retained Islam as state religion while also restoring secularism as a fundamental principle.",
    source: "Constitution of Bangladesh, Article 2A; 8th Amendment Act 1988; 15th Amendment Act 2011",
    certainty: "confirmed",
    tags: ["state religion", "islam", "article 2a", "8th amendment", "secularism"],
    lastVerified: "2025-03-09",
  },
  {
    id: "con-005",
    jurisdiction: "BD",
    title: "15th Amendment 2011 - Secularism, Caretaker Abolished",
    rule: "The 15th Amendment (Constitution (Fifteenth Amendment) Act 2011) made major changes: (1) restored secularism and nationalism as fundamental principles, (2) abolished the Caretaker Government system (13th Amendment repealed), (3) Article 7B inserted - unamendable 'basic structure' provisions including preamble, fundamental principles, fundamental rights, elections.",
    source: "Constitution (Fifteenth Amendment) Act 2011",
    certainty: "confirmed",
    tags: ["15th amendment", "caretaker abolished", "secularism restored", "basic structure", "2011"],
    lastVerified: "2025-03-09",
  },
];

const qaBank: QAEntry[] = [

  //  CONSTITUTION BASICS 
  {
    id: "con-qa-001",
    jurisdiction: "BD",
    triggerKeywords: ["bangladesh constitution", "when constitution made", "constitution 1972", "bangladesh constitution history"],
    question: "When was the Bangladesh Constitution made and what are its key features?",
    irac: {
      issue: "When was the Bangladesh Constitution adopted and what are its foundational features?",
      rule: "The Constitution was adopted by the Constituent Assembly on 4 November 1972 and came into force on 16 December 1972. It established Bangladesh as a People's Republic with parliamentary democracy, rule of law, fundamental rights, and an independent judiciary.",
      application: "The original 1972 Constitution had four fundamental principles (Article 8): nationalism, socialism, democracy, and secularism. It created a unicameral legislature (Jatiya Sangsad), an executive Prime Minister, and a ceremonial President.",
      conclusion: "**Bangladesh Constitution - key facts:**\\n\\n* Adopted: 4 November 1972\\n* Effective: 16 December 1972 (Victory Day)\\n* Total Articles: 153 (original) - expanded by amendments\\n* Parts: XI parts + 7 Schedules\\n* Language: Bengali (official text)\\n\\n**Original 4 fundamental principles (Art 8):**\\n1. Nationalism\\n2. Socialism\\n3. Democracy\\n4. Secularism\\n\\n**Structure:** Unicameral legislature (350 seats) + PM-led executive + independent judiciary",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-002",
    jurisdiction: "BD",
    triggerKeywords: ["supreme law bangladesh", "article 7", "law void constitution", "constitution supreme"],
    question: "Is the Constitution the supreme law of Bangladesh?",
    irac: {
      issue: "What is the legal supremacy of the Bangladesh Constitution?",
      rule: "Article 7(1): All powers of the Republic belong to the people. Article 7(2): The Constitution is the solemn expression of the will of the people and is the supreme law - any law inconsistent with the Constitution is void to the extent of the inconsistency.",
      application: "If Parliament passes a law contradicting a fundamental right, the law is void. Courts can strike down such laws. The 15th Amendment added Article 7B: certain core provisions (preamble, fundamental principles, fundamental rights, elections) cannot be amended even by Parliament.",
      conclusion: "**Constitution is supreme:**\\n\\n* Article 7: Constitution = supreme law\\n* Any inconsistent law = void\\n* Courts (High Court Division) can strike down laws\\n* Article 7B (15th Amendment): Core provisions unamendable\\n\\n**Unamendable core (Art 7B):**\\n* Preamble\\n* Fundamental principles (Art 8-12)\\n* Fundamental rights (Part III)\\n* Free and fair elections\\n* Separation of powers\\n\\n Constitutional litigation guide - BDT 2,999",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-003",
    jurisdiction: "BD",
    triggerKeywords: ["fundamental principles state policy", "article 8", "nationalism socialism", "four principles constitution"],
    question: "What are the fundamental principles of the Bangladesh Constitution?",
    irac: {
      issue: "What are the fundamental state principles under the Bangladesh Constitution?",
      rule: "Article 8 (as amended by 15th Amendment 2011): The fundamental principles of state policy are: (1) Nationalism (Bengali nationalism), (2) Democracy, (3) Socialism (meaning economic and social justice), (4) Secularism. These replaced the 5th Amendment changes which had removed secularism and added 'absolute trust in Allah'.",
      application: "These principles guide legislation and governance but are not directly enforceable in court (unlike fundamental rights). They are justiciable to the extent that Parliament must keep laws consistent with them.",
      conclusion: "**Fundamental Principles (Art 8) - current:**\\n\\n1. **Nationalism** - Bengali nationalism\\n2. **Democracy** - political democracy\\n3. **Socialism** - economic and social justice\\n4. **Secularism** - freedom of religion, state neutrality\\n\\n**History of changes:**\\n* 1972 original: Nationalism, Socialism, Democracy, Secularism\\n* 5th Amendment (1979): Removed secularism, added 'Bismillah', 'Absolute trust in Almighty Allah'\\n* 15th Amendment (2011): Restored secularism, retained Islam as state religion (Art 2A)\\n\\n Constitutional principles guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  //  FUNDAMENTAL RIGHTS 
  {
    id: "con-qa-004",
    jurisdiction: "BD",
    triggerKeywords: ["fundamental rights bangladesh", "article 26", "rights constitution", "constitutional rights list"],
    question: "What are the fundamental rights in the Bangladesh Constitution?",
    irac: {
      issue: "What fundamental rights does the Bangladesh Constitution guarantee?",
      rule: "Part III (Articles 26-47A) of the Constitution guarantees fundamental rights. Article 26: All laws inconsistent with these rights are void. These rights are directly enforceable by petition to the High Court Division under Article 102.",
      application: "These rights protect citizens against state action - not private persons. If a government authority violates a fundamental right, the citizen can directly petition the High Court Division for a writ.",
      conclusion: "**Fundamental Rights (Part III):**\\n\\n| Article | Right |\\n|---|---|\\n| 27 | Equality before law |\\n| 28 | Non-discrimination (sex, religion, race, caste) |\\n| 29 | Equal opportunity in public employment |\\n| 30 | Prohibition of foreign titles |\\n| 31 | Right to protection of law |\\n| 32 | Right to life and personal liberty |\\n| 33 | Safeguards on arrest and detention |\\n| 34 | Prohibition of forced labour |\\n| 35 | Protection from trial and punishment |\\n| 36 | Freedom of movement |\\n| 37 | Freedom of assembly |\\n| 38 | Freedom of association |\\n| 39 | Freedom of thought, conscience, speech |\\n| 40 | Freedom of profession |\\n| 41 | Freedom of religion |\\n| 42 | Rights to property |\\n| 43 | Protection of home and correspondence |\\n| 44 | Right to enforce rights (writ) |\\n\\n Fundamental rights guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-002"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-005",
    jurisdiction: "BD",
    triggerKeywords: ["right to life", "article 32", "personal liberty", "right to life bangladesh"],
    question: "What does the right to life mean under Article 32?",
    irac: {
      issue: "What is the scope of the right to life and personal liberty under Article 32?",
      rule: "Article 32: No person shall be deprived of life or personal liberty save in accordance with law. The Supreme Court has interpreted this broadly - 'life' means not merely physical existence but the right to live with dignity, access to livelihood, clean environment, and basic necessities.",
      application: "If the state arbitrarily arrests someone without legal authority, or a government policy threatens a person's livelihood without due process, Article 32 is violated. This article has been used to challenge environmental destruction, extrajudicial killings, and denial of basic services.",
      conclusion: "**Article 32 - Right to Life:**\\n\\n**Protected:**\\n* Physical life - cannot be taken without law\\n* Personal liberty - arbitrary detention prohibited\\n* Right to livelihood (expanded interpretation)\\n* Right to live with dignity\\n* Environmental rights (judicially recognised)\\n\\n**Not protected against:**\\n* Private individuals (only state action)\\n* Lawful restrictions by Parliament\\n\\n**Remedy:** Writ of Habeas Corpus (Art 102) if unlawfully detained.\\n\\n Article 32 litigation guide - BDT 2,999",
    },
    escalate: false,
    relatedRules: ["con-002", "con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-006",
    jurisdiction: "BD",
    triggerKeywords: ["article 33", "arrest safeguards", "detained rights", "arrest rights constitution"],
    question: "What are my rights when arrested under the Constitution?",
    irac: {
      issue: "What constitutional safeguards apply on arrest and detention under Article 33?",
      rule: "Article 33: (1) Arrested person must be informed of grounds of arrest as soon as possible. (2) Must be produced before a Magistrate within 24 hours (excluding journey time). (3) Cannot be detained beyond 24 hours without Magistrate's order. (4) Right to consult and be defended by a legal practitioner of choice.",
      application: "Police arresting someone at midnight must inform them of the reason for arrest. By the next day, the person must be produced before a Magistrate. Any detention beyond 24 hours without Magistrate order = illegal detention = habeas corpus writ.",
      conclusion: "**Constitutional arrest rights (Art 33):**\\n\\n **Your rights on arrest:**\\n1. Must be told WHY you are being arrested\\n2. Must see a Magistrate within **24 hours**\\n3. Right to a lawyer of your choice\\n4. Cannot be held beyond 24 hours without Magistrate order\\n\\n**If police violate:**\\n* File writ of Habeas Corpus - High Court Division\\n* Court orders production + release if detention illegal\\n* Police can face contempt of court\\n\\n Exception: Preventive detention laws (Art 33(2)) allow longer detention with government order - challenge in High Court.\\n\\n Arrest rights guide - BDT 1,999",
    },
    escalate: true,
    escalateReason: "Illegal detention requires urgent High Court writ. WhatsApp NLC immediately.",
    relatedRules: ["con-002", "con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-007",
    jurisdiction: "BD",
    triggerKeywords: ["freedom of speech", "article 39", "press freedom", "speech rights bangladesh"],
    question: "Is freedom of speech guaranteed in Bangladesh?",
    irac: {
      issue: "What does Article 39 guarantee about freedom of thought, conscience, and speech?",
      rule: "Article 39(1): Freedom of thought and conscience is guaranteed. Article 39(2): Subject to reasonable restrictions, every citizen has right to freedom of speech and expression, and freedom of the press. Restrictions allowed for: state security, friendly relations with foreign states, public order, decency, morality, contempt of court, defamation, incitement to offence.",
      application: "The Cyber Security Act 2023 (replacing DSA 2018) restricts online speech in ways that have been challenged as inconsistent with Article 39. Courts have held that restrictions on speech must be reasonable, proportionate, and not used to suppress political dissent.",
      conclusion: "**Freedom of speech - Article 39:**\\n\\n **Guaranteed:**\\n* Freedom of thought and conscience (absolute)\\n* Freedom of speech and expression\\n* Freedom of the press\\n\\n **Lawful restrictions allowed for:**\\n* State security / sovereignty\\n* Public order\\n* Decency and morality\\n* Contempt of court\\n* Defamation\\n* Incitement to violence\\n\\n**Current law:** Cyber Security Act 2023 governs online speech - some provisions challenged as overbroad restriction of Art 39.\\n\\n Free speech rights guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-002"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-008",
    jurisdiction: "BD",
    triggerKeywords: ["article 27", "equality before law", "non discrimination", "equal treatment law"],
    question: "What does equality before law mean under Article 27?",
    irac: {
      issue: "What does the constitutional guarantee of equality under Article 27 cover?",
      rule: "Article 27: All citizens are equal before law and are entitled to equal protection of law. Article 28: The state shall not discriminate against any citizen on grounds of religion, race, caste, sex, or place of birth. Article 29: Equal opportunity for all citizens in public employment.",
      application: "A government policy giving preference to one group over another without reasonable classification violates Article 27. However, affirmative action for backward classes or women is permitted under Articles 28(4) and 29(3).",
      conclusion: "**Equality rights:**\\n\\n**Art 27:** Equal before law + equal protection\\n**Art 28:** No discrimination on: religion, race, caste, sex, place of birth\\n**Art 29:** Equal opportunity in government employment\\n\\n**Exceptions (allowed):**\\n* Affirmative action for backward sections\\n* Special provisions for women and children\\n* Religious educational institutions\\n\\n**Example violations:**\\n* Government job only for one religion = Art 28 violation\\n* Different law for rich vs poor = Art 27 violation\\n\\n Equality rights guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-002"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-009",
    jurisdiction: "BD",
    triggerKeywords: ["article 35", "double jeopardy", "self incrimination", "trial rights constitution"],
    question: "What are the protections against arbitrary trial and punishment?",
    irac: {
      issue: "What does Article 35 guarantee regarding protection from trial and punishment?",
      rule: "Article 35: (1) No ex post facto law - cannot be punished for act that was not an offence when committed. (2) No double jeopardy - cannot be tried twice for same offence. (3) No self-incrimination - person accused of offence cannot be compelled to be witness against himself. (4) No cruel, inhuman, or degrading punishment.",
      application: "If a law is passed today making something illegal and then used to prosecute a person for that act done last year: unconstitutional (Art 35(1)). A person acquitted of murder cannot be tried again for the same murder (Art 35(2)).",
      conclusion: "**Article 35 - Trial and punishment protections:**\\n\\n1. **No ex post facto:** Cannot punish for past act that was legal at the time\\n2. **No double jeopardy:** Acquitted/convicted = cannot be tried again for same offence\\n3. **No self-incrimination:** Right to silence - cannot be forced to confess\\n4. **No torture:** Cruel, inhuman, degrading punishment prohibited\\n\\n**Practical:** Police cannot torture to extract confession - Art 35(4) + Art 32 both violated.\\n\\n Trial rights guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-002"],
    lastVerified: "2025-03-09",
  },

  //  WRIT JURISDICTION 
  {
    id: "con-qa-010",
    jurisdiction: "BD",
    triggerKeywords: ["writ petition", "article 102", "high court writ", "writ jurisdiction bangladesh"],
    question: "What is a writ petition and how do I file one?",
    irac: {
      issue: "What is the writ jurisdiction of the High Court Division under Article 102?",
      rule: "Article 102: The High Court Division may, on petition by an aggrieved person, issue directions, orders, or writs including Habeas Corpus, Mandamus, Certiorari, Prohibition, and Quo Warranto to enforce fundamental rights or prevent unlawful exercise of authority by public bodies.",
      application: "A citizen whose fundamental right is violated by a government authority files a writ petition directly in the High Court Division - no lower court first. The petition sets out facts, the right violated, and relief sought.",
      conclusion: "**Writ petition - how to file:**\\n\\n**Who can file:** Any aggrieved person\\n**Where:** High Court Division (directly)\\n**No lower court needed first**\\n\\n**5 types of writs:**\\n\\n| Writ | Use |\\n|---|---|\\n| **Habeas Corpus** | Illegal detention - produce the person |\\n| **Mandamus** | Order public body to perform its duty |\\n| **Certiorari** | Quash an illegal government order |\\n| **Prohibition** | Stop lower court/body exceeding authority |\\n| **Quo Warranto** | Challenge a person's right to hold public office |\\n\\n**Process:**\\n1. File writ petition with affidavit\\n2. Court issues Rule Nisi (show cause)\\n3. Government files affidavit in opposition\\n4. Hearing -> judgment\\n\\n Requires Senior Advocate or Advocate of High Court Division.\\n\\n Writ petition guide - BDT 4,999",
    },
    escalate: true,
    escalateReason: "Writ petitions require High Court Division advocate. WhatsApp NLC for referral.",
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-011",
    jurisdiction: "BD",
    triggerKeywords: ["habeas corpus", "illegal detention writ", "produce before court", "detained illegally"],
    question: "What is a Habeas Corpus writ and when can I use it?",
    irac: {
      issue: "When and how can a person use Habeas Corpus to challenge illegal detention?",
      rule: "Article 102(2)(b)(i): High Court Division may direct a person to be produced before the court if detained in unlawful custody. Habeas Corpus (Latin: 'you have the body') orders the detaining authority to produce the detained person and justify the detention. If unjustified, the person is released.",
      application: "Person arrested by police without valid warrant, held beyond 24 hours without Magistrate order, or detained by government under unlawful order: family member or lawyer can file Habeas Corpus petition in High Court Division even at night in urgent cases.",
      conclusion: "**Habeas Corpus - when to use:**\\n\\n **Use when:**\\n* Arrested without warrant or legal reason\\n* Held beyond 24 hours without Magistrate order\\n* Detained under unlawful preventive detention order\\n* Disappeared / whereabouts unknown (enforced disappearance)\\n* Detained in mental hospital without legal order\\n\\n**Who can file:** The detained person OR any person on their behalf\\n\\n**Urgency:** Court can sit urgently - even after hours in extreme cases\\n\\n**Result if successful:** Court orders immediate release\\n\\n File immediately - delay worsens the situation.\\n\\n Habeas Corpus guide - BDT 4,999",
    },
    escalate: true,
    escalateReason: "Illegal detention is urgent. Contact NLC immediately for emergency writ filing.",
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-012",
    jurisdiction: "BD",
    triggerKeywords: ["mandamus writ", "government duty", "force government duty", "public body writ"],
    question: "What is a Mandamus writ and when is it used?",
    irac: {
      issue: "When can a Mandamus writ be used to compel a public authority to act?",
      rule: "Article 102: Mandamus directs a public body, government official, or lower court to perform a legal duty it is required to perform but is refusing or neglecting to do. The duty must be a public legal duty - not a discretionary matter.",
      application: "University refuses to process admission of a qualified candidate. Election Commission refuses to register a valid candidate. A government department refuses to issue a licence the applicant is legally entitled to. All can be compelled by Mandamus.",
      conclusion: "**Mandamus - when to use:**\\n\\n **Use when a public body:**\\n* Refuses to perform its legal duty\\n* Neglects to process your application\\n* Ignores court orders\\n* Refuses to release information it is required to release\\n\\n**Cannot use Mandamus for:**\\n* Discretionary decisions (only compel consideration, not outcome)\\n* Private individuals or companies\\n* Matters where other adequate remedy exists\\n\\n**Examples:**\\n* Force university to process admission\\n* Compel government to process pending licence\\n* Order Election Commission to register candidate\\n\\n Mandamus guide - BDT 2,999",
    },
    escalate: true,
    escalateReason: "Mandamus petitions require High Court advocate. WhatsApp NLC for referral.",
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  //  AMENDMENTS HISTORY 
  {
    id: "con-qa-013",
    jurisdiction: "BD",
    triggerKeywords: ["first amendment 1973", "war crimes amendment", "first constitutional amendment", "1973 amendment"],
    question: "What did the 1st Constitutional Amendment 1973 do?",
    irac: {
      issue: "What changes did the 1st Amendment to the Bangladesh Constitution make?",
      rule: "The Constitution (First Amendment) Act 1973: Inserted Article 47A to allow trial of persons who committed genocide, crimes against humanity, and war crimes during the 1971 Liberation War. Also excluded these persons from the protection of fundamental rights under Part III for the purposes of such trials.",
      application: "This amendment enabled the establishment of the International Crimes Tribunal (later used extensively from 2010 onwards under the ICT Act 1973) to try war criminals of 1971 without the accused being able to claim fundamental rights protections to block such trials.",
      conclusion: "**1st Amendment 1973:**\\n\\n* Inserted Article 47A\\n* Allowed trial of 1971 war criminals\\n* Excluded war crime accused from fundamental rights protection for trial purposes\\n* Enabled: International Crimes Tribunal Act 1973\\n\\n**Impact:** ICT trials resumed from 2010 under Sheikh Hasina government - multiple convictions and executions of 1971 war criminals.",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-014",
    jurisdiction: "BD",
    triggerKeywords: ["4th amendment", "baksal", "presidential system", "fourth amendment 1975"],
    question: "What did the 4th Amendment 1975 do and why is it controversial?",
    irac: {
      issue: "What were the effects of the 4th Amendment 1975 on Bangladesh's political system?",
      rule: "The Constitution (Fourth Amendment) Act 1975 (January 1975): Changed the parliamentary system to a presidential system, gave the President sweeping executive power, replaced multiparty democracy with a one-party state (BAKSAL - Bangladesh Krishak Sramik Awami League), restricted fundamental rights, and gave the President power to govern by presidential orders.",
      application: "Sheikh Mujibur Rahman became President under this system. All political parties except BAKSAL were banned. The amendment concentrated all power in one person. It was in force for only 7 months - Sheikh Mujib was assassinated in August 1975 and the system collapsed.",
      conclusion: "**4th Amendment 1975 - key changes:**\\n\\n* Parliamentary -> Presidential system\\n* Multiparty -> One-party (BAKSAL)\\n* All power to President (Sheikh Mujib)\\n* Fundamental rights severely curtailed\\n* Press freedom eliminated\\n\\n**Duration:** January-August 1975 only (7 months)\\n\\n**Reversal:** 12th Amendment 1991 restored parliamentary system.\\n\\n**Significance:** Remains the most controversial amendment - critics see it as the beginning of Bangladesh's authoritarian period.",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-015",
    jurisdiction: "BD",
    triggerKeywords: ["5th amendment", "martial law ratification", "bismillah constitution", "fifth amendment 1979"],
    question: "What did the 5th Amendment 1979 do?",
    irac: {
      issue: "What changes did the 5th Amendment make and is it still valid?",
      rule: "The Constitution (Fifth Amendment) Act 1979: Ratified all proclamations, regulations, and orders made during martial law period (1975-1979) under Ziaur Rahman. Added 'Bismillah-ir-Rahman-ir-Rahim' before the preamble. Replaced 'secularism' with 'absolute trust and faith in the Almighty Allah'. Added 'nationalism' changes.",
      application: "The Appellate Division in Khondaker Delwar Hossain v. Bangladesh Italian Marble Works (2010) declared the 5th Amendment unconstitutional to the extent it ratified illegal martial law changes. The 15th Amendment 2011 then formally removed the 5th Amendment changes and restored secularism.",
      conclusion: "**5th Amendment 1979:**\\n\\n**Changes made:**\\n* Added Bismillah before preamble (retained post-15th Amd)\\n* Replaced 'secularism' with 'absolute trust in Allah'\\n* Ratified 1975-1979 martial law actions\\n* Other political changes under Zia\\n\\n**Current status:**\\n* Supreme Court (2010): 5th Amendment unconstitutional re martial law ratification\\n* 15th Amendment (2011): Formally reversed secularism removal\\n* **Bismillah** retained in current constitution\\n* **Secularism** restored (Art 8) but Islam remains state religion (Art 2A)\\n\\n Constitutional history guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-016",
    jurisdiction: "BD",
    triggerKeywords: ["7th amendment", "ershad martial law", "seventh amendment 1986", "ershad constitution"],
    question: "What did the 7th Amendment 1986 do?",
    irac: {
      issue: "What was the purpose of the 7th Amendment and is it valid?",
      rule: "The Constitution (Seventh Amendment) Act 1986: Ratified all proclamations, regulations, and orders made during the martial law period of General H.M. Ershad (1982-1986). Similar in purpose to the 5th Amendment - retroactively validated extra-constitutional military rule.",
      application: "The Appellate Division in Bangladesh Italian Marble Works case (2010) declared this amendment unconstitutional - illegal martial law cannot be validated by subsequent constitutional amendment. The court held that any future military takeover would be unconstitutional and perpetrators would face treason charges.",
      conclusion: "**7th Amendment 1986:**\\n\\n* Ratified Ershad's martial law (1982-1986)\\n* Similar to 5th Amendment pattern\\n\\n**Supreme Court (2010):** Declared unconstitutional - military rule cannot be retroactively legitimised.\\n\\n**Historic impact:** The 2010 Appellate Division judgment established:\\n* Martial law is unconstitutional\\n* Military rulers cannot ratify their own illegal acts\\n* Future military takeover = treason (Art 7A inserted by 15th Amd)",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-017",
    jurisdiction: "BD",
    triggerKeywords: ["8th amendment", "state religion islam", "eighth amendment 1988", "islam state religion amendment"],
    question: "When was Islam made the state religion and what does it mean?",
    irac: {
      issue: "How did Islam become the state religion and what are its practical implications?",
      rule: "The Constitution (Eighth Amendment) Act 1988: Inserted Article 2A - 'The state religion of the Republic is Islam, but other religions may be practised in peace and harmony in the Republic.' This was done during Ershad's government. The 8th Amendment also decentralised the High Court by establishing permanent benches outside Dhaka (later struck down by Supreme Court).",
      application: "Article 2A makes Islam the state religion but guarantees freedom of religion for all. This coexists with secularism (Art 8) restored by the 15th Amendment 2011. Courts have held that being a state religion does not mean Bangladesh is a theocratic state or that non-Muslims have fewer rights.",
      conclusion: "**8th Amendment 1988 - state religion:**\\n\\n* Article 2A: Islam = state religion\\n* BUT: other religions practised freely in peace and harmony\\n* This article was NOT reversed by 15th Amendment 2011\\n\\n**Current position:**\\n* Art 2A: Islam = state religion (still valid)\\n* Art 8: Secularism = fundamental principle (restored 2011)\\n* Both coexist - not contradictory per Supreme Court\\n* Bangladesh is NOT a theocratic state\\n* All citizens equal regardless of religion (Art 27, 28)\\n\\n**8th Amendment also:** Proposed HC permanent benches outside Dhaka - this part struck down by SC (Anwar Hossain Chowdhury case 1989).",
    },
    escalate: false,
    relatedRules: ["con-004"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-018",
    jurisdiction: "BD",
    triggerKeywords: ["12th amendment", "parliamentary system restored", "twelfth amendment 1991", "parliamentary democracy restored"],
    question: "How did Bangladesh return to parliamentary democracy?",
    irac: {
      issue: "How was the parliamentary system restored through the 12th Amendment?",
      rule: "The Constitution (Twelfth Amendment) Act 1991: Restored the parliamentary system of government - Prime Minister as head of government, President as constitutional head of state. The President's role became ceremonial. The Prime Minister became directly accountable to the Jatiya Sangsad. This reversed the 4th Amendment's presidential system.",
      application: "After the fall of Ershad in 1990 and elections in 1991, an interim government led by Shahabuddin Ahmed facilitated the 12th Amendment under Khaleda Zia's government. This restored the Westminster-style parliamentary democracy that has continued to the present.",
      conclusion: "**12th Amendment 1991 - parliamentary system:**\\n\\n**Changed:**\\n* Presidential -> Parliamentary system\\n* Prime Minister = real head of government\\n* President = ceremonial role\\n* PM accountable to Jatiya Sangsad\\n\\n**Current structure:**\\n* **President:** Elected by Sangsad, ceremonial\\n* **Prime Minister:** Leader of majority party, real power\\n* **Cabinet:** Collectively responsible to Sangsad\\n* **Sangsad:** 350 seats (300 direct + 50 women reserved)\\n\\n**Unchanged since 1991** - the parliamentary system.",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-019",
    jurisdiction: "BD",
    triggerKeywords: ["13th amendment", "caretaker government", "thirteenth amendment 1996", "caretaker system"],
    question: "What was the caretaker government system and why was it abolished?",
    irac: {
      issue: "What was the 13th Amendment caretaker government system and what happened to it?",
      rule: "The Constitution (Thirteenth Amendment) Act 1996: Created the Non-Party Caretaker Government system - an elected government must resign before elections, power transferred to a neutral caretaker government headed by the last retired Chief Justice, to ensure free and fair elections. This system was used for elections in 1996, 2001, and 2008.",
      application: "The 15th Amendment (2011) repealed the 13th Amendment and abolished the caretaker system. The Supreme Court (Khaleque J) had already ruled the 13th Amendment unconstitutional in 2011. The opposition BNP has demanded caretaker restoration since 2011 - this remains a central political dispute.",
      conclusion: "**13th Amendment 1996 - Caretaker Government:**\\n\\n**How it worked:**\\n1. Elected government resigns 90 days before election\\n2. Last retired Chief Justice becomes Chief Adviser\\n3. Caretaker government holds free elections\\n4. Used: 1996, 2001, 2008 elections\\n\\n**15th Amendment 2011:** Abolished the system\\n**SC ruling 2011:** Declared unconstitutional (prospectively)\\n**Political impact:** Major ongoing dispute - BNP boycotted 2014 and 2024 elections partly due to absence of caretaker system\\n\\n**2024:** After mass uprising, interim government under Dr. Yunus - caretaker system restoration under discussion.",
    },
    escalate: false,
    relatedRules: ["con-005"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-020",
    jurisdiction: "BD",
    triggerKeywords: ["15th amendment", "secularism restored", "fifteenth amendment 2011", "basic structure doctrine"],
    question: "What did the 15th Amendment 2011 change?",
    irac: {
      issue: "What were the major changes made by the 15th Amendment to the Bangladesh Constitution?",
      rule: "The Constitution (Fifteenth Amendment) Act 2011 made extensive changes: (1) Restored secularism and Bengali nationalism as fundamental principles. (2) Abolished caretaker government (13th Amendment repealed). (3) Inserted Article 7A - treason provision against extra-constitutional power seizure. (4) Inserted Article 7B - certain provisions cannot be amended by Parliament (basic structure). (5) Increased women reserved seats from 45 to 50. (6) Retained Islam as state religion (Art 2A).",
      application: "The 15th Amendment is the most comprehensive and controversial amendment. Its abolition of the caretaker system led to political crisis. Article 7B's unamendable provisions have been cited in court cases challenging subsequent constitutional changes.",
      conclusion: "**15th Amendment 2011 - major changes:**\\n\\n **Restored:**\\n* Secularism (Art 8)\\n* Bengali nationalism\\n* Sheikh Mujib as 'Father of the Nation' (Constitution)\\n\\n **New provisions:**\\n* Art 7A: Treason - extra-constitutional power seizure\\n* Art 7B: Basic structure - core provisions unamendable\\n* 50 women reserved seats (from 45)\\n\\n **Abolished:**\\n* Caretaker Government system (13th Amendment)\\n\\n **Retained:**\\n* Islam as state religion (Art 2A)\\n* Bismillah before preamble\\n\\n 15th Amendment analysis - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-005"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-021",
    jurisdiction: "BD",
    triggerKeywords: ["16th amendment", "judge removal parliament", "sixteenth amendment 2014", "parliament remove judge"],
    question: "What was the 16th Amendment and why was it struck down?",
    irac: {
      issue: "What did the 16th Amendment do and what happened to it?",
      rule: "The Constitution (Sixteenth Amendment) Act 2014: Restored Parliament's power to remove Supreme Court judges by resolution. Previously (after 4th Amendment reversal), judges could only be removed through a Supreme Judicial Council. The Appellate Division in Bangladesh v. Asaduzzaman Khan (2017) declared the 16th Amendment unconstitutional - holding that parliamentary removal of judges violates the independence of the judiciary, which is part of the 'basic structure' of the Constitution.",
      application: "The Supreme Court held that judicial independence is part of the unamendable basic structure. Giving Parliament power to remove judges undermines the separation of powers. This was a landmark assertion of the basic structure doctrine in Bangladesh.",
      conclusion: "**16th Amendment 2014:**\\n\\n**What it did:** Gave Parliament power to remove SC judges by vote\\n\\n**Appellate Division 2017:** UNCONSTITUTIONAL\\n**Reason:** Violated judicial independence = basic structure\\n\\n**Current position:** Supreme Judicial Council procedure for judge removal - not Parliament\\n\\n**Significance:** First time Bangladesh Supreme Court clearly applied basic structure doctrine to strike down a constitutional amendment. Judicial independence = unamendable.",
    },
    escalate: false,
    relatedRules: ["con-005"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-022",
    jurisdiction: "BD",
    triggerKeywords: ["17th amendment", "women reserved seats", "women seats extended", "reserved seats parliament"],
    question: "What did the 17th Amendment 2018 do?",
    irac: {
      issue: "What did the 17th Amendment change about women's reserved seats?",
      rule: "The Constitution (Seventeenth Amendment) Act 2018: Extended the reserved seats for women in the Jatiya Sangsad for a further 25 years. The 50 reserved seats for women (inserted by 15th Amendment) were due to expire - the 17th Amendment extended this provision until 2043.",
      application: "The reserved seats are filled by proportional representation based on party seat share in direct elections - not by direct election. Each party nominates women candidates proportionally. Criticism: these are not directly elected seats, reducing women's political autonomy.",
      conclusion: "**17th Amendment 2018:**\\n\\n* Extended women reserved seats for 25 more years (until 2043)\\n* Total Sangsad seats: 350 (300 direct + 50 women reserved)\\n* Women reserved seats: filled by proportional party nomination\\n* NOT direct election - nominated by party based on seat share\\n\\n**History of women seats:**\\n* 10th Amd (1990): 30 reserved seats\\n* 14th Amd (2004): Increased to 45\\n* 15th Amd (2011): Increased to 50\\n* 17th Amd (2018): Extended 25 more years",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  //  STRUCTURE OF GOVERNMENT 
  {
    id: "con-qa-023",
    jurisdiction: "BD",
    triggerKeywords: ["president bangladesh", "president role", "president powers", "bangladesh president election"],
    question: "What is the role and power of the President of Bangladesh?",
    irac: {
      issue: "What powers does the President of Bangladesh have under the Constitution?",
      rule: "Articles 48-58: The President is the constitutional head of state, elected by members of the Jatiya Sangsad. The President acts on the advice of the Prime Minister (except in matters where the Constitution requires acting on his own discretion - e.g. appointment of PM, Chief Justice). The President is largely ceremonial - real executive power vests in the Prime Minister.",
      application: "The President signs legislation into law, appoints the Prime Minister (must be leader of majority in Sangsad), appoints Chief Justice, signs treaties, grants pardons. But all these actions (except PM appointment, CJ appointment) are done on PM's advice.",
      conclusion: "**President of Bangladesh:**\\n\\n**Election:** By members of Jatiya Sangsad\\n**Term:** 5 years (max 2 terms)\\n\\n**Key powers:**\\n* Appoint Prime Minister (leader of majority)\\n* Appoint Chief Justice (on PM advice)\\n* Grant pardon to convicted persons\\n* Sign legislation into law\\n* Summon/prorogue/dissolve Sangsad (on PM advice)\\n\\n**Acts independently only for:**\\n* Appointing Prime Minister\\n* Appointing Chief Justice\\n\\n**Real power:** Prime Minister - not President",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-024",
    jurisdiction: "BD",
    triggerKeywords: ["prime minister powers", "prime minister bangladesh", "pm bangladesh constitution", "executive power bangladesh"],
    question: "What powers does the Prime Minister have under the Constitution?",
    irac: {
      issue: "What constitutional powers does the Prime Minister of Bangladesh hold?",
      rule: "Articles 55-58: The Prime Minister is the head of the cabinet and holds real executive power. The cabinet is collectively responsible to the Jatiya Sangsad. The PM must command the confidence of the majority of Sangsad members. All executive actions of the Republic are taken in the name of the President but on the advice of the PM.",
      application: "The PM chairs the cabinet, controls government policy, proposes legislation, controls the budget, commands the armed forces through the President, and advises the President on all major appointments. The PM can be removed by a vote of no-confidence in the Sangsad.",
      conclusion: "**Prime Minister - constitutional powers:**\\n\\n* Head of government (real executive)\\n* Chairs Council of Ministers (Cabinet)\\n* Controls all government policy\\n* Commands Sangsad majority\\n* Advises President on all major decisions\\n* Removed by: vote of no-confidence in Sangsad\\n\\n**Cabinet responsibility:**\\n* Collectively responsible to Sangsad\\n* If PM loses confidence -> must resign\\n* PM can advise President to dissolve Sangsad\\n\\n**Appointment:** President appoints leader of majority party as PM",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-025",
    jurisdiction: "BD",
    triggerKeywords: ["jatiya sangsad", "parliament bangladesh", "national parliament", "sangsad seats"],
    question: "What is the structure of the Bangladesh Parliament (Jatiya Sangsad)?",
    irac: {
      issue: "How is the Bangladesh Parliament structured under the Constitution?",
      rule: "Articles 65-93: The Jatiya Sangsad (National Parliament) consists of 350 members - 300 directly elected from single-member territorial constituencies, and 50 reserved seats for women filled by proportional nomination. Parliamentary term is 5 years. The Speaker presides over the Sangsad.",
      application: "Citizens elect 300 MPs directly through first-past-the-post voting. The remaining 50 women seats are distributed to parties proportionally based on their direct-seat wins. Sangsad passes all laws, the budget, and holds the government accountable through question time and committees.",
      conclusion: "**Jatiya Sangsad - structure:**\\n\\n* **Total seats:** 350\\n* **Direct election:** 300 constituencies\\n* **Women reserved:** 50 (proportional party nomination)\\n* **Term:** 5 years\\n* **Speaker:** Elected by members, presides\\n\\n**Key functions:**\\n* Passes all legislation\\n* Approves national budget\\n* Holds government accountable\\n* Can remove PM by no-confidence vote\\n* Elects President\\n* Can amend Constitution (2/3 majority)\\n\\n**Quorum:** 60 members (Art 75)",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-026",
    jurisdiction: "BD",
    triggerKeywords: ["supreme court bangladesh", "appellate division", "high court division", "judiciary constitution"],
    question: "What is the structure of the Supreme Court of Bangladesh?",
    irac: {
      issue: "How is the Bangladesh Supreme Court structured under the Constitution?",
      rule: "Articles 94-116: The Supreme Court consists of two divisions - (1) Appellate Division: Chief Justice + other judges, hears appeals from High Court Division. (2) High Court Division: hears original jurisdiction, writ petitions (Art 102), and appeals from lower courts. Chief Justice is the head of the entire judiciary.",
      application: "A writ petition challenging a government order is filed in the High Court Division. If HCD decides against the petitioner, they appeal to the Appellate Division. The Appellate Division's decision is final on all constitutional questions.",
      conclusion: "**Supreme Court structure:**\\n\\n**Appellate Division:**\\n* Chief Justice + appointed judges\\n* Hears appeals from HCD\\n* Final court on all matters\\n* Interprets Constitution\\n\\n**High Court Division:**\\n* Original jurisdiction (Art 102 writs)\\n* Appeals from lower courts\\n* Commercial Court\\n\\n**Appointment:** Chief Justice appointed by President. Other judges appointed by President on PM's advice.\\n\\n**Removal:** Supreme Judicial Council process (not Parliament - 16th Amd struck down)",
    },
    escalate: false,
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  //  EMERGENCY & SPECIAL PROVISIONS 
  {
    id: "con-qa-027",
    jurisdiction: "BD",
    triggerKeywords: ["emergency provision", "state of emergency", "article 141", "emergency bangladesh constitution"],
    question: "What are the emergency provisions in the Bangladesh Constitution?",
    irac: {
      issue: "What does the Constitution say about states of emergency?",
      rule: "Articles 141A-141C (inserted by 2nd Amendment 1973): The President can proclaim a state of emergency if the security or economic life of Bangladesh is threatened by war, external aggression, or internal disturbance. The proclamation must be approved by Sangsad within 30 days. During emergency, certain fundamental rights can be suspended - except Articles 27, 28, 29, 31, 35, 44 (which cannot be suspended).",
      application: "Emergency was most notably used: 1/11 (January 2007) when the army-backed caretaker government declared emergency and arrested political leaders. Emergency suspends Articles 36, 37, 38, 39, 40, 42 (movement, assembly, association, speech, profession, property) but NOT the right to equality, life, or trial protection.",
      conclusion: "**Emergency provisions (Art 141A-C):**\\n\\n**Who declares:** President (on PM/cabinet advice)\\n**Approval needed:** Sangsad within 30 days\\n**Grounds:** War, external aggression, internal disturbance\\n\\n**Rights that CAN be suspended during emergency:**\\n* Art 36: Movement\\n* Art 37: Assembly\\n* Art 38: Association\\n* Art 39: Speech\\n* Art 40: Profession\\n* Art 42: Property\\n\\n**Rights that CANNOT be suspended ever:**\\n* Art 27: Equality\\n* Art 28: Non-discrimination\\n* Art 31: Protection of law\\n* Art 32: Right to life\\n* Art 33: Arrest safeguards\\n* Art 35: Trial protections\\n* Art 44: Right to enforce rights",
    },
    escalate: false,
    relatedRules: ["con-002"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-028",
    jurisdiction: "BD",
    triggerKeywords: ["article 7a", "treason constitution", "extra constitutional", "unconstitutional takeover"],
    question: "What does Article 7A say about unconstitutional seizure of power?",
    irac: {
      issue: "What protection does the Constitution provide against extra-constitutional seizure of power?",
      rule: "Article 7A (inserted by 15th Amendment 2011): Any person who by show of force or use of force or any other un-constitutional means abrogates, repeals, or suspends the Constitution or any of its articles, or attempts or conspires to do so - shall be guilty of sedition. The offence is punishable with the highest penalty provided in the Penal Code.",
      application: "This article was specifically inserted after the Appellate Division declared 5th and 7th Amendments unconstitutional - to make future military takeovers explicitly treasonous. It also applies to civilians who conspire with military to seize power.",
      conclusion: "**Article 7A - Anti-coup provision:**\\n\\n**Offence:** Abrogating, repealing, or suspending the Constitution by force or unconstitutional means\\n\\n**Who:** Military, civilian, or any person\\n\\n**Punishment:** Highest penalty in Penal Code (death)\\n\\n**Also covered:**\\n* Attempting to abrogate\\n* Conspiring to abrogate\\n* Abetting abrogation\\n\\n**Significance:** Bangladesh's constitutional guarantee against military coups and unconstitutional power seizure.",
    },
    escalate: false,
    relatedRules: ["con-005"],
    lastVerified: "2025-03-09",
  },

  //  DIRECTIVE PRINCIPLES 
  {
    id: "con-qa-029",
    jurisdiction: "BD",
    triggerKeywords: ["directive principles", "part two constitution", "fundamental principles state policy", "state principles non-justiciable"],
    question: "What are the Fundamental Principles of State Policy and can courts enforce them?",
    irac: {
      issue: "Are the fundamental principles of state policy (Part II) enforceable in court?",
      rule: "Part II (Articles 8-25): Fundamental Principles of State Policy - including equality of opportunity, emancipation of peasants and workers, free and compulsory education, public health, equal rights for women, rural development. Article 8(2): These are fundamental to governance and a guide to interpretation of the Constitution and other laws but shall NOT be judicially enforceable.",
      application: "The state's failure to provide universal education or healthcare cannot be directly challenged in court under Part II alone. However, courts have used Part II principles alongside Part III rights to expand the scope of enforceable rights - e.g. combining Art 32 (right to life) with Art 15 (right to food) to enforce livelihood rights.",
      conclusion: "**Fundamental Principles of State Policy (Part II):**\\n\\n**Are they enforceable?** NOT directly enforceable in court\\n\\n**But used as:**\\n* Guide for Parliament when making laws\\n* Interpretive tool for courts\\n* Combined with Art 32 (life) to create broader rights\\n\\n**Key principles (non-exhaustive):**\\n* Art 10: Right to participate in governance\\n* Art 14: Rights of peasants and workers\\n* Art 15: Provision of basic necessities\\n* Art 16: Rural development\\n* Art 17: Free and compulsory education\\n* Art 18: Public health\\n* Art 19: Equal opportunity\\n* Art 20: Work as right and duty\\n* Art 28: Elimination of women discrimination\\n\\n Directive principles guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  //  ELECTIONS 
  {
    id: "con-qa-030",
    jurisdiction: "BD",
    triggerKeywords: ["election commission bangladesh", "article 118", "election commission constitution", "ec bangladesh"],
    question: "What is the constitutional status of the Election Commission?",
    irac: {
      issue: "What powers does the Election Commission have under the Constitution?",
      rule: "Articles 118-126: The Election Commission is an independent constitutional body - Chief Election Commissioner and other Election Commissioners appointed by the President. The EC is responsible for conducting all elections to the Sangsad, the Presidency, and local bodies. The EC can make election rules and has power to postpone elections in individual constituencies.",
      application: "The EC's independence is constitutionally guaranteed - the government cannot direct the EC on how to run elections. Election Commissioners have the same security of tenure as Supreme Court judges - can only be removed by same process.",
      conclusion: "**Election Commission - constitutional status:**\\n\\n**Composition:** Chief Election Commissioner + Election Commissioners\\n**Appointment:** By President (on advice of PM)\\n**Tenure:** 5 years - same security as SC judges\\n**Removal:** Supreme Judicial Council process only\\n\\n**Powers:**\\n* Conduct all national and local elections\\n* Delimitate electoral constituencies\\n* Make election rules\\n* Postpone elections in specific areas\\n* Settle election disputes at pre-result stage\\n\\n**Independent of:** Government direction and interference\\n\\n Election law guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-031",
    jurisdiction: "BD",
    triggerKeywords: ["constitutional amendment procedure", "how to amend constitution", "two thirds majority", "amendment process bangladesh"],
    question: "How is the Bangladesh Constitution amended?",
    irac: {
      issue: "What is the procedure for amending the Bangladesh Constitution?",
      rule: "Article 142: The Constitution can be amended by Act of Parliament passed by not less than two-thirds of the total members of the Jatiya Sangsad. No referendum is required. However, Article 7B (15th Amendment) declares certain core provisions unamendable - even by 2/3 majority.",
      application: "With 350 seats, a 2/3 majority requires at least 234 votes. A party holding 234+ seats can amend the Constitution without opposition. However, Article 7B provisions (fundamental principles, fundamental rights, election provisions) cannot be amended - even by unanimous Parliament.",
      conclusion: "**Constitutional amendment procedure:**\\n\\n**Requirement:** 2/3 of ALL Sangsad members (not just present)\\n**234 votes minimum** (2/3 of 350)\\n**No referendum** required\\n**President's assent** required\\n\\n**Cannot be amended (Art 7B):**\\n* Preamble\\n* Art 1 (name and territory)\\n* Fundamental principles (Art 8-12)\\n* Fundamental rights (Part III)\\n* Art 150 (elections)\\n\\n**Amendment history:** 17 amendments as of 2018\\n**Proposed:** 18th Amendment under constitutional review (post-2024)",
    },
    escalate: false,
    relatedRules: ["con-005"],
    lastVerified: "2025-03-09",
  },

  //  CONSTITUTIONAL RIGHTS IN PRACTICE 
  {
    id: "con-qa-032",
    jurisdiction: "BD",
    triggerKeywords: ["preventive detention", "special powers act", "detained without trial", "preventive law bangladesh"],
    question: "Can the government detain someone without trial?",
    irac: {
      issue: "Is preventive detention (detention without trial) constitutional in Bangladesh?",
      rule: "Article 33(2) and (4): The state may by law provide for preventive detention (detention without trial) for reasons of state security, public order, or essential services. The Special Powers Act 1974 (SPA) allows preventive detention up to 120 days (extendable by government order) without trial. The detainee must be informed of grounds within 7 days. An Advisory Board reviews detention after 30 days.",
      application: "Preventive detention has been widely criticised. Courts have held that the government must follow strict procedures - failure to inform grounds, delay in Advisory Board review, and use of SPA for political opponents are all challengeable by Habeas Corpus in HCD.",
      conclusion: "**Preventive detention - legal framework:**\\n\\n**Law:** Special Powers Act 1974 (SPA)\\n**Maximum without review:** 120 days (extendable)\\n**Review:** Advisory Board after 30 days\\n**Must inform:** Grounds of detention within 7 days\\n\\n**Challenge in court:**\\n* Habeas Corpus petition - High Court Division\\n* Grounds: failure to inform, delay in review, improper authority\\n\\n**Constitutional limits:**\\n* Cannot be detained for vague 'state security' without specifics\\n* Right to consult lawyer maintained\\n* Art 32 (right to life) still applies\\n\\n If detained under SPA - file Habeas Corpus immediately.\\n\\n Preventive detention rights - BDT 2,999",
    },
    escalate: true,
    escalateReason: "Preventive detention requires urgent writ petition. WhatsApp NLC immediately.",
    relatedRules: ["con-002", "con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-033",
    jurisdiction: "BD",
    triggerKeywords: ["right to property article 42", "property rights constitution", "article 42 property", "government acquire property"],
    question: "What are the constitutional protections for property rights?",
    irac: {
      issue: "What does Article 42 guarantee about the right to property?",
      rule: "Article 42: Every citizen has the right to acquire, hold, transfer, and otherwise deal with property, subject to reasonable restrictions imposed by law. The state can compulsorily acquire property only if: (1) authorised by law, (2) adequate compensation is provided, (3) the acquisition is for public purpose. Article 42(2) and 47: acquisition laws are excluded from fundamental rights challenge if compensation is provided.",
      application: "Government acquires land for a road project without fair compensation: the owner can challenge the acquisition process or the adequacy of compensation in the High Court. But if the acquisition law itself provides compensation, the property owner cannot challenge the acquisition as unconstitutional.",
      conclusion: "**Property rights (Art 42):**\\n\\n **Protected:**\\n* Right to acquire, hold, and transfer property\\n* Right to fair compensation if acquired by state\\n\\n **State can acquire if:**\\n* Authorised by law\\n* Adequate compensation paid\\n* Public purpose shown\\n\\n**Challenge if:**\\n* Acquisition without proper law\\n* Compensation inadequate or not paid\\n* No genuine public purpose\\n* Procedural violations\\n\\n**Key law:** Acquisition and Requisition of Immovable Property Act 1982\\n\\n Property acquisition rights guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-002"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-034",
    jurisdiction: "BD",
    triggerKeywords: ["freedom of religion article 41", "religious rights", "religion constitution bangladesh", "article 41"],
    question: "What religious freedoms does the Constitution guarantee?",
    irac: {
      issue: "What does Article 41 guarantee about freedom of religion?",
      rule: "Article 41: (1) Every citizen has the right to profess, practise, or propagate any religion. (2) Every religious community or denomination has the right to establish and maintain educational institutions. (3) No person attending any educational institution shall be required to receive religious instruction or take part in religious ceremonies relating to a religion other than his own. Subject to law, public order, and morality.",
      application: "A Christian student in a predominantly Muslim institution cannot be forced to attend Islamic prayers - Art 41(3). A Hindu temple cannot be forcibly closed without lawful authority. A person converting from Islam to another religion faces criminal law issues under section 295A Penal Code and family law complications - not directly resolved by Art 41 alone.",
      conclusion: "**Freedom of religion (Art 41):**\\n\\n **Guaranteed:**\\n* Profess any religion\\n* Practise any religion\\n* Propagate any religion (with limits)\\n* Religious communities: establish educational institutions\\n* Students: cannot be forced into others' religious ceremonies\\n\\n **Subject to:**\\n* Public order\\n* Morality\\n* Other laws\\n\\n**Note:** Islam = state religion (Art 2A) + secularism (Art 8) coexist\\n**Minorities:** Hindus, Christians, Buddhists have full Art 41 protection",
    },
    escalate: false,
    relatedRules: ["con-002", "con-004"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-035",
    jurisdiction: "BD",
    triggerKeywords: ["article 47", "indemnity acts", "article 47a", "indemnity constitution"],
    question: "What is Article 47 and why is it controversial?",
    irac: {
      issue: "What does Article 47 do and what is the controversy around indemnity?",
      rule: "Article 47 (as amended): Certain laws shall not be void even if inconsistent with fundamental rights - specifically laws providing for preventive detention, compulsory acquisition, and certain other matters. Article 47A (1st Amendment 1973): Persons accused of genocide, war crimes, and crimes against humanity cannot invoke fundamental rights protections in relation to such trials. The Indemnity Ordinance 1975 (ratified as law) granted immunity to Mujib's killers - later challenged as unconstitutional.",
      application: "The Indemnity Ordinance 1975 - giving immunity to those who killed Sheikh Mujibur Rahman - was eventually repealed in 1996 by the Jatiya Sangsad, allowing prosecution of the killers. Courts held that no law can immunise deliberate murder from all accountability.",
      conclusion: "**Article 47 - key aspects:**\\n\\n* Certain laws exempt from fundamental rights challenge\\n* Allows preventive detention laws\\n* Allows acquisition laws\\n* War criminals excluded from fundamental rights (Art 47A)\\n\\n**Indemnity Ordinance 1975:**\\n* Given immunity to Mujib's killers\\n* Repealed 1996 by Khaleda Zia government\\n* Killers subsequently prosecuted and executed\\n\\n**Lesson:** Parliament can repeal indemnity laws - immunity is not permanent.",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  //  CITIZENSHIP & NATIONALITY 
  {
    id: "con-qa-036",
    jurisdiction: "BD",
    triggerKeywords: ["bangladesh citizenship", "article 6", "citizenship constitution", "bangladeshi national"],
    question: "What does the Constitution say about Bangladesh citizenship?",
    irac: {
      issue: "What are the constitutional provisions on Bangladesh citizenship?",
      rule: "Article 6: Citizens of Bangladesh shall be known as Bangladeshis. Article 6(2): The Bengali nation, which, by its united and determined struggle for national liberation, won independence and established the sovereign People's Republic of Bangladesh shall be the nation of Bangladesh. The Citizenship Act 1951 (as amended) governs citizenship details.",
      application: "Citizenship is by birth (born in Bangladesh before/on 26 March 1971), by descent (born to Bangladeshi parents), and by registration/naturalization. Dual citizenship for NRBs is recognised under the Bangladesh Citizenship (Amendment) Act 2008 and NRB Act.",
      conclusion: "**Bangladesh citizenship:**\\n\\n**By birth:** Born in Bangladesh\\n**By descent:** Born to Bangladeshi parents abroad\\n**By registration:** Application process\\n**By naturalization:** After 5 years residence\\n\\n**Dual citizenship (NRB):**\\n* Allowed for Bangladeshis abroad under 2008 amendment\\n* NRB card issued - some restrictions (cannot vote, hold certain offices)\\n\\n**Constitution:** Art 6 - Bangladeshi nationality\\n**Detailed rules:** Citizenship Act 1951 + NRB Act",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  //  ANTI-DISCRIMINATION & SPECIAL GROUPS 
  {
    id: "con-qa-037",
    jurisdiction: "BD",
    triggerKeywords: ["women rights constitution", "article 28", "gender equality", "sex discrimination constitution"],
    question: "What constitutional protections exist for women?",
    irac: {
      issue: "What does the Constitution guarantee for women's rights and gender equality?",
      rule: "Article 28(1): The state shall not discriminate against any citizen on grounds of sex. Article 28(2): Women shall have equal rights with men in all spheres of state and public life. Article 28(4): Special provisions may be made by the state in favour of women and children. Article 29(3)(a): Nothing prevents Parliament from making provisions in favour of women for certain government posts.",
      application: "Denial of government employment based on gender violates Art 28 and 29. However, the government can reserve quotas for women (Art 28(4)) - positive discrimination is constitutional. Pay discrimination in government employment based on gender alone is unconstitutional.",
      conclusion: "**Women's constitutional rights:**\\n\\n **Guaranteed:**\\n* Equal rights with men in state and public life (Art 28)\\n* No discrimination in government employment (Art 29)\\n* No sex discrimination by state (Art 28(1))\\n\\n **Special provisions allowed:**\\n* Quotas in government jobs (Art 29(3)(a))\\n* Women reserved seats in Parliament (50 seats)\\n* Affirmative action for women (Art 28(4))\\n\\n**Key laws:** Women and Children Repression Prevention Act 2000, Domestic Violence Act 2010, Muslim Family Laws Ordinance 1961\\n\\n Women's rights guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-002"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-038",
    jurisdiction: "BD",
    triggerKeywords: ["minority rights", "religious minority", "hindu christian buddhist rights", "minority constitution"],
    question: "What rights do religious minorities have under the Constitution?",
    irac: {
      issue: "What constitutional protections do religious minorities have in Bangladesh?",
      rule: "Articles 27, 28, 41: All citizens equal before law regardless of religion. No discrimination by state based on religion. Freedom to profess, practise, propagate religion. Article 2A: Other religions practised in peace and harmony. Minorities entitled to all fundamental rights. The Vested Property Return Act 2001 aims to return property taken from minorities under enemy/vested property laws.",
      application: "Hindus, Christians, Buddhists, and other minorities have all fundamental rights equally with Muslims. The state cannot discriminate in employment, services, or protection on religious grounds. Attacks on minority property or temples can be challenged under criminal law and the Vested Property Return Act.",
      conclusion: "**Religious minority rights:**\\n\\n **Constitutional guarantees:**\\n* Equality before law (Art 27)\\n* No state discrimination on religion (Art 28)\\n* Freedom of religion (Art 41)\\n* Right to establish religious educational institutions\\n* Right to practise religion in peace (Art 2A)\\n\\n**Key concerns:**\\n* Vested/enemy property - Vested Property Return Act 2001 provides remedy\\n* Violence against minorities - criminal law applies\\n\\n**Practical:** Government must protect minorities equally - failure = constitutional violation challengeable by writ.\\n\\n Minority rights guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-002", "con-004"],
    lastVerified: "2025-03-09",
  },

  //  POST-2024 DEVELOPMENTS 
  {
    id: "con-qa-039",
    jurisdiction: "BD",
    triggerKeywords: ["2024 uprising", "interim government 2024", "muhammad yunus", "hasina resignation"],
    question: "What happened constitutionally after the 2024 mass uprising?",
    irac: {
      issue: "What is the constitutional status of Bangladesh after the August 2024 mass uprising?",
      rule: "Following the mass student-public uprising in July-August 2024, Prime Minister Sheikh Hasina resigned on 5 August 2024 and left the country. President Mohammed Shahabuddin dissolved the Jatiya Sangsad. An interim government was formed, headed by Dr. Muhammad Yunus as Chief Adviser, under a constitutional advisory framework. The Constitution's provisions on caretaker/interim government became the legal basis, though the situation was constitutionally unprecedented.",
      application: "The interim government has treated itself as functioning under the constitutional framework - not as a military or extra-constitutional government. Constitutional review processes have been initiated. The Constitution Review Commission has been formed to recommend amendments.",
      conclusion: "**2024 constitutional situation:**\\n\\n**August 5, 2024:** PM Sheikh Hasina resigned, fled to India\\n**August 2024:** President dissolved Jatiya Sangsad\\n**Interim government:** Dr. Muhammad Yunus as Chief Adviser\\n**Legal basis:** Presidential/constitutional framework - not military rule\\n\\n**Ongoing processes (2025):**\\n* Constitution Review Commission formed\\n* Proposals for: caretaker system restoration, PR electoral reform, judicial independence\\n* 18th Amendment under discussion\\n* ICT (war crimes tribunal) under review\\n\\n**Status:** Bangladesh operating under interim constitutional arrangement - new elections expected.",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-040",
    jurisdiction: "BD",
    triggerKeywords: ["constitution reform 2024", "constitutional review commission", "reform commission", "18th amendment"],
    question: "What constitutional reforms are proposed after 2024?",
    irac: {
      issue: "What constitutional changes are being proposed by the post-2024 interim government?",
      rule: "The interim government formed a Constitution Reform Commission in 2024. Key proposals under discussion include: (1) Restoration of caretaker government system for elections. (2) Proportional Representation (PR) electoral system. (3) Two-term limit for Prime Minister. (4) Bicameral legislature (upper house). (5) Strengthening judicial independence. (6) Reviewing Article 70 (anti-defection). (7) Restoring and strengthening Article 7B basic structure provisions.",
      application: "These are proposals - not yet implemented as of early 2025. Any formal amendment requires Jatiya Sangsad (2/3 majority). Since the Sangsad is dissolved, amendments must wait until elections and a new parliament is formed.",
      conclusion: "**Proposed constitutional reforms (2025):**\\n\\n**Under discussion:**\\n* Caretaker government restoration\\n* Proportional Representation elections\\n* PM 2-term limit\\n* Bicameral legislature (Senate + HoR)\\n* Stronger judicial independence provisions\\n* Article 70 reform (anti-defection law)\\n* President: direct election (some proposals)\\n\\n**Process required:** New elections -> new Parliament -> 2/3 majority vote\\n\\n**Timeline:** Uncertain - elections expected 2025-2026\\n\\n Constitutional reform tracker - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001", "con-005"],
    lastVerified: "2025-03-09",
  },

  //  ARTICLE 70 & ANTI-DEFECTION 
  {
    id: "con-qa-041",
    jurisdiction: "BD",
    triggerKeywords: ["article 70", "floor crossing", "anti defection", "mp resign party"],
    question: "What is Article 70 and why is it controversial?",
    irac: {
      issue: "What does Article 70 say about Members of Parliament and party discipline?",
      rule: "Article 70: A person elected as a member of Parliament at a general election as a candidate of a political party shall vacate his seat if he - (a) resigns from that party, or (b) votes in Parliament against his party, or abstains from voting. The seat becomes vacant automatically.",
      application: "An MP from Party A cannot vote against their own party's bill without losing their seat. This makes MPs completely beholden to the party leadership and the PM. Critics argue this eliminates meaningful parliamentary debate and makes MPs rubber-stamp party positions.",
      conclusion: "**Article 70 - Anti-defection:**\\n\\n**Rule:** MP must vote with party OR lose seat\\n\\n**Seat vacated if MP:**\\n* Resigns from party\\n* Votes against party in Sangsad\\n* Abstains from voting against party direction\\n\\n**Effect:**\\n* MPs cannot vote independently on conscience\\n* PM controls all party MPs through party whip\\n* No meaningful opposition within ruling party\\n\\n**Reform proposals (2024):**\\n* Allow free vote on non-confidence motions\\n* Allow abstention without losing seat\\n* Limit anti-defection to no-confidence votes only\\n\\n Parliamentary reform guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  //  CONSTITUTIONAL BODIES 
  {
    id: "con-qa-042",
    jurisdiction: "BD",
    triggerKeywords: ["comptroller auditor general", "cag bangladesh", "article 127", "public audit bangladesh"],
    question: "What is the role of the Comptroller and Auditor General?",
    irac: {
      issue: "What are the constitutional functions of the Comptroller and Auditor General?",
      rule: "Articles 127-132: The Comptroller and Auditor General (CAG) is an independent constitutional office appointed by the President. The CAG audits all public accounts of Bangladesh - ensures public money is spent as authorised by Parliament. The CAG's reports are placed before Parliament and examined by the Public Accounts Committee.",
      application: "If a government department spends money on unauthorised purposes, the CAG reports this to Parliament. The Public Accounts Committee then calls the concerned secretary to explain. The CAG cannot be removed except by the same process as a Supreme Court judge - guaranteeing independence.",
      conclusion: "**Comptroller and Auditor General (CAG):**\\n\\n**Appointment:** By President (independent)\\n**Removal:** Same as Supreme Court judge - very difficult\\n\\n**Functions:**\\n* Audit all government accounts\\n* Report unauthorised expenditure to Parliament\\n* Check public procurement compliance\\n* Reports to Parliament via Public Accounts Committee\\n\\n**Independence:** Cannot be directed by government\\n\\n**Significance:** Key accountability institution - corruption and misuse of public funds reported by CAG.",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-043",
    jurisdiction: "BD",
    triggerKeywords: ["attorney general bangladesh", "article 64", "attorney general role", "state lawyer"],
    question: "What is the role of the Attorney General of Bangladesh?",
    irac: {
      issue: "What is the constitutional role of the Attorney General?",
      rule: "Article 64: The President shall appoint a person who is qualified to be a judge of the Supreme Court to be Attorney General. The Attorney General is the chief law officer of the government - appears on behalf of the government in the Supreme Court and advises the government on legal matters.",
      application: "When the government is sued in the Supreme Court (High Court Division or Appellate Division), the Attorney General defends the state's position. The AG also advises the President and government on constitutional questions.",
      conclusion: "**Attorney General:**\\n\\n**Appointment:** By President\\n**Qualification:** Supreme Court judge qualification\\n**Role:** Chief legal adviser and advocate for the government\\n\\n**Functions:**\\n* Represents government in Supreme Court\\n* Advises President on legal/constitutional matters\\n* May appear in any court in Bangladesh\\n* Assisted by Additional AGs and Deputy AGs\\n\\n**Independence:** Appointed and removed by President - not security of tenure like judges",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  //  CONSTITUTIONAL HISTORY MILESTONES 
  {
    id: "con-qa-044",
    jurisdiction: "BD",
    triggerKeywords: ["basic structure doctrine bangladesh", "unamendable constitution", "basic structure", "article 7b"],
    question: "What is the basic structure doctrine in Bangladesh?",
    irac: {
      issue: "What is the basic structure doctrine and how does it apply in Bangladesh?",
      rule: "The basic structure doctrine holds that certain fundamental features of a constitution cannot be amended even by a supermajority Parliament. Bangladesh's Appellate Division adopted this in Bangladesh Italian Marble Works case (2010). Article 7B (15th Amendment 2011) then codified it - listing specific unamendable provisions including preamble, fundamental principles, fundamental rights, and elections.",
      application: "The 16th Amendment (2014) was struck down (2017) applying the basic structure doctrine - Parliament cannot give itself power to remove judges because judicial independence is a basic structure feature. Even a unanimous Parliament cannot delete fundamental rights from the Constitution.",
      conclusion: "**Basic Structure Doctrine:**\\n\\n**Origin:** Indian Supreme Court (Kesavananda Bharati 1973) -> adopted in BD\\n**BD case:** Bangladesh Italian Marble Works (Appellate Division 2010)\\n**Codified:** Article 7B (15th Amendment 2011)\\n\\n**Unamendable features:**\\n* Preamble\\n* Fundamental principles (Art 8-12)\\n* Fundamental rights (Part III)\\n* Free and fair elections (Art 150)\\n* Republic and democracy structure\\n* Independence of judiciary\\n\\n**Applied to strike down:** 16th Amendment (2017) - judge removal by Parliament\\n\\n Basic structure guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-005"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-045",
    jurisdiction: "BD",
    triggerKeywords: ["separation of powers bangladesh", "executive legislative judicial", "three branches government", "separation powers"],
    question: "How does the separation of powers work in Bangladesh?",
    irac: {
      issue: "How is the separation of powers among the three branches of government structured in Bangladesh?",
      rule: "The Constitution distributes power among: (1) Legislature - Jatiya Sangsad (Articles 65-93), (2) Executive - President and Cabinet headed by PM (Articles 48-64), (3) Judiciary - Supreme Court and subordinate courts (Articles 94-116). Each branch has distinct functions. The judiciary is independent and the Constitution guarantees judicial independence (Article 94(4)).",
      application: "Parliament makes laws. The executive implements laws. The judiciary interprets laws and strikes down laws inconsistent with the Constitution. Courts have held that separation of powers is a basic structure - Parliament cannot concentrate all three powers in itself.",
      conclusion: "**Separation of Powers - Bangladesh:**\\n\\n**Legislature (Jatiya Sangsad):**\\n* Makes all laws\\n* Controls budget\\n* Holds executive accountable\\n\\n**Executive (President + PM + Cabinet):**\\n* Implements laws\\n* Governs day-to-day\\n* PM = real power, President = ceremonial\\n\\n**Judiciary (Supreme Court + subordinate courts):**\\n* Interprets laws\\n* Strikes down unconstitutional laws\\n* Independent (Art 94(4))\\n* Cannot be directed by executive or legislature\\n\\n**Basic structure:** Separation of powers = unamendable",
    },
    escalate: false,
    relatedRules: ["con-001", "con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-046",
    jurisdiction: "BD",
    triggerKeywords: ["public interest litigation", "pil", "pil bangladesh", "public interest writ"],
    question: "Can anyone file a writ petition on behalf of the public (PIL)?",
    irac: {
      issue: "What is Public Interest Litigation (PIL) and is it available in Bangladesh?",
      rule: "Article 102 allows 'any person aggrieved' to file a writ. Bangladesh courts have expanded this to allow Public Interest Litigation (PIL) - where any citizen can file a writ on behalf of a class of persons unable to access courts themselves (e.g. prisoners, poor, minorities). The HCD has suo motu (on its own motion) jurisdiction in public interest matters.",
      application: "Environmental destruction affecting millions: any citizen can file PIL in HCD. Prison torture: any citizen or NGO can file PIL on behalf of prisoners. Child labour: any person can challenge government inaction. Courts have issued PILs on clean air, food safety, traffic safety, and prisoner rights.",
      conclusion: "**Public Interest Litigation (PIL) - Bangladesh:**\\n\\n **Who can file:** Any citizen on behalf of public interest\\n**Where:** High Court Division\\n**No personal grievance needed** - filing on behalf of others\\n\\n**PIL used for:**\\n* Environmental protection\\n* Prisoner rights\\n* Child rights\\n* Rights of persons who cannot afford courts\\n* Challenge to government inaction\\n\\n**HCD can also:** Act suo motu (on its own) on reading newspaper reports of rights violations\\n\\n PIL filing guide - BDT 2,999",
    },
    escalate: true,
    escalateReason: "PIL filing requires High Court Division advocate. WhatsApp NLC for referral.",
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-047",
    jurisdiction: "BD",
    triggerKeywords: ["article 44", "enforce fundamental rights", "right to remedies", "constitutional remedy"],
    question: "How do I enforce my fundamental rights?",
    irac: {
      issue: "What is the constitutional mechanism for enforcing fundamental rights?",
      rule: "Article 44: The right to move the High Court Division (under Article 102) for enforcement of fundamental rights guaranteed in Part III is itself a fundamental right - it cannot be suspended except during declared emergency. This means the right to seek a remedy is as protected as the right itself.",
      application: "If your right to freedom of speech (Art 39) is violated by a government order, you can file a writ petition in the High Court Division under Article 102 read with Article 44 - seeking the order quashed (Certiorari) or seeking declaration that your right was violated. The HCD can award compensation in some cases.",
      conclusion: "**Enforcing fundamental rights (Art 44):**\\n\\n**Step 1:** Identify the right violated (Part III, Arts 26-47A)\\n**Step 2:** File writ petition in High Court Division\\n**Step 3:** Court issues Rule Nisi -> government responds\\n**Step 4:** Hearing -> judgment\\n\\n**Available remedies:**\\n* Certiorari: Quash illegal order\\n* Mandamus: Force performance of duty\\n* Prohibition: Stop illegal action\\n* Habeas Corpus: Release from illegal detention\\n* Declaration: Declaration of rights\\n* Compensation: In some cases (damages)\\n\\n**The right to enforce rights (Art 44) is itself a fundamental right - cannot be taken away.**\\n\\n Rights enforcement guide - BDT 2,999",
    },
    escalate: true,
    escalateReason: "Fundamental rights enforcement in High Court requires advocate. WhatsApp NLC.",
    relatedRules: ["con-002", "con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-048",
    jurisdiction: "BD",
    triggerKeywords: ["local government constitution", "article 59", "union parishad constitution", "local govt article"],
    question: "What does the Constitution say about local government?",
    irac: {
      issue: "What constitutional provisions govern local government in Bangladesh?",
      rule: "Articles 59-60: The state shall organise local government in every administrative unit of Bangladesh. Local government bodies shall be composed of persons elected according to law. They shall have power to impose taxes, prepare and maintain local infrastructure, and administer local development. Article 11 (fundamental principle): democracy shall be ensured at all levels including grass-roots.",
      application: "Union Parishad, Upazila Parishad, Zila Parishad, and City Corporations are constitutional local government bodies. The Local Government (Union Parishad) Act 2009 gives effect to Articles 59-60. Denial of local government elections = potential constitutional violation.",
      conclusion: "**Local government - Constitution:**\\n\\n**Constitutional basis:** Articles 59-60\\n\\n**Elected local bodies:**\\n* Union Parishad (rural)\\n* Upazila Parishad\\n* Zila Parishad\\n* Pourashava (Municipality)\\n* City Corporation (Dhaka, Chattogram, etc.)\\n\\n**Constitutional mandate:**\\n* Must be elected\\n* Must have tax powers\\n* Must administer local development\\n\\n**Key law:** Local Government (Union Parishad) Act 2009",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-049",
    jurisdiction: "BD",
    triggerKeywords: ["all amendments list", "constitutional amendments bangladesh", "17 amendments", "amendment history full"],
    question: "What is the complete list of all constitutional amendments?",
    irac: {
      issue: "What are all 17 amendments to the Bangladesh Constitution and their key changes?",
      rule: "Bangladesh Constitution has been amended 17 times between 1973 and 2018. Each amendment required 2/3 majority of total Sangsad members.",
      application: "Amendments have fundamentally altered the Constitution - from democratic-secular to authoritarian-Islamist during 1975-1990 period, and partially restored post-1991. The 15th Amendment 2011 was the most comprehensive and controversial.",
      conclusion: "**All 17 Constitutional Amendments:**\\n\\n| Amdt | Year | Key Change |\\n|---|---|---|\\n| 1st | 1973 | War crimes tribunal (Art 47A) |\\n| 2nd | 1973 | Emergency provisions |\\n| 3rd | 1974 | Berubari territory transfer |\\n| 4th | 1975 | Presidential system, BAKSAL |\\n| 5th | 1979 | Martial law ratification, Bismillah, no secularism |\\n| 6th | 1981 | VP direct election |\\n| 7th | 1986 | Ershad martial law ratification |\\n| 8th | 1988 | Islam = state religion, HC benches |\\n| 9th | 1989 | VP election changes |\\n| 10th | 1990 | 30 women reserved seats |\\n| 11th | 1991 | Shahabuddin caretaker validation |\\n| 12th | 1991 | Parliamentary system restored |\\n| 13th | 1996 | Caretaker government system |\\n| 14th | 2004 | 45 women seats, voter photos |\\n| 15th | 2011 | Secularism, caretaker abolished, Art 7A/7B |\\n| 16th | 2014 | Parliament remove judges (struck down 2017) |\\n| 17th | 2018 | Women seats extended 25 years |\\n\\n**Proposed:** 18th Amendment - under review (2024-25)\\n\\n Full amendments analysis - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-001", "con-005"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-050",
    jurisdiction: "BD",
    triggerKeywords: ["constitutional case high court", "file constitutional case", "constitutional litigation nlc", "challenge government constitution"],
    question: "How do I challenge a government action in the High Court on constitutional grounds?",
    irac: {
      issue: "What is the process for challenging government action on constitutional grounds?",
      rule: "Article 102 + High Court Division Rules: File a writ petition supported by an affidavit. The petition states: (1) facts of the case, (2) the fundamental right or law violated, (3) the relief sought. Must be filed by an Advocate of the Supreme Court. The HCD issues a Rule Nisi (show cause notice) to the government if prima facie case shown.",
      application: "Government demolishes your property without compensation or court order: file writ of certiorari to quash the demolition order + mandamus for compensation. Government arrests you without warrant and holds beyond 24 hours: habeas corpus filed same day by your lawyer. An adverse government circular affecting your profession: writ of certiorari to quash the circular.",
      conclusion: "**Filing a constitutional case - steps:**\\n\\n1. Engage Supreme Court Advocate (mandatory)\\n2. Prepare writ petition + supporting affidavit\\n3. File in HCD registry\\n4. Court scrutinises -> issues Rule Nisi\\n5. Government files return (response affidavit)\\n6. Hearing on Rule -> Judgment\\n\\n**Costs:**\\n* Court filing fee: BDT 500-5,000\\n* Advocate fee: BDT 20,000-500,000+ (varies)\\n\\n**Time:** Rule Nisi: 1 week | Final hearing: 6 months-5 years\\n\\n**Emergency:** Urgent habeas corpus can be heard within hours\\n\\n NLC can refer Supreme Court advocates for constitutional matters.\\n\\n Constitutional litigation guide - BDT 4,999",
    },
    escalate: true,
    escalateReason: "Constitutional litigation requires Supreme Court advocate. WhatsApp NLC for referral.",
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  //  CONSTITUTIONAL INTERPRETATION & JUDICIAL REVIEW 
  {
    id: "con-qa-051",
    jurisdiction: "BD",
    triggerKeywords: ["constitutional interpretation", "judicial review bangladesh", "court interpret constitution", "supreme court interpret"],
    question: "How do Bangladesh courts interpret the Constitution?",
    irac: {
      issue: "What methods and principles do Bangladesh courts use when interpreting constitutional provisions?",
      rule: "Bangladesh courts follow common-law interpretive principles adapted to constitutional text: (1) Literal/Plain Meaning Rule - words given ordinary meaning unless technical term. (2) Golden Rule - avoid absurd results. (3) Mischief Rule - identify the problem the provision was designed to solve. (4) Purposive Interpretation - read provisions in light of constitutional objectives (fundamental principles, preamble). (5) Harmonious Construction - reconcile apparently conflicting provisions. (6) Basic Structure Doctrine - certain features cannot be interpreted away.",
      application: "When interpreting Article 32 (right to life), the Supreme Court rejected narrow 'mere animal existence' reading and expanded to include dignity, livelihood, and environment - using purposive interpretation aligned with Article 8 fundamental principles. In Article 70 cases, courts use literal rule since text is unambiguous.",
      conclusion: "**Constitutional interpretation methods:**\n\n**1. Literal/Plain Meaning**\n* Ordinary dictionary meaning of words\n* Used when text is clear (Art 70 anti-defection)\n\n**2. Purposive**\n* Read in light of constitutional objectives\n* Used for fundamental rights expansion (Art 32 -> livelihood, environment)\n\n**3. Harmonious Construction**\n* Reconcile Art 2A (state religion) with Art 8 (secularism)\n* Both coexist per Supreme Court\n\n**4. Basic Structure Limit**\n* Cannot interpret away judicial independence, fundamental rights, democracy\n* Any interpretation undermining basic structure = invalid\n\n**5. International Law Reference**\n* Courts refer to ICCPR, UDHR as persuasive (not binding)\n* Used to interpret fundamental rights broadly\n\n Constitutional interpretation guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-001", "con-005"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-052",
    jurisdiction: "BD",
    triggerKeywords: ["doctrine of eclipse", "eclipse doctrine", "pre-constitutional law", "1972 laws valid", "constitution eclipse"],
    question: "What happens to laws made before the 1972 Constitution?",
    irac: {
      issue: "Are pre-1972 laws still valid after the Constitution came into force?",
      rule: "Article 149 + Fourth Schedule: Laws existing before 16 December 1972 continue in force but are subject to the Constitution. The Doctrine of Eclipse applies - pre-constitutional laws inconsistent with fundamental rights are not void ab initio (from the beginning) but become 'eclipsed' (unenforceable) to the extent of inconsistency. They can be revived if the inconsistency is removed by constitutional amendment.",
      application: "The Special Powers Act 1974 was enacted after the Constitution but its preventive detention provisions were challenged as inconsistent with Article 32 and 33. Courts held that while the Act survives, specific detention orders must comply with constitutional safeguards. Pre-1972 Penal Code 1860 provisions continue but must be read consistently with fundamental rights.",
      conclusion: "**Pre-constitutional laws - Doctrine of Eclipse:**\n\n**Rule:**\n* Pre-1972 laws continue unless repealed\n* Inconsistent with fundamental rights = eclipsed (unenforceable)\n* Not void from beginning - can be revived if Constitution amended\n\n**Post-1972 laws:**\n* Inconsistent with Constitution = VOID (Art 26)\n* Struck down by courts\n\n**Key distinction:**\n* Pre-1972: Eclipse (dormant, revivable)\n* Post-1972: Void (dead, unrevivable)\n\n**Practical impact:**\n* Most colonial-era laws still operate\n* Must be read consistently with fundamental rights\n* Courts can sever unconstitutional parts\n\n Pre-constitutional law guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001", "con-002"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-053",
    jurisdiction: "BD",
    triggerKeywords: ["severability doctrine", "striking down law", "law partially void", "sever unconstitutional part"],
    question: "Can a court strike down only part of a law, or must the whole law go?",
    irac: {
      issue: "What is the doctrine of severability and how do Bangladesh courts apply it?",
      rule: "The Doctrine of Severability: When only part of a law is unconstitutional, courts can sever (remove) the unconstitutional portion and preserve the rest - IF the remaining law is still coherent, workable, and expresses the legislature's original intent. If the unconstitutional part is so integral that the law cannot function without it, the entire law is struck down. Article 26: 'to the extent of the inconsistency' supports severability.",
      application: "In striking down Section 57 of the ICT Act 2006 (later replaced by DSA 2018), courts considered whether the entire Act should fall or only the offending section. Since the Act had legitimate purposes (cyber security), courts severed only the overbroad speech restrictions. Similarly, specific provisions of the Special Powers Act have been read down while the Act itself survives.",
      conclusion: "**Doctrine of Severability:**\n\n**When courts sever (partial strike-down):**\n* Unconstitutional part is separable\n* Remaining law is workable and coherent\n* Legislature's intent still achievable\n* Supported by Art 26 ('to the extent of inconsistency')\n\n**When entire law struck down:**\n* Unconstitutional part is the heart of the law\n* Remaining parts cannot function meaningfully\n* Legislature's intent completely frustrated\n\n**Examples:**\n* Section 57 ICT Act - severed, Act survived\n* 16th Amendment - struck down entirely (core purpose unconstitutional)\n\n Severability doctrine guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-002", "con-005"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-054",
    jurisdiction: "BD",
    triggerKeywords: ["prospective overruling", "retrospective judgment", "court judgment effect", "judgment apply past"],
    question: "Do court judgments apply retroactively or only for the future?",
    irac: {
      issue: "When the Supreme Court declares a law unconstitutional, does the judgment apply only prospectively or also retrospectively?",
      rule: "Bangladesh courts generally apply constitutional judgments retrospectively - the law is declared void from its inception (void ab initio). However, in exceptional circumstances, courts may use 'prospective overruling' - declaring a law unconstitutional but limiting the effect to future cases only. This is rare and used to avoid chaos from overturning long-settled arrangements.",
      application: "When the Appellate Division declared the 5th and 7th Amendments unconstitutional (2010), the judgment was applied prospectively in some respects - past actions taken under those amendments were not automatically invalidated to prevent destabilising decades of governance. But fundamental rights violations under those amendments could still be challenged.",
      conclusion: "**Judgment effect - retrospective vs prospective:**\n\n**General rule:** Retrospective\n* Unconstitutional law = void from birth\n* All actions under it potentially challengeable\n* Art 26: 'void to the extent of inconsistency'\n\n**Exception - Prospective Overruling:**\n* Used rarely, for stability\n* Past actions preserved\n* Future actions governed by new ruling\n* Applied to 5th/7th Amendment declarations\n\n**Practical:**\n* If your conviction was under a law later struck down -> may challenge\n* If government action was under struck-down law -> may be voidable\n* Time limits apply - consult advocate immediately\n\n Judgment effect guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-001", "con-005"],
    lastVerified: "2025-03-09",
  },

  //  FUNDAMENTAL RIGHTS - DEEPER ANALYSIS 
  {
    id: "con-qa-055",
    jurisdiction: "BD",
    triggerKeywords: ["reasonable restrictions", "fundamental rights limits", "rights not absolute", "article 39 restrictions"],
    question: "Are fundamental rights absolute or can the government limit them?",
    irac: {
      issue: "To what extent can the state impose restrictions on fundamental rights?",
      rule: "No fundamental right in the Bangladesh Constitution is absolute. Most rights in Part III are subject to 'reasonable restrictions' imposed by law for specific purposes: state security, public order, decency, morality, contempt of court, defamation, incitement. The restriction must be: (1) by LAW (not executive order), (2) REASONABLE (proportionate, necessary, least restrictive means), (3) for SPECIFIED GROUNDS only. Article 32 (right to life) and Article 28 (non-discrimination) have fewer exceptions.",
      application: "The Cyber Security Act 2023 restricts online speech - courts examine whether the restriction is 'reasonable' by testing: is the law clear and specific? Is the restriction proportionate to the harm? Is there a less restrictive alternative? Overbroad restrictions that chill legitimate speech have been struck down or read down.",
      conclusion: "**Fundamental rights - limits and restrictions:**\n\n**General rule:** Rights are NOT absolute\n\n**Valid restriction must be:**\n1. **By LAW** - Parliament Act, not executive order\n2. **REASONABLE** - proportionate, necessary, least restrictive\n3. **For SPECIFIED GROUNDS** - listed in each article\n\n**Rights with FEW exceptions:**\n* Art 32: Right to life (only 'save in accordance with law')\n* Art 28: Non-discrimination (very limited exceptions)\n\n**Rights with MORE exceptions:**\n* Art 39: Speech (state security, public order, decency, defamation, contempt)\n* Art 37: Assembly (public order, health, morality)\n* Art 38: Association (public order, morality, sovereignty)\n\n**Test for reasonableness:**\n* Is the law clear and not vague?\n* Is the restriction proportionate?\n* Does it achieve legitimate aim with minimal intrusion?\n\n Reasonable restrictions guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-002"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-056",
    jurisdiction: "BD",
    triggerKeywords: ["horizontal application", "fundamental rights private", "private company rights", "rights against private"],
    question: "Do fundamental rights apply against private individuals and companies?",
    irac: {
      issue: "Can fundamental rights be enforced against private actors, or only against the government?",
      rule: "Traditionally, fundamental rights in Part III apply only against STATE ACTION - government, public authorities, and bodies exercising public functions. However, courts have expanded this through: (1) 'State' definition in Article 152 - includes government, Parliament, local authorities, and statutory bodies. (2) Public Function Test - private bodies performing public functions (universities, regulatory bodies) may be subject to fundamental rights. (3) PIL expansion - courts have intervened in private matters affecting public interest. (4) Statutory duties - private persons must comply with laws that embody constitutional values.",
      application: "A private university receiving government funding and performing educational functions: students can challenge discriminatory policies using fundamental rights arguments. A purely private company refusing service: not directly bound by fundamental rights, but may violate specific statutes (labour laws, consumer protection) that reflect constitutional values.",
      conclusion: "**Fundamental rights - horizontal application:**\n\n**General rule:** Against STATE only\n* Government departments\n* Public universities\n* Local authorities\n* Statutory bodies\n\n**Expanded application:**\n* Private bodies performing PUBLIC FUNCTIONS\n* Bodies exercising statutory powers\n* Entities substantially funded/controlled by government\n\n**NOT directly applicable to:**\n* Purely private companies\n* Individual private disputes\n* Private family matters\n\n**Alternative remedies against private actors:**\n* Labour laws (reflecting Art 28, 29)\n* Consumer protection laws\n* Tort law\n* Specific statutes\n\n Horizontal application guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-002"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-057",
    jurisdiction: "BD",
    triggerKeywords: ["compensation constitutional violation", "damages fundamental rights", "money remedy rights", "constitutional tort"],
    question: "Can I get compensation if the government violates my fundamental rights?",
    irac: {
      issue: "Is monetary compensation available for violations of fundamental rights by the state?",
      rule: "Bangladesh courts have increasingly awarded compensation (constitutional tort) for fundamental rights violations by state actors. The remedy derives from: (1) Article 102 - High Court Division's broad remedial power. (2) Article 44 - right to enforce rights. (3) Article 32 - right to life includes right to compensation for unlawful deprivation. (4) Public Trust Doctrine - state has fiduciary duty to citizens. Compensation is discretionary - courts consider: gravity of violation, duration, mental suffering, loss of earnings, and state's conduct.",
      application: "Person illegally detained by police for 30 days: High Court can award compensation for unlawful detention under Articles 32 and 33. Person whose property was demolished without due process: compensation for violation of Article 42. Environmental destruction by government project: compensation for violation of expanded Article 32 right to clean environment.",
      conclusion: "**Compensation for constitutional violations:**\n\n**Available for:**\n* Illegal detention (Art 32, 33)\n* Unlawful property acquisition (Art 42)\n* Environmental harm (expanded Art 32)\n* Torture/custodial violence (Art 35)\n* Discriminatory state action (Art 27, 28)\n\n**Factors courts consider:**\n* Gravity and duration of violation\n* Mental anguish and suffering\n* Loss of income/reputation\n* State's conduct (malice vs negligence)\n\n**How to claim:**\n* Include compensation prayer in writ petition\n* Provide evidence of loss (medical bills, income loss, valuation)\n* Court may appoint commission to assess damages\n\n**Typical awards:** BDT 50,000 - 5,000,000 (varies widely)\n\n Constitutional compensation guide - BDT 2,999",
    },
    escalate: true,
    escalateReason: "Compensation claims require documented evidence and High Court advocate. WhatsApp NLC.",
    relatedRules: ["con-002", "con-003"],
    lastVerified: "2025-03-09",
  },

  //  WRIT JURISDICTION - ADVANCED 
  {
    id: "con-qa-058",
    jurisdiction: "BD",
    triggerKeywords: ["certiorari writ", "quash order", "illegal order court", "quash government decision"],
    question: "What is a Certiorari writ and when is it used?",
    irac: {
      issue: "When can the High Court quash a government or lower court decision using Certiorari?",
      rule: "Certiorari (Latin: 'to be certified') is a writ issued by the High Court Division to quash (nullify) an order, decision, or proceeding of a lower court, tribunal, or public authority that: (1) exceeds jurisdiction, (2) violates principles of natural justice, (3) is based on no evidence, (4) is affected by bias, (5) is illegal/ultra vires. The order is quashed - sent back to the authority for fresh decision if appropriate.",
      application: "Government cancels your business licence without giving you a hearing: Certiorari to quash the cancellation order for violation of natural justice (audi alteram partem). Lower court convicts you based on evidence not legally admissible: Certiorari to quash the conviction. University expels a student without inquiry: Certiorari quashes expulsion.",
      conclusion: "**Certiorari - when to use:**\n\n **Grounds for Certiorari:**\n1. **Excess of jurisdiction** - authority acted beyond power\n2. **Violation of natural justice** - no hearing, bias\n3. **Error of law apparent on face of record**\n4. **No evidence** - decision lacks any supporting evidence\n5. **Ultra vires** - action beyond legal authority\n\n**Effect:**\n* Order/decision QUASHED (cancelled)\n* May be sent back (remitted) for fresh decision\n* Authority must follow lawful procedure\n\n**Examples:**\n* Quash illegal licence cancellation\n* Quash arbitrary deportation order\n* Quash biased tribunal decision\n* Quash university expulsion without inquiry\n\n Certiorari guide - BDT 2,999",
    },
    escalate: true,
    escalateReason: "Certiorari petitions require High Court advocate. WhatsApp NLC for referral.",
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-059",
    jurisdiction: "BD",
    triggerKeywords: ["prohibition writ", "stop proceeding", "prevent illegal action", "stop lower court"],
    question: "What is a Prohibition writ and when is it used?",
    irac: {
      issue: "When can the High Court stop a lower court or tribunal from proceeding with a matter?",
      rule: "Prohibition is a writ issued by the High Court Division to a lower court, tribunal, or public authority to STOP it from proceeding with a matter where it lacks jurisdiction or is about to violate principles of natural justice. Unlike Certiorari (which quashes completed actions), Prohibition prevents future/ongoing illegal actions. It is preventive, not corrective.",
      application: "A Magistrate is about to try a case that by law must be tried by Sessions Court: Prohibition to stop the Magistrate. A tribunal is about to hear a matter where one member is biased: Prohibition to stop the hearing. A government officer is about to demolish your house without notice: Prohibition to stop the demolition.",
      conclusion: "**Prohibition - preventive writ:**\n\n**Difference from Certiorari:**\n* Prohibition: STOPS ongoing/future illegal action\n* Certiorari: QUASHES completed illegal action\n\n **Use Prohibition when:**\n* Lower court/tribunal lacks jurisdiction\n* Proceedings violate natural justice\n* Authority is about to act beyond power\n* Bias or conflict of interest exists\n\n**Examples:**\n* Stop Magistrate from trying Sessions-case\n* Stop biased tribunal hearing\n* Stop demolition without notice\n* Stop illegal deportation proceedings\n\n Prohibition guide - BDT 2,999",
    },
    escalate: true,
    escalateReason: "Prohibition petitions require High Court advocate. WhatsApp NLC for referral.",
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-060",
    jurisdiction: "BD",
    triggerKeywords: ["quo warranto", "challenge public office", "illegal appointment", "who holds office"],
    question: "What is a Quo Warranto writ and when is it used?",
    irac: {
      issue: "How can a person challenge another person's right to hold public office?",
      rule: "Quo Warranto (Latin: 'by what authority?') is a writ issued by the High Court Division to challenge a person's right to hold a public office. It asks the office-holder to show by what authority they occupy the position. Available when: (1) the office is public and substantive (not honorary), (2) the office was created by law or Constitution, (3) the respondent has usurped the office or is ineligible. If the claim fails, the person is removed from office.",
      application: "A person appointed as Vice-Chancellor of a public university lacks the required academic qualification: any citizen can file Quo Warranto. An MP was underage at election: Quo Warranto to challenge their seat. A government secretary appointed despite disqualifying criminal conviction: Quo Warranto to challenge appointment.",
      conclusion: "**Quo Warranto - challenge to public office:**\n\n**Requirements:**\n* Office must be PUBLIC and SUBSTANTIVE\n* Created by law or Constitution\n* Respondent usurped or ineligible\n\n**Who can file:** Any citizen (not necessarily personally aggrieved)\n\n**Effect if successful:**\n* Person REMOVED from office\n* Office declared vacant\n\n**Examples:**\n* VC without required PhD\n* Underage MP\n* Disqualified person as judge\n* Illegal appointment to constitutional body\n\n**Cannot use for:**\n* Private company positions\n* Honorary titles\n* Political party posts\n\n Quo Warranto guide - BDT 2,999",
    },
    escalate: true,
    escalateReason: "Quo Warranto requires High Court advocate. WhatsApp NLC for referral.",
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-061",
    jurisdiction: "BD",
    triggerKeywords: ["locus standi", "who can file writ", "writ standing", "aggrieved person writ"],
    question: "Who has standing to file a writ petition in Bangladesh?",
    irac: {
      issue: "What is the requirement of 'locus standi' (standing) for filing writ petitions?",
      rule: "Article 102 requires the petitioner to be an 'aggrieved person' for some writs (Habeas Corpus, Mandamus, Certiorari, Prohibition). However, Bangladesh courts have significantly relaxed this for: (1) Public Interest Litigation (PIL) - any citizen can file on behalf of disadvantaged groups. (2) Quo Warranto - any citizen can challenge public office. (3) Environmental and human rights cases - NGOs and concerned individuals have standing. (4) Suo motu - High Court can act on its own motion. The trend is toward liberal standing to ensure access to justice.",
      application: "A lawyer files PIL on behalf of prisoners tortured in custody - no personal injury to the lawyer, but standing granted as public interest. An NGO files writ challenging environmental destruction affecting a village - standing granted as representative of affected community. A journalist files writ after reading newspaper report of illegal detention - court may take suo motu cognizance.",
      conclusion: "**Standing (Locus Standi) for writs:**\n\n**Traditional rule:** 'Aggrieved person' only\n\n**Expanded standing:**\n* **PIL:** Any citizen for public interest\n* **Quo Warranto:** Any citizen\n* **Environmental cases:** Affected persons, NGOs, concerned citizens\n* **Suo motu:** Court acts on its own\n\n**For personal rights (Habeas Corpus, Mandamus):**\n* Person directly affected\n* OR any person on their behalf (for Habeas Corpus)\n\n**Documents needed:**\n* Affidavit showing interest/concern\n* For PIL: explain why affected persons cannot file themselves\n\n**Trend:** Increasingly liberal - access to justice priority\n\n Standing requirements guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  //  ADMINISTRATIVE LAW & CONSTITUTION 
  {
    id: "con-qa-062",
    jurisdiction: "BD",
    triggerKeywords: ["natural justice", "audi alteram partem", "fair hearing", "principles natural justice"],
    question: "What are the principles of natural justice in Bangladesh?",
    irac: {
      issue: "What procedural fairness requirements apply when government authorities make decisions affecting individuals?",
      rule: "The Principles of Natural Justice (derived from Article 31 - protection of law, and Article 27 - equality) require: (1) Audi Alteram Partem - hear the other side. No person should be condemned unheard. Includes: right to notice, right to present case, right to legal representation, right to cross-examine. (2) Nemo Judex in Causa Sua - no one should be a judge in their own cause. Decision-maker must be unbiased and free from conflict of interest. (3) Reasoned Decision - authority must give reasons for its decision. These apply to all quasi-judicial and administrative actions affecting rights.",
      application: "University disciplinary committee expels student without telling them the charges or giving hearing: violates audi alteram partem. Government officer who is also complainant decides punishment: violates nemo judex. Tax authority assesses huge penalty without explaining calculation: violates reasoned decision requirement.",
      conclusion: "**Principles of Natural Justice:**\n\n**1. Audi Alteram Partem (Hear the other side)**\n* Right to NOTICE of charges/allegations\n* Right to PRESENT evidence and arguments\n* Right to LEGAL REPRESENTATION\n* Right to CROSS-EXAMINE witnesses\n\n**2. Nemo Judex in Causa Sua (No bias)**\n* Decision-maker must be IMPARTIAL\n* No personal interest in outcome\n* No pre-judgment\n\n**3. Reasoned Decision**\n* Must give REASONS for decision\n* Reasons must be INTELLIGIBLE\n* Must address material arguments\n\n**Remedy if violated:**\n* Writ of Certiorari to quash decision\n* Writ of Prohibition to stop proceedings\n* Mandamus to compel fair hearing\n\n Natural justice guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-002", "con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-063",
    jurisdiction: "BD",
    triggerKeywords: ["ultra vires", "beyond power", "authority exceeded power", "void administrative action"],
    question: "What does 'ultra vires' mean and when is government action invalid?",
    irac: {
      issue: "When is a government decision or action beyond legal authority and therefore invalid?",
      rule: "Ultra Vires (Latin: 'beyond the powers') means an authority has acted outside the scope of power granted by law. Types: (1) Simple Ultra Vires - action not authorised by the enabling statute at all. (2) Extended Ultra Vires - action within general power but exercised for improper purpose, with improper considerations, or unreasonably. (3) Procedural Ultra Vires - failure to follow mandatory procedure. (4) Subordinate Legislation Ultra Vires - rules/regulations exceeding parent Act. Ultra vires actions are VOID and can be quashed by Certiorari.",
      application: "A local government authority demolishes a building under 'public safety' power when the real motive is political revenge: ultra vires (improper purpose). A licensing authority rejects an application based on personal dislike rather than statutory criteria: ultra vires (irrelevant considerations). A university changes admission criteria without publishing them: ultra vires (procedural failure).",
      conclusion: "**Ultra Vires - government action beyond power:**\n\n**Types:**\n1. **Simple** - No power at all for this action\n2. **Extended** - Power exists but exercised wrongly:\n * Improper purpose\n * Irrelevant considerations\n * Unreasonableness (Wednesbury unreasonableness)\n3. **Procedural** - Failed to follow required steps\n4. **Subordinate legislation** - Rules exceed parent Act\n\n**Effect:**\n* Action is VOID (not merely voidable)\n* Can be quashed by Certiorari\n* No legal effect from beginning\n\n**Examples:**\n* Demolition for political motive\n* Licence rejection based on personal bias\n* Tax assessment without required notice\n* University rule contradicting University Act\n\n Ultra vires guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-003"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-064",
    jurisdiction: "BD",
    triggerKeywords: ["delegated legislation", "subordinate legislation", "rule making power", "administrative rule making"],
    question: "Can government departments make laws, or only Parliament?",
    irac: {
      issue: "What is delegated legislation and what are its constitutional limits?",
      rule: "Article 65 vests legislative power in Parliament. However, Parliament can delegate rule-making power to the executive (government departments, ministries) through 'delegated legislation' or 'subordinate legislation.' Constitutional limits: (1) Parliament cannot delegate ESSENTIAL legislative functions (policy decisions must remain with Parliament). (2) Delegated legislation must be within the SCOPE of the parent Act. (3) Must not conflict with the Constitution or parent Act. (4) May be subject to Parliamentary oversight (laying before Parliament). (5) Can be challenged as ultra vires.",
      application: "Parliament passes the Environment Conservation Act and authorises the Department of Environment to make rules on pollution standards. The Department sets standards stricter than the Act allows: ultra vires. Parliament passes a tax law and authorises the NBR to make procedural rules. NBR rules that create new tax liabilities not in the Act: ultra vires (essential legislative function).",
      conclusion: "**Delegated (Subordinate) Legislation:**\n\n**What it is:**\n* Parliament makes parent Act\n* Executive makes rules/regulations under it\n* Common for technical/procedural matters\n\n**Constitutional limits:**\n* Cannot delegate ESSENTIAL legislative functions\n* Must stay within parent Act scope\n* Must not conflict with Constitution\n* Subject to judicial review (ultra vires challenge)\n\n**Parliamentary control:**\n* Rules 'laid before' Parliament\n* Parliament can annul/amend\n\n**Judicial review:**\n* Challenge as ultra vires\n* Certiorari to quash invalid rules\n* Must show rule exceeds parent Act or Constitution\n\n Delegated legislation guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  //  CONSTITUTIONAL BODIES - EXPANDED 
  {
    id: "con-qa-065",
    jurisdiction: "BD",
    triggerKeywords: ["public service commission", "psc bangladesh", "bpsc", "public service commission constitution"],
    question: "What is the constitutional role of the Public Service Commission?",
    irac: {
      issue: "What powers does the Bangladesh Public Service Commission (BPSC) have under the Constitution?",
      rule: "Articles 137-141: The Bangladesh Public Service Commission (BPSC) is an independent constitutional body responsible for recruitment and examination for government service. The Commission conducts competitive examinations, advises the President on disciplinary matters, and ensures merit-based selection. Members are appointed by the President and have security of tenure similar to Supreme Court judges - removable only by Supreme Judicial Council process.",
      application: "Government department directly appoints someone without BPSC examination where the post requires BPSC recruitment: appointment is illegal and can be challenged by writ. BPSC examination results challenged for irregularity: can be reviewed by High Court under writ jurisdiction. Government ignores BPSC recommendation on disciplinary action: may violate constitutional scheme.",
      conclusion: "**Public Service Commission (BPSC):**\n\n**Constitutional status:** Independent body (Art 137-141)\n\n**Functions:**\n* Conduct competitive exams for govt posts\n* Advise on recruitment methods\n* Advise on disciplinary matters\n* Ensure merit-based selection\n\n**Independence:**\n* Members appointed by President\n* Security of tenure (SJC removal only)\n* Cannot be directed by government\n\n**Challenge:**\n* Illegal appointment without BPSC -> Writ of Quo Warranto\n* Exam irregularity -> Writ of Certiorari\n* Government ignoring BPSC advice -> Mandamus\n\n BPSC rights guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-066",
    jurisdiction: "BD",
    triggerKeywords: ["supreme judicial council", "judge removal", "remove judge bangladesh", "judge discipline"],
    question: "How are Supreme Court judges removed from office?",
    irac: {
      issue: "What is the procedure for removing Supreme Court judges and why was the 16th Amendment struck down?",
      rule: "Articles 96-97: Supreme Court judges hold office until age 67 (or 65 for High Court Division per 14th Amendment). Removal is through the Supreme Judicial Council (SJC): (1) Council consists of Chief Justice + two next senior-most Appellate Division judges. (2) Council investigates complaint of misconduct or incapacity. (3) If satisfied, recommends removal to President. (4) President removes judge. This process was restored after the 16th Amendment (Parliament removal) was struck down in 2017 as violating judicial independence (basic structure).",
      application: "Allegation that a High Court judge accepted bribe: complaint filed with SJC. SJC investigates in camera (private), may call witnesses, examine evidence. If misconduct proved, recommends removal to President. Parliament cannot directly remove judges - the 16th Amendment attempt was declared unconstitutional.",
      conclusion: "**Judge Removal - Supreme Judicial Council:**\n\n**Process:**\n1. Complaint filed with SJC\n2. SJC investigates (private proceedings)\n3. If misconduct/incapacity proved -> recommends removal\n4. President removes judge\n\n**SJC composition:**\n* Chief Justice\n* Two next senior-most AD judges\n\n**Why 16th Amendment failed:**\n* Gave Parliament power to remove judges\n* SC 2017: Violates judicial independence\n* Judicial independence = basic structure (unamendable)\n\n**Security of tenure:**\n* HCD judges: until age 65\n* AD judges: until age 67\n* Cannot be removed except by SJC process\n\n Judicial independence guide - BDT 1,999",
    },
    escalate: false,
    relatedRules: ["con-005"],
    lastVerified: "2025-03-09",
  },

  //  SPECIAL CONSTITUTIONAL TOPICS 
  {
    id: "con-qa-067",
    jurisdiction: "BD",
    triggerKeywords: ["article 70 reform", "floor crossing reform", "anti defection reform", "mp independence vote"],
    question: "What reforms to Article 70 are being proposed?",
    irac: {
      issue: "What changes to the anti-defection law are under discussion and what would they mean?",
      rule: "Article 70 currently requires MPs to vote with their party on ALL matters or lose their seat. Reform proposals (post-2024 Constitution Review Commission) include: (1) Allowing free vote on no-confidence motions against the government. (2) Allowing abstention without automatic seat loss. (3) Limiting anti-defection to votes specifically designated as 'party line' by the Speaker. (4) Creating a 'conscience vote' category for ethical/social issues. (5) Requiring party to show cause before declaring defection. These reforms aim to restore MP independence while maintaining party discipline on core governance.",
      application: "Under current law, an MP who believes their party's budget is harmful to their constituency cannot vote against it without losing their seat. Under proposed reforms, the MP could abstain or vote against on designated matters without penalty. An MP who genuinely switches ideology and joins another party: current law forces seat loss; proposed reforms may allow by-election instead.",
      conclusion: "**Article 70 Reform Proposals:**\n\n**Current problem:**\n* MPs = rubber stamps for party leadership\n* No independent judgment possible\n* PM controls Parliament completely\n\n**Proposed reforms:**\n1. **Free vote on no-confidence** - MP can vote conscience\n2. **Abstention allowed** - without losing seat\n3. **Speaker-designated votes** - only specific votes bind party\n4. **Conscience vote category** - ethical/social issues\n5. **Due process** - party must show cause before defection declared\n\n**Status:** Proposals only - require constitutional amendment (2/3 majority)\n\n**Impact if passed:**\n* More meaningful parliamentary debate\n* Reduced PM dominance\n* Potential for coalition building\n\n Parliamentary reform guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-068",
    jurisdiction: "BD",
    triggerKeywords: ["constitutional review commission 2024", "yunus reform", "interim government reform", "reform proposals 2025"],
    question: "What is the Constitution Review Commission and what is it doing?",
    irac: {
      issue: "What is the mandate and composition of the post-2024 Constitution Review Commission?",
      rule: "The interim government under Dr. Muhammad Yunus formed the Constitution Review Commission in late 2024 to examine and recommend amendments to the Bangladesh Constitution. The Commission includes constitutional lawyers, academics, former judges, and civil society representatives. Its mandate covers: (1) Reviewing all 17 amendments for consistency with democratic principles. (2) Proposing reforms to strengthen checks and balances. (3) Examining the caretaker/interim government framework. (4) Reviewing fundamental rights protections. (5) Assessing electoral system reforms. The Commission's recommendations are advisory - formal amendments require elected Parliament.",
      application: "The Commission is holding public consultations, receiving submissions from political parties, legal experts, and citizens. Key debates include: whether to restore caretaker government, whether to adopt proportional representation, whether to impose term limits on PM, and whether to create an upper house (Senate).",
      conclusion: "**Constitution Review Commission (2024-2025):**\n\n**Formed by:** Interim government (Dr. Yunus)\n**Mandate:** Review Constitution, recommend reforms\n\n**Key areas:**\n* Caretaker government restoration\n* Electoral system (PR vs FPTP)\n* PM term limits\n* Bicameral legislature\n* Judicial independence\n* Article 70 reform\n* Basic structure strengthening\n\n**Process:**\n* Public consultations\n* Expert submissions\n* Draft recommendations\n* Report to interim government\n\n**Limitation:**\n* Recommendations are ADVISORY only\n* Formal amendment requires elected Parliament (2/3 majority)\n* Elections expected 2025-2026\n\n Reform commission updates - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001", "con-005"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-069",
    jurisdiction: "BD",
    triggerKeywords: ["constitutional oath", "oath of office", "president oath", "pm oath constitution"],
    question: "What oaths do constitutional office-holders take?",
    irac: {
      issue: "What oaths are required by the Constitution for key office-holders?",
      rule: "Fourth Schedule of the Constitution prescribes oaths for: President, Prime Minister, Ministers, Speaker, Deputy Speaker, MPs, Judges, Election Commissioners, Comptroller and Auditor General, and other constitutional office-holders. The oaths generally require: (1) Faithful performance of duties, (2) Preservation, protection, and defence of the Constitution, (3) Impartiality and integrity, (4) Service to the people. The President's oath includes preserving the Constitution and law. Judges' oaths include administering justice without fear or favour.",
      application: "A Minister who acts corruptly violates their oath of faithful performance and integrity - grounds for removal by PM (political) or impeachment (if applicable). A judge who shows bias violates their oath of impartiality - grounds for SJC proceedings. The oath is not merely ceremonial - it creates a constitutional duty enforceable through removal processes.",
      conclusion: "**Constitutional Oaths (Fourth Schedule):**\n\n**President:**\n* Preserve, protect, defend Constitution\n* Faithfully perform duties\n* Serve people\n\n**Prime Minister/Ministers:**\n* Faithful performance\n* Preserve Constitution\n* Integrity and impartiality\n\n**Judges:**\n* Administer justice without fear or favour\n* Preserve Constitution\n* Integrity and impartiality\n\n**MPs:**\n* Faithful performance\n* Preserve Constitution\n\n**Significance:**\n* Not merely ceremonial\n* Creates enforceable constitutional duty\n* Violation = grounds for removal\n* Oath binds conscience and law\n\n Constitutional oaths guide - BDT 499",
    },
    escalate: false,
    relatedRules: ["con-001"],
    lastVerified: "2025-03-09",
  },

  {
    id: "con-qa-070",
    jurisdiction: "BD",
    triggerKeywords: ["constitutional supremacy vs parliamentary sovereignty", "parliament supreme", "court vs parliament", "judicial supremacy"],
    question: "Is Parliament supreme, or is the Constitution supreme?",
    irac: {
      issue: "What is the relationship between parliamentary sovereignty and constitutional supremacy in Bangladesh?",
      rule: "Bangladesh follows CONSTITUTIONAL SUPREMACY, not parliamentary sovereignty. Article 7(2): The Constitution is the supreme law. Article 26: Any law inconsistent with the Constitution is void. Article 7B (15th Amendment): Certain provisions cannot be amended even by 2/3 Parliament majority. The Supreme Court can strike down laws passed by Parliament. However, Parliament has wide amendment power (Article 142 - 2/3 majority) subject to Article 7B limits. The tension between parliamentary democracy and constitutional limits was central to the 16th Amendment case.",
      application: "Parliament passes a law restricting press freedom beyond Article 39's reasonable restrictions: Supreme Court can strike it down. Parliament amends Constitution to remove judicial independence: Article 7B prevents this; if attempted, Supreme Court can invalidate the amendment (basic structure doctrine). Parliament has wide power to make ordinary laws and amend most constitutional provisions, but cannot touch the basic structure.",
      conclusion: "**Constitutional Supremacy vs Parliamentary Power:**\n\n**Constitution is SUPREME:**\n* Art 7: Constitution = supreme law\n* Art 26: Inconsistent laws = void\n* Art 7B: Core provisions unamendable\n* Courts can strike down laws AND amendments\n\n**Parliament is POWERFUL but LIMITED:**\n* Can make ordinary laws (majority vote)\n* Can amend Constitution (2/3 majority)\n* CANNOT amend basic structure (Art 7B)\n* CANNOT pass laws violating fundamental rights\n\n**Key cases:**\n* 5th/7th Amendment struck down (2010)\n* 16th Amendment struck down (2017)\n\n**Balance:**\n* Democracy needs strong Parliament\n* But Constitution protects minorities and rights from majority tyranny\n\n Constitutional supremacy guide - BDT 999",
    },
    escalate: false,
    relatedRules: ["con-001", "con-005"],
    lastVerified: "2025-03-09",
  },

];

const constitutionalModule: KnowledgeBank = {
  area: "constitutional",
  label: "Constitutional Law",
  description: "Knowledge module for constitutional law in Bangladesh.",
  rules,
  qaBank,
};

export default constitutionalModule;