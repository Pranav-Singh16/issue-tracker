import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import delay from "delay";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBatch from "@/app/components/IssueStatusBatch";

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
      <Heading>{issue.title}</Heading>
      <Flex gap="3">
        <IssueStatusBatch status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
      <p>{issue.updatedAt.toDateString()}</p>
    </div>
  );
};
export default IssueDetailPage;
