import { ArrowUpRight } from "lucide-react";
import { siteCopy } from "@/data/site";
import type { Contact as ContactData } from "@lib/resume";

/** Human-readable purpose per contact id — the accessible name, not a glyph. */
const PURPOSE: Record<string, string> = {
  MAIL: "Email",
  TELEGRAM: "Telegram",
  LINKEDIN: "LinkedIn",
  GITHUB: "GitHub",
  WEBSITE: "Website",
};

export function Contact({ contacts }: { contacts: ContactData[] }) {
  return (
    <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
      <div data-reveal>
        <p className="max-w-prose text-lead text-foreground">
          {siteCopy.contact.lead}
        </p>
      </div>

      <ul data-reveal className="flex flex-col">
        {contacts.map((contact) => {
          const purpose = PURPOSE[contact.id] ?? contact.title;
          const external = contact.link.startsWith("http");
          return (
            <li key={contact.id} className="border-b border-border first:border-t">
              <a
                href={contact.link}
                {...(external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group flex min-h-[52px] items-center justify-between gap-4 py-2"
              >
                <span className="text-body text-foreground">
                  <span className="link-rule">{purpose}</span>
                  <span className="mt-0.5 block text-small text-muted-foreground">
                    {contact.value}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-fast ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
