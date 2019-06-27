const compose = require('crocks/helpers/compose');
const curry = require('crocks/helpers/curry');
// head :: [a] -> a
const head = xs => xs[0];
// split :: String -> String -> [String]
const split = curry((s, xs) => xs.split(s));
// toString :: a -> String
const toString = m => m.toString();
// has :: a -> Object -> Boolean
const has = curry((key, obj) => Object.prototype.hasOwnProperty.call(obj, key));
// getType :: Union a => a -> String
const getType = compose(head, split(' '), toString);
const ANY = 'ANY';
// matchWith :: Union a => {String: (b -> *)} -> a -> *
const matchWith = (defs, value) => {
  const type = getType(value);
  if (has(type, defs)) {
    return defs[type](value);
  } else if (has(ANY, defs)) {
    return defs[ANY](value);
  } else {
    throw new Error(`Could not find a match for ${value} in the provided defs (${Object.keys(defs).join(', ')}).

If you want a default to run, please import ANY from this file and add that to the object of definitions passed to matchWith.`);
  }
}
// Handle exports:
matchWith.ANY = ANY;
module.exports = matchWith;
