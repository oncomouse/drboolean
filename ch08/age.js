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
  either(
    R.identity,
    R.ifElse(
      (date) => date.isValid(),
      Ok,
      R.always(Err('Unable to Parse Date'))
    )
  ),
  R.map((date) => moment(date, 'YYYY-MM-DD')),
  safeProp('birthdate')
)(user));

// var getAge = R.curry(function(now, user) {
//   var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
//   return birthdate.isValid() ? Ok(now.diff(birthdate, 'years')) : Err('Birth date could not be parsed');
// });
var fortune = R.compose(R.concat('If you survive, you will be '), R.toString, R.add(1));
var zoltar = R.compose(console.log, either(R.identity, fortune), getAge(moment()));

module.exports = {
  getAge,
  fortune,
  zoltar,
};
