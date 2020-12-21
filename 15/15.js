const input = '9,12,1,4,17,0,18'.split(',');
// console.log(input);

for (let i = input.length; i < 2020; i++) {
  const lastSpoken = input[i - 1];
  let indexes = [];
  if (input.filter((val, idx) => {
    if (val === lastSpoken) {
      indexes.push(idx);
      return true;
    }
    return false;
  }).length === 1) {
    input.push('0');
  } else {
    indexes = indexes.sort((a, b) => b - a);
    input.push('' + ((indexes[0] + 1) - (indexes[1] + 1)));
  }
}

// console.log(input);
console.log('Answer 1', input[2019]);