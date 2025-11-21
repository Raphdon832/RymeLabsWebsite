import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { email, secret } = await request.json();

    // Simple protection mechanism. In production, use a robust method or run this logic in a script.
    const ADMIN_SECRET = process.env.ADMIN_SECRET || "rymelabs-master-key";

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await adminAuth.getUserByEmail(email);
    
    // Update Firestore document instead of Custom Claims
    await adminDb.collection("users").doc(user.uid).set({ 
      role: "admin" 
    }, { merge: true });

    return NextResponse.json({ 
      message: `Successfully promoted ${email} to admin (Firestore).`,
      uid: user.uid 
    });
  } catch (error) {
    console.error("Promote error:", error);
    return NextResponse.json({ error: "Failed to promote user" }, { status: 500 });
  }
}
