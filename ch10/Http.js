const fetch = require('isomorphic-fetch');
const Async = require('crocks/Async');
const nAry = require('crocks/helpers/nAry');
const compose = require('crocks/helpers/compose');

const { fromPromise, Rejected, Resolved } = Async;
const fetchAsync = nAry(2, fromPromise(fetch));

// Have to use this because response.json() returns a promise:
const promiseToAsync = p => Async((rej, res) => p.then(res).catch(res));
const jsonAsync = compose(promiseToAsync, x => x.json());

const Http = {};
Http.request = (url, options={}) => fetchAsync(url, options)
  .chain((response) => {
    if (response.status >= 200 && response.status < 300) {
      return Resolved(response);
    } else {
      return Rejected(`Error fetching ${url}: ${response.status} ${response.statusText}`);
    }
  })
  .chain(jsonAsync);

module.exports = Http;
