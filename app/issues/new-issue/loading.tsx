import { Skeleton } from "@/app/components/index";

const IssueLoading = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </div>
  );
};
export default IssueLoading;
