import { CopyEventButton } from "@/components/section/CopyEventButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { formatEventDescription } from "@/lib/formatters";
import { cn } from "@/lib/utils";
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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
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

type EventCardProps = {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col",
        !isActive && "border-secondary bg-slate-50",
      )}
    >
      <CardHeader className={cn(!isActive && "opacity-50")}>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description != null && (
        <CardContent className={cn(!isActive && "opacity-50")}>
          {description}
        </CardContent>
      )}
      <CardFooter className="mt-auto flex justify-end gap-2">
        {isActive && (
          <CopyEventButton
            className="cursor-pointer"
            variant={"outline"}
            eventId={id}
            clerkUserId={clerkUserId}
          />
        )}
        <Button asChild>
          <Link href={`/events/${id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
