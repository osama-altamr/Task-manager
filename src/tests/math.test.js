const {
  calculateTip,
  fahrenheitToCelsius,
  add,
  celsiusToFahrenheit,
} = require("../math.js");


require("dotenv").config({ path: `${__dirname}/./config/test.env` });

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
  const fh = celsiusToFahrenheit(0);
  expect(fh).toBe(32);
});

// test("Async test demo", (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 2000);
// });

// test("Should add tow numbers", (done) => {
//   add(1, 4).then((result) => {
//     expect(result).toBe(5);
//     done();
//   });
// });

test("Should add tow numbers async/await", async () => {
  const sum = await add(2, 5);
  expect(sum).toBe(7);
});
