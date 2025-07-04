import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import delay from "delay";

interface props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: props) => {
  await delay(5000);

  const issueId = parseInt(params.id, 10);

  if (isNaN(issueId)) notFound();
  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });
  if (!issue) notFound();
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
      <p>{issue.updatedAt.toDateString()}</p>
    </div>
  );
};
export default IssueDetailPage;
