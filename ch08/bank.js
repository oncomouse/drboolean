// var Maybe = require('./Maybe');
var Maybe = require('crocks/Maybe');
var option = require('crocks/pointfree/option');
var R = require('ramda');
const { Nothing, Just, zero } = Maybe;

var withdraw = R.curry((amount, account) => R.ifElse(
  R.compose(
    R.gte(R.__, amount),
    R.prop('balance')
  ),
  R.compose(
    Maybe.of,
    R.evolve({ balance: R.subtract(R.__, amount) })
  ),
  Nothing
)(account))
var finishTransaction = R.compose(
  R.replace('{{balance}}', R.__, 'Your balance is ${{balance}}'),
  R.prop('balance')
);
var get20 = R.compose(option('You\'re Broke!'), R.map(finishTransaction), withdraw(20));

module.exports = {
  withdraw,
  get20
};
