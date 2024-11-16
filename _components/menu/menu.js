class Menu extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <menu id="controls">
        <button id="save" onclick="saveForOffline()">
          Save for offline <span data-shortcut>S</span>
        </button>
        <button id="unsave" onclick="unsaveFromOffline()">
          Unsave <span data-shortcut>U</span>
        </button>
        <button id="fullscreen" onclick="toggleFullscreen()">
          Toggle full <span data-shortcut>F</span>
        </button>
        <button id="widescreen" onclick="toggleWidescreen()">
          Toggle wide <span data-shortcut>W</span>
        </button>
      </menu>

      <style>
        @import "/_components/menu/menu.css";
      </style>
    `;
  }
}

customElements.define("only-menu", Menu);
