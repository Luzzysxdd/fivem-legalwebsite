/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#f5f5f5",
        "sheriff-gold": "#d4a843",
        "sheriff-gold-light": "#e8c971",
        "sheriff-gold-dark": "#b8922e",
        "electric-blue": "#3b82f6",
        "electric-blue-light": "#60a5fa",
        "dark-card": "#111111",
        "dark-border": "#1e1e1e",
        "dark-surface": "#161616",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "count-up": "countUp 2s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(212,168,67,0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(212,168,67,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #d4a843 0%, #e8c971 50%, #d4a843 100%)",
        "blue-gradient": "linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)",
        "dark-gradient": "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.95) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
