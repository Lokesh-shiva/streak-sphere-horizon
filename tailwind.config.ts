import { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class", '.theme-dark', '[data-theme="dark"]'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
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
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Theme colors
				'theme-energy': 'var(--theme-energy)',
				'theme-focus': 'var(--theme-focus)',
				'theme-growth': 'var(--theme-growth)',
				'theme-calm': 'var(--theme-calm)',
				'theme-joy': 'var(--theme-joy)',
				'theme-passion': 'var(--theme-passion)',
				'theme-flow': 'var(--theme-flow)',
				'theme-wisdom': 'var(--theme-wisdom)',
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"collapsible-down": {
					from: { height: "0" },
					to: { height: 'var(--radix-collapsible-content-height)' },
				},
				"collapsible-up": {
					from: { height: 'var(--radix-collapsible-content-height)' },
					to: { height: "0" },
				},
				"slide-in": {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" },
				},
				"slide-out": {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(100%)" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"fade-out": {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
				"spin-slow": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				"bounce-light": {
					"0%, 100%": {
						transform: "translateY(0)",
						"animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
					},
					"50%": {
						transform: "translateY(-15%)",
						"animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
					},
				},
				"pulse-light": {
					"0%, 100%": {
						opacity: "1",
					},
					"50%": {
						opacity: "0.8",
					},
				},
				shine: {
					"0%": { backgroundPosition: "200% 0" },
					"100%": { backgroundPosition: "-200% 0" },
				},
				"sparkle-rotate": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				"flame": {
					"0%, 100%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.15)" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"collapsible-down": "collapsible-down 0.2s ease-out",
				"collapsible-up": "collapsible-up 0.2s ease-out",
				"slide-in": "slide-in 0.3s ease-out",
				"slide-out": "slide-out 0.3s ease-in",
				"fade-in": "fade-in 0.3s ease-out",
				"fade-out": "fade-out 0.3s ease-in",
				"spin-slow": "spin-slow 10s linear infinite",
				"bounce-light": "bounce-light 1.5s infinite",
				"pulse-light": "pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				shine: "shine 2s linear infinite",
				wiggle: "wiggle 1s ease-in-out infinite",
				sparkle: "sparkle-rotate 2s linear infinite",
				"flame": "flame 1.5s infinite ease-in-out",
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'shimmer': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0) 100%)',
				'gradient-calm': 'linear-gradient(135deg, #4ECDC4, #556270)',
				'gradient-energy': 'linear-gradient(135deg, #FF6B6B, #FFE66D)',
				'gradient-focus': 'linear-gradient(135deg, #3A86FF, #7F5A83)',
				'gradient-growth': 'linear-gradient(135deg, #77DD77, #39B5E0)',
			},
			boxShadow: {
				'streak-card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'button-glow': '0 0 15px rgba(255, 255, 255, 0.5), 0 0 25px rgba(255, 255, 255, 0.2), 0 0 35px rgba(255, 255, 255, 0.1)',
				'button-hover': '0 4px 15px -2px rgba(0, 0, 0, 0.2)',
				'card': '0 4px 20px -5px rgba(0, 0, 0, 0.1)',
				'card-hover': '0 8px 30px -5px rgba(0, 0, 0, 0.15)',
			}
		}
	},
	plugins: [animate],
} satisfies Config;
