import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

type StageBucket = {
  label: string;
  value: number;
};

type TrendPoint = {
  date: string;
  submissions: number;
};

export async function GET() {
  try {
    const snapshot = await adminDb.collection("projectIntakes").get();
    const now = new Date();
    const stageBuckets: Record<string, number> = {};
    const trendMap: Record<string, number> = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const stage = data.stage ?? "Intake";
      stageBuckets[stage] = (stageBuckets[stage] ?? 0) + 1;

      const createdAt = data.createdAt
        ? new Date(data.createdAt)
        : new Date(doc.createTime.toDate());
      const key = createdAt.toISOString().slice(0, 10);
      trendMap[key] = (trendMap[key] ?? 0) + 1;
    });

    const stageBreakdown: StageBucket[] = Object.entries(stageBuckets).map(([label, value]) => ({
      label,
      value,
    }));

    const trend: TrendPoint[] = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (6 - index));
      const key = date.toISOString().slice(0, 10);
      return {
        date: key,
        submissions: trendMap[key] ?? 0,
      };
    });

    return NextResponse.json({
      totals: {
        totalIntakes: snapshot.size,
        activeStages: stageBreakdown.length,
      },
      stageBreakdown,
      weeklyTrend: trend,
    });
  } catch (error) {
    console.error("GET /api/analytics", error);
    return NextResponse.json({ error: "Unable to load analytics" }, { status: 500 });
  }
}
