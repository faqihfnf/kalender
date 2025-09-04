import BookingCard from "@/components/section/BookingCard";

import { db } from "@/drizzle/db";
import { clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ clerkUserId: string }>;
}) {
  // Await the params Promise
  const { clerkUserId } = await params;

  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId: userIdCol, isActive }, { eq, and }) =>
      and(eq(userIdCol, clerkUserId), eq(isActive, true)),
    orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
  });

  if (events.length === 0) return notFound();

  const { fullName } = await (await clerkClient()).users.getUser(clerkUserId);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 text-center text-4xl font-semibold md:text-5xl">
        {fullName}
      </div>
      <div className="text-muted-foreground mx-auto mb-6 max-w-sm text-center">
        Welome to my scheduling page. Please follow the instructions to add an
        event to my calendar
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
        {events.map((event) => (
          <BookingCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
