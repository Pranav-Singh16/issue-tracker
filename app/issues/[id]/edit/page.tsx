import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssue = async ({ params }: Props) => {
  const { id: id } = await params;
  const issueId = parseInt(id, 10);
  if (isNaN(issueId)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) return notFound();
  console.log(issue);
  return <IssueForm issue={issue} />;
};
export default EditIssue;
