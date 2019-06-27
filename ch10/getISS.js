const Http = require('./Http');
const Async = require('crocks/Async');
const { curry, identity, mergeLeft } = require('ramda');

const startPage = () => Async.of(mergeLeft).ap(Http.request('http://api.open-notify.org/astros.json')).ap(Http.request('http://api.open-notify.org/iss-now.json')).fork(handleError, renderISSInfo);

const handleError = (err) => {
  console.error(err);
};

const renderISSInfo = curry(({ people, iss_position }) => {
  console.log(`Here is everyone on the ISS:
${people.map(({name}) => ` - ${name}`).join('\n')}

ISS is currently at:
  - lon: ${iss_position.longitude}
  - lat: ${iss_position.latitude}
`);
});

module.exports = startPage;
