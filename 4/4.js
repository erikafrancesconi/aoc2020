// https://adventofcode.com/2020/day/4
// Count the number of valid passports - those that have all required fields.
// Treat cid as optional. In your batch file, how many passports are valid?

const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  let arr = data.toString('utf-8').split("\n\n");
  arr = arr.map(riga => riga.replace(/\n/g, ' ')).map(riga => {
    const pieces = riga.split(' ');
    return pieces.reduce((acc, item) => {
      acc[item.substr(0, item.indexOf(':'))] = item.substr(item.indexOf(':') + 1);
      return acc;
    }, {});
  });;

  const requiredFields = {
    byr: '1933', 
    iyr: '2019',
    eyr: '2029',
    hgt: '187cm',
    hcl: '#888785',
    ecl: 'amb',
    pid: '937877382',
    // 'cid'
  };

  let validPassports = 0, validPassports2 = 0;

  const validateValues = obj => {
    let err = false;
    for (const field in requiredFields) {
      if (obj[field] !== requiredFields[field]) {
        err = true;
        break;
      }
    }
    return err ? 0 : 1;
  }

  arr.forEach(pass => {
    if(Object.keys(requiredFields).every(el => pass.hasOwnProperty(el))) {
      validPassports++;
      validPassports2 += validateValues(pass);
    }
  })

  console.log('Valid Passports', validPassports);
  console.log('Valid Passports 2', validPassports2);
})