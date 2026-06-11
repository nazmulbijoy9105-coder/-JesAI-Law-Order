import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are not configured");
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, phone } = body as {
      email?: string;
      password?: string;
      phone?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: { phone: phone ?? null, role: "user" },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data.user) {
      await supabaseAdmin.from("users").upsert(
        {
          id: data.user.id,
          email,
          phone: phone ?? null,
          role: "user",
          is_paid: false,
          tier: "free",
          queries_today: 0,
        },
        { onConflict: "id", ignoreDuplicates: true }
      );
    }

    return NextResponse.json(
      {
        message: "Account created. Check your email to confirm.",
        user: data.user
          ? { id: data.user.id, email: data.user.email }
          : null,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Register error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    const status = message.includes("environment variables") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
