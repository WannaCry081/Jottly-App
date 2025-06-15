import Link from "next/link";
import { MoveLeft } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center h-screen bg-background p-4">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          404 | Page Not Found
        </h1>
        <p className="text-sm mb-6 text-muted-foreground max-w-md">
          The URL path you are looking for does not exist. Please try a
          different URL or go back to the home page.
        </p>
        <Link href="/" passHref>
          <Button variant="link">
            <MoveLeft /> Go back to Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
