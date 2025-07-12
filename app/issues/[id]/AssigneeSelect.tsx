"use client";

import { Flex, Select } from "@radix-ui/themes";
import axios from "axios";
import { User } from "next-auth";
import { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("/api/users");
        console.log(response.data); // Log the actual response data
        if (Array.isArray(response.data)) {
          setUsers(response.data); // Set users only if the data is an array
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." style={{ width: "100%" }} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

          {users.length > 0 ? (
            users.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {/* <Flex>
                  <img
                    src={String(user.image)} // Ensures `user.image` is treated as a string URL
                    alt={String(user.name)} // Ensures `user.name` is treated as a string
                    style={{ width: 24, height: 24, borderRadius: "50%" }}
                  />
                </Flex> */}
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
            ))
          ) : (
            <Select.Item disabled value="no-users">
              No users found
            </Select.Item>
          )}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
