const concat = require('crocks/pointfree/concat');
const valueOf = require('crocks/pointfree/valueOf');
const liftN = require('crocks/helpers/liftN');
const nAry = require('crocks/helpers/nAry');
const compose = require('crocks/helpers/compose');
const curry = require('crocks/helpers/curry');
const map = require('crocks/pointfree/map');
const { flip, length, reduce } = require('ramda');

const arbitraryConcat = curry((m, xs) => compose(
  map(valueOf),
  xs => liftN(
    length(xs), // How many arguments our lifted function will take
    nAry(length(xs), (...ys) => reduce(flip(concat), m["empty"](), ys)), // Use reduce and cat to cat up the array of Monoids we will eventuall build.
    ...xs // Pass the list as arguments
  ),
  map(map(m)), // Wrap the contents in a Monoid
)(xs));

module.exports = arbitraryConcat;
