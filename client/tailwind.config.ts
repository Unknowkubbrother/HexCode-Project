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
        mytheme: {
          "primary": 'rgb(77, 181, 255)',
  
          "secondary": 'rgb(40, 139, 209)',
  
          "accent": '#0069a9',
  
          "neutral": '#3d4451',
  
          'base-100': '#262626',
  
          "info": '#00e2ff',
  
          "success": '#00cc99',
  
          "warning": '#f47000',
  
          "error": '#d2004e'
        },
        dark : {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          bgprimary: 'var(--dark-bg-primary)',
          bgsecondary: 'var(--dark-bg-secondary)',
        },
        light :{
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          bgprimary: 'var(--light-bg-primary)',
          bgsecondary: 'var(--light-bg-secondary)',
        }
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config;
