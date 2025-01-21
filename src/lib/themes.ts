import { Moon, Sun, Palette } from 'lucide-react';

export const themes = [
  {
    name: "Light Blue",
    value: "light",
    icon: Sun,
    variables: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      primary: "211 89% 53%",
    }
  },
  {
    name: "Dark Navy",
    value: "dark-navy",
    icon: Moon,
    variables: {
      background: "222 47% 11%",
      foreground: "0 0% 98%",
      primary: "217 91% 60%",
    }
  },
  {
    name: "Dark Maroon",
    value: "dark-maroon",
    icon: Moon,
    variables: {
      background: "0 47% 11%",
      foreground: "0 0% 98%",
      primary: "0 91% 60%",
    }
  },
  {
    name: "Glass",
    value: "glass",
    icon: Palette,
    variables: {
      background: "0 0% 100% / 0.8",
      foreground: "240 10% 3.9%",
      primary: "211 89% 53% / 0.8",
    }
  }
] as const;

export type Theme = (typeof themes)[number]['value'];