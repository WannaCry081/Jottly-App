import type { Metadata } from "next";

// Custom Components
import { URLRedirect } from "@/components/url/URLRedirect";

export const metadata: Metadata = {
  title: "Dynamic Code",
  description:
    "Redirect to your secure, password-protected, and trackable shortened link with Jottly. Fast, simple, and privacy-focused URL shortener.",
  keywords: [
    "Jottly",
    "URL Shortener",
    "Short Link",
    "Password Protected Link",
    "Trackable Link",
    "Redirect",
    "Secure Link",
    "Private Link",
  ],
  openGraph: {
    title: "Jottly | URL Shortener",
    description:
      "Redirect to your secure, password-protected, and trackable shortened link with Jottly. Fast, simple, and privacy-focused URL shortener.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Jottly",
    locale: "en_US",
    type: "website",
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<React.ReactElement> {
  const { code } = await params;

  return (
    <main>
      <URLRedirect code={code} />
    </main>
  );
}
