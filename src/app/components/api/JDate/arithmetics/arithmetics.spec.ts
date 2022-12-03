/* بسم الله الرحمن الرحیم */

import { div, mod, round } from './arithmetics';

describe('round', () => {
  [
    [-12.2, -12],
    [-6410, -6410],
  ].forEach(([input, expectedOutput]) => {
    it(`should only return integer part of a negative number. input ${input} expecte output: ${expectedOutput}`, () => {
      expect(round(input)).toBe(expectedOutput);
    });
  });

  [
    [8654654684.25354545441, 8654654684],
    [0.0, 0],
    [1, 1],
  ].forEach(([input, expectedOutput]) => {
    it(`should only return integer part of a positive number. input: ${input} expected output: ${expectedOutput}`, () => {
      expect(round(input)).toBe(expectedOutput);
    });
  });
});

describe('div', () => {
  [
    [1, 1, 1],
    [1, 2, 0],
    [-1, 2, 0],
    [10, 3, 3],
    [11, -4, -2],
    [-12, -8, 1],
  ].forEach(([num1, num2, expectedOutput]) => {
    it(`should return only integer part of division result of two numbers. div(${num1}, ${num2}) === ${expectedOutput}`, () => {
      expect(div(num1, num2)).toBe(expectedOutput);
    });
  });
});

describe('mod', () => {
  [
    [10, 2, 0],
    [3, 2, 1],
    [-10, 3, -1],
  ].forEach(([num1, num2, expectedOutput]) => {
    it(`should return mod of two inputs. mod(${num1}, ${num2}) === ${expectedOutput}`, () => {
      expect(mod(num1, num2)).toBe(expectedOutput);
    });
  });
});
