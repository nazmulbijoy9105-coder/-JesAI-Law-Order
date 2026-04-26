/**
 * JesAI Auth — Supabase
 * Guest + Paid Users + Admin
 */

import { createClient } from "@supabase/supabase-js"

// Uses empty string fallbacks at build time; env vars must be set at runtime.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key"
)

export type UserRole = "guest" | "user" | "admin"

export interface JesAIUser {
  id: string
  email: string
  role: UserRole
  is_paid: boolean
  tier: string
  tier_expires_at: string | null
  queries_today: number
  created_at: string
}

// ── SIGN UP ────────────────────────────────────────────────────────────────
export async function signUp(email: string, password: string, phone?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { phone, role: "user" }
    }
  })
  if (error) throw error

  // Insert into users table
  if (data.user) {
    await supabase.from("users").insert({
      id: data.user.id,
      email,
      phone: phone || null,
      role: "user",
      is_paid: false,
      tier: "free",
      queries_today: 0,
    })
  }

  return data
}

// ── SIGN IN ────────────────────────────────────────────────────────────────
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

// ── SIGN OUT ───────────────────────────────────────────────────────────────
export async function signOut() {
  await supabase.auth.signOut()
}

// ── GET CURRENT USER ───────────────────────────────────────────────────────
export async function getCurrentUser(): Promise<JesAIUser | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single()

  return profile || null
}

// ── IS ADMIN ───────────────────────────────────────────────────────────────
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === "admin"
}

// ── RESET PASSWORD ─────────────────────────────────────────────────────────
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  })
  if (error) throw error
}
