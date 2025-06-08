import React from "react";
import { Unlink2, MoveRight, Info, Github } from "lucide-react";

// Components
import { UrlForm } from "@/components/url/UrlForm";
import { UrlList } from "@/components/url/UrlList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export default async function Page() {
  return (
    <React.Fragment>
      <header className="max-w-xl mx-auto">
        <div className="p-4 pt-8 lg:pt-14">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <span className="inline-flex items-center gap-2">
              {/* Logo Icon */}
              <div className="size-8 md:size-10 bg-primary rounded-sm grid place-items-center">
                <Unlink2 className="text-white dark:text-black" />
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                Jottly
              </h1>
            </span>
            <span className="inline-flex items-center space-x-2">
              <Link
                href="https://github.com/WannaCry081/Jottly-App"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Jottly on GitHub"
              >
                <Button size="icon" variant="outline">
                  <Github aria-hidden="true" focusable="false" />
                </Button>
              </Link>
              <ModeToggle />
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            Transform your long URLs into short, shareable links in seconds.
            Track clicks, manage links, and boost your online presence.
          </p>
        </div>
      </header>
      <main className=" max-w-xl mx-auto">
        <div className="p-4 py-2 space-y-6">
          <UrlForm />
          <section className="space-y-4">
            <div className="leading-tight">
              <h2 className="text-lg md:text-xl font-medium">Recent Links</h2>
              <span className="text-sm text-muted-foreground">
                Access your latest shortened links here.
              </span>
            </div>
            <UrlList limit={3} />
          </section>
          <Dialog>
            <div className="w-full grid place-items-center">
              <DialogTrigger asChild>
                <Button variant="link">
                  <span>View all links</span>
                  <MoveRight />
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>All Shortened Links</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Browse all your shortened links below.
                </DialogDescription>
                <Alert variant="important" className="text-left">
                  <Info />
                  <AlertTitle>URL Expiration Notice</AlertTitle>
                  <AlertDescription>
                    All shortened URLs created on Jottly will expire after 30.
                  </AlertDescription>
                </Alert>
              </DialogHeader>
              <div>
                <UrlList />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </React.Fragment>
  );
}
