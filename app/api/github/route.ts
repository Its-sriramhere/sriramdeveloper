import { NextResponse } from "next/server";

export async function GET() {
  // Profile-verified snapshot (Its-sriramhere, Sep 2026). Wire GITHUB_TOKEN for live data.
  return NextResponse.json(
    {
      mock: true,
      username: "Its-sriramhere",
      repos: 8,
      followers: 1,
      featured: [
        "Sriram-portfolio",
        "chesswareneuro",
        "Chessbishop-Expense",
        "Fitness-Tracker",
        "Sriram-efx",
        "portfolio1",
      ],
    },
    { status: 200 }
  );
}
