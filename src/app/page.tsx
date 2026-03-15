"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  language?: "en" | "bn";
}

const knowledgeStore: Record<string, { en: string; bn: string }> = {
  "property": {
    en: "Property law covers ownership, transfer, and disputes of land and buildings. In Bangladesh, the Transfer of Property Act, 1882 governs movable property. For immovable property, registration is mandatory under the Registration Act, 1908.",
    bn: "সম্পত্তি আইন জমি ও ভবনের মালিকানা, হস্তান্তর এবং বিরোধ নিয়ে কাজ করে। বাংলাদেশে, সম্পত্তি হস্তান্তর আইন, ১৮৮২ চলমান সম্পত্তি নিয়ন্ত্রণ করে। অস্থাবর সম্পত্তির জন্য, নিবন্ধন আইন, ১৯০৮ এর অধীনে নিবন্ধন বাধ্যতামূলক।"
  },
  "criminal": {
    en: "Criminal law in Bangladesh is primarily governed by the Penal Code, 1860 and the Criminal Procedure Code, 1898. Offenses are classified as cognizable or non-cognizable. Bail is a fundamental right under certain conditions.",
    bn: "বাংলাদেশে ফৌজদারি আইন মূলত দণ্ডবিধি, ১৮৬০ এবং ফৌজদারি কার্যবিধি, ১৮৯৮ দ্বারা নিয়ন্ত্রিত। অপরাধ গ্রেপ্তারযোগ্য বা অ-গ্রেপ্তারযোগ্য হিসেবে শ্রেণীবদ্ধ। জামিন কিছু শর্তে মৌলিক অধিকার।"
  },
  "family": {
    en: "Family law in Bangladesh covers marriage, divorce, guardianship, and inheritance. The Muslim Family Laws Ordinance, 1961 governs Muslim family matters. The Hindu Marriage Registration Act, 2012 applies to Hindus.",
    bn: "বাংলাদেশে পরিবার আইন বিয়ে, তালাক, অভিভাবকত্ব এবং উত্তরাধিকার নিয়ে কাজ করে। মুসলিম পরিবার আইন অধ্যাদেশ, ১৯৬১ মুসলিম পরিবারের বিষয় নিয়ন্ত্রণ করে। হিন্দু বিয়ে নিবন্ধন আইন, ২০১২ হিন্দুদের ক্ষেত্রে প্রযোজ্য।"
  },
  "labour": {
    en: "Labor law in Bangladesh is governed by the Labor Code, 2006. It covers working hours, wages, leave, safety, and termination. Workers have rights to form associations and collective bargaining.",
    bn: "বাংলাদেশে শ্রম আইন শ্রম কোড, ২০০৬ দ্বারা নিয়ন্ত্রিত। এতে কাজের সময়, মজুরি, ছুটি, নিরাপত্তা এবং চাকরি বিচ্ছেদ অন্তর্ভুক্ত। শ্রমিকদের সমিতি গঠন ও সম্মিলিত দরকষ্কারের অধিকার আছে।"
  },
  "constitutional": {
    en: "Constitutional law in Bangladesh is based on the Constitution of Bangladesh, 1972. It guarantees fundamental rights including equality, freedom of speech, and due process. The Supreme Court is the guardian of the constitution.",
    bn: "বাংলাদেশে সাংবিধানিক আইন বাংলাদেশের সংবিধান, ১৯৭২ এর উপর ভিত্তি করে। এটি মৌলিক অধিকার নিশ্চিত করে যার মধ্যে সমতা, বাকস্বাধীনতা এবং ন্যায়বিচার অন্তর্ভুক্ত। সুপ্রিম কোর্ট সংবিধানের রক্ষক।"
  },
  "consumer": {
    en: "Consumer protection in Bangladesh is governed by the Consumer Rights Protection Act, 2019. Consumers have the right to safety, information, choice, and fair treatment. Complaints can be filed with the Department of Consumer Affairs.",
    bn: "বাংলাদেশে ভোক্তা সুরক্ষা ভোক্তা অধিকার সুরক্ষা আইন, ২০১৯ দ্বারা নিয়ন্ত্রিত। ভোক্তাদের নিরাপত্তা, তথ্য, পছন্দ এবং ন্যায্য আচরণের অধিকার আছে। অভিযোগ ভোক্তা বিষয়ক বিভাগে দায়ের করা যায়।"
  },
  "cyber": {
    en: "Cyber law in Bangladesh includes the Digital Security Act, 2018 and the Information and Communication Technology Act, 2006. It addresses online crimes, data protection, and electronic transactions. Offenses carry significant penalties.",
    bn: "বাংলাদেশে সাইবার আইনে ডিজিটাল নিরাপত্তা আইন, ২০১৮ এবং তথ্য ও যোগাযোগ প্রযুক্তি আইন, ২০০৬ অন্তর্ভুক্ত। এটি অনলাইন অপরাধ, ডেটা সুরক্ষা এবং ইলেকট্রনিক লেনদেন সম্পর্কে। অপরাধে উল্লেখযোগ্য শাস্তি হয়।"
  }
};

const generalResponses: Record<string, { en: string; bn: string }> = {
  "greeting": {
    en: "Hello! I'm JesAI, your legal assistant. I can help with questions about Property Law, Criminal Law, Family Law, Labour Law, Constitutional Law, Consumer Law, and Cyber Law. How can I assist you today? / আসসালামুয়ালাইকুম! আমি JesAI, আপনার আইনি সহকারী। আমি সম্পত্তি আইন, ফৌজদারি আইন, পরিবার আইন, শ্রম আইন, সাংবিধানিক আইন, ভোক্তা আইন এবং সাইবার আইন সম্পর্কে প্রশ্নে সাহায্য করতে পারি।",
    bn: "আসসালামুয়ালাইকুম! আমি JesAI, আপনার আইনি সহকারী। আমি সম্পত্তি আইন, ফৌজদারি আইন, পরিবার আইন, শ্রম আইন, সাংবিধানিক আইন, ভোক্তা আইন এবং সাইবার আইন সম্পর্কে প্রশ্নে সাহায্য করতে পারি।"
  },
  "help": {
    en: "I can help you understand legal concepts in Bangladesh. Just ask me about any legal topic and I'll provide information based on our knowledge base. For complex cases, I may recommend consulting a licensed advocate.",
    bn: "আমি আপনাকে বাংলাদেশের আইনি ধারণাগুলি বুঝতে সাহায্য করতে পারি। যেকোনো আইনি বিষয়ে আমাকে জিজ্ঞাসা করুন এবং আমি আমাদের জ্ঞান ভিত্তি থেকে তথ্য প্রদান করব। জটিল মামলার জন্য, আমি একজন লাইসেন্সধারী অ্যাডভোকেটের সাথে পরামর্শ করার সুপারিশ করতে পারি।"
  },
  "escalation": {
    en: "For complex legal matters requiring personalized advice, you may consult a licensed Supreme Court Advocate. Would you like more information about legal consultation?",
    bn: "ব্যক্তিগত পরামর্শ প্রয়োজন জটিল আইনি বিষয়ের জন্য, আপনি একজন লাইসেন্সধারী সুপ্রিম কোর্ট অ্যাডভোকেটের সাথে পরামর্শ করতে পারেন। আইনি পরামর্শ সম্পর্কে আরও তথ্য পেতে চান?"
  },
  "not_understood": {
    en: "I didn't quite understand that. Could you please rephrase your question? You can ask about: Property, Criminal, Family, Labour, Constitutional, Consumer, or Cyber Law.",
    bn: "আমি তা বুঝতে পারিনি। আপনি কি আপনার প্রশ্নটি পুনরায় লিখতে পারেন? আপনি জিজ্ঞাসা করতে পারেন: সম্পত্তি, ফৌজদারি, পরিবার, শ্রম, সাংবিধানিক, ভোক্তা, বা সাইবার আইন সম্পর্কে।"
  }
};

function detectLanguage(text: string): "en" | "bn" {
  const bengaliChars = /[\u0980-\u09FF]/;
  return bengaliChars.test(text) ? "bn" : "en";
}

function findRelevantAnswer(query: string): { en: string; bn: string } | null {
  const lowerQuery = query.toLowerCase();
  
  const lawKeywords: Record<string, string[]> = {
    "property": ["property", "land", "house", "flat", "rent", "ownership", "deed", "registry", "সম্পত্তি", "জমি", "বাড়ি", "ফ্ল্যাট", "ভাড়া", "মালিকানা", "দলিল"],
    "criminal": ["crime", "criminal", "theft", "fraud", "murder", "assault", "bail", "police", "cognizable", "অপরাধ", "চুরি", "প্রতারণা", "খুন", "মারধর", "জামিন", "পুলিশ"],
    "family": ["marriage", "divorce", "dowry", "guardianship", "inheritance", "will", "maintenance", "nikah", "talaq", "বিয়ে", "তালাক", "দাস্ত", "অভিভাবকত্ব", "উত্তরাধিকার", "উইল", "নিকাহ"],
    "labour": ["worker", "labor", "wage", "salary", "leave", "termination", "factory", "industrial", "শ্রমিক", "মজুরি", "বেতন", "ছুটি", "বরখাস্ত", "কারখানা"],
    "constitutional": ["constitution", "fundamental", "rights", "article", "supreme court", "high court", "fundamental rights", "সংবিধান", "মৌলিক", "অধিকার", "আর্টিকেল", "সুপ্রিম কোর্ট", "হাই কোর্ট"],
    "consumer": ["consumer", "product", "defective", "refund", "complaint", "protection", "ভোক্তা", "পণ্য", "ত্রুটিপূর্ণ", "ফেরত", "অভিযোগ", "সুরক্ষা"],
    "cyber": ["cyber", "online", "digital", "hacking", "privacy", "data", "social media", "সাইবার", "অনলাইন", "ডিজিটাল", "হ্যাকিং", "গোপনীয়তা", "ডেটা", "সোশ্যাল মিডিয়া"]
  };

  for (const [law, keywords] of Object.entries(lawKeywords)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      return knowledgeStore[law];
    }
  }

  return null;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", content: generalResponses.greeting.en + "\n\n" + generalResponses.greeting.bn, language: "en" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const lang = detectLanguage(input);
    const userMessage: Message = {
      id: messages.length,
      role: "user",
      content: input,
      language: lang
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowEscalation(false);

    setTimeout(() => {
      const answer = findRelevantAnswer(input);
      let response: string;
      let responseLang: "en" | "bn";

      if (answer) {
        response = lang === "bn" ? answer.bn : answer.en;
        responseLang = lang;
        if (Math.random() > 0.7) {
          setShowEscalation(true);
        }
      } else if (lowerMatches(input, ["help", "can you", "what can", "how", "সাহায্য", "কি করতে পার"])) {
        response = lang === "bn" ? generalResponses.help.bn : generalResponses.help.en;
        responseLang = lang;
      } else {
        response = lang === "bn" ? generalResponses.not_understood.bn : generalResponses.not_understood.en;
        responseLang = lang;
      }

      const assistantMessage: Message = {
        id: messages.length + 1,
        role: "assistant",
        content: response,
        language: responseLang
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 800);
  };

  const lowerMatches = (text: string, keywords: string[]): boolean => {
    const lower = text.toLowerCase();
    return keywords.some(k => lower.includes(k));
  };

  const handleVoice = () => {
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

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-amber-500/30 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">JesAI</h1>
              <p className="text-xs text-amber-400">Law & Order Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live
            </span>
            <span className="text-xs text-slate-400">500+ Q&A</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 h-[calc(100vh-220px)] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                      : "bg-slate-700/80 text-slate-100 border border-slate-600"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {showEscalation && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-red-900/30 border border-red-500/30 text-red-200">
                  <p className="text-sm">{generalResponses.escalation.en}</p>
                  <button className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
                    Contact Supreme Court Advocate
                  </button>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-700 bg-slate-800/50 rounded-b-2xl">
            <div className="flex items-center gap-3">
              <button
                onClick={handleVoice}
                className={`p-3 rounded-full transition-all ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your legal question in English or Bengali..."
                className="flex-1 bg-slate-700 text-white placeholder-slate-400 rounded-xl px-4 py-3 focus outline-none focus:ring-2 focus:ring-amber-500 border border-slate-600"
              />
              <button
                onClick={handleSend}
                className="p-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3">
              <span className="text-xs text-slate-500">
                Available: Property | Criminal | Family | Labour | Constitutional | Consumer | Cyber
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
