const fetch = require('isomorphic-fetch');
const Async = require('crocks/Async');
const composeP = require('crocks/helpers/composeP');

const { fromPromise } = Async;

const Http = {};
Http.request = fromPromise((url, options={}) => composeP(
  (response) => response.json(),
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  },
  fetch
)(url, options));

module.exports = Http;
