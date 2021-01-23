import { expect } from '@esm-bundle/chai';
import { sum } from '../sum.js';

describe('sum', () => {
    it('should be able to add two numbers', () => {
        expect(sum(3, 5)).to.be.equal(8);
    });
});