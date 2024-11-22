"use client";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const projectFormSchema = z.object({
  id: z.string(),
  title: z.string().min(3, { message: "Project title must be at least 3" }),
  desc: z.string().min(3, { message: "Description must be at least 3" }),
  stack: z.string().min(3, { message: "Stack must be at least 3" }),
  demo: z.string().url({ message: "Invalid url" }),
  image: z.string().url({ message: "Invalid url" }),
});

type ProjectFormSchema = z.infer<typeof projectFormSchema>;

const EditProject = ({
  className,
  children,
  data,
}: {
  className: string;
  children: React.ReactNode;
  data: Project;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      id: data.id,
      title: data.title,
      desc: data.desc,
      stack: data.stack,
      demo: data.demo,
      image: data.image,
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const router = useRouter();
  const onSubmit = handleSubmit(async (values, event) => {
    event?.preventDefault();
    try {
      const response = await fetch("https://api.sandri.my.id/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    } finally {
      setIsOpen(false);
      router.refresh();
    }
  });
  return (
    <>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className={className}>{children}</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[80vw] max-h-[80vh]  overflow-y-auto">
          <DialogHeader>
            <DialogTitle>EDIT PROJECT</DialogTitle>
            <DialogDescription>Edit your project</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={control}
                  name="desc"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={control}
                  name="stack"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Stacks</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={control}
                  name="demo"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Demo URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={control}
                  name="image"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProject;