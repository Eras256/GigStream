import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'somnia-purple': 'hsl(var(--somnia-purple))',
        'scroll-gold': 'hsl(var(--scroll-gold))',
        'mx-green': 'hsl(var(--mx-green))',
        'neural-blue': 'hsl(var(--neural-blue))',
        white: 'hsl(var(--white))',
        'somnia-cyan': '#00D4FF',
        'somnia-purple-brand': '#7B00FF',
        'somnia-dark': 'hsl(var(--somnia-dark))',
      },
      boxShadow: {
        'neural-glow': '0 0 20px hsl(var(--somnia-purple) / 0.4), 0 0 40px hsl(var(--somnia-purple) / 0.2), 0 25px 50px rgba(0,0,0,0.25)',
        'neural-glow-lg': '0 0 40px hsl(var(--somnia-purple) / 0.6), 0 0 80px hsl(var(--somnia-purple) / 0.3), 0 35px 70px rgba(0,0,0,0.35)',
      },
      textShadow: {
        'neural-glow': '0 0 10px hsl(var(--somnia-purple) / 0.5), 0 0 20px hsl(var(--somnia-purple) / 0.3)',
      },
    },
  },
  plugins: [],
}
export default config

