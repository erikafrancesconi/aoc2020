// https://adventofcode.com/2020/day/2
// Each line gives the password policy and then the password.
// The password policy indicates the lowest and highest number of times
// a given letter must appear for the password to be valid.
// For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.
// How many passwords are valid according to their policies?

const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  console.time('1');
  const arr = data.toString('utf-8').split("\n");
  const mapped = arr.map(val => {
    const pieces = val.split(' ');
    return {
      min: pieces[0].substr(0, pieces[0].indexOf('-')),
      max: pieces[0].substr(pieces[0].indexOf('-') + 1),
      letter: pieces[1].substr(0, 1),
      password: pieces[2]
    };
  })

  let valid = 0;
  mapped.forEach(obj => {
    const pwdArr = obj.password.split('');
    const filtered = pwdArr.filter(val => val === obj.letter);
    if (filtered.length >= obj.min && filtered.length <= obj.max) {
      valid++;
    }
  })

  console.log('Valid passwords', valid);
  console.timeEnd('1');

  // Each policy actually describes two positions in the password,
  // where 1 means the first character, 2 means the second character, and so on. 
  // (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) 
  // Exactly one of these positions must contain the given letter.
  // How many passwords are valid according to the new interpretation of the policies?
  console.time('2');

  valid = 0;
  mapped.forEach(obj => {
    const pwdArr = obj.password.split('');
    const filtered = pwdArr.filter((val, index) => {
      if (val === obj.letter && (index === obj.min-1 || index === obj.max-1)) {
        return true;
      }
    });
    if (filtered.length === 1) {
      valid++;
    }
  });
  console.log('Valid passwords', valid);
  console.timeEnd('2');
})