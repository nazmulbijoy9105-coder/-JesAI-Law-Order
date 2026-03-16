"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Plus, Menu, X, Scale, Zap, Shield, BookOpen, ArrowRight, MessageCircle } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  language?: "en" | "bn";
}

const knowledgeStore: Record<string, { en: string; bn: string }> = {
  "property": {
    en: "Property law covers ownership, transfer, and disputes of land and buildings. In Bangladesh, the Transfer of Property Act, 1882 governs movable property. For immovable property, registration is mandatory under the Registration Act, 1908.",
    bn: "সম্পত্তি আইন জমি ও ভবনের মালিকানা, হস্তান্তর এবং বিরোধ নিয়ে কাজ করে। বাংলাদেশে, সম্পত্তি হস্তান্তর আইন, ১৮৮২ চলমান সম্পত্তি নিয়ন্ত্রণ করে।"
  },
  "criminal": {
    en: "Criminal law in Bangladesh is primarily governed by the Penal Code, 1860 and the Criminal Procedure Code, 1898. Offenses are classified as cognizable or non-cognizable. Bail is a fundamental right under certain conditions.",
    bn: "বাংলাদেশে ফৌজদারি আইন মূলত দণ্ডবিধি, ১৮৬০ এবং ফৌজদারি কার্যবিধি, ১৮৯৮ দ্বারা নিয়ন্ত্রিত।"
  },
  "family": {
    en: "Family law in Bangladesh covers marriage, divorce, guardianship, and inheritance. The Muslim Family Laws Ordinance, 1961 governs Muslim family matters.",
    bn: "বাংলাদেশে পরিবার আইন বিয়ে, তালাক, অভিভাবকত্ব এবং উত্তরাধিকার নিয়ে কাজ করে।"
  },
  "labour": {
    en: "Labor law in Bangladesh is governed by the Labor Code, 2006. It covers working hours, wages, leave, safety, and termination. Workers have rights to form associations.",
    bn: "বাংলাদেশে শ্রম আইন শ্রম কোড, ২০০৬ দ্বারা নিয়ন্ত্রিত। এতে কাজের সময়, মজুরি, ছুটি অন্তর্ভুক্ত।"
  },
  "constitutional": {
    en: "Constitutional law in Bangladesh is based on the Constitution of Bangladesh, 1972. It guarantees fundamental rights including equality, freedom of speech, and due process.",
    bn: "বাংলাদেশে সাংবিধানিক আইন বাংলাদেশের সংবিধান, ১৯৭২ এর উপর ভিত্তি করে।"
  },
  "consumer": {
    en: "Consumer protection in Bangladesh is governed by the Consumer Rights Protection Act, 2019. Consumers have the right to safety, information, choice, and fair treatment.",
    bn: "বাংলাদেশে ভোক্তা সুরক্ষা ভোক্তা অধিকার সুরক্ষা আইন, ২০১৯ দ্বারা নিয়ন্ত্রিত।"
  },
  "cyber": {
    en: "Cyber law in Bangladesh includes the Digital Security Act, 2018 and the Information and Communication Technology Act, 2006. It addresses online crimes, data protection, and electronic transactions.",
    bn: "বাংলাদেশে সাইবার আইনে ডিজিটাল নিরাপত্তা আইন, ২০১৮ অন্তর্ভুক্ত।"
  }
};

const generalResponses: Record<string, { en: string; bn: string }> = {
  "greeting": {
    en: "Hello! I'm JesAI, your legal assistant. I can help with questions about Property Law, Criminal Law, Family Law, Labour Law, Constitutional Law, Consumer Law, and Cyber Law. How can I assist you today?",
    bn: "আসসালামুয়ালাইকুম! আমি JesAI, আপনার আইনি সহকারী।"
  },
  "help": {
    en: "I can help you understand legal concepts in Bangladesh. Just ask me about any legal topic and I'll provide information based on our knowledge base. For complex cases, I may recommend consulting a licensed advocate.",
    bn: "আমি আপনাকে বাংলাদেশের আইনি ধারণাগুলি বুঝতে সাহায্য করতে পারি।"
  },
  "escalation": {
    en: "For complex legal matters requiring personalized advice, you may consult a licensed Supreme Court Advocate.",
    bn: "ব্যক্তিগত পরামর্শ প্রয়োজন জটিল আইনি বিষয়ের জন্য, আপনি একজন লাইসেন্সধারী সুপ্রিম কোর্ট অ্যাডভোকেটের সাথে পরামর্শ করতে পারেন।"
  },
  "not_understood": {
    en: "I didn't quite understand that. Could you please rephrase your question? You can ask about: Property, Criminal, Family, Labour, Constitutional, Consumer, or Cyber Law.",
    bn: "আমি তা বুঝতে পারিনি। আপনি কি আপনার প্রশ্নটি পুনরায় লিখতে পারেন?"
  }
};

const lawAreas = [
  { id: "property", name: "Property Law", nameBn: "সম্পত্তি আইন", icon: Scale, color: "bg-blue-500" },
  { id: "criminal", name: "Criminal Law", nameBn: "ফৌজদারি আইন", icon: Shield, color: "bg-red-500" },
  { id: "family", name: "Family Law", nameBn: "পরিবার আইন", icon: BookOpen, color: "bg-green-500" },
  { id: "labour", name: "Labour Law", nameBn: "শ্রম আইন", icon: Zap, color: "bg-yellow-500" },
  { id: "constitutional", name: "Constitutional", nameBn: "সাংবিধানিক", icon: Scale, color: "bg-purple-500" },
  { id: "consumer", name: "Consumer Rights", nameBn: "ভোক্তা অধিকার", icon: Shield, color: "bg-orange-500" },
  { id: "cyber", name: "Cyber Law", nameBn: "সাইবার আইন", icon: Zap, color: "bg-indigo-500" },
];

function detectLanguage(text: string): "en" | "bn" {
  const bengaliChars = /[\u0980-\u09FF]/;
  return bengaliChars.test(text) ? "bn" : "en";
}

function findRelevantAnswer(query: string): { en: string; bn: string } | null {
  const lowerQuery = query.toLowerCase();
  
  const lawKeywords: Record<string, string[]> = {
    "property": ["property", "land", "house", "flat", "rent", "ownership", "deed", "সম্পত্তি", "জমি", "বাড়ি"],
    "criminal": ["crime", "criminal", "theft", "fraud", "murder", "bail", "police", "অপরাধ", "চুরি", "প্রতারণা"],
    "family": ["marriage", "divorce", "dowry", "guardianship", "inheritance", "nikah", "talaq", "বিয়ে", "তালাক"],
    "labour": ["worker", "labor", "wage", "salary", "leave", "termination", "শ্রমিক", "মজুরি"],
    "constitutional": ["constitution", "fundamental", "rights", "supreme court", "সংবিধান", "মৌলিক"],
    "consumer": ["consumer", "product", "defective", "refund", "complaint", "ভোক্তা", "পণ্য"],
    "cyber": ["cyber", "online", "digital", "hacking", "privacy", "data", "সাইবার", "অনলাইন"]
  };

  for (const [law, keywords] of Object.entries(lawKeywords)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      return knowledgeStore[law];
    }
  }

  return null;
}

function lowerMatches(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some(k => lower.includes(k));
}

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations] = useState([
    { id: 1, title: "Corporate Law Questions", date: "Today" },
    { id: 2, title: "Labor Rights Guidance", date: "Yesterday" }
  ]);
  const [nextId, setNextId] = useState(() => 0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isClient = typeof window !== "undefined";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const lang = detectLanguage(input);
    const currentId = nextId;
    setNextId((prev) => prev + 2);
    const userMessage: Message = {
      id: currentId,
      role: "user",
      content: input,
      timestamp: new Date(),
      language: lang
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const answer = findRelevantAnswer(input);
      let response: string;
      let responseLang: "en" | "bn";

      if (answer) {
        response = lang === "bn" ? answer.bn : answer.en;
        responseLang = lang;
      } else if (lowerMatches(input, ["help", "can you", "what can", "how", "সাহায্য"])) {
        response = lang === "bn" ? generalResponses.help.bn : generalResponses.help.en;
        responseLang = lang;
      } else {
        response = lang === "bn" ? generalResponses.not_understood.bn : generalResponses.not_understood.en;
        responseLang = lang;
      }

      const assistantMessage: Message = {
        id: currentId + 1,
        role: "assistant",
        content: response,
        timestamp: new Date(),
        language: responseLang
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const newChat = () => {
    setMessages([]);
    setSidebarOpen(false);
  };

  const handleVoice = () => {
    if (!isClient) return;
    
    const win = window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown };
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognitionClass() as {
      continuous: boolean;
      interimResults: boolean;
      start: () => void;
      stop: () => void;
      onresult: (event: { results: { 0: { transcript: string } }[] }) => void;
      onerror: () => void;
      onend: () => void;
    };
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = () => {
      console.error("Speech recognition error");
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startChat = () => {
    setShowChat(true);
  };

  if (showChat) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative w-64 h-full bg-white border-r border-slate-200 z-40 transition-transform duration-300 ease-out flex flex-col shadow-lg lg:shadow-none`}
        >
          <div className="p-4 border-b border-slate-200">
              <button
              onClick={newChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              New Chat
            </button>
            <button
              onClick={() => setShowChat(false)}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
            >
              ← Back to Home
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
              Recent Chats
            </div>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors duration-150 text-sm text-slate-700 group"
              >
                <div className="font-medium truncate">{conv.title}</div>
                <div className="text-xs text-slate-500">{conv.date}</div>
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-slate-200 space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-sm text-slate-700 transition-colors">
              Settings
            </button>
            <div className="text-xs text-slate-500 px-3 py-2">
              JesAI Legal v1.0
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Header */}
          <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Scale size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">
                    JesAI Legal
                  </h1>
                  <p className="text-xs text-slate-500">Law Order Advisor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 scroll-smooth">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-8">
                <div className="text-center max-w-2xl mx-auto">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
                      <MessageCircle size={32} className="text-blue-700" />
                    </div>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                    Welcome to JesAI Legal
                  </h2>
                  <p className="text-slate-600 mb-8 text-base lg:text-lg">
                    Your intelligent legal advisor for Bangladesh laws
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleSuggestedQuestion("Property Law")}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50 transition-all duration-200 text-left group cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <Scale size={20} className="text-blue-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">
                            Property Law
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Land, house, ownership
                          </div>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSuggestedQuestion("Family Law")}
                      className="p-4 rounded-xl border border-slate-200 hover:border-green-400 bg-white hover:bg-green-50 transition-all duration-200 text-left group cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <BookOpen size={20} className="text-green-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">
                            Family Law
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Marriage, divorce, inheritance
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] sm:max-w-[60%] lg:max-w-[50%] px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none shadow-md"
                          : "bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200 shadow-sm"
                      }`}
                    >
                      <p className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                      <div className={`text-xs mt-2 ${msg.role === "user" ? "text-blue-100" : "text-slate-500"}`}>
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 bg-white p-4 lg:p-6">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleVoice}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Zap size={18} className="text-slate-600" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about property, criminal, family law..."
                  className="flex-1 h-11 px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 text-sm lg:text-base transition-all duration-200 placeholder-slate-500"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg disabled:shadow-none"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                AI responses are for informational purposes. Always consult qualified legal professionals.
              </p>
            </form>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Scale size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">LEGAL LITERACY</h1>
              <p className="text-xs text-blue-600 font-medium">Powered by JesAI</p>
            </div>
          </div>
          <button className="text-sm text-slate-600 hover:text-blue-600 font-medium">
            English | বাংলা
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-3">
        <p className="text-center text-white font-semibold text-sm">
          Free Legal Literacy for Every Bangladeshi 🇧🇩
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Bold Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Your Legal Rights,<br />
            <span className="text-blue-600">Explained Simply</span>
          </h2>

          {/* Supporting Text */}
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            JesAI helps you understand Bangladeshi law in simple terms. 
            Ask questions about property, family, criminal, or consumer rights — 
            and get clear, actionable guidance instantly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={startChat}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle size={22} />
              Ask JesAI Now
            </button>
            <button
              onClick={() => setShowChat(true)}
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen size={22} />
              Explore Law Areas
            </button>
          </div>
        </div>

        {/* Law Areas Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Explore Legal Areas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {lawAreas.map((area) => {
              const Icon = area.icon;
              return (
                <button
                  key={area.id}
                  onClick={() => {
                    setInput(area.name);
                    setShowChat(true);
                  }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:shadow-lg transition-all duration-200 text-left group"
                >
                  <div className={`w-10 h-10 ${area.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="font-semibold text-slate-900 text-sm">{area.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{area.nameBn}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-20 bg-slate-50 rounded-2xl p-8 text-center">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-600">Legal Q&A</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
              <div className="text-slate-600">Law Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-slate-600">Available</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            ⚠️ JesAI provides general legal information, not legal advice. 
            For specific legal matters, please consult a licensed advocate.
          </p>
          <p className="text-slate-500 text-xs mt-4">
            © 2026 JesAI Legal - Free Legal Literacy for Bangladesh
          </p>
        </div>
      </footer>
    </div>
  );
}
