import { Edit } from "@/app/icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button
      color="red"
      style={{ width: "100%" }}
      className="!w-full justify-center"
    >
      {/* <Edit /> */}
      Delete Issue
    </Button>
  );
};
export default EditIssueButton;
