const fs = require('fs');
const Async = require('crocks/Async');
const R = require('ramda');

const { fromNode } = Async;
const readFile = R.nAry(2, fromNode(fs.readFile));

module.exports = {
  readFile
};
