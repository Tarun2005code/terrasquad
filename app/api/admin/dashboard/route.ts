import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/admin/dashboard";

export async function GET() {
  try {
    const dashboard = await getDashboardData();

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load dashboard data",
      },
      {
        status: 500,
      }
    );
  }
}