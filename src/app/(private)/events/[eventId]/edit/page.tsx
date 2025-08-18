import EventForm from "@/components/forms/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

export default async function EditEventPage({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  const { userId } = await auth();

  if (!userId || userId == null) {
    return <RedirectToSignIn />;
  }
  const event = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) =>
      and(eq(clerkUserId, userId), eq(id, eventId)),
  });

  if (event == null) return notFound();

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm
          event={{ ...event, description: event.description || undefined }}
        />
      </CardContent>
    </Card>
  );
}
