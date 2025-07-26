import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text, Box } from "@radix-ui/themes";
import Markdown from "react-markdown";
import StatusSelector from "./StatusSelector"; // Import the StatusSelector component

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <Box>
      <Heading>{issue.title}</Heading>
      <Flex gap="5" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      {/* Status Selector Component */}
      <Flex gap="2" mt="4">
        <StatusSelector
          issueId={issue.id} // Pass the issueId to the StatusSelector
          currentStatus={issue.status} // Pass the current status
        />
      </Flex>

      <Card className="prose max-w-full" mt="4">
        <Markdown>{issue.description}</Markdown>
      </Card>
      {/* <p>{issue.updatedAt.toDateString()}</p> */}
    </Box>
  );
};

export default IssueDetails;

// import { IssueStatusBadge } from "@/app/components";
// import { Issue } from "@prisma/client";
// import { Heading, Flex, Card, Text, Box } from "@radix-ui/themes";
// import Markdown from "react-markdown";

// const IssueDetails = ({ issue }: { issue: Issue }) => {
//   return (
//     <Box>
//       <Heading>{issue.title}</Heading>
//       <Flex gap="5" my="2">
//         <IssueStatusBadge status={issue.status} />
//         <Text>{issue.createdAt.toDateString()}</Text>
//       </Flex>
//       <Card className="prose max-w-full" mt="4">
//         <Markdown>{issue.description}</Markdown>
//       </Card>
//       {/* <p>{issue.updatedAt.toDateString()}</p> */}
//     </Box>
//   );
// };
// export default IssueDetails;
