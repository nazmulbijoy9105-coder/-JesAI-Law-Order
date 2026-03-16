"use client";

import { useState } from "react";
import { Scale, ArrowLeft, Check, Crown, Zap, Shield } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Basic Legal Info",
    titleBn: "মৌলিক আইনি তথ্য",
    description: "General information about Bangladesh laws - Property, Criminal, Family, Labour, Constitutional, Consumer, Cyber",
    descriptionBn: "বাংলাদেশের আইন সম্পর্কে সাধারণ তথ্য - সম্পত্তি, ফৌজদারি, পরিবার, শ্রম, সাংবিধানিক, ভোক্তা, সাইবার",
    category: "General",
    price: 0,
    isFree: true,
    icon: "Scale",
    features: ["7 Law Categories", "Basic Q&A", "Bilingual Support", "24/7 Available"]
  },
  {
    id: 2,
    title: "Premium Consultation",
    titleBn: "প্রিমিয়াম পরামর্শ",
    description: "Detailed legal guidance from verified sources with step-by-step procedures",
    descriptionBn: "যাচাইকৃত উৎস থেকে বিস্তারিত আইনি পদ্ধতি নির্দেশনা",
    category: "Premium",
    price: 499,
    isFree: false,
    isPopular: true,
    icon: "Crown",
    features: ["Detailed Answers", "Step-by-Step Guide", "Legal References", "Priority Support", "Document Templates"]
  },
  {
    id: 3,
    title: "Expert Advisory",
    titleBn: "বিশেষজ্ঞ পরামর্শ",
    description: "Connect with licensed Supreme Court Advocates for personalized legal advice",
    descriptionBn: "ব্যক্তিগত আইনি পরামর্শের জন্য লাইসেন্সধারী সুপ্রিম কোর্ট অ্যাডভোকেটদের সাথে যোগাযোগ",
    category: "Expert",
    price: 2499,
    isFree: false,
    icon: "Shield",
    features: ["Advocate Consultation", "Case Review", "Legal Strategy", "Court Representation", "Document Drafting"]
  },
  {
    id: 4,
    title: "Corporate Package",
    titleBn: "কর্পোরেট প্যাকেজ",
    description: "Complete legal solution for businesses - contracts, compliance, IP protection",
    descriptionBn: "ব্যবসার জন্য সম্পূর্ণ আইনি সমাধান - চুক্তি, কমপ্লায়েন্স, আইপি সুরক্ষা",
    category: "Business",
    price: 9999,
    isFree: false,
    icon: "Zap",
    features: ["Unlimited Consultations", "Contract Review", "Compliance Audit", "IP Protection", "Dedicated Manager", "24/7 Support"]
  }
];

const categoryColors: Record<string, string> = {
  General: "bg-blue-100 text-blue-700",
  Premium: "bg-amber-100 text-amber-700",
  Expert: "bg-purple-100 text-purple-700",
  Business: "bg-green-100 text-green-700"
};

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleSubscribe = (serviceId: number) => {
    setSelectedService(serviceId);
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-lg">
              <ArrowLeft size={20} className="text-slate-600" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Scale size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">JesAI Services</h1>
              <p className="text-xs text-blue-600">Choose Your Plan</p>
            </div>
          </div>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Legal Services for Everyone
          </h2>
          <p className="text-blue-100 text-lg">
            From basic information to expert advocacy - choose the service that fits your needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl border-2 p-6 transition-all ${
                service.isPopular 
                  ? "border-blue-500 shadow-xl scale-105" 
                  : "border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              }`}
            >
              {service.isPopular && (
                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full mb-4">
                  MOST POPULAR
                </span>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  service.isFree ? "bg-blue-100" : "bg-amber-100"
                }`}>
                  {service.isFree ? (
                    <Scale size={24} className="text-blue-600" />
                  ) : (
                    <Crown size={24} className="text-amber-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${categoryColors[service.category]}`}>
                    {service.category}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 mb-4">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check size={16} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between">
                <div>
                  {service.isFree ? (
                    <span className="text-3xl font-bold text-green-600">FREE</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-slate-900">৳{service.price}</span>
                      <span className="text-slate-500 text-sm">/month</span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => handleSubscribe(service.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                    service.isFree
                      ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      : service.isPopular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                >
                  {service.isFree ? "Get Started" : "Subscribe Now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        {showPayment && selectedService && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Complete Payment</h3>
              <p className="text-slate-600 mb-6">
                Service: {services.find(s => s.id === selectedService)?.title}
              </p>
              
              <div className="space-y-4">
                <button className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 transition-colors flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">b</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">bKash</div>
                    <div className="text-sm text-slate-500">Pay with bKash</div>
                  </div>
                </button>
                
                <button className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-orange-500 transition-colors flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">N</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">Nagad</div>
                    <div className="text-sm text-slate-500">Pay with Nagad</div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowPayment(false)}
                className="mt-4 w-full py-3 text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2026 JesAI Legal - Professional Legal Services for Bangladesh
          </p>
        </div>
      </footer>
    </div>
  );
}
