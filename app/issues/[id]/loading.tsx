import { Heading, Flex, Card } from "@radix-ui/themes";
import { Skeleton } from "@/app/components/index";

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
