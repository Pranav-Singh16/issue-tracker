import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";
import { Metadata } from "next";
import { cache } from "react";

// Use the `cache` function to memoize the query result.
const fetchIssue = cache(async (issueId: number) => {
  return await prisma.issue.findUnique({
    where: { id: issueId },
  });
});

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  // Get the issue ID from the URL params.
  const issueId = parseInt(params.id, 10);
  if (isNaN(issueId)) return notFound();

  // Fetch the issue using the cached function.
  const issue = await fetchIssue(issueId);

  if (!issue) return notFound();

  return (
    <Grid
      columns={{ initial: "1", sm: "5" }}
      className="gap-y-4 md:gap-y-0 md:gap-x-6"
    >
      <Box className="col-span-4 mb-4 md:mb-0">
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Flex direction="column" gap="2" className="w-full">
          <Box className="w-full">
            <AssigneeSelect issue={issue} />
          </Box>
          <Box className="w-full">
            <EditIssueButton issueId={issueId} />
          </Box>
          <Box className="w-full">
            <DeleteIssueButton issueId={issueId} />
          </Box>
        </Flex>
      )}
    </Grid>
  );
};

// Metadata generation using the cached issue data
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issueId = parseInt(params.id, 10);
  if (isNaN(issueId)) {
    return {
      title: "Issue not found",
      description: "The issue you are looking for does not exist.",
    };
  }

  // Fetch the issue using the cached function.
  const issue = await fetchIssue(issueId);

  if (!issue) {
    return {
      title: "Issue not found",
      description: "The issue you are looking for does not exist.",
    };
  }

  return {
    title: issue.title,
    description: "Details of issue " + issue.id,
  };
}

export default IssueDetailPage;
