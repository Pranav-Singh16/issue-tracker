// app/issues/[id]/DeleteIssueButton.tsx
"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "@/app/components";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      // throw new Error();
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (err) {
      // Renamed 'error' to 'err' to resolve the ESLint warning
      setError(true);
      console.error("Error deleting issue:", err); // Added console.error to use 'err'
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            color="red"
            style={{ width: "100%" }}
            className="!w-full justify-center"
            disabled={isDeleting}
          >
            {/* <Edit /> */}
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
