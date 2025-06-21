import { useEffect, useState } from "react";

// Hooks
import { useUpdateShortenUrlClicks } from "@/hooks/useUpdateShortenUrlClicks";

// Types
import type { useRedirectWithCountdownProps } from "../types";

export const useRedirectWithCountdown = ({
  urlData,
  isDialogOpen,
  code,
  router,
}: useRedirectWithCountdownProps) => {
  const [countdown, setCountdown] = useState(5);
  const { updateClicks } = useUpdateShortenUrlClicks();

  useEffect(() => {
    if (!urlData?.originalUrl || (urlData.password && isDialogOpen)) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          updateClicks(code);
          router.push(urlData.originalUrl);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [urlData, isDialogOpen, code, router, updateClicks]);

  return { countdown };
};
