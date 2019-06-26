// var fl = require('fantasy-land');
var R = require('ramda');
var IO = require('crocks/IO');
// var Maybe = require('crocks/Maybe');
var safe = require('crocks/Maybe/safe');

// url :: _ -> IO String
var url = IO(() => 'https://andrew.pilsch.com?foo=bar&head=baz&blam=bang&barge=birb');
// toPairs :: String -> [[String]]
var toPairs = R.compose(R.map(R.split('=')), R.split('&'));
// params :: String -> [[String]]
var params = R.compose(toPairs, R.last, R.split('?'));
// findParam :: String -> IO Maybe [String]
var findParam = (key) => R.map(
  R.compose(
    R.map(R.head),
    safe(R.compose(R.gt(R.__, 0), R.length)),
    R.filter(R.compose(R.equals(key), R.head)),
    params,
  ),
  url
);

module.exports = {
  findParam
};
