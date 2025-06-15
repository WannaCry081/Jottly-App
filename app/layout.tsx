import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// Custom Components
import { Providers } from "@/components/shared/providers";
import { ThemeProvider } from "@/components/shared/theme-provider";

import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jottly | URL Shortener",
    template: "%s | Jottly",
  },
  description:
    "Jottly is a fast, privacy-focused URL shortener. Create, manage, and track short links with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
