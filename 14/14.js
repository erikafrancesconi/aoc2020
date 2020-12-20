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

  let mem = {};
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

  console.log('Result 1', tot);

  const applyMaskAddress = (num, mask) => {
    num = num.padStart(mask.length, '0');
    const arrMask = mask.split('');
    const result = num.split('').reduce((acc, val, idx) => {
      acc += arrMask[idx] === '0' ? val : (arrMask[idx] === 'X' ? 'X' : '1');
      return acc;
    }, '');
    return result;
  }

  const reduceAddresses = address => {
    const baseNumber = toDecimal(address.replaceAll('X', '0'));

    const reversed = address.split('').reverse();
    const valuesToAdd = reversed.reduce((acc, val, idx) => {
      if (val === 'X') {
        const pow = Math.pow(2, idx);
        if (acc.length > 0) {
          acc.forEach(val => {
            acc.push(val + pow);
          })
        }
        acc.push(pow);
      }
      return acc;
    }, []);
    
    // console.log(valuesToAdd);

    const allAddresses = valuesToAdd.map(val => toBinary(baseNumber + val).padStart(address.length, '0'));
    allAddresses.push(toBinary(baseNumber).padStart(address.length, '0'));
    // console.log(allAddresses);
    return allAddresses;

  }

  mem = {};
  fullInstructions.forEach(set => {
    const { mask, instructions } = set;
    instructions.forEach(instruction => {
      const memId = instruction.substring(instruction.indexOf('[') + 1, instruction.indexOf(']'));
      const val = instruction.substring(instruction.indexOf('=') + 2);
      const address = applyMaskAddress(toBinary(memId), mask);
      reduceAddresses(address).forEach(val1 => {
        mem[val1] = toBinary(+val);
      });
    })
  });
  // console.log(mem);
  
  tot = 0;
  Object.keys(mem).forEach(idx => {
    tot += toDecimal(mem[idx]);
  })

  console.log('Result 2', tot);

});