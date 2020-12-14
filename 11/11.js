// https://adventofcode.com/2020
const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').trim().split("\n");
  arr = arr.map(row => row.split(''));
  // console.log(arr);

  const countOccupied = matrix => {
    let occupied = 0;
    matrix.forEach(row => {
      occupied += row.filter(seat => seat === '#').length;
    })
    return occupied;
  }

  const checkFree = (matrix, idrow, idcol, what, limit=0) => {
    let row, col;
    switch (what) {
      case 'up':
        row = idrow - 1;
        col = idcol;
        break;
      case 'left':
        row = idrow;
        col = idcol - 1;
        break;
      case 'right':
        row = idrow;
        col = idcol + 1;
        break;
      case 'down':
        row = idrow + 1;
        col = idcol;
        break;
      case 'upleft':
        row = idrow - 1;
        col = idcol - 1;
        break;
      case 'upright':
        row = idrow - 1;
        col = idcol + 1;
        break;
      case 'downleft':
        row = idrow + 1;
        col = idcol - 1;
        break;
      case 'downright':
        row = idrow + 1;
        col = idcol + 1;
        break;
      default:
        break;
    }

    if (row < 0 || col < 0 || row >= matrix.length || col >= matrix[row].length || matrix[row][col] === 'L') {
      return true;
    }
    if (matrix[row][col] === '#') {
      return false;
    }
    if (limit === 1) {
      return true;
    }
    
    return checkFree(matrix, row, col, what, limit);
  }

  const movePeople = (matrix, toCheck=0, maxOccupied=4) => {
    return matrix.reduce((acc, row, idxrow, originalmatrix) => {
      acc.push(row.map((val, idx) => {
        let newval = val;
        switch (val) {
          case 'L':
            if (
                checkFree(originalmatrix, idxrow, idx, 'up', toCheck)
                && checkFree(originalmatrix, idxrow, idx, 'left', toCheck)
                && checkFree(originalmatrix, idxrow, idx, 'down', toCheck)
                && checkFree(originalmatrix, idxrow, idx, 'right', toCheck)
                && checkFree(originalmatrix, idxrow, idx, 'upleft', toCheck)
                && checkFree(originalmatrix, idxrow, idx, 'upright', toCheck)
                && checkFree(originalmatrix, idxrow, idx, 'downleft', toCheck)
                && checkFree(originalmatrix, idxrow, idx, 'downright', toCheck)
            ) { newval = '#'; }
            break;
          case '#':
            let noccupied = 0;
            if (!checkFree(originalmatrix, idxrow, idx, 'up', toCheck)) {
              noccupied++;
            }
            if (!checkFree(originalmatrix, idxrow, idx, 'left', toCheck)) {
              noccupied++;
            }
            if (!checkFree(originalmatrix, idxrow, idx, 'down', toCheck)) {
              noccupied++;
            }
            if (!checkFree(originalmatrix, idxrow, idx, 'right', toCheck)) {
              noccupied++;
            }
            if (!checkFree(originalmatrix, idxrow, idx, 'upleft', toCheck)) {
              noccupied++;
            }
            if (!checkFree(originalmatrix, idxrow, idx, 'upright', toCheck)) {
              noccupied++;
            }
            if (!checkFree(originalmatrix, idxrow, idx, 'downleft', toCheck)) {
              noccupied++;
            }
            if (!checkFree(originalmatrix, idxrow, idx, 'downright', toCheck)) {
              noccupied++;
            }
            if (noccupied >= maxOccupied) {
              newval = 'L';
            }
          default:
            break;
        }
        return newval;
      }))
      return acc;
    }, []);
  }

  // 1
  let occupati = countOccupied(arr), newMatrix = arr;
  do {
    newMatrix = movePeople(newMatrix, 1);
    if (countOccupied(newMatrix) === occupati) {
      break;
    }
    occupati = countOccupied(newMatrix);
  } while (true);

  console.log('Occupati', occupati);

  // 2
  occupati = countOccupied(arr), newMatrix = arr;
  do {
    newMatrix = movePeople(newMatrix, 0, 5);
    if (countOccupied(newMatrix) === occupati) {
      break;
    }
    occupati = countOccupied(newMatrix);
  } while (true);

  console.log('Occupati', occupati);

})