/**
 * SERVICE WORKER REGISTRATION
 */

// An activated service worker can't manage the page that registered it until the next time you navigate to that page by reloading the page or reopening the PWA.
// Hence, register the service worker on the root `/` page so that it can proxy network requests after navigating to `./service-worker.js` (or any other page).

registerServiceWorker();
async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register(
      "/service-worker.js"
    );

    if (registration.installing) {
      console.log("Service worker installing");
    } else if (registration.waiting) {
      console.log("Service worker waiting");
    } else if (registration.active) {
      console.log("Service worker active");
    }
  }
}

checkSavedState();
async function checkSavedState() {
  const url = new URL(window.location.href);
  const cached = await caches.match(url);

  if (cached) {
    document.querySelector("#save")?.style.setProperty("display", "none");
  } else {
    document.querySelector("#unsave")?.style.setProperty("display", "none");
  }
}

async function saveForOffline() {
  const url = new URL(window.location.href);
  console.log(`Saving ${url.pathname} for offline...`);
  const cache = await caches.open("onlytheplatform");
  await cache.add(url);
  document.querySelector("#save").style.setProperty("display", "none");
  document.querySelector("#unsave").style.setProperty("display", "block");
}

async function unsaveFromOffline() {
  const url = new URL(window.location.href);
  console.log(`Unsaving ${url.pathname} from offline...`);
  const cache = await caches.open("onlytheplatform");
  await cache.delete(url);
  document.querySelector("#unsave").style.setProperty("display", "none");
  document.querySelector("#save").style.setProperty("display", "block");
}

/**
 * THEMING
 */

const THEME_KEY = "theme";
const ACCENT_KEY = "accent";
const SCREEN_KEY = "screen";

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
  } else {
    // Default to user's OS preference
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    theme = dark.matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  let screen = localStorage.getItem(SCREEN_KEY);
  if (screen === "wide") {
    document.documentElement.style.setProperty("--max-width", "1000px");
  }
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

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

function toggleWidescreen() {
  let screen = localStorage.getItem(SCREEN_KEY);
  if (!screen || screen === "normal") {
    document.documentElement.style.setProperty("--max-width", "1000px");
    localStorage.setItem(SCREEN_KEY, "wide");
  } else {
    document.documentElement.style.setProperty("--max-width", "640px");
    localStorage.setItem(SCREEN_KEY, "normal");
  }
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
    case "s": {
      saveForOffline();
      break;
    }
    case "u": {
      unsaveFromOffline();
      break;
    }
    case "f": {
      toggleFullscreen();
      break;
    }
    case "w": {
      toggleWidescreen();
      break;
    }
  }
});
