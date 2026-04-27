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

const FREE_GUEST_LIMIT = 20;

const AREA_LABELS: Record<string, string> = {
  property: "Land & Property", criminal: "Criminal Law", family: "Family Law",
  labour: "Labour Law", contract: "Contract Law", company: "Company Law",
  tax: "Tax Law", nrb: "NRB Investment", constitutional: "Constitutional Law",
  consumer: "Consumer Rights", cyber: "Cyber Law",
};

const QUICK_TOPICS: { icon: string; label: string; area: LawArea }[] = [
  { icon: "🏠", label: "Land & Property",   area: "property"       },
  { icon: "👨‍👩‍👧", label: "Family & Marriage", area: "family"         },
  { icon: "🚔", label: "Criminal Law",       area: "criminal"       },
  { icon: "💼", label: "Employment",         area: "labour"         },
  { icon: "⚖️", label: "Constitutional",     area: "constitutional" },
  { icon: "💰", label: "Tax & VAT",          area: "tax"            },
  { icon: "🏢", label: "Company / RJSC",     area: "company"        },
  { icon: "📝", label: "Contracts",          area: "contract"       },
  { icon: "✈️", label: "NRB Investment",     area: "nrb"            },
];

const QUICK_TOPICS_BN: { icon: string; label: string; area: LawArea }[] = [
  { icon: "🏠", label: "জমি ও সম্পত্তি",      area: "property"       },
  { icon: "👨‍👩‍👧", label: "পরিবার ও বিবাহ",   area: "family"         },
  { icon: "🚔", label: "ফৌজদারি আইন",          area: "criminal"       },
  { icon: "💼", label: "চাকরি ও শ্রম",          area: "labour"         },
  { icon: "⚖️", label: "সাংবিধানিক অধিকার",   area: "constitutional" },
  { icon: "💰", label: "কর ও ভ্যাট",            area: "tax"            },
  { icon: "🏢", label: "কোম্পানি",              area: "company"        },
  { icon: "📝", label: "চুক্তি",                area: "contract"       },
  { icon: "✈️", label: "প্রবাসী বিনিয়োগ",     area: "nrb"            },
];

function genId() { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }

// Render verdict badges inline
function VerdictLine({ text }: { text: string }) {
  if (text.includes("🟢")) return (
    <div className="verdict-green my-2 flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-semibold">
      🟢 {text.replace(/\*\*/g, "").replace("🟢", "").trim()}
    </div>
  );
  if (text.includes("🟡")) return (
    <div className="verdict-yellow my-2 flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-semibold">
      🟡 {text.replace(/\*\*/g, "").replace("🟡", "").trim()}
    </div>
  );
  if (text.includes("🔴")) return (
    <div className="verdict-red my-2 flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-semibold">
      🔴 {text.replace(/\*\*/g, "").replace("🔴", "").trim()}
    </div>
  );
  if (text.includes("⬛")) return (
    <div className="verdict-black my-2 flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-semibold">
      ⬛ {text.replace(/\*\*/g, "").replace("⬛", "").trim()}
    </div>
  );
  return null;
}

function isVerdictLine(line: string) {
  return (line.includes("🟢") || line.includes("🟡") || line.includes("🔴") || line.includes("⬛"));
}

function formatAI(content: string) {
  return content.split("\n").map((line, i) => {
    if (isVerdictLine(line)) return <VerdictLine key={i} text={line} />;
    if (line.match(/^═+/) || line.match(/^─+/)) return <hr key={i} className="border-gray-200 my-3" />;
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4)
      return <p key={i} className="font-semibold text-gray-900 text-[13px] mt-3 mb-1">{line.replace(/\*\*/g, "")}</p>;
    if (line.includes("**")) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return <p key={i} className="text-[13px] text-gray-700 leading-relaxed my-0.5">{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="font-semibold text-gray-900">{p}</strong> : p)}</p>;
    }
    if (line.startsWith("• ") || line.startsWith("- ")) return (
      <div key={i} className="flex gap-2 my-0.5 pl-2 text-[13px] text-gray-700 leading-relaxed">
        <span className="text-[#006A4E] mt-1 flex-shrink-0 text-[10px]">▸</span>
        <span>{line.slice(2)}</span>
      </div>
    );
    if (/^\d+\.\s/.test(line)) return <p key={i} className="text-[13px] text-gray-700 leading-relaxed pl-2 my-0.5">{line}</p>;
    if (line.startsWith("🔒")) return <p key={i} className="text-[13px] text-[#B45309] font-medium my-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">{line}</p>;
    if (line.startsWith("⚠️") || line.startsWith("⚠")) return <p key={i} className="text-[13px] text-[#B91C1C] font-medium my-1.5 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">{line}</p>;
    if (line.trim() === "") return <div key={i} className="h-2" />;
    return <p key={i} className="text-[13px] text-gray-700 leading-relaxed my-0.5">{line}</p>;
  });
}

export default function ChatInterface() {
  const { user, isPaid: authIsPaid, queriesRemaining: authQR } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [lang, setLang] = useState<Language>("en");
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<LawArea>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "processing">("idle");

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recogRef = useRef<any>(null);

  const isPaid = user ? authIsPaid : false;
  const freeRemaining = user ? (authIsPaid ? Infinity : authQR) : Math.max(0, FREE_GUEST_LIMIT - questionCount);
  const isAtLimit = user ? (!authIsPaid && authQR <= 0) : questionCount >= FREE_GUEST_LIMIT;
  const hasMessages = messages.some(m => m.role === "user");
  const topics = lang === "bn" ? QUICK_TOPICS_BN : QUICK_TOPICS;

  const greeting = lang === "bn"
    ? `আসসালামুয়ালাইকুম। আমি **JesAI** — আপনার বাংলাদেশ আইনি সহায়ক।\n\nআপনার পরিস্থিতি সহজ ভাষায় বলুন — আমি আইনি সমস্যা চিহ্নিত করব, আইন ব্যাখ্যা করব, এবং উভয় পক্ষের যুক্তি বিশ্লেষণ করে সম্ভাব্য রায় জানাব।\n\n_আজ আপনার আইনি প্রশ্ন কী?_`
    : `Hello. I'm **JesAI** — your Bangladesh legal reasoning assistant by NLC.\n\nDescribe your situation in plain language. I'll extract the key facts, identify every legal issue, run deterministic checks, map both sides' arguments, and give you a clear verdict.\n\n_What's your legal question today?_`;

  useEffect(() => {
    const id = genId();
    setMessages([{ id: "greeting-" + id, role: "ai", content: greeting, timestamp: new Date() }]);
    setQuestionCount(0);
    setSelectedArea(null);
    setApiError(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async (text?: string, area?: LawArea) => {
    const msg = (text ?? input).trim();
    if (!msg || isTyping || isAtLimit) return;
    if (area !== undefined) setSelectedArea(area);
    setApiError(null);
    setVoiceError(null);

    const userMsg: Message = { id: genId(), role: "user", content: msg, timestamp: new Date() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsTyping(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token ?? null;
      const areaToSend = area !== undefined ? area : selectedArea;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          message: msg,
          selectedArea: areaToSend,
          history: updated.filter(m => !m.id.startsWith("greeting-")).slice(-8).map(m => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();

      const aiMsg: Message = {
        id: genId(), role: "ai", content: data.response, timestamp: new Date(),
        metadata: { ...data.metadata, knowledgeMatched: data.source === "knowledge" || data.source === "llm" },
      };
      setMessages(prev => [...prev, aiMsg]);
      setQuestionCount(c => c + 1);

      if (token) fetch("/api/user/tier", { method: "POST", headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    } catch {
      setApiError("Connection failed. Please try again.");
      setMessages(prev => [...prev, {
        id: genId(), role: "ai", timestamp: new Date(),
        content: "Temporarily unavailable. For urgent matters, please contact a Bangladesh Bar Council advocate directly.",
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, isAtLimit, messages, selectedArea]);

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }, [sendMessage]);

  const toggleVoice = useCallback(() => {
    setVoiceError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) { setVoiceError("Voice input not supported. Try Chrome or Edge."); return; }

    if (isListening) { recogRef.current?.stop(); setIsListening(false); setVoiceStatus("idle"); return; }

    const r = new SR();
    r.lang = lang === "bn" ? "bn-BD" : "en-US";
    r.continuous = false;
    r.interimResults = true;
    let final = "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    r.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      setInput(final + interim);
    };
    r.onspeechend = () => { setVoiceStatus("processing"); r.stop(); };
    r.onerror = (e: { error: string }) => {
      if (e.error === "no-speech") setVoiceError("No speech detected. Try again.");
      else if (e.error === "audio-capture") setVoiceError("Microphone access denied.");
      setIsListening(false); setVoiceStatus("idle");
    };
    r.onend = () => { setIsListening(false); setVoiceStatus("idle"); if (final.trim()) { setInput(final.trim()); setTimeout(() => inputRef.current?.focus(), 100); } };
    recogRef.current = r;
    r.start();
    setIsListening(true);
    setVoiceStatus("listening");
  }, [lang, isListening]);

  const speakMessage = useCallback((id: string, content: string) => {
    if (speakingId === id) { window.speechSynthesis.cancel(); setSpeakingId(null); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(
      content.replace(/\*\*/g, "").replace(/\*/g, "").replace(/─+|═+/g, "").replace(/[🟢🟡🔴⬛🔒⚠️▸]/g, "").replace(/_/g, "")
    );
    u.lang = lang === "bn" ? "bn-BD" : "en-US";
    u.rate = 0.92;
    const voices = window.speechSynthesis.getVoices();
    const pref = voices.find(v => lang === "bn" ? v.lang.startsWith("bn") : v.lang.startsWith("en-US") && v.name.includes("Google"));
    if (pref) u.voice = pref;
    u.onend = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(u);
  }, [speakingId, lang]);

  return (
    <div className="flex flex-col h-full bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          {selectedArea && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#006A4E]/8 border border-[#006A4E]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#006A4E]" />
              <span className="text-[11px] font-medium text-[#006A4E]">{AREA_LABELS[selectedArea]}</span>
              <button onClick={() => setSelectedArea(null)} className="text-[#006A4E]/60 hover:text-[#006A4E] ml-0.5 text-[10px]">✕</button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(l => l === "en" ? "bn" : "en")}
            className="text-[11px] px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all font-medium"
          >
            {lang === "en" ? "বাংলা" : "English"}
          </button>
          {!isPaid && freeRemaining !== Infinity && (
            <div className={`text-[11px] px-2.5 py-1.5 rounded-lg font-medium tabular-nums ${freeRemaining <= 5 ? "bg-red-50 text-red-600 border border-red-200" : "bg-gray-50 text-gray-600 border border-gray-200"}`}>
              {freeRemaining} left
            </div>
          )}
          {isPaid && (
            <div className="text-[11px] px-2.5 py-1.5 rounded-lg font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              ✦ Full Access
            </div>
          )}
        </div>
      </div>

      {/* ── Error / Voice banners ───────────────────── */}
      {(apiError || voiceError) && (
        <div className="mx-4 mt-2 flex-shrink-0">
          {apiError && (
            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-[12px] text-red-700">
              <span>{apiError}</span>
              <button onClick={() => setApiError(null)} className="text-red-400 hover:text-red-600">✕</button>
            </div>
          )}
          {voiceError && (
            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-[12px] text-amber-700 mt-1.5">
              <span>🎤 {voiceError}</span>
              <button onClick={() => setVoiceError(null)} className="text-amber-400 hover:text-amber-600">✕</button>
            </div>
          )}
        </div>
      )}

      {/* ── Messages ───────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-bubble flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

            {/* Avatar */}
            <div className={`flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center text-[12px] font-bold shadow-sm ${
              msg.role === "ai"
                ? "bg-[#006A4E] text-white"
                : "bg-[#C8A84B] text-white"
            }`}>
              {msg.role === "ai" ? "J" : (user?.email?.[0]?.toUpperCase() ?? "U")}
            </div>

            <div className={`max-w-[86%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`rounded-2xl px-4 py-3 ${
                msg.role === "ai"
                  ? "bg-gray-50 border border-gray-100 rounded-tl-md w-full"
                  : "bg-[#006A4E] text-white rounded-tr-md"
              }`}>
                {msg.role === "ai" ? (
                  <div>{formatAI(msg.content)}</div>
                ) : (
                  <p className="text-[13px] leading-relaxed">{msg.content}</p>
                )}

                <div className="flex items-center justify-between mt-2 gap-2">
                  <span suppressHydrationWarning className="text-[10px] text-gray-400 tabular-nums">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {msg.role === "ai" && (
                    <button
                      onClick={() => speakMessage(msg.id, msg.content)}
                      className={`text-[10px] px-2 py-0.5 rounded-full transition-all ${
                        speakingId === msg.id
                          ? "bg-red-100 text-red-600"
                          : "text-gray-400 hover:text-[#006A4E] hover:bg-[#006A4E]/5"
                      }`}
                    >
                      {speakingId === msg.id ? "■ Stop" : "▶ Listen"}
                    </button>
                  )}
                </div>
              </div>

              {/* Tags */}
              {msg.metadata && (
                <div className="flex flex-wrap gap-1.5 px-1">
                  {msg.metadata.area && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#006A4E]/8 text-[#006A4E] border border-[#006A4E]/15 font-medium">
                      {AREA_LABELS[msg.metadata.area] ?? msg.metadata.area}
                    </span>
                  )}
                  {msg.metadata.knowledgeMatched && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                      ✦ NLC Verified
                    </span>
                  )}
                  {msg.metadata.escalate && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 font-medium">
                      ⚠ Consult Advocate
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="chat-bubble flex gap-3">
            <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-[#006A4E] flex items-center justify-center text-[12px] font-bold text-white shadow-sm">J</div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex gap-1.5 items-center h-4">
                <div className="typing-dot h-1.5 w-1.5 rounded-full bg-[#006A4E]" />
                <div className="typing-dot h-1.5 w-1.5 rounded-full bg-[#006A4E]" />
                <div className="typing-dot h-1.5 w-1.5 rounded-full bg-[#006A4E]" />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* ── Topic chips — only before first message ─ */}
      {!hasMessages && (
        <div className="px-4 pb-3 flex-shrink-0">
          <p className="text-[11px] font-medium text-gray-400 mb-2">
            {lang === "bn" ? "কোথায় শুরু করবেন?" : "Where would you like to start?"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {topics.map(t => (
              <button
                key={t.area}
                onClick={() => sendMessage(t.label, t.area)}
                className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-[#006A4E] hover:text-[#006A4E] hover:bg-[#006A4E]/5 transition-all font-medium"
              >
                <span>{t.icon}</span><span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Limit reached ───────────────────────────── */}
      {isAtLimit && (
        <div className="mx-4 mb-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center flex-shrink-0">
          <p className="text-[13px] font-semibold text-amber-900">
            {lang === "bn" ? "বিনামূল্যে সীমা শেষ" : "Free questions used"}
          </p>
          <p className="text-[12px] text-amber-700 mt-1">
            {lang === "bn" ? "আরও প্রশ্নের জন্য সাইন ইন করুন বা সাবস্ক্রাইব করুন" : "Sign in for more free questions or subscribe for unlimited"}
          </p>
          <div className="mt-3 flex justify-center gap-2">
            {!user && (
              <Link href="/auth/signin" className="px-4 py-2 rounded-xl border border-gray-300 text-[12px] font-medium text-gray-700 hover:border-gray-400 transition-all">
                Sign In
              </Link>
            )}
            <Link href="/payment" className="px-4 py-2 rounded-xl bg-[#C8A84B] text-white text-[12px] font-bold hover:bg-[#b8943b] transition-all shadow-sm">
              ✦ Upgrade
            </Link>
          </div>
        </div>
      )}

      {/* ── Voice status ────────────────────────────── */}
      {voiceStatus === "listening" && (
        <div className="mx-4 mb-1.5 flex items-center gap-2 flex-shrink-0">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] text-red-600">{lang === "bn" ? "শুনছি..." : "Listening..."}</span>
        </div>
      )}

      {/* ── Input ───────────────────────────────────── */}
      <div className="border-t border-gray-100 px-4 py-3 bg-white flex-shrink-0">
        <div className="flex gap-2 items-end max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isTyping || isAtLimit}
              rows={2}
              placeholder={
                isAtLimit
                  ? (lang === "bn" ? "সাবস্ক্রাইব করুন..." : "Subscribe to continue...")
                  : (lang === "bn" ? "আপনার পরিস্থিতি বলুন..." : "Describe your legal situation...")
              }
              className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#006A4E] focus:ring-2 focus:ring-[#006A4E]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all leading-relaxed"
            />
          </div>

          {/* Voice */}
          <button
            onClick={toggleVoice}
            disabled={isTyping || isAtLimit}
            title={lang === "bn" ? "ভয়েস" : "Voice"}
            className={`flex-shrink-0 h-11 w-11 rounded-2xl flex items-center justify-center transition-all disabled:opacity-30 ${
              isListening ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-200" : "border border-gray-200 text-gray-400 hover:text-[#006A4E] hover:border-[#006A4E] bg-gray-50"
            }`}
          >
            {isListening ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            )}
          </button>

          {/* Send */}
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping || isAtLimit}
            className="flex-shrink-0 h-11 w-11 rounded-2xl bg-[#006A4E] flex items-center justify-center text-white hover:bg-[#005a40] transition-all disabled:opacity-30 shadow-sm hover:shadow-md hover:shadow-[#006A4E]/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-1.5 text-center">
          {lang === "bn" ? "আইনি তথ্য মাত্র — পরামর্শ নয়" : "Legal information only — not legal advice · Enter to send"}
        </p>
      </div>
    </div>
  );
}
