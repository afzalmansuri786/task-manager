const {
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  add,
} = require("../src/math.js");

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
  console.log("Total", total);
});

test("Should calculate total with tip .25", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test("Should convert 32 F to 0 C", () => {
  const temp = fahrenheitToCelsius(32);
  expect(temp).toBe(0);
});
test("Should convert 0 C to 32 F", () => {
  const temp = celsiusToFahrenheit(0);
  expect(temp).toBe(32);
});

test("Should add two numbers", (done) => {
  add(2, 5).then((sum) => {
    expect(sum).toBe(7);
    done();
  });
});

test("Should add two number using async/await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
