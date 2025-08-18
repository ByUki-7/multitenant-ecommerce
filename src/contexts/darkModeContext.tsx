"use client";

import { createContext, useContext, ReactNode } from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";

interface DarkModeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkModeContext must be used within a DarkModeProvider");
  }
  return context;
};
