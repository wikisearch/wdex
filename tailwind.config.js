const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["selector"],
  important: true,
  theme: {
    screens: {
      xs: "540px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: "true",
      padding: {
        DEFAULT: "12px",
        sm: "1rem",
        lg: "45px",
        xl: "50px",
        "2xl": "130px",
      },
    },
    extend: {
      colors: {
        cream: "#FAF8F5",
        "cream-dark": "#F5F0EB",
        ink: "#311B56",
        "ink-light": "#4A2D7A",
        "manga-accent": "#A57CC6",
        "manga-accent-dark": "#7C3AED",
        web: {
          title: "#311B56",
          titleLighter: "#4A2D7A",
          titleDisabled: "#8A74A3",
        },
        dark: "#311B56",
        black: "#1a0f2e",
        "dark-footer": "#1a0f2e",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      container: {
        center: "true",
        padding: {
          DEFAULT: "12px",
          sm: "1rem",
          lg: "45px",
          xl: "50px",
          "2xl": "130px",
        },
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        999: "999",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        DEFAULT: "var(--radius)",
        none: "0",
      },
      boxShadow: {
        brutal: "4px 4px 0px hsl(var(--foreground))",
        "brutal-lg": "8px 8px 0px hsl(var(--foreground))",
        "brutal-xl": "12px 12px 0px hsl(var(--foreground))",
        "brutal-sm": "2px 2px 0px hsl(var(--foreground))",
        "brutal-pressed": "2px 2px 0px hsl(var(--foreground))",
        glass: "0 8px 32px hsl(var(--foreground) / 0.08)",
        "glass-lg": "0 16px 48px hsl(var(--foreground) / 0.12)",
        soft: "0 1px 3px hsl(var(--foreground) / 0.06), 0 1px 2px hsl(var(--foreground) / 0.04)",
        "soft-md":
          "0 4px 6px hsl(var(--foreground) / 0.06), 0 2px 4px hsl(var(--foreground) / 0.04)",
        "soft-lg":
          "0 10px 15px hsl(var(--foreground) / 0.06), 0 4px 6px hsl(var(--foreground) / 0.04)",
        glow: "0 0 20px hsl(var(--accent) / 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-up": "fadeUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    plugin(({ addBase, theme }) => {
      addBase({
        ".scrollbar": {
          overflowY: "auto",
          scrollbarColor: `${theme("colors.ink")} ${theme("colors.cream-dark")}`,
          scrollbarWidth: "thin",
        },
        ".scrollbar::-webkit-scrollbar": {
          height: "4px",
          width: "4px",
          borderRadius: "var(--radius)",
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: theme("colors.ink"),
          borderRadius: "var(--radius)",
        },
        ".scrollbar::-webkit-scrollbar-track-piece": {
          backgroundColor: theme("colors.cream-dark"),
        },
      });
    }),
    require("tailwindcss-animate"),
  ],
};
