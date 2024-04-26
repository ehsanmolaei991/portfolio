import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "@styles/globals.css";

const quicksand = Quicksand({
  preload: true,
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EhsanMolaei",
  description: "Just a Portfolio | ehsanmolaei991",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
