import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";
import "./mode-toggle.scss";
import clsx from "clsx";

export function ModeToggleV2() {
  type Theme = "dark" | "light" | "system";
  const { theme, setTheme } = useTheme();
  const [themeSelectActive, setThemeSelectActive] = useState(false);
  const [hidingOtherModes, setHidingOtherModes] = useState(false);

  const allThemes: Theme[] = ["dark", "light", "system"];

  const handleButtonClick = () => {
    setThemeSelectActive(true);
  };

  const handleMouseLeaveToggleContainer = () => {
    setHidingOtherModes(true);
    setTimeout(() => {
      setThemeSelectActive(false);
      setHidingOtherModes(false);
    }, 200);
  };

  const handleSelectMode = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
  };

  const prepareUnselectedModes = () => {
    const unselectedThemes = allThemes.filter((t) => t !== theme);
    return unselectedThemes.map((t) => (
      <Button variant="ghost" size="icon" onClick={() => handleSelectMode(t)}>
        {t === "dark" ? (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
        ) : t === "light" ? (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        ) : (
          <span>A</span>
        )}
      </Button>
    ));
  };

  const modeToggleContainerClassNames = clsx("mode-toggle-container", {
    "gap-2.5": themeSelectActive && !hidingOtherModes,
  });
  const otherModesClassNames = clsx("other-modes", { hiding: hidingOtherModes });

  return (
    <div className={modeToggleContainerClassNames} onMouseLeave={handleMouseLeaveToggleContainer}>
      <Button variant="secondary" size="icon" onClick={handleButtonClick}>
        {theme === "system" ? (
          <span>A</span>
        ) : (
          <>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </>
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      {themeSelectActive ? <div className={otherModesClassNames}>{prepareUnselectedModes()}</div> : <></>}
    </div>
  );
}
