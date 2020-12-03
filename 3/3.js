// https://adventofcode.com/2020/day/3
// Starting at the top-left corner of your map and following a slope of right 3 and down 1,
// how many trees would you encounter?

const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  const arr = data.toString('utf-8').split("\n").map(riga => riga.split(''));
  const numrows = arr.length;
  const rowlength = arr[0].length;
  const totalSquares = numrows * rowlength;

  const countTrees = (right, down) => {
    let row = 0, col = 0, numtrees = 0;
    
    for (let i = right; i < totalSquares && row < numrows - 1; i = i + right) {
      col += right;
      col = col >= rowlength ? col - rowlength : col;
      row += down;

      numtrees += arr[row][col] === '#' ? 1 : 0;
    }
    
    return numtrees;
  }
  
  console.time('1');
  console.log('Answer 1', countTrees(3, 1));
  console.timeEnd('1');


  // Use now the following slopes: 
  // Right 1, down 1.
  // Right 3, down 1. (This is the slope you already checked.)
  // Right 5, down 1.
  // Right 7, down 1.
  // Right 1, down 2.

  console.time('2');
  const coordinates = [[1,1], [3,1], [5,1], [7,1], [1,2]]
  const totaltrees = coordinates.reduce((acc, item) => {
    return acc * countTrees(item[0], item[1]);
  }, 1);
  console.log('Answer 2', totaltrees);
  console.timeEnd('2');
})

