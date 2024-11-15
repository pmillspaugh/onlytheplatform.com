class Footer extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
        Crafted by
        <a href="https://petemillspaugh.com">Pete</a>. Code is
        <a href="https://github.com/pmillspaugh/onlytheplatform.com">public</a>.
      </footer>

      <style>
        @import "/_components/footer/footer.css";
      </style>
    `;
  }
}

customElements.define("only-footer", Footer);
