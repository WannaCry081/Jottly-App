"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { notFound, useRouter } from "next/navigation";

// Hooks
import { useGetShortenUrl } from "@/hooks/useGetShortenUrl";
import { useRedirectWithCountdown } from "./hooks/useRedirectWithCountdown";

// Custom Components
import { PasswordDialog } from "./components/PasswordDialog";

export const URLRedirect = ({ code }: { code: string }): React.ReactElement => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const { data, isLoading, isError } = useGetShortenUrl(code);
  const urlData = data?.data;

  const showPasswordDialog = urlData?.password && isDialogOpen;
  const { countdown } = useRedirectWithCountdown({
    urlData,
    isDialogOpen,
    code,
    router,
  });

  if (isLoading || isError) {
    return (
      <div className="grid place-items-center w-screen h-screen">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    );
  }

  if (!urlData) {
    notFound();
  }

  if (showPasswordDialog) {
    return (
      <PasswordDialog
        encryptedPassword={urlData.password || ""}
        onSuccess={() => setIsDialogOpen(false)}
      />
    );
  }

  return (
    <section className="max-w-2xl mx-auto h-svh">
      <div className="flex items-center justify-center w-full h-full font-medium text-center p-4 flex-col space-y-2">
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

export default URLRedirect;
