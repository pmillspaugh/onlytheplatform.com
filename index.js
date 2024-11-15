/**
 * SERVICE WORKER REGISTRATION
 */

// An activated service worker can't manage the page that registered it until the next time you navigate to that page by reloading the page or reopening the PWA.
// Hence, register the service worker on the root `/` page so that it can proxy network requests after navigating to `./service-worker.js` (or any other page).

registerServiceWorker();

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
    console.log("Service worker registered");
  }
}

/**
 * THEMING
 */

const THEME_KEY = "theme";
const ACCENT_KEY = "accent";
initTheme();

function initTheme() {
  const accent = localStorage.getItem(ACCENT_KEY);
  if (accent) {
    document.documentElement.style.setProperty("--color-accent", accent);
    document.querySelector("input#color-picker")?.setAttribute("value", accent);
  }

  let theme = localStorage.getItem(THEME_KEY);
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    return;
  }

  // Default to user's OS preference
  const dark = window.matchMedia("(prefers-color-scheme: dark)");
  theme = dark.matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme(theme) {
  if (theme) {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
    return;
  }

  // If no theme is passed as an arg, toggle
  const old = localStorage.getItem(THEME_KEY);
  const next = old === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  document.documentElement.setAttribute("data-theme", next);
}

function updateAccentColor(color) {
  document.documentElement.style.setProperty("--color-accent", color);
}

function saveAccentColor(color) {
  localStorage.setItem(ACCENT_KEY, color);
}

/**
 * KEYBINDINGS
 */

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "l": {
      toggleTheme("light");
      break;
    }
    case "d": {
      toggleTheme("dark");
      break;
    }
  }
});
