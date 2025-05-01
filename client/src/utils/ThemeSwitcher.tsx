"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";
const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  const handleThemeChange = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  if (!mounted) {
    return null;
  }
  return (
    <div className="flex items-center justify-center mx-4 z-99">
      {theme == "light" ? (
        <BiMoon
          className="cursor-pointer "
          fill="black"
          size={25}
          onClick={handleThemeChange}
        />
      ) : (
        <BiSun
          className="cursor-pointer "
          fill="white"
          size={25}
          onClick={handleThemeChange}
        />
      )}
    </div>
  );
};
export default ThemeSwitcher;
