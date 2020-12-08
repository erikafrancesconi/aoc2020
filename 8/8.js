// https://adventofcode.com/2020
const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').trim().split("\n");

  const instructions = arr.reduce((acc, val) => {
    acc.push({ instruction: val, count: 0 });
    return acc;
  }, []);

  console.log('Total instructions are', instructions.length);

  const copyarray = arr => {
    return arr.reduce((acc1, obj) => {
      acc1.push({instruction: obj.instruction, count: obj.count});
      return acc1;
    }, []);
  }

  const runInstructions = newArr => {
    let curr = 0, acc = 0;
    while (curr < newArr.length && newArr[curr].count === 0) {
      const what = newArr[curr].instruction.substring(0, 3);
      const sign = newArr[curr].instruction.substring(4, 5);
      const how = newArr[curr].instruction.substring(5);
  
      newArr[curr].count += 1;
      
      switch (what) {
        case 'acc':
          acc = sign === '+' ? acc + (+how) : acc - (+how);
          curr++;
          break;
        case 'jmp':
          curr = sign === '+' ? curr + (+how) : curr - (+how);
          break;
        case 'nop':
          curr++;
          break;
        default:
          break;
      }
  
      if (curr === newArr.length) {
        console.log('Yay');
        break;
      }
    }

    return acc;
  }

  console.log('Accumulator is', runInstructions(copyarray(instructions)));

  const fixAndRun = () => {
    let newArr = copyarray(instructions);

    let curridx = 0, acc = 0;
    while (newArr[newArr.length - 1].count === 0 && curridx < newArr.length) {
      newArr = copyarray(instructions);

      if (newArr[curridx].instruction.startsWith('acc')) {
        curridx++;
        continue;
      }

      if (newArr[curridx].instruction.startsWith('nop')) {
        newArr[curridx].instruction = newArr[curridx].instruction.replace('nop', 'jmp');
      } else {
        newArr[curridx].instruction = newArr[curridx].instruction.replace('jmp', 'nop');
      }

      acc = runInstructions(newArr); // Runs and then replaces it back

      if (newArr[curridx].instruction.startsWith('nop')) {
        newArr[curridx].instruction = newArr[curridx].instruction.replace('nop', 'jmp');
      } else {
        newArr[curridx].instruction = newArr[curridx].instruction.replace('jmp', 'nop');
      }
      curridx++;
    }

    return acc;
  }

  console.log('Correct Accumulator is', fixAndRun());
})