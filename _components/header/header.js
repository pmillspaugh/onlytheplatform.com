class Header extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <header>
        <a href="/"><strong>only</strong>theplatform</a>
        <button id="toggle-dark" onClick="toggleTheme()">
          Dark <span data-shortcut>D</span>
        </button>
        <button id="toggle-light" onClick="toggleTheme()">
          Light <span data-shortcut>L</span>
        </button>
        <label for="color-picker">
          <div>
            <span>Pick an accent color</span>
            <input
              id="color-picker"
              type="color"
              value="#1fad36"
              oninput="updateAccentColor(event.target.value)"
              onchange="saveAccentColor(event.target.value)"
            />
          </div>
        </label>
      </header>

      <style>
        @import "/_styles/reset.css";
        @import "/_styles/globals.css";
        @import "/_components/header/header.css";
      </style>
    `;
  }
}

customElements.define("only-header", Header);
