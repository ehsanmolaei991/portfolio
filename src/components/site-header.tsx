"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SoundToggle } from "@/components/sound-toggle";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

/**
 * Persistent chrome. The theme control used to live inside the hero and scroll
 * out of reach; it lives here now so it is reachable from anywhere on the page.
 */
export function SiteHeader({ name }: { name: string }) {
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Escape closes and returns focus to the trigger; a click outside just closes.
  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-header border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-4 px-gutter">
        <Link
          href="/"
          className="rounded-sm font-serif text-[1.0625rem] tracking-tight text-foreground"
        >
          {name}
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex h-11 items-center rounded-md px-3 text-small text-muted-foreground transition-colors duration-fast ease-standard hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <span
            aria-hidden
            className="mx-1 hidden h-5 w-px bg-border md:inline-block"
          />

          <SoundToggle />
          <ThemeToggle />

          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors duration-fast ease-standard hover:bg-muted md:hidden"
          >
            {open ? (
              <X className="h-[18px] w-[18px]" aria-hidden />
            ) : (
              <Menu className="h-[18px] w-[18px]" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav aria-label="Sections" className="px-gutter py-2">
              <ul>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[44px] items-center border-b border-border text-body text-foreground last:border-b-0"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
