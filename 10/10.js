// https://adventofcode.com/2020
const fs = require('fs');

fs.readFile('./input2.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').trim().split("\n");
  arr = arr.map(val => +val);
  arr.push(0);
  arr.sort((a, b) => a - b);
  arr.push(arr[arr.length - 1] + 3);
  console.log(arr.length);

  // console.log(arr);
  // console.log(arr.length);

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

  arr.forEach(val => {
    arr1[val] = arr1[val][arr1[val].length - 1];
  });
  // console.log(arr1);

  const valori = Object.values(arr1).filter(val => val !== undefined);
  const s = new Set();
  s.add(arr[0]);
  valori.forEach(val => {
    s.add(val);
  });

  // console.log(s);

  const factorialize = num => {
    if (num < 0) {
      return -1;
    } else if (num == 0)  {
      return 1;
    }
    else {
      return (num * factorialize(num - 1));
    }
  }

  const n = arr.length - s.size;
  console.log(n);

  let sum = 0;
  for (let k = 0; k <= n; k++) {
    sum += factorialize(n) / (factorialize(k) * factorialize(n-k));
  }
  // console.log(sum);

  // const start = arr[0];
  // const end = arr[arr.length - 1];

  // let valid = 0;
  
  // const traverse = item => {
  //   if (item === end) {
  //     valid++;
  //     return;
  //   }
  //   arr1['' + item].forEach(val => {
  //     traverse(val);
  //   })
  // }
  // traverse(start); // It never ends
  // console.log('Arrangements', valid);
});