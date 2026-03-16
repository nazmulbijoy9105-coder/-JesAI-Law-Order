"use client";

import { useState, useEffect } from "react";
import { Scale, Menu, X, LogOut, User, CreditCard, History, Settings } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User>({ id: 1, name: "John Doe", email: "john@example.com", role: "user" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Overview", icon: Scale },
    { id: "profile", label: "My Profile", icon: User },
    { id: "subscription", label: "My Plan", icon: CreditCard },
    { id: "history", label: "Query History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Scale size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">JesAI</h1>
                <p className="text-xs text-blue-600">Dashboard</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:block">{user.name}</span>
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <LogOut size={20} className="text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static w-64 min-h-screen bg-white border-r border-slate-200 z-20 transition-transform`}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Welcome back, {user.name}!</h2>
              
              {/* Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <div className="text-3xl font-bold text-blue-600">0</div>
                  <div className="text-slate-600">Queries This Month</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <div className="text-3xl font-bold text-green-600">Free</div>
                  <div className="text-slate-600">Current Plan</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <div className="text-3xl font-bold text-amber-600">0</div>
                  <div className="text-slate-600">Days Until Renewal</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button className="p-4 bg-blue-50 rounded-xl text-left hover:bg-blue-100 transition-colors">
                    <div className="font-medium text-blue-700">Ask New Question</div>
                    <div className="text-sm text-blue-600">Get legal guidance</div>
                  </button>
                  <button onClick={() => window.location.href = '/services'} className="p-4 bg-amber-50 rounded-xl text-left hover:bg-amber-100 transition-colors">
                    <div className="font-medium text-amber-700">Upgrade Plan</div>
                    <div className="text-sm text-amber-600">Unlock premium features</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">My Subscription</h2>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Free Plan</div>
                    <div className="text-slate-500">Basic legal information</div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-slate-600">✓ 7 Law Categories</li>
                  <li className="flex items-center gap-2 text-slate-600">✓ Basic Q&A</li>
                  <li className="flex items-center gap-2 text-slate-400">✗ Detailed Answers</li>
                  <li className="flex items-center gap-2 text-slate-400">✗ Expert Consultation</li>
                </ul>
                <button onClick={() => window.location.href = '/services'} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800">
                  Upgrade Now
                </button>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Query History</h2>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center py-12">
                <History size={48} className="mx-auto text-slate-300 mb-4" />
                <div className="text-slate-600">No queries yet. Start a conversation!</div>
                <button onClick={() => window.location.href = '/'} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Ask Question
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
