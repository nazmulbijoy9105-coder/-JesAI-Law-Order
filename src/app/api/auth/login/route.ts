import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Simple password check (in production, use bcrypt)
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Account is disabled" }, { status: 403 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
