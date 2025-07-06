import { Edit } from "@/app/icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button style={{ width: "100%" }} className="!w-full justify-center">
      <Edit />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};
export default EditIssueButton;
