// app/api/users/route.ts
import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(/* request: NextRequest */) {
  // 'request' is unused, so it's commented out.
  try {
    const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
