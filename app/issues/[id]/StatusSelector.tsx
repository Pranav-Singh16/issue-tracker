"use client";

import { Status } from "@prisma/client";
import { Select, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface StatusSelectorProps {
  issueId: number;
  currentStatus: Status;
}

const StatusSelector = ({ issueId, currentStatus }: StatusSelectorProps) => {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: Status) => {
    if (newStatus === status) return;

    setIsUpdating(true);

    try {
      const response = await fetch(`/api/issues/${issueId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setStatus(newStatus);
      router.refresh(); // Refresh the page to show updated data
    } catch (error) {
      console.error("Error updating status:", error);
      // Revert to previous status on error
      setStatus(status);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusLabel = (status: Status) => {
    switch (status) {
      case Status.OPEN:
        return "Open";
      case Status.IN_PROGRESS:
        return "In Progress";
      case Status.CLOSED:
        return "Closed";
      default:
        return status;
    }
  };

  return (
    <>
      <Select.Root
        value={status}
        onValueChange={(value: Status) => handleStatusChange(value)}
        disabled={isUpdating}
      >
        <Select.Trigger placeholder="Change status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            <Select.Item value={Status.OPEN}>
              {getStatusLabel(Status.OPEN)}
            </Select.Item>
            <Select.Item value={Status.IN_PROGRESS}>
              {getStatusLabel(Status.IN_PROGRESS)}
            </Select.Item>
            <Select.Item value={Status.CLOSED}>
              {getStatusLabel(Status.CLOSED)}
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      {isUpdating && (
        <Text size="2" color="gray">
          Updating...
        </Text>
      )}
    </>
  );
};

export default StatusSelector;
