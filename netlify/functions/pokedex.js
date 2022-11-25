// mod.cjs
// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const chalk = require('chalk');
const { DateTime } = require('luxon');

exports.handler = async function (event, context) {
  const eventBody = JSON.parse(event.body);
  const date = DateTime.now();
  const color = eventBody.region === 'kanto' ? chalk.yellowBright : chalk.greenBright;

  console.log(color(`${date}: Fetching data from PokeAPI for the `) + color.bold(`${eventBody.region.toUpperCase()}`) + color(' region'));
  console.log(color(`\teventBody.region: ${eventBody.region}`));

  const POKE_API = `https://pokeapi.co/api/v2/pokedex/${eventBody.region}`;

  const response = await fetch(POKE_API);
  const data = await response.json();

  console.log(color(`\tNumber of entries retrieved: ${data.pokemon_entries.length}`));

  return {
    statusCode: 200,
    body: JSON.stringify({ pokemon: data.pokemon_entries }),
  };
};
