import { expect, test, describe } from 'vitest';
import waterfoxLocation from '../src/index';

describe('waterfox-location module', () => {
  test('returns string or null', () => {
    const res = waterfoxLocation();
    expect(typeof res === 'string' || res === null).toBe(true);
  });
});
