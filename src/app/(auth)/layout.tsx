import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const userId = auth();

  //   if (userId != null) {
  //     redirect("/");
  //   }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {children}
    </div>
  );
}
