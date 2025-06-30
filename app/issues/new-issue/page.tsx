"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";

const newIssue = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit</Button>
    </div>
  );
};
export default newIssue;
