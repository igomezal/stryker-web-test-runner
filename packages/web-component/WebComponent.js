import { LitElement, html } from 'lit-element';

export class WebComponent extends LitElement {
  constructor() {
    super();

    this.count = 0;
    this.numberA = 0;
    this.numberB = 0;
  }

  static get properties() {
    return {
      count: {
        type: Number,
      },
      numberA: {
        type: Number,
        attribute: 'number-a',
      },
      numberB: {
        type: Number,
        attribute: 'number-b',
      },
    };
  }

  addOne() {
    this.count++;
  }

  sum(a, b) {
    return a + b;
  }

  compareGreaterThan18(a) {
    return a >= 18;
  }

  render() {
    return html`
      <h1>Example of stryker running with web-test-runner</h1>
      <section id="add-one">
        <p>Counted clicks: ${this.count}</p>
        <button @click=${this.addOne}>Click</button>
      </section>
      <section id="sum-two-numbers">
        <p>The sum of ${this.numberA} and ${this.numberB} is ${this.sum(this.numberA, this.numberB)}</p>
      </section>
    `;
  }
}