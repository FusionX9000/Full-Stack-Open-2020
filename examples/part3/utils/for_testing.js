const palindrome = (string) => string.split("").reverse().join("");

const average = (array) =>
  array.length === 0
    ? 0
    : array.reduce((sum, item) => sum + item) / array.length;

module.exports = { palindrome, average };
