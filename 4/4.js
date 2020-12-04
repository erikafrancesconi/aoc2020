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
    byr: /^19[2-9][0-9]|200[0-2]$/, // (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr: /^201[0-9]|2020$/, // (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr: /^202[0-9]|2030$/, // (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt: /^((1[5-8][0-9]cm)|(19[0-3]cm)|((59)|(6[0-9])|(7[0-6]))in)$/, // (Height) - a number followed by either cm or in:
      // If cm, the number must be at least 150 and at most 193.
      // If in, the number must be at least 59 and at most 76.
    hcl: /^#[0-f]{6}$/, // (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl: /^amb|blu|brn|gry|grn|hzl|oth$/, // (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid: /^[0-9]{9}$/, // (Passport ID) - a nine-digit number, including leading zeroes.
    // 'cid'
  };

  let validPassports = 0, validPassports2 = 0;

  const validateValues = obj => {
    let err = false;
    for (const field in requiredFields) {
      if (!requiredFields[field].test(obj[field])) {
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