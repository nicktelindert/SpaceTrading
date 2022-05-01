import {generateMinMaxNumber} from '../utils/numbers.js';


test('generateMinMaxNumber should generate a number between 1 and 10', () => {
  const result = generateMinMaxNumber(1, 10);
  expect(result).toBeGreaterThanOrEqual(1);
  expect(result).toBeLessThanOrEqual(10);
});
