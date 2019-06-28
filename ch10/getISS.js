const Http = require('./Http');
const Assign = require('crocks/Assign');
const { curry } = require('curry');
const arbitraryConcat = require('./arbitraryConcat');

const requestBatch = (...requests) => arbitraryConcat(Assign, requests);
const startPage = () => requestBatch(
  Http.request('http://api.open-notify.org/astros.json'),
  Http.request('http://api.open-notify.org/iss-now.json'),
  Http.request('https://gist.githubusercontent.com/anonymous/1295788c7bff052a1e8a/raw/6e109604c7a7f3efe77c8048bb2fe2f3e1cdcb7b/gistfile1.json')
).fork(handleError, renderISSInfo);

const handleError = (err) => {
  console.error(err);
};

const renderISSInfo = curry((data) => {
  const { people, iss_position, Reggae } = data;
  console.log(`Here is everyone on the ISS:
${people.map(({name}) => ` - ${name}`).join('\n')}

ISS is currently at:
  - lon: ${iss_position.longitude}
  - lat: ${iss_position.latitude}

Here are some reggae bands:
${Reggae.slice(0,10).map(x => ` - ${x}`).join('\n')}
`);
});

module.exports = startPage;
