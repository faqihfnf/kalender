import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  // const userId = auth();

  // if (userId != null) {
  //   redirect("/events");
  // }

  return (
    <div className="container mx-auto my-4 text-center">
      <h1>Landing Page</h1>
      <div className="flex justify-center gap-2">
        <Button>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <UserButton />
      </div>
    </div>
  );
}
