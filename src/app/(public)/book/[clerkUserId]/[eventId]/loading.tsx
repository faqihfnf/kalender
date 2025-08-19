import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
      <div className="text-muted-foreground text-center text-3xl font-bold">
        Loading...
      </div>
      <LoaderCircle className="text-muted-foreground size-24 animate-spin" />
    </div>
  );
}
