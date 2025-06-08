"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2Icon, Info } from "lucide-react";

// Components
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

  const { data, isLoading } = useGetShortenUrl(code);

  // Countdown and redirect for non-password URLs
  useEffect(() => {
    if (!isLoading && data?.url && !data.url.password) {
      setCountdown(5);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.replace(data.url.originalUrl);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoading, data, router]);

  // Countdown and redirect for password-protected URLs after correct password
  useEffect(() => {
    if (!isDialogOpen && data?.url?.originalUrl) {
      setCountdown(5);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.replace(data.url.originalUrl);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isDialogOpen, data, router]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const decryptedPassword = decrypt(data.url.password);
    if (values.password === decryptedPassword) {
      setIsDialogOpen(false);
    } else {
      form.setError("password", {
        type: "manual",
        message: "Password is incorrect. Please try again.",
      });
    }
  }

  if (isLoading) {
    return (
      <div className="grid place-items-center w-screen h-screen">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    );
  }

  if (data.url.password && isDialogOpen) {
    return (
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Jottly</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Jottly is a URL shortener. To proceed with the redirect, please
              enter the password.
            </DialogDescription>
            <Alert variant="important" className="text-left">
              <Info />
              <AlertTitle>URL Expiration Notice</AlertTitle>
              <AlertDescription>
                This password-protected link expires in 30 days.
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
    <div className="max-w-2xl mx-auto h-svh">
      <div className="flex items-center justify-center  w-full h-full font-medium">
        Thanks for using Jottly! You are being redirected to the URL in{" "}
        {countdown}
      </div>
    </div>
  );
};
