const compose = require('crocks/helpers/compose');
const curry = require('crocks/helpers/curry');
const head = xs => xs[0];
const split = curry((s, xs) => xs.split(s));
const toString = m => m.toString();
const has = curry((key, obj) => Object.prototype.hasOwnProperty.call(obj, key));
const getType = compose(head, split(' '), toString);
const ANY = 'ANY';
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
