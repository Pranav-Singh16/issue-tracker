// app/api/issues/[id]/route.ts
import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Removed the separate IssueContext interface.
// We will define the type directly in the function arguments.

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // Define params type directly here
) {
  const { id } = params;
  const issueId = parseInt(id, 10);

  if (isNaN(issueId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  return NextResponse.json(issue);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } } // Define params type directly here
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedtoUserId, title, description } = body;

  if (assignedtoUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedtoUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }, // Access id directly from params
  });
  if (!issue)
    return NextResponse.json({ error: "invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedtoUserId,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // Define params type directly here
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }, // Access id directly from params
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
