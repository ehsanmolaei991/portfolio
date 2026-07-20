/** Date formatting shared by the résumé document and the site's experience index. */

const MONTHS_LONG = [
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

const MONTHS_SHORT = MONTHS_LONG.map((m) => m.slice(0, 3));

/** "03/2025" -> "March 2025" (or "Mar 2025"); "" -> `presentLabel`. */
export function formatMonthYear(
  value: string | undefined,
  presentLabel: string,
  style: "long" | "short" = "long"
): string {
  if (!value) return presentLabel;
  const [mm, yyyy] = value.split("/");
  const months = style === "short" ? MONTHS_SHORT : MONTHS_LONG;
  const month = months[Number(mm) - 1];
  return month ? `${month} ${yyyy}` : value;
}

export function formatRange(
  start: string | undefined,
  end: string | undefined,
  presentLabel: string,
  style: "long" | "short" = "long"
): string {
  return `${formatMonthYear(start, presentLabel, style)} – ${formatMonthYear(
    end,
    presentLabel,
    style
  )}`;
}
