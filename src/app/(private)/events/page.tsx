import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { RedirectToSignIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CalendarPlus, CalendarRange } from "lucide-react";

import Link from "next/link";

export default async function EventsPage() {
  const authResult = await auth();
  const userId = authResult?.userId;
  if (!userId) return <RedirectToSignIn />;
  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });
  return (
    <>
      <div className="flex items-baseline gap-4">
        <h1 className="mb-6 text-2xl font-semibold lg:text-3xl xl:text-4xl">
          Events
        </h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
          <Link href="/events/new">
            <CalendarPlus className="size-6" />
            New Event
          </Link>
        </Button>
      </div>
      {events.length > 0 ? (
        <h1>Event</h1>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CalendarRange className="mx-auto size-6" />
          You do not have any events. Create your first event to get started.
          <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
            <Link href="/events/new">
              <CalendarPlus className="size-6" />
              New Event
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
