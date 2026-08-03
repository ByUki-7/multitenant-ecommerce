// Runs before first paint to apply the persisted (or system) theme,
// preventing a flash of the wrong theme (FOUC) on load.
const themeScript = `(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  } catch (e) {}
})();`;

export const ThemeScript = () => (
  <script dangerouslySetInnerHTML={{ __html: themeScript }} />
);
