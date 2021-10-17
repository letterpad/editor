import {useEffect, useState} from "react";

const useTheme = (isDark = false) => {
  const [theme, setTheme] = useState(isDark ? "dark" : "");

  useEffect(() => {
    if (!isDark) {
      setTheme("");
      document.body.classList.remove("dark");
    } else {
      setTheme("dark");
      document.body.classList.add("dark");
    }

  }, [])

  return [theme, setTheme];
}

export default useTheme;
