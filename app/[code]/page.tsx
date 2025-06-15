import type { Metadata } from "next";

// Custom Components
import { UrlRedirectPage } from "@/components/url/UrlRedirect";

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
}) {
  const { code } = await params;

  return (
    <main>
      <UrlRedirectPage code={code} />
    </main>
  );
}
