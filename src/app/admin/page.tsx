"use client";

import { useState, useEffect } from "react";
import { Scale, Menu, X, Users, CreditCard, FileText, DollarSign, TrendingUp, Settings } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const stats: Stat[] = [
    { label: "Total Users", value: "1,234", icon: "Users", color: "blue" },
    { label: "Active Subscriptions", value: "456", icon: "CreditCard", color: "green" },
    { label: "Total Queries", value: "8,901", icon: "FileText", color: "purple" },
    { label: "Revenue (BDT)", value: "৳2.4L", icon: "DollarSign", color: "amber" },
  ];

  const recentUsers: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", createdAt: new Date() },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", createdAt: new Date() },
    { id: 3, name: "Admin User", email: "admin@jesai.com", role: "admin", createdAt: new Date() },
  ];

  const pendingPayments = [
    { id: 1, user: "John Doe", method: "bKash", amount: 499, date: "2026-03-15" },
    { id: 2, user: "Jane Smith", method: "Nagad", amount: 2499, date: "2026-03-14" },
  ];

  const menuItems = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "users", label: "Users", icon: Users },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "services", label: "Services", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Users": return <Users size={24} />;
      case "CreditCard": return <CreditCard size={24} />;
      case "FileText": return <FileText size={24} />;
      case "DollarSign": return <DollarSign size={24} />;
      default: return <Scale size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-800 rounded-lg">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Scale size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">JesAI Admin</h1>
                <p className="text-xs text-amber-400">Management Console</p>
              </div>
            </div>
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
              <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${stat.color}-100 text-${stat.color}-600`}>
                      {getIcon(stat.icon)}
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-slate-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Users */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Recent Users</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Role</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-slate-100">
                          <td className="py-3 px-4 text-slate-900">{user.name}</td>
                          <td className="py-3 px-4 text-slate-600">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{user.createdAt.toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Pending Payments</h2>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                {pendingPayments.length > 0 ? (
                  <div className="space-y-4">
                    {pendingPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <div className="font-medium text-slate-900">{payment.user}</div>
                          <div className="text-sm text-slate-500">{payment.method} • {payment.date}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900">৳{payment.amount}</span>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Verify
                          </button>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">No pending payments</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <div className="text-center py-8 text-slate-500">User list will appear here</div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Service Management</h2>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <div className="text-center py-8 text-slate-500">Service management will appear here</div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
