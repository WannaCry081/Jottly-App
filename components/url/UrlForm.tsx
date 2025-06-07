"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon, Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateShortenUrl } from "@/hooks/useCreateShortenUrl";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import PasswordInput from "../origin/password-input";

import { cn } from "@/lib/utils";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL").min(1, "URL is required"),
  password: z.string().optional(),
});

export const UrlForm = () => {
  const { isPending, createShortenUrl } = useCreateShortenUrl();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createShortenUrl({
      url: values.url,
      password: values.password || undefined,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel
                  className={cn(
                    !isChecked ? "text-muted-foreground" : "text-primary",
                    "inline-flex items-center gap-1"
                  )}
                >
                  <Lock className="size-3.5" /> <span>Password Protection</span>
                </FormLabel>

                <Switch
                  className="data-[state=checked]:bg-indigo-500"
                  checked={isChecked}
                  onCheckedChange={() => setIsChecked((prev) => !prev)}
                />
              </div>
              <FormControl>
                {isChecked && <PasswordInput {...field} />}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2Icon className="animate-spin" />} Submit
        </Button>
      </form>
    </Form>
  );
};
