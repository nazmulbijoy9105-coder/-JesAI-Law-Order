"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Plus, Menu, X, Scale, Zap, Shield, BookOpen, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  language?: "en" | "bn";
  source?: string;
  confidence?: "high" | "medium" | "low";
}

const SYSTEM_PROMPT = `You are JesAI, a legal information assistant for Bangladesh.
STRICT RULES:
- Only answer questions related to Bangladesh law (Property, Criminal, Family, Labour, Constitutional, Consumer, Cyber)
- If question is not about Bangladeshi law, politely decline
- If you don't know the answer from verified sources, clearly say "I don't have that information"
- Never make up laws, case names, or legal provisions
- Always recommend consulting a licensed advocate for specific legal advice
- Keep responses concise (max 500 words)
- Respond in the same language as the question (English or Bengali)`;

const MAX_RESPONSE_LENGTH = 2000;

const knowledgeStore: Record<string, { en: string; bn: string; source: string }> = {
  "property": {
    en: "Property law in Bangladesh is primarily governed by the Transfer of Property Act, 1882 and the Registration Act, 1908. Key points:\n\n• Ownership: Transfer of property requires registered deeds\n• Registration: Mandatory for immovable property over Tk. 100\n• Rent: Governed by Tenant Protection Act\n• Inheritance: Follows Muslim Family Laws Ordinance or Hindu law\n\nFor specific cases, consult a licensed property lawyer.",
    bn: "বাংলাদেশে সম্পত্তি আইন মূলত সম্পত্তি হস্তান্তর আইন, ১৮৮২ এবং নিবন্ধন আইন, ১৯০৮ দ্বারা নিয়ন্ত্রিত।\n\n• মালিকানা: নিবন্ধিত দলিল প্রয়োজন\n• নিবন্ধন: ১০০ টাকার বেশি সম্পত্তির জন্য বাধ্যতামূলক\n• ভাড়া: ভাড়াটি সুরক্ষা আইন দ্বারা নিয়ন্ত্রিত\n\nনির্দিষ্ট মামলার জন্য একজন লাইসেন্সধারী আইনজীবীর পরামর্শ নিন।",
    source: "Transfer of Property Act 1882, Registration Act 1908"
  },
  "criminal": {
    en: "Criminal law in Bangladesh is governed by the Penal Code, 1860 and Criminal Procedure Code, 1898. Key points:\n\n• Cognizable offenses: Police can arrest without warrant (theft, fraud, assault)\n• Non-cognizable: Police need warrant (defamation, cheating)\n• Bail: Available for bailable offenses; difficult for non-bailable\n• Rights: Right to legal counsel, protection from self-incrimination\n\nFor legal defense, contact a criminal law specialist.",
    bn: "বাংলাদেশে ফৌজদারি আইন দণ্ডবিধি, ১৮৬০ এবং ফৌজদারি কার্যবিধি, ১৮৯৮ দ্বারা নিয়ন্ত্রিত।\n\n• গ্রেপ্তারযোগ্য অপরাধ: পুলিশ ওয়ারেন্ট ছাড়া গ্রেপ্তার করতে পারে\n• জামিন: জামিনযোগ্য অপরাধে জামিন পাওয়া যায়\n• অধিকার: আইনি পরামর্শ পাওয়ার অধিকার\n\nআইনি প্রতিরক্ষার জন্য একজন ফৌজদারি বিশেষজ্ঞের সাথে যোগাযোগ করুন।",
    source: "Penal Code 1860, CrPC 1898"
  },
  "family": {
    en: "Family law in Bangladesh varies by religion:\n\nMUSLIM FAMILY LAW:\n• Marriage: Nikah Registration Act 1974\n• Divorce: Muslim Family Laws Ordinance 1961 (Talaq requires Arbitration Council)\n• Dowry: Dowry Prohibition Act 1980 (criminal offense)\n• Maintenance: Wife and children entitled to maintenance\n\nHINDU FAMILY LAW:\n• Marriage: Hindu Marriage Registration Act 2012\n• Succession: Hindu Inheritance Act 1929\n\nFor family disputes, consult a family law advocate.",
    bn: "বাংলাদেশে পরিবার আইন ধর্ম অনুযায়ী পৃথক:\n\nমুসলিম পরিবার আইন:\n• বিয়ে: নিকাহ নিবন্ধন আইন ১৯৭৪\n• তালাক: মুসলিম পরিবার আইন অধ্যাদেশ ১৯৬১\n• দাস্ত: দাস্ত নিষিদ্ধ আইন ১৯৮০\n\nহিন্দু পরিবার আইন:\n• বিয়ে: হিন্দু বিয়ে নিবন্ধন আইন ২০১২\n\nপারিবারিক বিরোধের জন্য পরিবার আইন বিশেষজ্ঞের পরামর্শ নিন।",
    source: "Muslim Family Laws Ordinance 1961, Hindu Marriage Act 2012"
  },
  "labour": {
    en: "Labour law in Bangladesh is governed by the Labour Code 2006. Key provisions:\n\n• Working Hours: 8 hours/day, 48 hours/week max\n• Minimum Wage: Set by Wages Board (varies by sector)\n• Overtime: Double pay for extra hours\n• Leave: Annual leave (14-30 days), sick leave, maternity leave\n• Safety: Employer must provide safe working conditions\n• Termination: Notice required; illegal dismissal can be challenged\n\nWorkers have right to form associations and collective bargaining.",
    bn: "বাংলাদেশে শ্রম আইন শ্রম কোড ২০০৬ দ্বারা নিয়ন্ত্রিত।\n\n• কাজের সময়: সর্বোচ্চ ৮ ঘণ্টা/দিন\n• ন্যূনতম মজুরি: মজুরি বোর্ড নির্ধারণ করে\n• অতিরিক্ত কাজ: দ্বিগুণ মজুরি\n• ছুটি: বার্ষিক ছুটি (১৪-৩০ দিন), অসুস্থতার ছুটি, মাতৃত্বকালীন ছুটি\n• নিরাপত্তা: নিয়োগকর্তা নিরাপদ পরিবেশ নিশ্চিত করতে বাধ্য\n• চাকরি বিচ্ছেদ: নোটিশ প্রয়োজন\n\nশ্রমিকদের সমিতি গঠনের অধিকার আছে।",
    source: "Labour Code 2006"
  },
  "constitutional": {
    en: "Constitutional law of Bangladesh is based on the Constitution 1972. Fundamental rights include:\n\n• Article 27: Equality before law\n• Article 28: Prohibition of discrimination\n• Article 32: Protection of right to life and personal liberty\n• Article 34: Prohibition of forced labor\n• Article 39: Freedom of thought and speech\n• Article 44: Right to constitutional remedies\n\nViolations can be challenged in High Court under Article 102.",
    bn: "বাংলাদেশের সাংবিধানিক আইন সংবিধান ১৯৭২ এর উপর ভিত্তি করে। মৌলিক অধিকার:\n\n• আর্টিকেল ২৭: আইনের সমান সুরক্ষা\n• আর্টিকেল ২৮: বৈষম্য নিষিদ্ধ\n• আর্টিকেল ৩২: জীবন ও ব্যক্তিগত স্বাধীনতার সুরক্ষা\n• আর্টিকেল ৩৯: চিন্তা ও বাকস্বাধীনতা\n\nউচ্চ আদালতে চ্যালেঞ্জ করা যায়।",
    source: "Constitution of Bangladesh 1972"
  },
  "consumer": {
    en: "Consumer protection in Bangladesh is governed by the Consumer Rights Protection Act 2019. Consumer rights include:\n\n• Right to safety from defective products\n• Right to information about products\n• Right to choose products\n• Right to fair treatment\n• Right to compensation for damages\n\nComplaints can be filed with local Consumer Rights Protection offices or courts.",
    bn: "বাংলাদেশে ভোক্তা সুরক্ষা ভোক্তা অধিকার সুরক্ষা আইন ২০১৯ দ্বারা নিয়ন্ত্রিত। ভোক্তার অধিকার:\n\n• ত্রুটিপূর্ণ পণ্য থে�ে নিরাপত্তা\n• পণ্য সম্পর্কে তথ্য পাওয়ার অধিকার\n• পছন্দের অধিকার\n• ক্ষতিপূরণ পাওয়ার অধিকার\n\nঅভিযোগ স্থানীয় ভোক্তা অধিকার অফিসে দায়ের করা যায়।",
    source: "Consumer Rights Protection Act 2019"
  },
  "cyber": {
    en: "Cyber law in Bangladesh includes:\n\n• Digital Security Act 2018: Addresses online crimes, unauthorized access, data theft\n• ICT Act 2006: Electronic transactions, cybercrime provisions\n\nCommon offenses:\n• Hacking: Up to 14 years imprisonment\n• Data theft: Up to 10 years\n• Online harassment: Punishable offense\n• Defamation via social media: Criminal liability\n\nFor cyber crimes, contact cybercrime police unit.",
    bn: "বাংলাদেশে সাইবার আইন:\n\n• ডিজিটাল নিরাপত্তা আইন ২০১৮: অনলাইন অপরাধ\n• তথ্য ও যোগাযোগ প্রযুক্তি আইন ২০০৬\n\nসাধারণ অপরাধ:\n• হ্যাকিং: সর্বোচ্চ ১৪ বছর কারাদণ্ড\n• ডেটা চুরি: সর্বোচ্চ ১০ বছর\n• অনলাইন উৎপীড়ন: দণ্ডনীয় অপরাধ\n\nসাইবার অপরাধের জন্য সাইবার পুলিশ ইউনিটে যোগাযোগ করুন।",
    source: "Digital Security Act 2018, ICT Act 2006"
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

function findRelevantAnswer(query: string): { en: string; bn: string; source: string } | null {
  const lowerQuery = query.toLowerCase();
  
  const lawKeywords: Record<string, string[]> = {
    "property": ["property", "land", "house", "flat", "rent", "ownership", "deed", "registration", "সম্পত্তি", "জমি", "বাড়ি", "দলিল"],
    "criminal": ["crime", "criminal", "theft", "fraud", "murder", "bail", "police", "arrest", "অপরাধ", "চুরি", "প্রতারণা", "গ্রেপ্তার"],
    "family": ["marriage", "divorce", "dowry", "guardianship", "inheritance", "nikah", "talaq", "maintenance", "বিয়ে", "তালাক", "দাস্ত", "উত্তরাধিকার"],
    "labour": ["worker", "labor", "wage", "salary", "leave", "termination", "工厂", "শ্রমিক", "মজুরি", "চাকরি", "ছুটি"],
    "constitutional": ["constitution", "fundamental", "rights", "supreme court", "high court", "article", "সংবিধান", "মৌলিক", "অধিকার", "আর্টিকেল"],
    "consumer": ["consumer", "product", "defective", "refund", "complaint", "warranty", "ভোক্তা", "পণ্য", "ক্ষতিপূরণ"],
    "cyber": ["cyber", "online", "digital", "hacking", "privacy", "data", "social media", "আইবার", "অনলাইন", "হ্যাকিং", "গোপনীয়তা"]
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
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGroqAPI = async (message: string, lang: "en" | "bn"): Promise<{ reply: string; source: string; confidence: "high" | "medium" | "low" } | null> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language: lang }),
      });
      
      if (!res.ok) return null;
      
      const data = await res.json();
      return {
        reply: data.reply,
        source: data.source || "Groq AI",
        confidence: data.confidence || "medium"
      };
    } catch {
      return null;
    }
  };

  const handleSend = async () => {
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

    // Try Groq API first, fallback to knowledge store
    const aiResponse = await callGroqAPI(input, lang);

    setTimeout(() => {
      let response: string;
      let responseLang: "en" | "bn";
      let source = "";
      let confidence: "high" | "medium" | "low" = "high";

      if (aiResponse) {
        response = aiResponse.reply;
        responseLang = lang;
        source = aiResponse.source;
        confidence = aiResponse.confidence;
      } else {
        const answer = findRelevantAnswer(input);

        if (answer) {
          response = lang === "bn" ? answer.bn : answer.en;
          responseLang = lang;
          source = answer.source;
          confidence = "high";
        } else if (lowerMatches(input, ["help", "can you", "what can", "how", "who are you", "সাহায্য", "তুমি কে"])) {
          response = lang === "bn" ? generalResponses.help.bn : generalResponses.help.en;
          responseLang = lang;
          source = "JesAI Legal Assistant";
          confidence = "high";
        } else if (lowerMatches(input, ["thank", "thanks", "good", "great", "ধন্যবাদ", "ভালো"])) {
          response = lang === "bn" ? "আপনাকে স্বাগতম! আরও প্রশ্ন থাকলে জানাবেন।" : "You're welcome! Feel free to ask more questions.";
          responseLang = lang;
          source = "JesAI Legal Assistant";
          confidence = "high";
        } else {
          response = lang === "bn" 
            ? "আমি এই বিষয়ে নিশ্চিত তথ্য পাইনি। অনুগ্রহ করে অন্য প্রশ্ন করুন অথবা আইনি পরামর্শের জন্য একজন লাইসেন্সধারী অ্যাডভোকেটের সাথে যোগাযোগ করুন।"
            : "I don't have specific information on this. Please rephrase your question or consult a licensed advocate for legal advice.";
          responseLang = lang;
          source = "No verified source";
          confidence = "low";
        }
      }

      if (response.length > MAX_RESPONSE_LENGTH) {
        response = response.substring(0, MAX_RESPONSE_LENGTH) + "...";
      }

      const assistantMessage: Message = {
        id: currentId + 1,
        role: "assistant",
        content: response,
        timestamp: new Date(),
        language: responseLang,
        source,
        confidence
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, aiResponse ? 500 : 800);
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
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="text-[10px] px-2 py-0.5 bg-slate-200 rounded-full text-slate-600">
                            {msg.source || "JesAI"}
                          </span>
                          {msg.confidence && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                              msg.confidence === "high" 
                                ? "bg-green-100 text-green-700" 
                                : msg.confidence === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                              {msg.confidence === "high" ? "✓ Verified" : msg.confidence === "medium" ? "? Uncertain" : "⚠ Limited"}
                            </span>
                          )}
                        </div>
                      )}
                      <div className={`text-xs mt-2 ${msg.role === "user" ? "text-blue-100" : "text-slate-400"}`}>
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
              <p className="text-xs text-slate-500 mt-2 text-center flex items-center justify-center gap-1">
                <span>⚠️</span>
                <span>Information only - not legal advice. Consult a licensed advocate for specific cases.</span>
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
          <div className="flex items-center gap-3">
            <Link href="/services" className="text-sm text-slate-600 hover:text-blue-600 font-medium">
              Pricing
            </Link>
            <Link href="/login" className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
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
