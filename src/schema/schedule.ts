import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constant";
import { timeToInt } from "@/lib/utils";
import { z } from "zod";

export const scheduleFormSchema = z.object({
  timezone: z.string().min(1, "Required"),
  availabilities: z
    .array(
      z
        .object({
          dayOfWeek: z.enum(DAYS_OF_WEEK_IN_ORDER),
          startTime: z
            .string()
            .regex(
              /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
              "Time must be in the format HH:MM",
            ),
          endTime: z
            .string()
            .regex(
              /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
              "Time must be in the format HH:MM",
            ),
        })
        .refine(
          (data) => {
            return timeToInt(data.startTime) < timeToInt(data.endTime);
          },
          {
            message: "End time must be after start time",
            path: ["endTime"],
          },
        ),
    )
    .superRefine((availabilities, ctx) => {
      // Early return if no availabilities
      if (availabilities.length <= 1) return;

      // Group by day first to reduce iterations
      const byDay = new Map<
        string,
        Array<{ index: number; start: number; end: number }>
      >();

      availabilities.forEach((availability, index) => {
        const day = availability.dayOfWeek;
        const start = timeToInt(availability.startTime);
        const end = timeToInt(availability.endTime);

        if (!byDay.has(day)) {
          byDay.set(day, []);
        }
        byDay.get(day)!.push({ index, start, end });
      });

      // Check overlaps only within same day
      byDay.forEach((daySlots) => {
        if (daySlots.length <= 1) return;

        // Sort by start time for efficient overlap detection
        daySlots.sort((a, b) => a.start - b.start);

        for (let i = 0; i < daySlots.length - 1; i++) {
          const current = daySlots[i];
          const next = daySlots[i + 1];

          // If current end > next start, there's overlap
          if (current.end > next.start) {
            ctx.addIssue({
              code: "custom",
              message: "Time slots cannot overlap",
              path: [current.index, "root"],
            });
            ctx.addIssue({
              code: "custom",
              message: "Time slots cannot overlap",
              path: [next.index, "root"],
            });
          }
        }
      });
    }),
});
