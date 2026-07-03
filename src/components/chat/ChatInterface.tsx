"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/auth/supabase-auth";
import Link from "next/link";

type MessageRole = "user" | "ai";
type Language = "en" | "bn";
type LawArea =
  | "property" | "criminal" | "family" | "labour" | "contract"
  | "company" | "tax" | "nrb" | "constitutional"
  | "consumer" | "cyber" | null;

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  metadata?: {
    area?: string;
    confidence?: "high" | "medium" | "low";
    escalate?: boolean;
    knowledgeMatched?: boolean;
    paywallActive?: boolean;
  };
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  lawArea?: string;
}

const FREE_GUEST_LIMIT = 20;

const UI_TEXT = {
  en: {
    active: "Online",
    freeLeft: (n: number) => `${n} free`,
    quickTopics: "Where would you like to start?",
    limitTitle: "You've reached your free limit",
    limitSub: "Sign in to continue with more free questions, or subscribe for unlimited access",
    subscribeBtn: "Subscribe Now",
    signinBtn: "Sign In / Create Account",
    placeholder: "Describe your legal situation...",
    placeholderLimit: "Sign in or subscribe to continue...",
    footer: "Legal information only  not legal advice. Press Enter to send.",
    listenBtn: "Voice",
    stopListenBtn: "Stop",
    speakBtn: "Listen",
    stopSpeakBtn: "Stop",
    langToggle: "",
    newChat: "New Chat",
    history: "Recent",
    today: "Today",
    yesterday: "Yesterday",
    greeting: `Hello. I'm **JesAI**  your Bangladesh legal literacy companion, created by Neum Lex Counsel (NLC).\n\nDescribe your situation in plain language. I'll identify the legal issues, explain what Bangladesh law says, assess your position, and guide you through your options.\n\n_What's your legal question today?_`,
    commonQsTitle: "Common Questions",
    voiceError: "Voice input not supported on this browser. Try Chrome or Edge.",
    voiceListening: "Listening... speak now",
    voiceReady: "Voice ready  tap to speak",
  },
  bn: {
    active: "",
    freeLeft: (n: number) => `${n} `,
    quickTopics: "   ?",
    limitTitle: "  ",
    limitSub: "      ,      ",
    subscribeBtn: " ",
    signinBtn: "  /   ",
    placeholder: "   ...",
    placeholderLimit: "      ...",
    footer: "       Enter ",
    listenBtn: "",
    stopListenBtn: "",
    speakBtn: "",
    stopSpeakBtn: "",
    langToggle: "English",
    newChat: " ",
    history: "",
    today: "",
    yesterday: "",
    greeting: `  **JesAI**      ,    (NLC)  \n\n         ,       ,     \n\n_    ?_`,
    commonQsTitle: " ",
    voiceError: "      Chrome  Edge  ",
    voiceListening: "...  ",
    voiceReady: "     ",
  },
};

const QUICK_TOPICS: Record<Language, { icon: string; label: string; area: LawArea }[]> = {
  en: [
    { icon: "", label: "Land & Property",   area: "property"       },
    { icon: "", label: "Family & Marriage", area: "family"         },
    { icon: "", label: "Police & Criminal",  area: "criminal"       },
    { icon: "", label: "Employment",         area: "labour"         },
    { icon: "", label: "Constitutional",     area: "constitutional" },
    { icon: "", label: "Tax & VAT",          area: "tax"            },
    { icon: "", label: "Company & RJSC",     area: "company"        },
    { icon: "", label: "Contracts",          area: "contract"       },
    { icon: "", label: "NRB Investment",     area: "nrb"            },
  ],
  bn: [
    { icon: "", label: "  ",      area: "property"       },
    { icon: "", label: "  ",   area: "family"         },
    { icon: "", label: "  ",     area: "criminal"       },
    { icon: "", label: "",               area: "labour"         },
    { icon: "", label: " ",  area: "constitutional" },
    { icon: "", label: "  ",          area: "tax"            },
    { icon: "", label: "  RJSC",     area: "company"        },
    { icon: "", label: " ",           area: "contract"       },
    { icon: "", label: " ",    area: "nrb"            },
  ],
};

// Common questions by law area for the FAQ panel
const COMMON_QUESTIONS: Record<string, { en: string; bn: string }[]> = {
  property: [
    { en: "How do I do namajaari (mutation) for inherited land?", bn: "     ?" },
    { en: "What happens if someone sells land with a forged deed?", bn: "      ?" },
    { en: "Can a landlord evict a tenant without notice?", bn: "      ?" },
    { en: "What is Artha Rin court and when can a bank file there?", bn: "         ?" },
    { en: "How do I challenge an illegal land boundary encroachment?", bn: "       ?" },
  ],
  criminal: [
    { en: "What are my rights when police arrest me?", bn: "      ?" },
    { en: "How do I get bail after arrest?", bn: "    ?" },
    { en: "What is the difference between a cognizable and non-cognizable offence?", bn: "  -   ?" },
    { en: "Can police keep me in custody without producing me before a magistrate?", bn: "        ?" },
    { en: "What is remand and how many days can it last?", bn: "       ?" },
  ],
  family: [
    { en: "How does a Muslim wife get divorce in Bangladesh?", bn: "      ?" },
    { en: "Who gets custody of children after divorce?", bn: "      ?" },
    { en: "What is the legal amount of maintenance a wife can claim?", bn: "      ?" },
    { en: "Can a husband refuse to pay mehr (dower)?", bn: "      ?" },
    { en: "How is property divided after a Muslim person dies?", bn: "       ?" },
  ],
  labour: [
    { en: "What notice and gratuity am I owed if terminated?", bn: "       ?" },
    { en: "My employer is not paying my salary for 3 months  what can I do?", bn: "      ?" },
    { en: "How many days maternity leave is a woman entitled to?", bn: "     ?" },
    { en: "Can an employer dismiss me without a domestic enquiry?", bn: "       ?" },
    { en: "Is overtime at double rate mandatory?", bn: "    ?" },
  ],
  contract: [
    { en: "Is a verbal (oral) contract legally binding in Bangladesh?", bn: "  ()     ?" },
    { en: "What can I do if someone breaches a written contract with me?", bn: "       ?" },
    { en: "I paid an advance but the other party is not performing  can I get it back?", bn: "         ?" },
    { en: "I signed as a personal guarantor for a loan  how liable am I?", bn: "         ?" },
    { en: "Does a contract need a stamp to be valid?", bn: "         ?" },
  ],
  company: [
    { en: "How do I register a private limited company in Bangladesh?", bn: "      ?" },
    { en: "What are the annual compliance requirements for a company?", bn: "    ?" },
    { en: "Can a director be removed without their consent?", bn: "       ?" },
    { en: "What is the minimum share capital to register a company?", bn: "     ?" },
    { en: "How can a minority shareholder protect their rights?", bn: "      ?" },
  ],
  tax: [
    { en: "What is the income tax-free threshold in Bangladesh 2024-25?", bn: "-      ?" },
    { en: "When is the last date to file income tax return?", bn: "     ?" },
    { en: "What is TIN and how do I get one?", bn: "TIN    ?" },
    { en: "What are the VAT rates and when must a business register for VAT?", bn: "        ?" },
    { en: "What is advance income tax (AIT) and when is it deducted?", bn: "  (AIT)     ?" },
  ],
  nrb: [
    { en: "How do I repatriate profits from Bangladesh to abroad?", bn: "      ?" },
    { en: "What is BIDA registration and is it mandatory for foreign investment?", bn: "BIDA        ?" },
    { en: "What withholding tax applies to payments to foreign partners?", bn: "       ?" },
    { en: "Can a non-resident Bangladeshi (NRB) invest in land or property?", bn: "        ?" },
    { en: "What are the FBAR reporting requirements for Bangladeshis with US bank accounts?", bn: "    FBAR   ?" },
  ],
  constitutional: [
    { en: "What are the fundamental rights guaranteed by the Bangladesh Constitution?", bn: "        ?" },
    { en: "What is a writ petition and when can I file one?", bn: "       ?" },
    { en: "Can police detain me under Section 54 without a warrant?", bn: "        ?" },
    { en: "What are the rights of an arrested person under Article 33?", bn: "       ?" },
    { en: "What is a habeas corpus petition?", bn: "   ?" },
  ],
};

const AREA_LABELS: Record<string, string> = {
  property:       "Land & Property",
  criminal:       "Criminal Law",
  family:         "Family Law",
  labour:         "Labour Law",
  contract:       "Contract Law",
  company:        "Company Law",
  tax:            "Tax Law",
  nrb:            "NRB Investment",
  constitutional: "Constitutional Law",
  consumer:       "Consumer Rights",
  cyber:          "Cyber Law",
};

function formatMessage(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      return <p key={i} className="font-semibold text-white mt-3 mb-1 text-[13px] tracking-wide">{line.replace(/\*\*/g, "")}</p>;
    }
    if (line.includes("**")) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return <p key={i} className="my-0.5 text-[13px] leading-relaxed">{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{p}</strong> : p)}</p>;
    }
    if (line.startsWith(" ") || line.startsWith("- ")) {
      return <p key={i} className="pl-3 my-0.5 flex gap-2 text-[13px] leading-relaxed"><span className="text-[#4ade80] mt-1 flex-shrink-0 text-[10px]"></span><span>{line.slice(2)}</span></p>;
    }
    if (/^\d+\./.test(line)) return <p key={i} className="pl-3 my-0.5 text-[13px] leading-relaxed">{line}</p>;
    if (line.startsWith("---")) return <hr key={i} className="border-white/10 my-3" />;
    if (line.startsWith("_") && line.endsWith("_")) return <p key={i} className="italic text-slate-400 my-0.5 text-[13px]">{line.replace(/_/g, "")}</p>;
    if (line.startsWith("")) return <p key={i} className="my-1 text-[13px] leading-relaxed text-[#c8a84b]">{line}</p>;
    if (line.startsWith("") || line.startsWith("")) return <p key={i} className="my-1 text-[13px] leading-relaxed text-[#f42a41]">{line}</p>;
    if (line.trim() === "") return <div key={i} className="h-2" />;
    return <p key={i} className="my-0.5 text-[13px] leading-relaxed">{line}</p>;
  });
}

function genId() { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }

function getConvTitle(messages: Message[]): string {
  const first = messages.find(m => m.role === "user");
  if (!first) return "New conversation";
  return first.content.slice(0, 36) + (first.content.length > 36 ? "" : "");
}

export default function ChatInterface() {
  const { user, isPaid: authIsPaid, queriesRemaining: authQueriesRemaining, refreshUser } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [lang, setLang] = useState<Language>("en");
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCommonQs, setShowCommonQs] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "processing">("idle");

  const [selectedArea, setSelectedArea] = useState<LawArea>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  const t = UI_TEXT[lang];

  // For authenticated users: use server-side limits; for guests: use local count
  const effectiveIsPaid = user ? authIsPaid : false;
  const guestLimit = FREE_GUEST_LIMIT;
  const isAtLimit = user
    ? (authIsPaid ? false : authQueriesRemaining <= 0)
    : questionCount >= guestLimit;
  const freeRemaining = user
    ? (authIsPaid ? Infinity : authQueriesRemaining)
    : Math.max(0, guestLimit - questionCount);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    startNewChat();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  function startNewChat() {
    const id = genId();
    const greeting: Message = {
      id: "greeting-" + id,
      role: "ai",
      content: t.greeting,
      timestamp: new Date(),
    };
    setMessages([greeting]);
    setActiveConvId(id);
    setQuestionCount(0);
    setInput("");
    setApiError(null);
    setVoiceError(null);
    setSidebarOpen(false);
    setSelectedArea(null);
    setShowCommonQs(false);
  }

  function saveCurrentConversation(msgs: Message[]) {
    if (msgs.filter(m => m.role === "user").length === 0) return;
    setConversations(prev => {
      const existing = prev.find(c => c.id === activeConvId);
      if (existing) {
        return prev.map(c => c.id === activeConvId ? { ...c, messages: msgs, title: getConvTitle(msgs) } : c);
      }
      return [{ id: activeConvId, title: getConvTitle(msgs), messages: msgs, createdAt: new Date() }, ...prev];
    });
  }

  function loadConversation(conv: Conversation) {
    setMessages(conv.messages);
    setActiveConvId(conv.id);
    setQuestionCount(conv.messages.filter(m => m.role === "user").length);
    setSidebarOpen(false);
    setSelectedArea(null);
    setShowCommonQs(false);
  }

  const callJesAI = useCallback(async (
    userMessage: string,
    currentMessages: Message[],
    areaOverride?: LawArea
  ) => {
    setApiError(null);
    setIsTyping(true);

    const history = currentMessages
      .filter(m => m.id !== "greeting-" + activeConvId)
      .slice(-8)
      .map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.content }));

    const areaToSend = areaOverride !== undefined ? areaOverride : selectedArea;

    try {
      // Get auth token for server-side paid verification
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token ?? null;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          message: userMessage,
          history,
          selectedArea: areaToSend,
        }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      const aiMsg: Message = {
        id: genId(),
        role: "ai",
        content: data.response,
        timestamp: new Date(),
        metadata: {
          ...data.metadata,
          knowledgeMatched: data.source === "knowledge" || data.source === "llm",
        },
      };
      setMessages(prev => {
        const updated = [...prev, aiMsg];
        if (updated.filter(m => m.role === "user").length > 0) {
          setConversations(cs => {
            const existing = cs.find(c => c.id === activeConvId);
            if (existing) {
              return cs.map(c => c.id === activeConvId ? { ...c, messages: updated, title: getConvTitle(updated) } : c);
            }
            return [{ id: activeConvId, title: getConvTitle(updated), messages: updated, createdAt: new Date() }, ...cs];
          });
        }
        return updated;
      });
      setQuestionCount(c => c + 1);

      // Increment server-side query counter for authenticated users,
      // then refresh the auth context so navbar / limit UI stays in sync.
      if (token) {
        fetch("/api/user/tier", {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
        })
          .then(() => refreshUser())
          .catch(() => {});
      }
    } catch {
      setApiError("Unable to connect. Please try again.");
      const fallback: Message = {
        id: genId(),
        role: "ai",
        content: "I'm temporarily unavailable. For urgent legal matters, please consult a certified Bangladesh Bar Council advocate directly.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, fallback]);
    } finally {
      setIsTyping(false);
    }
  }, [activeConvId, selectedArea, refreshUser]);

  const sendMessage = useCallback(async (text?: string, area?: LawArea) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping || isAtLimit) return;

    if (area !== undefined) {
      setSelectedArea(area);
    }
    setShowCommonQs(false);

    const userMsg: Message = { id: genId(), role: "user", content: messageText, timestamp: new Date() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    await callJesAI(messageText, updated, area);
  }, [input, isTyping, isAtLimit, messages, callJesAI]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }, [sendMessage]);

  //  Voice Input 
  const startListening = useCallback(() => {
    setVoiceError(null);
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) {
      setVoiceError(t.voiceError);
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setVoiceStatus("idle");
      return;
    }
    const r = new SR();
    r.lang = lang === "bn" ? "bn-BD" : "en-US";
    r.continuous = false;
    r.interimResults = true;
    r.maxAlternatives = 1;

    let finalTranscript = "";
    r.onresult = (e: any) => {
      let interimTranscript = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalTranscript += e.results[i][0].transcript;
        } else {
          interimTranscript += e.results[i][0].transcript;
        }
      }
      if (interimTranscript) {
        setInput(finalTranscript + interimTranscript);
      }
    };
    r.onspeechend = () => {
      setVoiceStatus("processing");
      r.stop();
    };
    r.onerror = (e: { error: string }) => {
      if (e.error === "no-speech") {
        setVoiceError("No speech detected. Please try again.");
      } else if (e.error === "audio-capture") {
        setVoiceError("Microphone access denied. Please allow microphone access.");
      } else if (e.error !== "aborted") {
        setVoiceError("Voice error: " + e.error);
      }
      setIsListening(false);
      setVoiceStatus("idle");
    };
    r.onend = () => {
      setIsListening(false);
      setVoiceStatus("idle");
      if (finalTranscript.trim()) {
        setInput(finalTranscript.trim());
        // Auto-submit after voice input with a short delay
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    };
    r.interimResults = false;
    r.onresult = (e: any) => { setInput(p => p + e.results[0][0].transcript); setIsListening(false); };
    r.onerror = () => setIsListening(false);
    r.onend = () => setIsListening(false);
    recognitionRef.current = r;
    r.start();
    setIsListening(true);
    setVoiceStatus("listening");
  }, [lang, isListening, t.voiceError]);

  //  Text-to-Speech 
  const speakMessage = useCallback((id: string, content: string) => {
    if (speakingId === id) { window.speechSynthesis.cancel(); setSpeakingId(null); return; }
    window.speechSynthesis.cancel();
    const cleaned = content
      .replace(/\*\*/g, "").replace(/\*/g, "")
      .replace(/---/g, "")
      .replace(/_/g, "")
      .replace(/[]/g, "");
    const u = new SpeechSynthesisUtterance(cleaned);
    u.lang = lang === "bn" ? "bn-BD" : "en-US";
    u.rate = 0.9;
    u.pitch = 1.0;
    // Prefer a natural voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      lang === "bn"
        ? v.lang.startsWith("bn")
        : v.lang.startsWith("en") && v.name.includes("Natural") || v.name.includes("Google")
    );
    if (preferred) u.voice = preferred;
    u.onend = () => setSpeakingId(null);
    u.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(u);
  }, [speakingId, lang]);

  const toggleLang = useCallback(() => { setLang(l => l === "en" ? "bn" : "en"); }, []);
  const isToday = (d: Date) => new Date().toDateString() === d.toDateString();
  const isYesterday = (d: Date) => { const y = new Date(); y.setDate(y.getDate() - 1); return y.toDateString() === d.toDateString(); };
  const hasUserMessages = messages.filter(m => m.role === "user").length > 0;

  const commonQsForArea = selectedArea ? (COMMON_QUESTIONS[selectedArea] ?? []) : [];

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }} className="flex h-full bg-[#080f1e] overflow-hidden">

      {/*  Sidebar  */}
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-40 w-64 h-full flex flex-col border-r border-white/[0.06] bg-[#0a1220] transition-transform duration-300 ease-out`}>

        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-lg bg-[#006a4e] flex items-center justify-center">
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }} className="text-white font-bold text-sm">J</span>
            </div>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }} className="text-white font-semibold text-sm tracking-tight">
              Jes<span className="text-[#c8a84b]">AI</span>
            </span>
            <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-500 hover:text-white p-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Auth state in sidebar */}
          {user ? (
            <div className="mb-3 px-2 py-2 rounded-xl bg-[#006a4e]/10 border border-[#006a4e]/20">
              <p className="text-[10px] text-[#4ade80] font-medium truncate">{user.email}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {effectiveIsPaid ? `Plan: ${user.tier}` : `${freeRemaining === Infinity ? "" : freeRemaining} questions left today`}
              </p>
            </div>
          ) : (
            <Link href="/auth/signin" className="block w-full mb-3 text-center text-[11px] px-3 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-[#006a4e]/40 transition-all">
              Sign In for more questions
            </Link>
          )}

          <button onClick={startNewChat} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#006a4e] hover:bg-[#005a40] text-white text-xs font-medium transition-all duration-200 shadow-lg shadow-[#006a4e]/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            {t.newChat}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {conversations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[11px] text-slate-600">No conversations yet</p>
            </div>
          ) : (
            <>
              <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium px-2 mb-2">{t.history}</p>
              <div className="space-y-0.5">
                {conversations.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => loadConversation(conv)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 group ${conv.id === activeConvId ? "bg-white/[0.08] text-white" : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"}`}
                  >
                    <div className="text-[12px] font-medium truncate leading-tight">{conv.title}</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">
                      {isToday(conv.createdAt) ? t.today : isYesterday(conv.createdAt) ? t.yesterday : conv.createdAt.toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-3 border-t border-white/[0.06]">
          <div className="px-2 py-1.5 rounded-xl bg-[#f42a41]/10 border border-[#f42a41]/20">
            <p className="text-[10px] text-[#f42a41] font-semibold"> Legal information only</p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">Not legal advice. Consult a Bar Council advocate for representation.</p>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm" />
      )}

      {/*  Main Chat  */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#080f1e]/80 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-8 w-8 rounded-xl bg-[#006a4e] flex items-center justify-center shadow-lg shadow-[#006a4e]/30">
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }} className="text-white font-bold text-base leading-none">J</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#4ade80] border-2 border-[#080f1e]" />
              </div>
              <div>
                <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }} className="text-white font-semibold text-sm leading-none tracking-tight">
                  Jes<span className="text-[#c8a84b]">AI</span>
                  {selectedArea && (
                    <span className="ml-2 text-[10px] font-normal text-[#4ade80] border border-[#006a4e]/40 bg-[#006a4e]/10 px-1.5 py-0.5 rounded-full">
                      {AREA_LABELS[selectedArea]}
                    </span>
                  )}
                </h1>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-none">{t.active}  Bangladesh Law</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {messages.some(m => m.metadata?.knowledgeMatched) && (
              <span className="hidden sm:flex text-[10px] px-2 py-1 rounded-full bg-[#c8a84b]/10 text-[#c8a84b] border border-[#c8a84b]/20 items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a84b] inline-block" />
                NLC Verified
              </span>
            )}
            {selectedArea && commonQsForArea.length > 0 && (
              <button
                onClick={() => setShowCommonQs(v => !v)}
                className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all duration-200 ${showCommonQs ? "border-[#c8a84b]/40 text-[#c8a84b] bg-[#c8a84b]/10" : "border-white/10 text-slate-500 hover:text-white hover:border-[#006a4e]/40"}`}
                title={t.commonQsTitle}
              >
                FAQ
              </button>
            )}
            {selectedArea && hasUserMessages && (
              <button
                onClick={startNewChat}
                className="text-[11px] px-2.5 py-1.5 rounded-lg border border-white/10 text-slate-500 hover:text-white hover:border-[#006a4e]/40 transition-all duration-200"
                title="Change subject"
              >
                Change
              </button>
            )}
            <button onClick={toggleLang} className="text-[11px] px-2.5 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-[#006a4e]/40 transition-all duration-200 font-medium">
              {t.langToggle}
            </button>
            {!isAtLimit && freeRemaining !== Infinity && (
              <div className={`text-[11px] px-2.5 py-1.5 rounded-lg font-medium tabular-nums ${freeRemaining <= 5 ? "bg-[#f42a41]/15 text-[#f42a41]" : "bg-[#006a4e]/15 text-[#4ade80]"}`}>
                {t.freeLeft(freeRemaining)}
              </div>
            )}
            {effectiveIsPaid && (
              <div className="text-[11px] px-2.5 py-1.5 rounded-lg font-medium bg-[#c8a84b]/15 text-[#c8a84b]">
                 {user?.tier ?? "paid"}
              </div>
            )}
          </div>
        </header>

        {/* Error banner */}
        {apiError && (
          <div className="mx-4 mt-2 px-3 py-2 rounded-xl bg-[#f42a41]/10 border border-[#f42a41]/20 text-[11px] text-[#f42a41] flex items-center gap-2 flex-shrink-0">
            <span></span>{apiError}
          </div>
        )}

        {/* Voice error */}
        {voiceError && (
          <div className="mx-4 mt-2 px-3 py-2 rounded-xl bg-[#c8a84b]/10 border border-[#c8a84b]/20 text-[11px] text-[#c8a84b] flex items-center justify-between gap-2 flex-shrink-0">
            <span> {voiceError}</span>
            <button onClick={() => setVoiceError(null)} className="text-slate-500 hover:text-white"></button>
          </div>
        )}

        {/* Common Questions panel */}
        {showCommonQs && commonQsForArea.length > 0 && (
          <div className="mx-4 mt-2 p-3 rounded-xl bg-[#0d1e35] border border-white/[0.07] flex-shrink-0">
            <p className="text-[10px] text-[#c8a84b] uppercase tracking-widest font-medium mb-2">{t.commonQsTitle}  {AREA_LABELS[selectedArea ?? ""]}</p>
            <div className="space-y-1">
              {commonQsForArea.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { sendMessage(lang === "bn" ? q.bn : q.en); setShowCommonQs(false); }}
                  className="w-full text-left text-[12px] text-slate-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/[0.05] transition-all duration-150 leading-relaxed"
                >
                  <span className="text-[#4ade80] mr-1.5 text-[10px]"></span>
                  {lang === "bn" ? q.bn : q.en}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-5 space-y-5">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble flex gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

              <div className={`flex-shrink-0 h-7 w-7 rounded-xl flex items-center justify-center text-xs font-bold shadow-md ${msg.role === "ai" ? "bg-[#006a4e] text-white shadow-[#006a4e]/30" : "bg-[#c8a84b] text-[#0a1628] shadow-[#c8a84b]/20"}`}>
                {msg.role === "ai" ? "J" : "U"}
              </div>

              <div className={`max-w-[85%] sm:max-w-[82%] space-y-1.5 ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`rounded-2xl px-3 sm:px-4 py-3 text-slate-300 ${
                  msg.role === "ai"
                    ? "bg-[#0d1e35] border border-white/[0.07] rounded-tl-md shadow-xl shadow-black/20 w-full"
                    : "bg-[#006a4e] text-white rounded-tr-md shadow-lg shadow-[#006a4e]/25"
                }`}>
                  {msg.role === "ai" ? (
                    <div className="space-y-0">{formatMessage(msg.content)}</div>
                  ) : (
                    <p className="text-[13px] leading-relaxed">{msg.content}</p>
                  )}

                  <div className="flex items-center justify-between mt-2.5 gap-3">
                    <span suppressHydrationWarning className={`text-[10px] tabular-nums ${msg.role === "ai" ? "text-slate-700" : "text-green-200/50"}`}>
                      {msg.timestamp.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {msg.role === "ai" && (
                      <button onClick={() => speakMessage(msg.id, msg.content)} className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full transition-all duration-200 ${speakingId === msg.id ? "bg-[#f42a41]/20 text-[#f42a41]" : "bg-white/[0.05] text-slate-600 hover:text-[#4ade80] hover:bg-[#006a4e]/15"}`}>
                        {speakingId === msg.id ? " " + t.stopSpeakBtn : " " + t.speakBtn}
                      </button>
                    )}
                  </div>
                </div>

                {/* Metadata tags */}
                {msg.metadata && (
                  <div className="flex flex-wrap gap-1.5 px-1">
                    {msg.metadata.area && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#006a4e]/10 text-[#4ade80] border border-[#006a4e]/20">
                        {AREA_LABELS[msg.metadata.area] ?? msg.metadata.area}
                      </span>
                    )}
                    {msg.metadata.knowledgeMatched && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c8a84b]/10 text-[#c8a84b] border border-[#c8a84b]/20">NLC Verified</span>
                    )}
                    {msg.metadata.escalate && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f42a41]/10 text-[#f42a41] border border-[#f42a41]/20">Consult Lawyer</span>
                    )}
                    {msg.metadata.paywallActive && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c8a84b]/10 text-[#c8a84b] border border-[#c8a84b]/20"> Paid content available</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="chat-bubble flex gap-3">
              <div className="h-7 w-7 rounded-xl bg-[#006a4e] flex items-center justify-center text-xs font-bold text-white shadow-md shadow-[#006a4e]/30 flex-shrink-0">J</div>
              <div className="bg-[#0d1e35] border border-white/[0.07] rounded-2xl rounded-tl-md px-4 py-3 shadow-xl shadow-black/20">
                <div className="flex gap-1.5 items-center h-4">
                  <div className="typing-dot h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                  <div className="typing-dot h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                  <div className="typing-dot h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick topic chips  show on first load or when no area selected */}
        {(!hasUserMessages || (!selectedArea && !hasUserMessages)) && (
          <div className="px-3 sm:px-4 pb-3 flex-shrink-0">
            <p className="text-[11px] text-slate-600 mb-2.5 font-medium">{t.quickTopics}</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_TOPICS[lang].map((topic) => (
                <button
                  key={topic.label}
                  onClick={() => sendMessage(topic.label, topic.area)}
                  className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white hover:border-[#006a4e]/40 hover:bg-[#006a4e]/10 transition-all duration-200"
                >
                  <span>{topic.icon}</span>
                  <span>{topic.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Limit reached */}
        {isAtLimit && (
          <div className="mx-4 mb-3 p-4 rounded-2xl bg-[#c8a84b]/10 border border-[#c8a84b]/25 text-center flex-shrink-0">
            <p className="text-sm text-[#c8a84b] font-semibold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{t.limitTitle}</p>
            <p className="text-[12px] text-slate-400 mt-1">{t.limitSub}</p>
            <div className="mt-3 flex flex-col sm:flex-row gap-2 justify-center">
              {!user && (
                <Link href="/auth/signin" className="px-5 py-2 rounded-xl border border-white/10 text-slate-300 text-xs font-medium hover:text-white hover:border-white/20 transition-colors">
                  {t.signinBtn}
                </Link>
              )}
              <Link href="/payment" className="px-5 py-2 rounded-xl bg-[#c8a84b] text-[#0a1628] text-xs font-bold hover:bg-[#b8943b] transition-colors shadow-lg shadow-[#c8a84b]/20">
                {t.subscribeBtn}
              </Link>
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-white/[0.06] p-3 sm:p-4 bg-[#080f1e] flex-shrink-0">
          {/* Voice status indicator */}
          {voiceStatus === "listening" && (
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className="h-2 w-2 rounded-full bg-[#f42a41] animate-pulse" />
              <span className="text-[11px] text-[#f42a41]">{t.voiceListening}</span>
            </div>
          )}
          {voiceStatus === "processing" && (
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className="h-2 w-2 rounded-full bg-[#c8a84b] animate-pulse" />
              <span className="text-[11px] text-[#c8a84b]">Processing voice...</span>
            </div>
          )}

          <div className="flex gap-2 sm:gap-2.5 items-end max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping || isAtLimit}
                placeholder={isAtLimit ? t.placeholderLimit : t.placeholder}
                rows={2}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="w-full resize-none rounded-2xl border border-white/[0.08] bg-[#0d1e35] px-3 sm:px-4 py-3 text-[13px] text-white placeholder-slate-600 focus:outline-none focus:border-[#006a4e]/50 focus:ring-1 focus:ring-[#006a4e]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 leading-relaxed shadow-inner"
              />
            </div>

            {/* Voice button */}
            <button
              onClick={startListening}
              disabled={isTyping || isAtLimit}
              title={isListening ? t.stopListenBtn : t.listenBtn}
              className={`flex-shrink-0 h-11 w-11 rounded-2xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed ${
                isListening
                  ? "bg-[#f42a41] shadow-lg shadow-[#f42a41]/30 animate-pulse"
                  : voiceStatus === "processing"
                  ? "bg-[#c8a84b] shadow-lg shadow-[#c8a84b]/30"
                  : "bg-[#0d1e35] border border-white/[0.08] text-slate-500 hover:text-white hover:border-[#006a4e]/40"
              }`}
            >
              {isListening ? (
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              )}
            </button>

            {/* Send button */}
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping || isAtLimit}
              className="flex-shrink-0 h-11 w-11 rounded-2xl bg-[#006a4e] flex items-center justify-center text-white hover:bg-[#005a40] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-[#006a4e]/30 hover:shadow-[#006a4e]/50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          <p className="text-[10px] text-slate-700 mt-2 text-center max-w-4xl mx-auto">{t.footer}</p>
        </div>
      </div>
    </div>
  );
}
