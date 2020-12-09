// https://adventofcode.com/2020
const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').trim().split("\n");

  const preambole = 25;
  let invalidNumber = 0;
  for (let i = preambole; i < arr.length; i++) {
    const sum = +arr[i];
    let found = false;
    for (let j = i - preambole; j < i; j++) {
      const check1 = +arr[j];
      const check2 = arr.find((val, idx) => {
        if (idx >= i - preambole && idx < j) {
          if (+val !== check1 && (+val + check1 === sum)) {
            return true;
          }
        }
        return false;
      });
      if (check2) {
        found = true;
        break;
      }
    }
    if (!found) {
      invalidNumber = sum;
      break;
    }
  }
  console.log('First orphan number is', invalidNumber);

  const newArr = arr.filter(val => +val < invalidNumber);

  let currSum = 0, foundNumbers = [];
  for (let i = 1; i < newArr.length; i++) {
    let j = i, found = false, myarr = [];
    currSum = +newArr[i];
    myarr.push(+newArr[i]);
    while (currSum < invalidNumber) {
      j--;
      currSum += +newArr[j];
      myarr.push(+newArr[j]);

      if (currSum === invalidNumber) {
        found = true;
        break;
      }
    }

    if (found) {
      foundNumbers = [...myarr];
      break;
    }
  }

  foundNumbers = foundNumbers.sort((a, b) => a - b);
  console.log('Encryption weakness', foundNumbers[0] + foundNumbers[foundNumbers.length - 1]);

});