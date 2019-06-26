var R = require('ramda');
var fl = require('fantasy-land');
var Maybe = function (x) {
  this.__value = x;
}
Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}
Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}
Maybe.of = (x) => (new Maybe(x));

Maybe.get = R.curry((x, m) => m.isNothing() ? x : m.__value);
Maybe.getWith = R.curry((x, f, m) => Maybe.get(x, m.map(f)));
// Fantasy Land Bindings:
Maybe[fl['of']] = Maybe.of;
Maybe.prototype[fl['map']] = Maybe.prototype.map;
module.exports = Maybe;
