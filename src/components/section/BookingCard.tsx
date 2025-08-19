import { formatEventDescription } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

type BookingCardProps = {
  id: string;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

export default function BookingCard({
  id,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: BookingCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description != null && <CardContent>{description}</CardContent>}
      <CardFooter className="mt-auto flex justify-end gap-2">
        <Button asChild>
          <Link href={`/book/${clerkUserId}/${id}`}>Select</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
