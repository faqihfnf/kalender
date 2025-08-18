"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema } from "@/schema/events";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { createEvent, updateEvent } from "@/utils/events";

export default function EventForm({
  event,
}: {
  event?: {
    id: string;
    name: string;
    description?: string;
    durationInMinutes: number;
    isActive: boolean;
  };
}) {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event ?? {
      name: "",
      isActive: true,
      durationInMinutes: 30,
    },
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const action =
      event == null ? createEvent : updateEvent.bind(null, event.id);
    const data = await action(values);

    if (data?.error) {
      form.setError("root", { message: "Error creating event" });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {form.formState.errors.root && (
          <p className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </p>
        )}
        {/* Event Name Input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Event Name" {...field} />
              </FormControl>
              <FormDescription>
                The name users will see when they join the event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration Input */}
        <FormField
          control={form.control}
          name="durationInMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Duration of the event"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>In minutes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration Input */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="h-32 resize-none" {...field} />
              </FormControl>
              <FormDescription>
                Description is optional for the event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* isActive Input */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer"
                  />
                </FormControl>
              </div>
              <FormDescription>
                Inactive events will not be visible for user to join
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button asChild variant={"outline"}>
            <Link href="/events">Cancel</Link>
          </Button>
          <Button variant={"primary"} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
