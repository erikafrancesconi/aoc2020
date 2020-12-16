// https://adventofcode.com/2020
const fs = require('fs');
const { posix } = require('path');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').trim().split("\n");

  const moveShip = (currpos, instruction) => {
    let mypos = {...currpos};
    const waipoint = typeof mypos.waipoint !== 'undefined' ? true : false;

    const direction = instruction.substring(0, 1);
    const num = +instruction.substring(1).replace(/\r/g, '');

    let directions = ['N', 'E', 'S', 'W'];

    let rotate;
    
    switch (direction) {
        case 'N':
            if (waipoint) {
                mypos.waipoint.y -= num;
            } else {
                mypos.y -= num;
            }
            break;
        case 'S':
            if (waipoint) {
                mypos.waipoint.y += num;
            } else {
                mypos.y += num;
            }
            break;
        case 'E':
            if (waipoint) {
                mypos.waipoint.x += num;
            } else {
                mypos.x += num;
            }
            break;
        case 'W':
            if (waipoint) {
                mypos.waipoint.x -= num;
            } else {
                mypos.x -= num;
            }
            break;
        case 'L':
            rotate = num / 90;
            if (waipoint) {
                let x, y;
                for (let i = 0; i < rotate; i++) {
                    x = mypos.waipoint.x, y = mypos.waipoint.y
                    mypos.waipoint.y = x < 0 ? Math.abs(x) : -Math.abs(x);
                    mypos.waipoint.x = y;
                }
            } else {
                directions = directions.splice(directions.indexOf(mypos.going) + 1).concat(directions);
                mypos.going = directions[directions.indexOf(mypos.going) - rotate];
            }
            break;
        case 'R':
            rotate = num / 90;
            if (waipoint) {
                let x, y;
                for (let i = 0; i < rotate; i++) {
                    x = mypos.waipoint.x, y = mypos.waipoint.y
                    mypos.waipoint.y = x;
                    mypos.waipoint.x = y < 0 ? Math.abs(y) : -Math.abs(y);
                }
            } else {
                directions = directions.concat(directions.splice(0, directions.indexOf(mypos.going)));
                mypos.going = directions[directions.indexOf(mypos.going) + rotate];
            }
            break;
        case 'F':
            if (waipoint) {
                mypos.x = mypos.x + (mypos.waipoint.x * num);
                mypos.y = mypos.y + (mypos.waipoint.y * num);
            } else {
                mypos = moveShip(mypos, instruction.replace('F', mypos.going));
            }
            break;
    }

    return mypos;
  }

  let pos = {x: 0, y: 0, going: 'E'};
  arr.forEach(instr => {
    pos = moveShip(pos, instr);
  });

  console.log('Answer 1', Math.abs(pos.x) + Math.abs(pos.y));

  let pos1 = {x: 0, y: 0, going: 'E', waipoint: {x: 10, y: -1}};
  arr.forEach(instr => {
    pos1 = moveShip(pos1, instr);
  });

  console.log('Answer 2', Math.abs(pos1.x) + Math.abs(pos1.y));

});