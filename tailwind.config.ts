import type { Config } from "tailwindcss";

/**
 * Every value here resolves to a CSS custom property defined in
 * src/styles/globals.css. Components consume these utilities and never
 * hardcode hex values or one-off numbers.
 * See design-system/portfolio-master.md §5.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        elevated: "hsl(var(--elevated))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        "border-strong": "hsl(var(--border-strong))",
        focus: "hsl(var(--focus))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          strong: "hsl(var(--accent-strong))",
        },
        // shadcn/ui aliases — components.json is configured for this project.
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        serif: "var(--font-serif)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        micro: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.18em" }],
        small: ["0.875rem", { lineHeight: "1.45" }],
        body: ["1rem", { lineHeight: "1.65" }],
        lead: ["clamp(1.05rem, 1.6vw, 1.25rem)", { lineHeight: "1.55" }],
        h3: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h2: ["clamp(1.6rem, 3vw, 2.25rem)", { lineHeight: "1.15" }],
        h1: ["clamp(2rem, 4.5vw, 3.25rem)", { lineHeight: "1.1" }],
        display: [
          "clamp(2.75rem, 7vw, 5.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
      },
      maxWidth: {
        prose: "68ch",
        content: "72rem",
        wide: "88rem",
      },
      spacing: {
        section: "var(--space-section)",
        block: "var(--space-block)",
        gutter: "var(--gutter)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        overlay: "var(--shadow-overlay)",
        none: "none",
      },
      transitionDuration: {
        instant: "var(--dur-instant)",
        fast: "var(--dur-fast)",
        normal: "var(--dur-normal)",
        slow: "var(--dur-slow)",
        cinematic: "var(--dur-cinematic)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
      zIndex: {
        sticky: "20",
        header: "30",
        overlay: "40",
        dialog: "50",
        pointer: "60",
        toast: "70",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
