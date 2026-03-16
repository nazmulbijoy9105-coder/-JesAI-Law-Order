import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { name, email, phone, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password required" }, { status: 400 });
    }

    // Check if user exists
    const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Create user
    const [newUser] = await db.insert(users).values({
      name,
      email,
      phone: phone || null,
      password,
      role: "user",
      isActive: true,
    }).returning();

    return NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
