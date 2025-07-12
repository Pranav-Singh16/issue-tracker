"use client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading"; // Import loading skeleton component

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  loading: () => <IssueFormSkeleton />, // Show skeleton loader while loading
});

const NewIssue = () => {
  return <IssueForm />; // Once the IssueForm is loaded, render it
};

export default NewIssue;

// "use client";
// import dynamic from "next/dynamic";
// import IssueFormSkeleton from "./loading";
// const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
//   loading: () => <IssueFormSkeleton />,
// });

// const NewIssue = () => {
//   return <IssueForm />;
// };

// export default NewIssue;
