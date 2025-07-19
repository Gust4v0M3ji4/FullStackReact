// src/components/ChangeThemeButton.tsx
import { useThemeStore } from "@/store/themeStore";
import { useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { debounce } from "lodash";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeStore();

  const handleToggle = useCallback(
    debounce(() => {
      toggleTheme();
    }, 200),
    []
  );

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full border dark:border-white border-black"
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-black" />
      )}
    </button>
  );
}
