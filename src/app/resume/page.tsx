import Highlighter from "react-highlight-words";
import english from "@data/english.json";
import { getResume, type RichOption } from "@lib/resume";

const lang = english;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "03/2025" -> "March 2025"; "" -> "Present" */
function fmtDate(value?: string): string {
  if (!value) return lang.present;
  const [mm, yyyy] = value.split("/");
  const month = MONTHS[Number(mm) - 1];
  return month ? `${month} ${yyyy}` : value;
}

function dateRange(start?: string, end?: string): string {
  return `${fmtDate(start)} – ${fmtDate(end)}`;
}

/** Renders text with inline bold / teal-link emphasis driven by the data file. */
function RichText({
  value,
  options,
}: {
  value: string;
  options?: RichOption[];
}) {
  const searchWords = (options || []).map((o) => o.search).filter(Boolean);
  const Tag = (word: { children: string }) => {
    const option = options?.find((o) => o.search === word.children);
    if (option?.type === "link") {
      return (
        <a className="rlink" href={option.href}>
          {option.search}
        </a>
      );
    }
    return <span className="font-semibold text-ink">{word.children}</span>;
  };
  return (
    <Highlighter
      searchWords={searchWords}
      autoEscape
      textToHighlight={value}
      highlightTag={Tag as unknown as string}
    />
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}

export default function Resume({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const data = getResume(searchParams?.variant);

  const emailLike = (id: string) => id !== "MOBILE";
  const experiences = data.limitExperiences
    ? data.experiences.slice(0, data.limitExperiences)
    : data.experiences;

  return (
    <main className={`resume-page${data.compact ? " resume-page--compact" : ""}`}>
      <article className="resume">
        {/* ---------- Header ---------- */}
        <header className="resume-header">
          <div className="resume-identity">
            <h1 className="resume-name">
              {data.firstName} <strong>{data.lastName}</strong>
            </h1>
            <p className="resume-title">{data.applicationAs}</p>
          </div>

          <address className="resume-contacts">
            {data.contacts.map((c) => (
              <a
                key={c.id}
                href={c.link}
                className={emailLike(c.id) ? "rlink" : "contact-plain"}
              >
                {c.value}
              </a>
            ))}
          </address>
        </header>

        <p className="resume-availability">
          <span className="text-muted">
            {data.city}, {data.country}
          </span>
          {data.relocationNote ? (
            <>
              {"  ·  "}
              <span className="accent font-semibold">{data.relocationNote}</span>
            </>
          ) : null}
        </p>

        <hr className="resume-rule" />

        {/* ---------- Summary ---------- */}
        <section className="resume-section">
          <SectionTitle>{lang.summary}</SectionTitle>
          <p className="resume-body">
            <RichText
              value={data.summary.value}
              options={data.summary.options}
            />
          </p>
        </section>

        {/* ---------- Skills ---------- */}
        <section className="resume-section">
          <SectionTitle>{lang.skills}</SectionTitle>
          <div className="skills-grid">
            <div>
              <h3 className="skills-label">{lang.frontend}</h3>
              <p className="skills-list">{data.skills.frontend.join(", ")}</p>
            </div>
            <div>
              <h3 className="skills-label">{lang.tools}</h3>
              <p className="skills-list">{data.skills.tools.join(", ")}</p>
            </div>
            <div className="skills-full">
              <h3 className="skills-label">{lang.soft}</h3>
              <p className="skills-list">{data.skills.soft.join(", ")}</p>
            </div>
          </div>
        </section>

        {/* ---------- Experience ---------- */}
        <section className="resume-section">
          <SectionTitle>{lang.experience}</SectionTitle>
          <ul className="exp-list">
            {experiences.map((exp, i) => (
              <li key={`${exp.company.name}-${i}`} className="exp-item">
                <h3 className="exp-position">{exp.position}</h3>
                <p className="exp-meta">
                  {exp.company.href ? (
                    <a className="rlink" href={exp.company.href}>
                      {exp.company.name}
                    </a>
                  ) : (
                    <span className="font-semibold text-ink">
                      {exp.company.name}
                    </span>
                  )}
                  {exp.location ? (
                    <span className="text-muted">, {exp.location}</span>
                  ) : null}
                  <span className="text-muted">
                    {"  ·  "}
                    {dateRange(exp.startDate, exp.endDate)}
                  </span>
                </p>
                <ul className="exp-bullets">
                  {exp.achievements.map((a, j) => (
                    <li key={j}>
                      <RichText value={a.value} options={a.options} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Education ---------- */}
        <section className="resume-section">
          <SectionTitle>{lang.education}</SectionTitle>
          <ul className="edu-list">
            {data.educations.map((edu, i) => (
              <li key={i} className="edu-item">
                <span className="font-semibold text-ink">{edu.degree}</span>
                <span className="text-muted">
                  {"  ·  "}
                  {dateRange(edu.startDate, edu.endDate)}
                </span>
                <div className="text-muted">{edu.location}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Languages & Interests ---------- */}
        {data.knowledgeAndIntrest?.length ? (
          <section className="resume-section resume-section--tight">
            <SectionTitle>{lang.knowledgeAndIntrest}</SectionTitle>
            <div className="misc-grid">
              {data.knowledgeAndIntrest.map((group) => (
                <p key={group.id} className="misc-line">
                  <span className="skills-label">{group.title}: </span>
                  <span className="text-muted">
                    {group.list
                      .map((it) =>
                        (it as { level?: string }).level
                          ? `${it.title} (${(it as { level?: string }).level})`
                          : it.title,
                      )
                      .join(" · ")}
                  </span>
                </p>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
