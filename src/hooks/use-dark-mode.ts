import { useState, useEffect, useCallback } from "react";

const THEME_TRANSITION_MS = 320;

const applyTheme = (isDark: boolean) => {
  const root = document.documentElement;

  // Enable smooth color transitions only for the duration of the switch,
  // so normal interactions (hover, focus, etc.) stay instant.
  root.classList.add("theme-transition");

  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";

  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    // localStorage unavailable (e.g. private mode) — ignore.
  }

  window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, THEME_TRANSITION_MS);
};

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sync React state with the class already applied by the pre-paint script.
  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Follow the OS preference until the user makes an explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      setIsDark(event.matches);
      applyTheme(event.matches);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      applyTheme(next);
      return next;
    });
  }, []);

  return { isDark, toggleDarkMode, mounted };
};
