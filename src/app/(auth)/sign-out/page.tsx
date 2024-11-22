"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const LogOut = () => {
  const { signOut } = useClerk();
  const { isSignedIn } = useUser();

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
      {isSignedIn ? (
        <Button onClick={() => signOut({ redirectUrl: "/" })}>Sign out</Button>
      ) : (
        <Link href="/sign-in" className={`${buttonVariants()}`}>
          Sign in
        </Link>
      )}
    </div>
  );
};

export default LogOut;
