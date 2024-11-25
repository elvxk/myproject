import AddProject from "@/components/AddProject";
import ProjectCard from "@/components/ProjectCard";
import { buttonVariants } from "@/components/ui/button";
import { Project } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  const res = await fetch("https://api.sandri.my.id/api/projects", {
    cache: "no-store",
  });
  const { data } = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-4 flex-col items-center justify-center min-h-screen">
        <Image
          draggable={false}
          className="filter hue-rotate-180 hover:scale-105 transition-all w-auto h-auto"
          src="/logo.webp"
          alt="elvxk"
          width={175}
          height={50}
          priority
        />
        {role === "admin" && (
          <AddProject
            className={`w-full font-bold text-xl ${buttonVariants({ size: "lg" })}`}
          >
            ADD NEW PROJECT
          </AddProject>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {data.map((project: Project) => {
            return (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                desc={project.desc}
                image={project.image}
                demo={project.demo}
                stack={project.stack}
                role={role as string}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-1 text-bg">
          <Link href={"/sign-in"}>elvxk</Link>
          <Link href={"/sign-out"}>@ {new Date().getFullYear()}</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
