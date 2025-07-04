import IssueStatusBatch from "@/app/components/IssueStatusBatch";
import { Heading, Flex, Card } from "@radix-ui/themes";
import Markdown from "react-markdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueLoading = () => {
  return (
    <div className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose">
        <Skeleton count={3} />
      </Card>
      <p>
        <Skeleton width="5rem" />
      </p>
    </div>
  );
};
export default IssueLoading;
