import { NextResponse } from "next/server";
import { db } from "@/db";
import { payments, subscriptions, users, services } from "@/db/schema";
import { eq } from "drizzle-orm";

interface NagadPaymentRequest {
  userId: number;
  amount: number;
  serviceId: number;
  merchantInvoiceNumber: string;
  customerMsisdn: string;
}

export async function POST(request: Request) {
  try {
    const body: NagadPaymentRequest = await request.json();
    const { userId, amount, serviceId, merchantInvoiceNumber, customerMsisdn } = body;

    if (!userId || !amount || !serviceId || !merchantInvoiceNumber || !customerMsisdn) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const [service] = await db.select().from(services).where(eq(services.id, serviceId)).limit(1);
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    // TODO: Integrate Nagad API in production
    // const nagadResponse = await fetch('https://api.nagad.com.bd/api/dfs/check-out/initialize', {...});

    const [payment] = await db.insert(payments).values({
      userId,
      amount,
      method: "nagad",
      transactionId: merchantInvoiceNumber,
      status: "pending",
      notes: `Nagad payment from ${customerMsisdn}`,
    }).returning();

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    const [subscription] = await db.insert(subscriptions).values({
      userId,
      serviceId,
      status: "pending",
      paymentMethod: "nagad",
      transactionId: merchantInvoiceNumber,
      amount,
      expiresAt,
    }).returning();

    return NextResponse.json({
      success: true,
      payment: { id: payment.id, status: payment.status, transactionId: payment.transactionId },
      subscription: { id: subscription.id, status: subscription.status, expiresAt: subscription.expiresAt },
      message: "Payment initiated. Please complete the transaction.",
    });
  } catch (error) {
    console.error("Nagad payment error:", error);
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { transactionId, status } = body;

    await db.update(payments)
      .set({ 
        status: status === "success" ? "verified" : "rejected",
        verifiedAt: status === "success" ? new Date() : null,
      })
      .where(eq(payments.transactionId, transactionId));

    if (status === "success") {
      const [payment] = await db.select()
        .from(payments)
        .where(eq(payments.transactionId, transactionId))
        .limit(1);

      if (payment?.subscriptionId) {
        await db.update(subscriptions)
          .set({ status: "paid" })
          .where(eq(subscriptions.id, payment.subscriptionId));
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Nagad verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
