"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Plus, Menu, X, ChevronRight, Scale, Zap, Shield } from "lucide-react";

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

const suggestedQuestions = [
  {
    icon: Scale,
    title: "Property Law",
    description: "Land, house, ownership queries"
  },
  {
    icon: Shield,
    title: "Criminal Defense",
    description: "Legal protection rights"
  },
  {
    icon: Zap,
    title: "Family Matters",
    description: "Marriage, divorce, inheritance"
  },
  {
    icon: Scale,
    title: "Consumer Rights",
    description: "Product safety & complaints"
  }
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

export default function Home() {
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

  const lowerMatches = (text: string, keywords: string[]): boolean => {
    const lower = text.toLowerCase();
    return keywords.some(k => lower.includes(k));
  };

  const handleSuggestedQuestion = (question: typeof suggestedQuestions[0]) => {
    setInput(question.title);
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
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
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
                    <Scale size={32} className="text-blue-600" />
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                  Welcome to JesAI Legal
                </h2>
                <p className="text-slate-600 mb-8 text-base lg:text-lg">
                  Your intelligent legal advisor for Bangladesh laws - Property, Criminal, Family, Labour, Constitutional, Consumer & Cyber Law
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestedQuestions.map((q, idx) => {
                    const Icon = q.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSuggestedQuestion(q)}
                        className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50 transition-all duration-200 text-left group cursor-pointer shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <Icon size={20} className="text-blue-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <div>
                            <div className="font-semibold text-slate-900 text-sm">
                              {q.title}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              {q.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
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
                    className={`max-w-xs sm:max-w-md lg:max-w-xl px-4 py-3 rounded-xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none shadow-md"
                        : "bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200"
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
                  <div className="bg-slate-100 border border-slate-200 px-4 py-3 rounded-xl rounded-bl-none">
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
                className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <Zap size={18} className="text-slate-600" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about property, criminal, family law..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 text-sm lg:text-base transition-all duration-200 placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg disabled:shadow-none"
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
