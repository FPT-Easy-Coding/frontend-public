import { useEffect } from "react";
import { useState } from "react";
/**
 * Component for toggling between light and dark theme.
 */
const ThemeSwap = () => {
  // Retrieve the initial theme value from local storage
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark"))
  );

  // Update the local storage and apply the selected theme
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  return (
    <>
      {/* Toggle switch */}
      <label className="cursor-pointer grid place-items-center mr-2">
        <input
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
          onChange={() => setIsDark(!isDark)}
          checked={isDark}
        />

        {/* Dark theme icon */}
        <svg
          className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>

        {/* Light theme icon */}
        <svg
          className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </>
  );
};

export default ThemeSwap;
