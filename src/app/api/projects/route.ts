import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { serializeProjectDoc } from "@/lib/projectSerializer";
import { CreateProjectPayload, ProjectIntake } from "@/types/projects";

function validatePayload(payload: Partial<CreateProjectPayload>) {
  const errors: Record<string, string> = {};

  if (!payload.serviceType || !payload.serviceType.trim()) {
    errors.serviceType = "Select what you want to build";
  }

  if (!payload.budget || !payload.budget.trim()) {
    errors.budget = "Select a budget range";
  }

  if (!payload.name || !payload.name.trim()) {
    errors.name = "Name is required";
  }

  if (!payload.email || !payload.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "Enter a valid email";
  }

  return errors;
}

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("projectIntakes")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    const projects: ProjectIntake[] = snapshot.docs.map(serializeProjectDoc);

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects", error);
    return NextResponse.json({ error: "Unable to load projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<CreateProjectPayload>;
    const errors = validatePayload(payload);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const now = new Date().toISOString();
    const projectInput = {
      serviceType: payload.serviceType!.trim(),
      budget: payload.budget!.trim(),
      name: payload.name!.trim(),
      email: payload.email!.trim(),
      details: payload.details?.trim() ?? "",
      status: "New intake",
      stage: "Intake",
      createdAt: now,
      updatedAt: now,
      source: "start-project",
    } satisfies Omit<ProjectIntake, "id">;

    const docRef = await adminDb.collection("projectIntakes").add(projectInput);
    const project: ProjectIntake = { ...projectInput, id: docRef.id };

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects", error);
    return NextResponse.json({ error: "Unable to submit project" }, { status: 500 });
  }
}
