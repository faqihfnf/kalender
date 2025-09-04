import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

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
        <Button>
          <Link href="/events">Go To Events</Link>
        </Button>

        <UserButton />
      </div>
    </div>
  );
}
