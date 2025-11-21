import { ProjectIntake } from "@/types/projects";
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

export function serializeProjectDoc(doc: FirestoreDoc): ProjectIntake {
  const data = doc.data() ?? {};
  const createdAt = toIsoString(data.createdAt, new Date().toISOString());
  const updatedAt = toIsoString(data.updatedAt, createdAt);

  return {
    id: doc.id,
    serviceType: data.serviceType,
    budget: data.budget,
    name: data.name,
    email: data.email,
    details: data.details ?? "",
    status: data.status ?? "New intake",
    stage: data.stage ?? "Intake",
    createdAt,
    updatedAt,
    source: data.source ?? "start-project",
  } as ProjectIntake;
}
