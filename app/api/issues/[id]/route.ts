import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "@prisma/client"; // Import Prisma Status Enum

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
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
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  // Validate the request body using the schema
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedtoUserId, title, description, status } = body;

  // Validate if the provided status is valid
  if (status && !Object.values(Status).includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  if (assignedtoUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedtoUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  // Perform the update, including status if provided
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedtoUserId,
      // Update the status if it's provided in the request
      status: status ? status : issue.status, // Keep the current status if not updated
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}

// import authOptions from "@/app/auth/authOptions";
// import { patchIssueSchema } from "@/app/validationSchema";
// import { prisma } from "@/prisma/client";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";

// // app/api/issues/[id]/route.ts
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   const issueId = parseInt(id, 10);

//   if (isNaN(issueId)) {
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//   }

//   const issue = await prisma.issue.findUnique({
//     where: { id: issueId },
//   });

//   if (!issue) {
//     return NextResponse.json({ error: "Issue not found" }, { status: 404 });
//   }

//   return NextResponse.json(issue);
// }

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session) NextResponse.json({}, { status: 401 });

//   const body = await request.json();
//   const validation = patchIssueSchema.safeParse(body);
//   if (!validation.success)
//     return NextResponse.json(validation.error.format(), { status: 400 });

//   const { assignedtoUserId, title, description } = body;

//   if (assignedtoUserId) {
//     const user = await prisma.user.findUnique({
//       where: { id: assignedtoUserId },
//     });
//     if (!user)
//       return NextResponse.json({ error: "Invalied User" }, { status: 400 });
//   }
//   // if (body.assignedToUserId){
//   //   prisma.user.findUnique({
//   //     where:{
//   //       id: body.assignedToUserId,
//   //     }
//   //   })
//   // }
//   const issue = await prisma.issue.findUnique({
//     where: { id: parseInt(params.id) },
//   });
//   if (!issue)
//     return NextResponse.json({ error: "invalid issue" }, { status: 404 });

//   const updatedIssue = await prisma.issue.update({
//     where: { id: issue.id },
//     data: {
//       title,
//       description,
//       assignedtoUserId,
//     },
//   });
//   return NextResponse.json(updatedIssue);
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session) NextResponse.json({}, { status: 401 });
//   const issue = await prisma.issue.findUnique({
//     where: { id: parseInt(params.id) },
//   });

//   if (!issue)
//     return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

//   await prisma.issue.delete({
//     where: { id: issue.id },
//   });

//   return NextResponse.json({});
// }
