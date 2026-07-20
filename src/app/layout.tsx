import type { Metadata, Viewport } from "next";
import "@styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getResume } from "@lib/resume";
import { SITE_URL } from "@lib/site-config";

const data = getResume();
const fullName = `${data.firstName} ${data.lastName}`;

const title = `${fullName} — ${data.applicationAs}`;
const description =
  "Senior Frontend Engineer, 9+ years in React, Next.js, React Native and TypeScript. Frontend team lead on a trading platform, building design systems and real-time interfaces.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${fullName}`,
  },
  description,
  applicationName: fullName,
  authors: [{ name: fullName, url: SITE_URL }],
  creator: fullName,
  alternates: { canonical: "/" },
  keywords: [
    fullName,
    "Senior Frontend Engineer",
    "Frontend Team Lead",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Design systems",
    "Resume",
    "CV",
  ],
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: fullName,
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${fullName} — ${data.applicationAs}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  // Browser chrome matches the page in each scheme. Values mirror --background.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1216" },
  ],
};

/** Person + the résumé as a CreativeWork. Facts only, straight from the data. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName,
  jobTitle: data.applicationAs,
  url: SITE_URL,
  email: data.contacts.find((c) => c.id === "MAIL")?.value,
  // "Yerevan, Armenia" -> locality + country, which is what consumers expect.
  address: {
    "@type": "PostalAddress",
    addressLocality: data.location.split(",")[0]?.trim(),
    addressCountry: data.location.split(",").pop()?.trim(),
  },
  alumniOf: data.educations.map((edu) => ({
    "@type": "EducationalOrganization",
    name: edu.location,
  })),
  worksFor: { "@type": "Organization", name: data.experiences[0]?.company.name },
  knowsAbout: data.skills.frontend.slice(0, 10),
  sameAs: data.contacts
    .filter((c) => c.link.startsWith("http"))
    .map((c) => c.link),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // Static, build-time value derived from our own data file.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Entrance animations start hidden; restore them without scripting. */}
        <noscript>
          <style>{`[data-hero-step],[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
