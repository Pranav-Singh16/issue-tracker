"use client";

import { Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { Skeleton } from "@/app/components";

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return null;
  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." style={{ width: "100%" }} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              <Flex
                style={{
                  display: "flex",
                  flexDirection: "row", // Align children in a row
                  alignItems: "center", // Vertically center the content
                  gap: "8px", // Optional: Add space between image and name
                }}
              >
                <img
                  src={String(user.image)} // Ensure `user.image` is treated as a string URL
                  alt={String(user.name)} // Ensure `user.name` is treated as a string
                  style={{ width: 24, height: 24, borderRadius: "50%" }}
                />
                <span>{user.name}</span> {/* Display name next to image */}
              </Flex>
              {/* {user.name} */}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
