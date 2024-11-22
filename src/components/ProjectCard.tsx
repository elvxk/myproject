import stackMap from "@/lib/stackMap";
import { Project } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import RemoveProject from "./RemoveProject";
import { IoMdOpen } from "react-icons/io";
import EditProject from "./EditProject";

interface Props extends Project {
  role: string;
}

const ProjectCard = ({ title, desc, image, demo, stack, id, role }: Props) => {
  const data = { title, desc, image, demo, stack, id };
  const stacks = stackMap({ stack });

  return (
    <Card className="w-full overflow-hidden flex flex-col group">
      <CardHeader className="flex-grow">
        <CardTitle>
          <Link
            href={demo}
            target="_blank"
            className="hover:underline hover:text-bg flex gap-2 items-start"
          >
            {title} <IoMdOpen className="text-sm" />
          </Link>
        </CardTitle>
        <CardDescription>{desc.slice(0, 100)}...</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="overflow-hidden rounded-lg">
          <Image
            draggable={false}
            src={image}
            alt={title}
            width={400}
            height={300}
            className="rounded-lg object-cover group-hover:scale-105 transition-all"
            priority
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2 mt-auto">
        <div className="flex gap-2 overflow-hidden mb-2">
          {stacks.map((s, i) => {
            return (
              <p key={i} className="text-xs">
                {s.icon}
              </p>
            );
          })}
        </div>
        {role === "admin" ? (
          <>
            <EditProject
              className={`${buttonVariants({ size: "sm", variant: "neutral" })} w-full`}
              data={data}
            >
              Edit
            </EditProject>
            <RemoveProject
              className={`${buttonVariants({ size: "sm" })} w-full`}
              data={data}
            >
              Remove
            </RemoveProject>
          </>
        ) : (
          <Link
            href={demo}
            target="_blank"
            className={`${buttonVariants({ size: "sm", variant: "neutral" })} w-full`}
          >
            Demo
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
export default ProjectCard;
