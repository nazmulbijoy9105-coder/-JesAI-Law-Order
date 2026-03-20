import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Menu, X, ChevronRight, Scales, Zap, Shield } from 'lucide-react';

export default function LegalAIChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Corporate Law Questions', date: 'Today' },
    { id: 2, title: 'Labor Rights Guidance', date: 'Yesterday' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    {
      icon: Scales,
      title: 'Corporate Formation',
      description: 'Guide on registering a company'
    },
    {
      icon: Shield,
      title: 'Compliance Check',
      description: 'Verify regulatory requirements'
    },
    {
      icon: Zap,
      title: 'Contract Review',
      description: 'Legal document analysis'
    },
    {
      icon: Scales,
      title: 'Dispute Resolution',
      description: 'Settlement procedures'
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call with realistic latency
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `This is a demonstration response to: "${input.substring(0, 50)}..."\n\nIn a production environment, this would connect to your backend API (FastAPI/Flask/Node.js) to fetch actual legal guidance from your law database or LLM model.\n\nThe response would include:\n• Relevant legal precedents\n• Regulatory references\n• Step-by-step guidance\n• Risk assessments\n• Recommended next steps`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question.title);
  };

  const newChat = () => {
    setMessages([]);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative w-64 h-full bg-white border-r border-slate-200 z-40 transition-transform duration-300 ease-out flex flex-col shadow-lg lg:shadow-none`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200">
          <button
            onClick={newChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Conversations */}
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

        {/* Sidebar Footer */}
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
                <Scales size={20} className="text-white" />
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
              {/* Empty State */}
              <div className="text-center max-w-2xl mx-auto">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
                    <Scales size={32} className="text-blue-600" />
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                  Welcome to JesAI Legal
                </h2>
                <p className="text-slate-600 mb-8 text-base lg:text-lg">
                  Your intelligent legal advisor for corporate compliance, contracts, and regulations
                </p>

                {/* Suggested Questions Grid */}
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
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md lg:max-w-xl px-4 py-3 rounded-xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none shadow-md'
                        : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200'
                    }`}
                  >
                    <p className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                    <div className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fadeIn">
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
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about corporate law, compliance, contracts..."
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

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Merriweather:wght@300;400;700&display=swap');

        * {
          font-family: 'Outfit', sans-serif;
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        @media (max-width: 640px) {
          input::placeholder {
            font-size: 0.75rem;
          }
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.3);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.5);
        }
      `}</style>
    </div>
  );
}
