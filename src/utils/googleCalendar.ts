import "use-server";
import { clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";
import { addMinutes, endOfDay, startOfDay } from "date-fns";

export async function getCalendarEventTimes(
  clerkUserId: string,
  { start, end }: { start: Date; end: Date },
) {
  const oAuthClient = await getOAuthClient(clerkUserId);

  if (!oAuthClient) {
    throw new Error("Unable to authenticate with Google Calendar");
  }

  try {
    const events = await google.calendar("v3").events.list({
      calendarId: "primary",
      eventTypes: ["default"],
      singleEvents: true,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      maxResults: 2500,
      auth: oAuthClient,
    });

    return (
      events.data.items
        ?.map((event) => {
          if (event.start?.date != null && event.end?.date != null) {
            return {
              start: startOfDay(event.start.date),
              end: endOfDay(event.end.date),
            };
          }

          if (event.start?.dateTime != null && event.end?.dateTime != null) {
            return {
              start: new Date(event.start.dateTime),
              end: new Date(event.end.dateTime),
            };
          }
        })
        .filter((date) => date != null) || []
    );
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    throw new Error(
      "Failed to fetch calendar events. Please check your Google Calendar permissions.",
    );
  }
}

export async function createCalendarEvent({
  clerkUserId,
  guestName,
  guestEmail,
  startTime,
  guestNotes,
  durationInMinutes,
  eventName,
}: {
  clerkUserId: string;
  guestName: string;
  guestEmail: string;
  startTime: Date;
  guestNotes?: string | null;
  durationInMinutes: number;
  eventName: string;
}) {
  const oAuthClient = await getOAuthClient(clerkUserId);

  if (!oAuthClient) {
    throw new Error("Unable to authenticate with Google Calendar");
  }

  const calendarUser = await (await clerkClient()).users.getUser(clerkUserId);
  if (calendarUser.primaryEmailAddress == null) {
    throw new Error("Clerk user has no email");
  }

  try {
    const calendarEvent = await google.calendar("v3").events.insert({
      calendarId: "primary",
      auth: oAuthClient,
      sendUpdates: "all",
      requestBody: {
        attendees: [
          { email: guestEmail, displayName: guestName },
          {
            email: calendarUser.primaryEmailAddress.emailAddress,
            displayName: calendarUser.fullName,
            responseStatus: "accepted",
          },
        ],
        description: guestNotes
          ? `Additional Details: ${guestNotes}`
          : undefined,
        start: {
          dateTime: startTime.toISOString(),
        },
        end: {
          dateTime: addMinutes(startTime, durationInMinutes).toISOString(),
        },
        summary: `${guestName} + ${calendarUser.fullName}: ${eventName}`,
      },
    });

    return calendarEvent.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw new Error(
      "Failed to create calendar event. Please check your Google Calendar permissions.",
    );
  }
}

async function getOAuthClient(clerkUserId: string) {
  try {
    // Fixed: Remove 'oauth_' prefix from provider name
    const token = await (
      await clerkClient()
    ).users.getUserOauthAccessToken(clerkUserId, "google");

    if (token.data.length === 0 || token.data[0].token == null) {
      console.error("No OAuth token found for user");
      return null;
    }

    const client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT_URL,
    );

    client.setCredentials({ access_token: token.data[0].token });

    return client;
  } catch (error) {
    console.error("Error getting OAuth client:", error);
    return null;
  }
}
