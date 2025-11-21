import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { serializeMessageDoc } from "@/lib/messageSerializer";
import { CreateMessagePayload, Message } from "@/types/messages";

function validatePayload(payload: Partial<CreateMessagePayload>) {
  const errors: Record<string, string> = {};

  if (!payload.body || !payload.body.trim()) {
    errors.body = "Message cannot be empty";
  }

  if (!payload.sender || !payload.sender.trim()) {
    errors.sender = "Sender is required";
  }

  if (!payload.senderType || !["client", "team"].includes(payload.senderType)) {
    errors.senderType = "Invalid sender type";
  }

  return errors;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    let query = adminDb.collection("messages").orderBy("createdAt", "desc").limit(100);

    if (projectId) {
      query = query.where("projectId", "==", projectId);
    }

    const snapshot = await query.get();
    const messages: Message[] = snapshot.docs.map(serializeMessageDoc);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("GET /api/messages", error);
    return NextResponse.json({ error: "Unable to load messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<CreateMessagePayload>;
    const errors = validatePayload(payload);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const now = new Date().toISOString();
    const messageInput = {
      projectId: payload.projectId ?? null,
      sender: payload.sender!.trim(),
      senderType: payload.senderType!,
      body: payload.body!.trim(),
      attachments: Array.isArray(payload.attachments) ? payload.attachments : [],
      createdAt: now,
    } satisfies Omit<Message, "id">;

    const docRef = await adminDb.collection("messages").add(messageInput);
    const snapshot = await docRef.get();

    return NextResponse.json({ message: serializeMessageDoc(snapshot) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/messages", error);
    return NextResponse.json({ error: "Unable to send message" }, { status: 500 });
  }
}
