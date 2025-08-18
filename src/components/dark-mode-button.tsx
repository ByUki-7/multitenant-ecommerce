"use client";

import { Moon, Sun } from "lucide-react";
import { useDarkModeContext } from "../contexts/darkModeContext";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface darkModeButtonProps {
  className?: string;
}

export const DarkModeButton = ({ className }: darkModeButtonProps) => {
  const { isDark, toggleDarkMode } = useDarkModeContext();

  return (
    <Button
      variant="none"
      size="icon"
      className={cn("cursor-pointer border-none hover:bg-neutral-100 dark:hover:bg-neutral-800", className)}
      onClick={toggleDarkMode}

    >
      {isDark ? (
        <Sun className="h-4 w-4 text-neutral-600 dark:text-neutral-200" />
      ) : (
        <Moon className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
      )}
    </Button>
  );
};