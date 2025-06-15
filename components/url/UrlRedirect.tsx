"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { notFound, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2Icon, Info } from "lucide-react";

// UI Components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import PasswordInput from "../origin/password-input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

// Hooks
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetShortenUrl } from "@/hooks/useGetShortenUrl";

// Utility functions
import { decrypt } from "@/utils/password";
import { useUpdateShortenUrlClicks } from "@/hooks/useUpdateShortenUrlClicks";

const formSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export const UrlRedirectPage = ({ code }: { code: string }) => {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(5);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const { data, isLoading, isError } = useGetShortenUrl(code);
  const { updateClicks } = useUpdateShortenUrlClicks();
  const isDataPending = isLoading || isError;

  const urlData = data?.data;

  useEffect(() => {
    if (!urlData?.password && !isDialogOpen) setIsDialogOpen(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (urlData?.originalUrl) {
            updateClicks(code);
            router.push(urlData?.originalUrl);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isDialogOpen, urlData, code, updateClicks, router]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const decryptedPassword = decrypt(urlData?.password || "");
    if (values.password === decryptedPassword) {
      setIsDialogOpen(false);
    } else {
      form.setError("password", {
        type: "manual",
        message: "Password is incorrect. Please try again.",
      });
    }
  }

  if (isDataPending) {
    return (
      <div className="grid place-items-center w-screen h-screen">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    );
  }

  if (!urlData) {
    notFound();
  }

  if (urlData.password && isDialogOpen) {
    return (
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left">Welcome to Jottly</DialogTitle>
            <DialogDescription className="text-left text-sm text-muted-foreground">
              Jottly is a URL shortener. To proceed with the redirect, please
              enter the password.
            </DialogDescription>
            <Alert variant="important" className="text-left">
              <Info />
              <AlertTitle>URL Expiration Notice</AlertTitle>
              <AlertDescription>
                All URLs created on Jottly will expire after 30 days.
              </AlertDescription>
            </Alert>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-2"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
            <DialogFooter className="block text-center">
              <p className="text-xs text-muted-foreground ">
                &copy; 2025 Jottly. All rights reserved.
              </p>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <section className="max-w-2xl mx-auto h-svh">
      <div className="flex items-center justify-center  w-full h-full font-medium text-center p-4 flex-col space-y-2">
        <span>
          Thanks for using Jottly! You are being redirected to the URL in
        </span>
        <span className="text-3xl">
          {countdown === 0 ? "Byeee 👋🏻" : countdown}
        </span>
      </div>
    </section>
  );
};
