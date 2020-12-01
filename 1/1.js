// https://adventofcode.com/2020/day/1
// find the two entries that sum to 2020 and then multiply those two numbers together

const fs = require('fs');

fs.readFile('./input1', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  console.time('1');
  const arr = data.toString('utf-8').split("\n");
  let num1, num2;

  for (let i = 0; i < arr.length; i++) {
    let found = false;
    num2 = arr.find(val => (+arr[i]) + (+val) === 2020);
    
    if (num2) {
      num1 = arr[i];
      break;
    }
  }
  console.log("Numbers are", num1, num2); // 1886, 134
  console.log("Result is", num1*num2); // 252724
  console.timeEnd('1');

  // find three numbers in your expense report that meet the same criteria
  console.time('2');
  let num3;
  for (let i = 0; i < arr.length; i++) {
    let found = false;
    for (let j = 0; j < arr.length; j++) {
      num3 = arr.find(val => (+arr[i]) + (+arr[j]) + (+val) === 2020);

      if (num3) {
        num1 = arr[i];
        num2 = arr[j];
        break;
      }
    }
    if (num3) {
      break;
    }
  }

  console.log("Numbers are", num1, num2, num3); // 1886, 134
  console.log("Result is", num1*num2*num3); // 252724
  console.timeEnd('2');
})