"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Project } from "@/types";

const RemoveProject = ({
  className,
  children,
  data,
}: {
  className: string;
  children: React.ReactNode;
  data: Project;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const response = await fetch("https://api.sandri.my.id/api/projects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the project");
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
  };

  return (
    <>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <Drawer
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <DrawerTrigger asChild>
          <Button className={className}>{children}</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-[300px]">
            <DrawerHeader>
              <DrawerTitle>
                Are you absolutely sure remove {data.title} ?
              </DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="grid grid-cols-2">
              <Button variant="noShadow" onClick={handleDelete}>
                Submit
              </Button>
              <DrawerClose asChild>
                <Button
                  className="bg-white text-text dark:bg-darkBg dark:text-darkText"
                  variant="noShadow"
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default RemoveProject;
