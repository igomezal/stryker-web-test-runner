import { expect } from '@esm-bundle/chai';
import { fixture, html, nextFrame } from '@open-wc/testing';

import '../web-component.js';

describe('web-component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<web-component></web-component>`);
  });

  describe('addOne', () => {
    it('should have a default value for count variable equals to 0', () => {
      expect(element.count).to.be.equal(0);
    });

    it('should add one unit to the count variable', () => {
      element.addOne();
      expect(element.count).to.be.equal(1);
    });
  });

  describe('sum', () => {
    it('should be able to add two numbers', () => {
      expect(element.sum(3, 5)).to.be.equal(8);
    });
  });

  describe('compareGreaterThan18', () => {
    it('should return true if the number is greater than 18', () => {
      expect(element.compareGreaterThan18(27)).to.be.true;
    });

    /* Tests to kill mutants */
    it('should return false if the number is lower than 18', () => {
      expect(element.compareGreaterThan18(9)).to.be.false;
    });

    it('should return true if the number is equal to 18', () => {
      expect(element.compareGreaterThan18(18)).to.be.true;
    });
  });

  describe('render', () => {
    it('should add one when clicking into the button', () => {
      element.shadowRoot.querySelector('button').click();
      expect(element.count).to.be.equal(1);
    });

    it('should render the result of 3 plus 5', async () => {
      const elementSum = await fixture(html`<web-component number-a="3" number-b="5"></web-component>`);
      const sumTwoNumbersP = elementSum.shadowRoot.querySelector('#sum-two-numbers p');
      expect(sumTwoNumbersP.innerText).to.be.equal('The sum of 3 and 5 is 8');
    });
  });
});