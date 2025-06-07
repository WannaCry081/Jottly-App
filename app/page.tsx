import React from "react";

// Components
import { UrlForm } from "@/components/url/UrlForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Icons
import { TriangleAlert, Unlink2 } from "lucide-react";

export default async function Page() {
  return (
    <React.Fragment>
      <header className="max-w-lg mx-auto">
        <div className="p-4 pt-8 lg:pt-14">
          <span className="inline-flex items-center gap-2 mb-2 md:mb-4">
            <div className="size-8 md:size-10 bg-primary rounded-sm grid place-items-center">
              <Unlink2 className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Jottly
            </h1>
          </span>
          <p className="text-sm text-muted-foreground">
            Transform your long URLs into short, shareable links in seconds.
            Track clicks, manage links, and boost your online presence.
          </p>
        </div>
      </header>
      <main className=" max-w-lg mx-auto">
        <div className="p-4 py-2 space-y-6">
          <UrlForm />

          <Alert variant="warning" className="shadow-sm">
            <TriangleAlert />
            <AlertTitle>Warning: This URL is temporary</AlertTitle>
            <AlertDescription className="text-sm">
              This shortened URL will expire in 30 days. Make sure to save or
              share it before then, as it cannot be extended at this time.
            </AlertDescription>
          </Alert>
        </div>
      </main>
      <footer className="text-center text-xs text-muted-foreground py-4 absolute bottom-0 flex items-center justify-center w-full">
        © 2025 WannaCry081
      </footer>
    </React.Fragment>
  );
}
