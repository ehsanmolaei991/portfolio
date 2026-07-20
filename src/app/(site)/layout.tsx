import { SoundProvider } from "@/components/sound-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MotionRuntime } from "@/components/motion-runtime";
import { Pointer } from "@/components/pointer";
import { MemeHover } from "@/components/meme-hover";
import { getResume } from "@lib/resume";
import { RESUME_PDF } from "@lib/site-config";

/**
 * Chrome for the narrative site. /resume sits outside this group on purpose —
 * it is a print document and carries none of this.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = getResume();
  const fullName = `${data.firstName} ${data.lastName}`;

  return (
    <SoundProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader name={fullName} />

      <MotionRuntime>
        <main id="main" tabIndex={-1} className="mx-auto w-full max-w-content px-gutter">
          {children}
        </main>
      </MotionRuntime>

      <SiteFooter name={fullName} pdfHref={RESUME_PDF} />

      {/* Decorative pointer layers. Both self-disable on coarse pointers and
          under reduced motion, so they add nothing for anyone who can't use
          them. */}
      <Pointer />
      <MemeHover />
    </SoundProvider>
  );
}
