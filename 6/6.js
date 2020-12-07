// https://adventofcode.com/2020
const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').trim().split("\n\n");

  let totalAnswers = 0, totalAnswers2 = 0;
  arr.forEach(row => {
    const m = new Map();

    const pieces = row.split('\n');
    const people = pieces.length;

    pieces.forEach(piece => {
      piece.split('').forEach(answer => {
        const cnt = m.has(answer) ? m.get(answer) + 1 : 1;
        m.set(answer, cnt);
      })
    })
    totalAnswers += m.size;

    const iterator = Array.from(m.values()).filter(val => val >= people);
    totalAnswers2 += iterator.length;
  })
  
  console.log('Total answers', totalAnswers);
  console.log('Total answers 2', totalAnswers2);
})