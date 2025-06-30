"use client";

import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

// 👇 dynamically import SimpleMDE
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssue;

// "use client";

// import { Button, TextField } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";

// const newIssue = () => {
//   return (
//     <div className="max-w-xl space-y-5">
//       <TextField.Root placeholder="Title" />

//       <SimpleMDE placeholder="Description" />
//       <Button>Submit</Button>
//     </div>
//   );
// };
// export default newIssue;
