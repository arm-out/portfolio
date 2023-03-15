const template = document.createElement("template");
template.innerHTML = `<button></button>`;

class Counter extends HTMLElement {
	constructor() {
		super();
		this.count = 0;
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.shadowRoot.querySelector(
			"button"
		).innerText = `Times Pressed: ${this.count}`;
		this.shadowRoot.querySelector("button").onclick = () => {
			this.count++;
			this.shadowRoot.querySelector(
				"button"
			).innerText = `Times Pressed: ${this.count}`;
		};
	}
}

customElements.define("button-count", Counter);
