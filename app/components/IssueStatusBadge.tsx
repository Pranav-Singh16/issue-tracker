import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const issueBatchMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
  OPEN: { label: "Open", color: "red" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={issueBatchMap[status].color}>
      {issueBatchMap[status].label}
    </Badge>
  );
};
export default IssueStatusBadge;
