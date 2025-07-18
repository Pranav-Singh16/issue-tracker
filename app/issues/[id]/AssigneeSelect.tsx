"use client";

import { Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import { Skeleton } from "@/app/components";
import { Issue } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const assignIssue = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedtoUserId: userId === "unassigned" ? null : userId,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };

  if (error) return null;
  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedtoUserId ?? "unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." style={{ width: "100%" }} />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                <Flex align="center" gap="2">
                  <img
                    src={String(user.image)}
                    alt={String(user.name)}
                    style={{ width: 24, height: 24, borderRadius: "50%" }}
                  />
                  <span>{user.name}</span>
                </Flex>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
