import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { serializeProjectDoc } from "@/lib/projectSerializer";
import { ProjectIntake } from "@/types/projects";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing project id" }, { status: 400 });
  }

  try {
    const payload = (await request.json()) as Partial<Pick<ProjectIntake, "status" | "stage" | "details" >>;
    const updates: Record<string, string> = {};

    if (payload.status && payload.status.trim()) {
      updates.status = payload.status.trim();
    }

    if (payload.stage && payload.stage.trim()) {
      updates.stage = payload.stage.trim();
    }

    if (typeof payload.details === "string") {
      updates.details = payload.details.trim();
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const docRef = adminDb.collection("projectIntakes").doc(id);
    await docRef.update({ ...updates, updatedAt: new Date().toISOString() });
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project: serializeProjectDoc(snapshot) });
  } catch (error) {
    console.error(`PATCH /api/projects/${id}`, error);
    return NextResponse.json({ error: "Unable to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing project id" }, { status: 400 });
  }

  try {
    const docRef = adminDb.collection("projectIntakes").doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await docRef.delete();
    return NextResponse.json({ project: serializeProjectDoc(snapshot) });
  } catch (error) {
    console.error(`DELETE /api/projects/${id}`, error);
    return NextResponse.json({ error: "Unable to delete project" }, { status: 500 });
  }
}
