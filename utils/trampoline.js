const { is } = require('ramda')
const trampoline = (fun) => (...args) => {
  var result = fun.apply(fun, args);

  while (is(Function, result)) {
    result = result();
  }

  return result;
};

module.exports = trampoline;
