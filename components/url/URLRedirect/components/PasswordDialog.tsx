"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { decrypt } from "@/utils/password";
import { Info } from "lucide-react";

// UI Components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Custom Components
import PasswordInput from "@/components/origin/password-input";

// Types
import type { PasswordDialogProps } from "../types";

const formSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export const PasswordDialog = ({
  encryptedPassword,
  onSuccess,
}: PasswordDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const decrypted = decrypt(encryptedPassword);
    if (values.password === decrypted) {
      onSuccess();
    } else {
      form.setError("password", {
        type: "manual",
        message: "Password is incorrect. Please try again.",
      });
    }
  };

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Welcome to Jottly</DialogTitle>
          <DialogDescription className="text-left text-sm text-muted-foreground">
            To proceed, please enter the password.
          </DialogDescription>

          <Alert variant="important" className="text-left">
            <Info />
            <AlertTitle>URL Expiration Notice</AlertTitle>
            <AlertDescription>
              All URLs created on Jottly expire after 30 days.
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
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>

          <DialogFooter className="block text-center">
            <p className="text-xs text-muted-foreground">
              &copy; 2025 Jottly. All rights reserved.
            </p>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
