import type { Metadata } from "next";
import "@styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { MemeLayer } from "@/components/meme-layer";

const title = "Ehsan Molaei — Senior Frontend Engineer";
const description =
  "Senior Frontend Engineer with 9+ years in React, Next.js, React Native & TypeScript. Fintech & SaaS. Open to relocation and visa sponsorship.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ehsanmolaei.ir"),
  title,
  description,
  keywords: [
    "Ehsan Molaei",
    "Senior Frontend Engineer",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Frontend Developer",
    "Resume",
    "CV",
  ],
  authors: [{ name: "Ehsan Molaei" }],
  openGraph: {
    title,
    description,
    type: "profile",
    url: "https://www.ehsanmolaei.ir",
    siteName: "Ehsan Molaei",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CustomCursor />
          <MemeLayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
