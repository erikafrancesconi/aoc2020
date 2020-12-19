// https://adventofcode.com/2020
const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').trim().split("\r\n");

  let fullInstructions = [], obj = {};
  arr.forEach(row => {
    if (row.startsWith('mask')) {
      if (Object.keys(obj).length > 0) {
        fullInstructions.push(obj);
      }
      obj = { mask: row.substring(7), instructions: [] }
    } else {
      obj.instructions.push(row);
    }
  });
  fullInstructions.push(obj);
  // console.log(fullInstructions);

  const toBinary = num => {
    return Number(num).toString(2);
  }

  const toDecimal = num => {
    return parseInt(num, 2);
  }

  const applyMask = (num, mask) => {
    num = num.padStart(mask.length, '0');
    const arrMask = mask.split('');
    const result = num.split('').reduce((acc, val, idx) => {
      acc += arrMask[idx] === 'X' ? val : arrMask[idx];
      return acc;
    }, '');
    return result;
  }

  const mem = {};
  fullInstructions.forEach(set => {
    const { mask, instructions } = set;
    instructions.forEach(instruction => {
      const memId = instruction.substring(instruction.indexOf('[') + 1, instruction.indexOf(']'));
      const val = instruction.substring(instruction.indexOf('=') + 2);
      mem[memId] = applyMask(toBinary(+val), mask);
    })
  });
  // console.log(mem);

  let tot = 0;
  for (idx in mem) {
    tot += toDecimal(mem[idx]);
  }

  console.log(tot);

});