// module.test.js
import mut from './module.js'; // MUT = Module Under Test

//test case for sum
test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

// Test cases for div()
test('Testing div -- normal division', () => {
    const expected = 2;
    const got = mut.div(10, 5);
    expect(got).toBe(expected);
});

test('Testing div -- division by zero', () => {
    expect(() => {
        mut.div(10, 0);
    }).toThrow('Division by zero is not allowed');
});

test('Testing div -- division with negative numbers', () => {
    const expected = -5;
    const got = mut.div(-10, 2);
    expect(got).toBe(expected);
});

test('Testing div -- division with decimals', () => {
    const expected = 2.5;
    const got = mut.div(5, 2);
    expect(got).toBeCloseTo(expected);
});

test('Testing div -- large numbers', () => {
    const expected = 5e8;
    const got = mut.div(1e9, 2);
    expect(got).toBe(expected);
});

test('Testing div -- small decimal values', () => {
    const expected = 0.01;
    const got = mut.div(0.0001, 0.01);
    expect(got).toBeCloseTo(expected);
});

// Test cases for containsNumbers()
test('Testing containsNumbers -- contains a number', () => {
    const text = 'Hello123';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
});

test('Testing containsNumbers -- no numbers', () => {
    const text = 'HelloWorld';
    const result = mut.containsNumbers(text);
    expect(result).toBe(false);
});

test('Testing containsNumbers -- empty string', () => {
    const text = '';
    const result = mut.containsNumbers(text);
    expect(result).toBe(false);
});

test('Testing containsNumbers -- mixed characters', () => {
    const text = 'abc$#123';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
});

test('Testing containsNumbers -- only special characters', () => {
    const text = '$#@!';
    const result = mut.containsNumbers(text);
    expect(result).toBe(false);
});

test('Testing containsNumbers -- Unicode or non-standard characters', () => {
    const text = '你好123';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
});

test('Testing containsNumbers -- number-like characters with decimal', () => {
    const text = '1.23';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
});

test('Testing containsNumbers -- number-like characters with exponential', () => {
    const text = '3e10';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
});