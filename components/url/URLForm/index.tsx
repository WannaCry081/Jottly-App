"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Info, Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

// Hooks
import { useCreateShortenUrl } from "@/hooks/useCreateShortenUrl";

// Utility functions
import { cn } from "@/lib/utils";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PasswordInput from "@/components/origin/password-input";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL").min(1, "URL is required"),
  password: z.string().optional(),
});

const URLForm = (): React.ReactElement => {
  const { isLoading, isError, createShortenUrl } = useCreateShortenUrl();
  const isPending = isLoading || isError;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>): void {
    createShortenUrl({
      ownerId: localStorage.getItem("jotty-id") || "",
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
                  id="password-protection-label"
                  className={cn(
                    !isChecked ? "text-muted-foreground" : "text-primary",
                    "inline-flex items-center gap-1",
                  )}
                >
                  <span>Password Protection</span>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-center">
                        Add a <strong>password</strong> to restrict access to
                        your shortened URL.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>

                <Switch
                  checked={isChecked}
                  onCheckedChange={() => setIsChecked((prev) => !prev)}
                  aria-labelledby="password-protection-label"
                />
              </div>

              {isChecked && (
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
              )}
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

export default URLForm;
