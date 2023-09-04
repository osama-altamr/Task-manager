const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
} = require("../math.js");

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);

  expect(total).toBe(13);
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test("Should convert 32F to 0C", () => {
  const fh = fahrenheitToCelsius(32);
  expect(fh).toBe(0);
});

test("Should convert 0C to 32F", () => {
    const fh = fahrenheitToCelsius(32);
    expect(fh).toBe(0);
  });
