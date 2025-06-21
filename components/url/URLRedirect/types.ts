// Types
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { URL } from "@/types/url";

export type useRedirectWithCountdownProps = {
  urlData?: URL;
  isDialogOpen: boolean;
  code: string;
  router: AppRouterInstance;
};

export type PasswordDialogProps = {
  encryptedPassword: string;
  onSuccess: () => void;
};
