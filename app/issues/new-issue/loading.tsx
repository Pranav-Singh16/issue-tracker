import Spinner from "@/app/components/Spinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueLoading = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </div>
  );
};
export default IssueLoading;
