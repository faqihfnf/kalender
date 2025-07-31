import { NavLink } from "@/components/section/Navlink";
import { UserButton } from "@clerk/nextjs";
import { CalendarRange } from "lucide-react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-card flex border-b py-2">
        <nav className="container flex items-center gap-5 p-2 text-sm font-medium">
          <div className="mr-auto flex items-center gap-2 font-semibold">
            <CalendarRange className="size-6" />
            <span className="sr-only container">Kalender</span>
          </div>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/schedule">Schedule</NavLink>

          <div className="ml-auto size-10 p-2">
            <UserButton appearance={{ elements: { avatarBox: "size-full" } }} />
          </div>
        </nav>
      </header>
      <main className="container mx-auto my-6 p-2">{children}</main>
    </>
  );
}
