import { Message } from "@/types/messages";
import { DocumentSnapshot, QueryDocumentSnapshot } from "firebase-admin/firestore";

type FirestoreDoc =
  | DocumentSnapshot<FirebaseFirestore.DocumentData>
  | QueryDocumentSnapshot<FirebaseFirestore.DocumentData>;

function toIsoString(value: unknown, fallback: string) {
  if (typeof value === "string") return value;
  if (value && typeof (value as { toDate?: () => Date }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return fallback;
}

export function serializeMessageDoc(doc: FirestoreDoc): Message {
  const data = doc.data() ?? {};
  const createdAt = toIsoString(data.createdAt, new Date().toISOString());

  return {
    id: doc.id,
    projectId: data.projectId,
    sender: data.sender ?? "Unknown",
    senderType: data.senderType ?? "team",
    body: data.body ?? "",
    attachments: Array.isArray(data.attachments) ? data.attachments : [],
    createdAt,
    readAt: data.readAt ? toIsoString(data.readAt, createdAt) : undefined,
  } satisfies Message;
}
