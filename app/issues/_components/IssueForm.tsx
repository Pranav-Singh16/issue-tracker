// Add "use client" at the top to mark this as a Client Component
"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/app/components/index";
import { Issue } from "@prisma/client";

// Dynamically import SimpleMDE for client-side rendering
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, // This ensures the component is only rendered on the client side
});

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue, // Get setValue from RHF
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  // Update form value for description when `issue` is available
  useEffect(() => {
    if (issue?.description) {
      setValue("description", issue.description); // Set the description value explicitly
    }
  }, [issue, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setSubmitting(true);
    try {
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-5" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              defaultValue={issue?.description} // This should work now
              placeholder="Description"
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit"} {isSubmitting && <Spinner />}{" "}
        </Button>
      </form>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssueForm;
