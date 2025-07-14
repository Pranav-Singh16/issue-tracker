"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading"; // Assuming loading is in the same directory

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false, // Disable SSR for this component
  loading: () => <IssueFormSkeleton />, // Show loading skeleton while fetching issue data
});

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssue = ({ params }: Props) => {
  const [issue, setIssue] = useState<any>(null); // State to hold fetched issue
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching issue

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const { id } = await params;
        const response = await fetch(`/api/issues/${id}`);
        if (response.ok) {
          const data = await response.json();
          setIssue(data); // Store issue in state
        } else {
          notFound(); // Handle case when issue is not found
        }
      } catch (error) {
        console.error("Error fetching issue:", error);
        notFound(); // Handle any errors during fetching
      } finally {
        setLoading(false); // End loading once done
      }
    };

    fetchIssue();
  }, [params]);

  // If loading, show skeleton; if issue is not found, show 404
  if (loading) return <IssueFormSkeleton />;
  if (!issue) return <div>Issue not found</div>; // Handle missing issue

  // Once loaded, pass issue to the IssueForm
  return <IssueForm issue={issue} />;
};

export default EditIssue;
