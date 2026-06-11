import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars not configured");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "").trim();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Verify caller is an admin
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { data: profile } = await supabaseAdmin
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();
    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { record_id, approved } = (await req.json()) as {
      record_id: string;
      approved: boolean;
    };
    if (!record_id || typeof approved !== "boolean") {
      return NextResponse.json({ error: "record_id and approved are required" }, { status: 400 });
    }

    const status = approved ? "verified" : "rejected";
    const { data: record, error: updateError } = await supabaseAdmin
      .from("payment_records")
      .update({ status })
      .eq("id", record_id)
      .select("user_id, tier")
      .single();

    if (updateError || !record) {
      return NextResponse.json({ error: "Failed to update payment record" }, { status: 500 });
    }

    if (approved) {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);
      await supabaseAdmin
        .from("users")
        .update({
          is_paid: true,
          tier: record.tier,
          tier_expires_at: expiresAt.toISOString(),
        })
        .eq("id", record.user_id);
    }

    return NextResponse.json({ success: true, status });
  } catch (err: unknown) {
    console.error("verify-payment error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
