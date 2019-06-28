const Maybe = require('crocks/Maybe');
const Max = require('crocks/Max');
const safeLift = require('crocks/Maybe/safeLift');
const isNumber = require('crocks/predicates/isNumber')
const mapReduce = require('crocks/helpers/mapReduce')
const { Nothing } = Maybe;

// data :: [ * ]
const data =
  [ '100', null, 3, true, 1 ]

// safeMax :: [ * ] -> Maybe Max
const safeMax = mapReduce(
  safeLift(isNumber, Max),
  (y, x) => y.concat(x).alt(y).alt(x),
  Nothing()
);

safeMax.data = data;
module.exports = safeMax;
