// https://adventofcode.com/2020
const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').trim().split("\n");

  const objColors = {};

  arr.forEach(rule => {
    const color = rule.substr(0, rule.indexOf(' bags contain'));
    objColors[color] = { children: [], parents: []};
  })

  const getNumber = color => {
    let re = /[0-9]+/g;
    let result = re[Symbol.match](color);
    if (result.length > 0) {
      return result[0];
    }
  }

  const cleanColor = color => {
    return color.replace(/bag(s)*/g, '').replace(/[1-9]/g, '').replace(/\./g, '').trim();
  }

  arr.forEach(rule => {
    const color = rule.substr(0, rule.indexOf(' bags contain'));
    const content = rule.substr(rule.indexOf(' bags contain') + 14);
    content.split(',').forEach(item => {
      const toAdd = cleanColor(item);
      if (toAdd !== 'no other') {
        const number = getNumber(item);

        const obj = {};
        obj[toAdd] = +number;
        objColors[color].children.push(obj);
        objColors[toAdd].parents.push(color);
      }
    })
  })

  const getParents = (s, toFind) => {
    const arr = objColors[toFind].parents;
    
    arr.forEach(par => {
      s.add(par);
      getParents(s, par);
    })
  }
  
  const s = new Set();
  getParents(s, 'shiny gold');
  console.log('Containers', s.size);

  const getContent = toFind => {
    const arr = objColors[toFind].children;
    if (arr.length === 0) {
      return 0;
    }

    let total = 0;
    arr.forEach(obj => {
      for (const [key, value] of Object.entries(obj)) {
        total += value;
        total += value * getContent(key);
      }
    })

    return total;
  }

  console.log('Content size', getContent('shiny gold'));
})