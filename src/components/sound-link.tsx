"use client";

import Link from "next/link";
import { useSound, type SoundEvent } from "@/components/sound-provider";

/**
 * A next/link that plays one of the three sanctioned sound events on activation.
 * Sound is opt-in and muted by default, so this is a no-op until the visitor
 * turns it on. Everything else about the link behaves natively — keyboard
 * activation fires click, so this works without a pointer.
 */
export function SoundLink({
  href,
  event = "open",
  className,
  children,
  ...rest
}: React.ComponentProps<typeof Link> & { event?: SoundEvent }) {
  const { play } = useSound();

  return (
    <Link
      href={href}
      className={className}
      onClick={() => play(event)}
      {...rest}
    >
      {children}
    </Link>
  );
}
