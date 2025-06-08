import React from "react";
import { Unlink2, MoveRight, Info } from "lucide-react";

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

export default async function Page() {
  return (
    <React.Fragment>
      <header className="max-w-xl mx-auto">
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
