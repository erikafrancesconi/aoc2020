// https://adventofcode.com/2020
const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').trim().split("\n");
  arr = arr.map(val => +val);
  arr.push(0);
  arr.sort((a, b) => a - b);
  arr.push(arr[arr.length - 1] + 3);

  let ones = 0, threes = 0;
  for (let i = 0; i < arr.length; i++) {
    const diff = arr[i+1] - arr[i];
    if (diff === 1) {
      ones++;
    }
    if (diff === 3) {
      threes++;
    }
  }
  console.log('One jolt', ones);
  console.log('Three jolt', threes);
  console.log('Multiplied', ones * threes);

  const arr1 = arr.reduce((acc, val) => {
    acc[val] = [];
    return acc;
  },{});

  arr.forEach(val => {
    const children = arr.filter(val1 => val1 > val && val1 <= val + 3);
    arr1[val] = children;
  });

  console.log(arr1);
  const start = arr[0];
  const end = arr[arr.length - 1];

  let valid = 0;
  
  const traverse = item => {
    if (item === end) {
      valid++;
      return;
    }
    arr1['' + item].forEach(val => {
      traverse(val);
    })
  }
  traverse(start); // It never ends
  console.log('Arrangements', valid);
});