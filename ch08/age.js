var Result = require('crocks/Result');
var either = require('crocks/pointfree/either');
var R = require('ramda');
var moment = require('moment');

var { Err, Ok } = Result;

const safeProp = R.curry(R.compose(
  R.ifElse(R.equals(undefined), R.always(Err('Could Not Find Prop')), Ok),
  R.prop
));

var getAge = R.curry((now, user) => R.compose(
  R.map(
    (date) => now.diff(date, 'years')
  ),
  R.chain((date) => date.isValid() ? Result.of(date) : Err('Unable to parse date.')),
  R.chain((date) => Result.of(moment(date, 'YYYY-MM-DD'))),
  safeProp('birthdate')
)(user));

var fortune = R.compose(R.concat('If you survive, you will be '), R.toString, R.add(1));
var zoltar = R.compose(console.log, either(R.identity, fortune), getAge(moment()));

module.exports = {
  getAge,
  fortune,
  zoltar,
};
