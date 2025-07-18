"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const statuses: { label: string; value: Status | string }[] = [
  { label: "All", value: "ALL" }, // Set "ALL" for the UI
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.value} // Unique key for each item
            value={status.value} // Use valid non-empty values
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
