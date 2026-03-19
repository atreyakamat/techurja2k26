import { NextResponse } from "next/server";
import { getFilteredEvents } from "@/lib/event-data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "all";
  const level = searchParams.get("level") ?? "all";

  const payload = getFilteredEvents(search, category, level);
  return NextResponse.json({ count: payload.length, events: payload });
}
