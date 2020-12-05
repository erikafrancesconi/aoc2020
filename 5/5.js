// https://adventofcode.com/2020
const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').split("\n");

  const rows = new Array(128);
  for (let i = 0; i < rows.length; i++) {
    rows[i] = i;
  }

  const seats = new Array(8);
  for (let i = 0; i < seats.length; i++) {
    seats[i] = i;
  }

  const ids = [];
  
  const aircraft = new Array(128);
  for (let i = 0; i < aircraft.length; i++) {
    aircraft[i] = [0, 0, 0, 0, 0, 0, 0, 0];
  }
  
  arr.forEach(seat => {
    const row = seat.split('').reduce((acc, letter) => {
      switch (letter) {
        case 'F':
          acc[0].splice(acc[0].length / 2);
          break;
        case 'B':
          acc[0].splice(0, acc[0].length / 2)
          break;
        case 'L':
          acc[1].splice(acc[1].length / 2);
          break;
        case 'R':
          acc[1].splice(0, acc[1].length / 2);
          break;
        default:
          break;
      }
      return acc;
    }, [[...rows], [...seats]]);

    ids.push(row[0][0] * 8 + row[1][0]);
    aircraft[row[0][0]][row[1][0]] = 'X';
  });

  console.log('Highest Occupied ID', ids.sort((a, b) => b - a)[0]);
  
  let freeSeats = aircraft.reduce((acc, val, idx) => {
    if (val.filter(v => v === 0).length === 8) {
      // Le righe completamente vuote le elimino
      return acc;
    }
    const obj = {};
    obj[idx] = val;
    acc.push(obj);
    return acc;
  }, []);

  freeSeats = freeSeats.filter(row => Object.values(row).flat().includes(0)); // Tengo solo quelle con posti liberi

  // Devo considerare che il posto prima e quello dopo il mio sono occupati
  let myseat = 0;
  freeSeats.forEach(row => {
    const keys = Object.keys(row);
    const s = row[keys[0]];
    for (let i = 0; i < s.length; i++) {
      if (s[i] === 0 && i > 0 && i < s.length - 1 && s[i - 1] !== 0 && s[i + 1] !== 0) {
        myseat = keys[0] * 8 + i;
      }
    }
  })

  console.log('My seat is', myseat);
})