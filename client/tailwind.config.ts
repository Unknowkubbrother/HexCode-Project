import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        darkbgprimary: "var(--dark-bg-primary)",
        darkbgsecondary: "var(--dark-bg-secondary)",
        lightbgprimary: "var(--light-bg-primary)",
        lightbgsecondary: "var(--light-bg-secondary)"
      },
      extend: {},
    },
  },
  daisyui: {
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables,
    themes: [
      {
        dark : {
          primary: '#0ea5e9',
          secondary: '#2a2a2a',
          bgprimary: '#1a1a1a',
          bgsecondary: '#2a2a2a',
        },
        light :{
          primary: '#0ea5e9',
          secondary: '#2a2a2a',
          bgprimary: '#ffffff',
          bgsecondary: '#eeeeee',
        }
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config;
