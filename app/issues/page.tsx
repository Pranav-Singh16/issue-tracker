import { prisma } from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueTable, { columnNames } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{
    status?: Status;
    orderBy?: keyof Issue;
    order?: "asc" | "desc";
    page?: string;
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(params.status!) ? params.status : undefined;
  const where = { status };

  // Validate orderBy parameter
  const orderBy = columnNames.includes(params.orderBy!)
    ? params.orderBy
    : undefined;

  // Validate order parameter
  const order = params.order === "desc" ? "desc" : "asc";

  const page = parseInt(params.page || "1") || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy ? { [orderBy]: order } : { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  // Calculate total pages
  const totalPages = Math.ceil(issueCount / pageSize);

  // If current page is greater than total pages and there are issues, redirect to last page
  // If there are no issues at all, stay on page 1
  if (page > totalPages && totalPages > 0) {
    const { redirect } = await import("next/navigation");
    const redirectParams = new URLSearchParams();

    if (params.status) redirectParams.set("status", params.status);
    if (params.orderBy) redirectParams.set("orderBy", params.orderBy);
    if (params.order) redirectParams.set("order", params.order);
    redirectParams.set("page", totalPages.toString());

    redirect(`/issues?${redirectParams.toString()}`);
  }

  return (
    <div>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
