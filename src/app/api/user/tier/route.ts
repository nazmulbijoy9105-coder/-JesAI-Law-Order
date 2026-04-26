// ─── Secure User Tier API ─────────────────────────────────────
// Returns the authenticated user's paid status, tier, and daily
// query usage from Supabase. Used by the chat client to determine
// whether to send isPaid=true to the chat API.
//
// Security: reads the Authorization header (Bearer <access_token>)
// and verifies it with Supabase on the server side — the client
// cannot forge isPaid by manipulating the request body.
//
// Also handles daily query counter increment.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const TIER_LIMITS: Record<string, number> = {
  free: 20,
  basic: 50,
  pro: 999,
  professional: 9999,
};

export async function GET(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "").trim();

  if (!token) {
    return NextResponse.json({ is_paid: false, tier: "free", queries_remaining: 20, error: "unauthenticated" });
  }

  // Verify token with Supabase
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ is_paid: false, tier: "free", queries_remaining: 20, error: "invalid_token" });
  }

  // Fetch user profile
  const { data: profile } = await supabaseAdmin
    .from("users")
    .select("is_paid, tier, tier_expires_at, queries_today")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ is_paid: false, tier: "free", queries_remaining: 20 });
  }

  // Check tier expiry
  let isPaid = profile.is_paid ?? false;
  let tier = profile.tier ?? "free";
  if (profile.tier_expires_at && new Date(profile.tier_expires_at) < new Date()) {
    isPaid = false;
    tier = "free";
    // Reset expired tier in DB (fire-and-forget)
    supabaseAdmin.from("users").update({ is_paid: false, tier: "free" }).eq("id", user.id);
  }

  const dailyLimit = TIER_LIMITS[tier] ?? 20;
  const used = profile.queries_today ?? 0;
  const queriesRemaining = Math.max(0, dailyLimit - used);

  return NextResponse.json({
    is_paid: isPaid,
    tier,
    queries_remaining: queriesRemaining,
    daily_limit: dailyLimit,
  });
}

// POST: increment query counter after a chat message
export async function POST(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "").trim();
  if (!token) return NextResponse.json({ ok: false });

  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  if (!user) return NextResponse.json({ ok: false });

  // Increment queries_today (also reset if last_query_date is different from today)
  const today = new Date().toISOString().split("T")[0];
  const { data: profile } = await supabaseAdmin
    .from("users")
    .select("queries_today, last_query_date")
    .eq("id", user.id)
    .single();

  if (profile) {
    const shouldReset = !profile.last_query_date || profile.last_query_date !== today;
    await supabaseAdmin
      .from("users")
      .update({
        queries_today: shouldReset ? 1 : (profile.queries_today ?? 0) + 1,
        last_query_date: today,
      })
      .eq("id", user.id);
  }

  return NextResponse.json({ ok: true });
}
