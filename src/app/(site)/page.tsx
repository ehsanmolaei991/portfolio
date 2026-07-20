import { getResume } from "@lib/resume";
import { siteCopy } from "@/data/site";
import { Section } from "@/components/section";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { ExperienceIndex } from "@/components/sections/experience-index";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";

/**
 * Section order is the trust argument, not a template:
 * identity → proof → timeline → the human → tooling → the ask.
 * See design-system/portfolio-master.md §3.
 */
export default function Landing() {
  const data = getResume();
  const email = data.contacts.find((c) => c.id === "MAIL")?.link;
  const publicContacts = data.contacts.filter((c) => c.id !== "MOBILE");

  return (
    <>
      <Hero
        name={`${data.firstName} ${data.lastName}`}
        role={data.applicationAs}
        location={data.location}
        email={email}
      />

      <div className="flex flex-col gap-section pb-section">
        <Section
          id="work"
          index="01"
          title="Selected work"
          note={siteCopy.microcopy.work}
        >
          <SelectedWork />
        </Section>

        <Section
          id="experience"
          index="02"
          title="Experience"
          note={siteCopy.microcopy.experience}
        >
          <ExperienceIndex experiences={data.experiences} />
        </Section>

        <Section
          id="about"
          index="03"
          title="About"
          note={siteCopy.microcopy.about}
        >
          <About
            educations={data.educations}
            misc={data.knowledgeAndIntrest}
          />
        </Section>

        <Section
          id="capabilities"
          index="04"
          title="Capabilities"
          note={siteCopy.microcopy.capabilities}
        >
          <Capabilities />
        </Section>

        <Section
          id="contact"
          index="05"
          title="Contact"
          note={siteCopy.microcopy.contact}
        >
          <Contact contacts={publicContacts} />
        </Section>
      </div>
    </>
  );
}
