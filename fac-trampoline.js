const trampoline = require('./utils/trampoline');

const factorial = (n) => trampoline(function myself(acc, n) {
  return n ? () => myself(acc * n, n - 1) : acc
})(1, n)

module.exports = factorial;
