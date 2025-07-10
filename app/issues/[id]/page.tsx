import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const { id: id } = await params;
  const issueId = parseInt(id, 10);
  if (isNaN(issueId)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

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
            <AssigneeSelect />
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
export default IssueDetailPage;
