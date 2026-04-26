/**
 * JesAI Payment Integration
 * bKash + Nagad — Bangladesh Mobile Payment
 * Flips isPaid flag in Supabase on successful payment
 */

import { createClient } from "@supabase/supabase-js"

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-key"
  );
}

// ── TYPES ─────────────────────────────────────────────────────────────────────
export type PaymentTier = "basic" | "pro" | "professional"
export type PaymentMethod = "bkash" | "nagad"

export interface PaymentPlan {
  tier: PaymentTier
  price_bdt: number
  label_en: string
  label_bn: string
  queries_per_day: number
  features_en: string[]
  features_bn: string[]
  bkash_number: string
  nagad_number: string
}

export interface PaymentRecord {
  id?: string
  user_id: string
  tier: PaymentTier
  method: PaymentMethod
  amount: number
  transaction_id: string
  phone_number: string
  status: "pending" | "verified" | "rejected"
  created_at?: string
}

// ── PLANS ─────────────────────────────────────────────────────────────────────
export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    tier: "basic",
    price_bdt: 99,
    label_en: "Basic",
    label_bn: "বেসিক",
    queries_per_day: 50,
    bkash_number: process.env.NEXT_PUBLIC_BKASH_NUMBER || "01XXXXXXXXX",
    nagad_number: process.env.NEXT_PUBLIC_NAGAD_NUMBER || "01XXXXXXXXX",
    features_en: [
      "50 queries per day",
      "All 7 law modules",
      "Family law access",
      "Bangla + English",
      "Email support",
    ],
    features_bn: [
      "দৈনিক ৫০টি প্রশ্ন",
      "সকল ৭টি আইন মডিউল",
      "পারিবারিক আইন",
      "বাংলা + ইংরেজি",
      "ইমেইল সাপোর্ট",
    ],
  },
  {
    tier: "pro",
    price_bdt: 499,
    label_en: "Pro",
    label_bn: "প্রো",
    queries_per_day: 999,
    bkash_number: process.env.NEXT_PUBLIC_BKASH_NUMBER || "01XXXXXXXXX",
    nagad_number: process.env.NEXT_PUBLIC_NAGAD_NUMBER || "01XXXXXXXXX",
    features_en: [
      "Unlimited queries",
      "All 7 law modules",
      "Priority support",
      "Document analysis",
      "WhatsApp access",
    ],
    features_bn: [
      "সীমাহীন প্রশ্ন",
      "সকল ৭টি আইন মডিউল",
      "অগ্রাধিকার সাপোর্ট",
      "ডকুমেন্ট বিশ্লেষণ",
      "হোয়াটসঅ্যাপ সাপোর্ট",
    ],
  },
  {
    tier: "professional",
    price_bdt: 1999,
    label_en: "Professional",
    label_bn: "প্রফেশনাল",
    queries_per_day: 9999,
    bkash_number: process.env.NEXT_PUBLIC_BKASH_NUMBER || "01XXXXXXXXX",
    nagad_number: process.env.NEXT_PUBLIC_NAGAD_NUMBER || "01XXXXXXXXX",
    features_en: [
      "Unlimited queries",
      "Direct Advocate consultation",
      "Case strategy review",
      "Document drafting",
      "WhatsApp + Phone access",
    ],
    features_bn: [
      "সীমাহীন প্রশ্ন",
      "সরাসরি আইনজীবী পরামর্শ",
      "মামলার কৌশল পর্যালোচনা",
      "দলিল প্রস্তুত",
      "হোয়াটসঅ্যাপ + ফোন",
    ],
  },
]

// ── SUBMIT PAYMENT ────────────────────────────────────────────────────────────
export async function submitPayment(data: {
  user_id: string
  tier: PaymentTier
  method: PaymentMethod
  transaction_id: string
  phone_number: string
  amount: number
}): Promise<{ success: boolean; message: string; record_id?: string }> {

  // Validate transaction ID format
  if (!data.transaction_id || data.transaction_id.length < 6) {
    return { success: false, message: "Invalid transaction ID" }
  }

  const supabase = getSupabase();
  // Check for duplicate transaction
  const { data: existing } = await supabase
    .from("payment_records")
    .select("id")
    .eq("transaction_id", data.transaction_id)
    .single()

  if (existing) {
    return { success: false, message: "Transaction ID already used" }
  }

  // Insert payment record — status = pending (admin verifies)
  const { data: record, error } = await supabase
    .from("payment_records")
    .insert({
      user_id: data.user_id,
      tier: data.tier,
      method: data.method,
      transaction_id: data.transaction_id.trim().toUpperCase(),
      phone_number: data.phone_number,
      amount: data.amount,
      status: "pending",
    })
    .select()
    .single()

  if (error) {
    console.error("Payment insert error:", error)
    return { success: false, message: "Failed to save payment. Try again." }
  }

  return {
    success: true,
    message: "Payment submitted. Will be verified within 1-2 hours.",
    record_id: record.id,
  }
}

// ── VERIFY PAYMENT (Admin) ─────────────────────────────────────────────────
export async function verifyPayment(
  record_id: string,
  approved: boolean
): Promise<{ success: boolean }> {

  const supabase = getSupabase();
  const status = approved ? "verified" : "rejected"

  const { data: record, error } = await supabase
    .from("payment_records")
    .update({ status })
    .eq("id", record_id)
    .select("user_id, tier")
    .single()

  if (error || !record) return { success: false }

  if (approved) {
    // Flip isPaid and set tier in users table
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 1) // 1 month

    await supabase
      .from("users")
      .update({
        is_paid: true,
        tier: record.tier,
        tier_expires_at: expiresAt.toISOString(),
      })
      .eq("id", record.user_id)
  }

  return { success: true }
}

// ── CHECK USER TIER ────────────────────────────────────────────────────────
export async function getUserTier(user_id: string): Promise<{
  is_paid: boolean
  tier: string
  queries_remaining: number
  expires_at: string | null
}> {
  const supabase = getSupabase();
  const { data: user } = await supabase
    .from("users")
    .select("is_paid, tier, tier_expires_at, queries_today")
    .eq("id", user_id)
    .single()

  if (!user) return { is_paid: false, tier: "free", queries_remaining: 5, expires_at: null }

  // Check if tier expired
  if (user.tier_expires_at && new Date(user.tier_expires_at) < new Date()) {
    await supabase.from("users").update({ is_paid: false, tier: "free" }).eq("id", user_id)
    return { is_paid: false, tier: "free", queries_remaining: 5, expires_at: null }
  }

  const plan = PAYMENT_PLANS.find(p => p.tier === user.tier)
  const daily_limit = plan?.queries_per_day || 5
  const queries_remaining = Math.max(0, daily_limit - (user.queries_today || 0))

  return {
    is_paid: user.is_paid,
    tier: user.tier || "free",
    queries_remaining,
    expires_at: user.tier_expires_at,
  }
}
