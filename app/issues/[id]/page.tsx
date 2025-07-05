import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Button, Card, Flex, Heading, Text, Box, Grid } from "@radix-ui/themes";
import { IssueStatusBatch } from "@/app/components/index";
import Markdown from "react-markdown";
import Link from "next/link";
import { Edit } from "@/app/icons/index";

// interface props {
//   params: { id: string };
// }

// const IssueDetailPage = async ({ params }: props) => {
//   const issueId = parseInt( params.id, 10);

//   if (isNaN(issueId)) notFound();
//   const issue = await prisma.issue.findUnique({
//     where: {
//       id: issueId,
//     },
//   });
//   if (!issue) notFound();

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id: id } = await params;
  const issueId = parseInt(id, 10);
  if (isNaN(issueId)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) return notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Box>
        <div>
          <Heading>{issue.title}</Heading>
          <Flex gap="3">
            <IssueStatusBatch status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className="prose">
            <Markdown>{issue.description}</Markdown>
          </Card>
          <p>{issue.updatedAt.toDateString()}</p>
        </div>
      </Box>
      <Box>
        <Button>
          <Edit />
          <Link href={`issues/${issueId}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};
export default IssueDetailPage;
