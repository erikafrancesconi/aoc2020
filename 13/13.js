// https://adventofcode.com/2020
const fs = require('fs');

fs.readFile('./input2.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').trim().split("\n");
  
  const myTimestamp = +(arr[0].replace(/\r/g, ''));
  const buses = arr[1].split(',').filter(val => val !== 'x').map(val => +val);
  const departures = buses.map(val => Math.round(myTimestamp / val) * val);
  const nextValidTimestamp = departures.filter(val => val > myTimestamp).sort((a, b) => a -b)[0];
  const idx = departures.indexOf(nextValidTimestamp);

  console.log('Answer 1', buses[idx] * (nextValidTimestamp - myTimestamp));
});