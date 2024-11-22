"use client";
import { Button } from "@/components/ui/button";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-4">
      <Image
        draggable={false}
        className="filter hue-rotate-180 hover:scale-105 transition-all w-auto h-auto"
        src="/logo.webp"
        alt="elvxk"
        width={175}
        height={50}
        priority
      />

      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start">
                <Clerk.Connection name="github" asChild>
                  <Button type="button" disabled={isGlobalLoading}>
                    <Clerk.Loading scope="provider:github">
                      {(isLoading) =>
                        isLoading ? (
                          "Loading..."
                        ) : (
                          <div className="flex gap-2 items-center">
                            <FaGithub /> Github
                          </div>
                        )
                      }
                    </Clerk.Loading>
                  </Button>
                </Clerk.Connection>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}
