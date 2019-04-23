export const connectedCells = (cellNameA, cellNameB) => {
  let NameXa = "";
  let NameYa = "";
  for (var i = 0; i < cellNameA.length; i++) {
    if (isNaN(cellNameA[i])) {
      NameXa += cellNameA[i]
    } else {
      NameYa += cellNameA[i]
    }
  }
  let NameXb = "";
  let NameYb = "";
  for (var i = 0; i < cellNameB.length; i++) {
    if (isNaN(cellNameB[i])) {
      NameXb += cellNameB[i];
    } else {
      NameYb += cellNameB[i];
    }
  }
  if (NameXa === NameXb) {
    const start = parseFloat(NameYa);
    const length = Math.abs(parseFloat(NameYb) - start + 1);
    return new Array(length).fill(0).map((_, i) => `${NameXa}${i + start}`);
  } else if (NameYa === NameYb) {
    const start = lettersToNum(NameXa);
    const length = Math.abs(lettersToNum(NameXb) - start + 1);
    return new Array(length).fill(0).map((_, i) => `${numToLetters(i + start)}${NameYa}`);
  } else {
    return [];
  }
}

export function isBetween(value, starts, ends, include) {
  for (var s = 0; s < starts.length; s++) {
    if (include) {
      if (value >= starts[s] && value <= ends[s]) {
        return true;
      }
    } else {
      if (value > starts[s] && value < ends[s]) {
        return true;
      }
    }
  }
  return false;
}

export function numToLetters(num) {
  const numSys = 26;
  const powers = [];
  const positions = [];
  let iniNum = num;
  let power = 0;
  while (num >= numSys) {
    num = Math.floor(num / numSys);
    powers.push(power);
    power++;
  }
  powers.push(powers.length);
  for (var i = 0; i < powers.length; i++) {
    const index = powers.length - 1 - i;
    const currPower = Math.pow(numSys, powers[index])
    const val = Math.floor(iniNum / currPower) * currPower;
    positions.push((val / currPower) + 65);
    iniNum -= val;
  }
  if (positions.length > 1) {
    positions[0]--;
  }
  return String.fromCharCode(...positions);
}

export function lettersToNum(letters) {
  const upper = letters.toUpperCase();
  let power = letters.length - 1;
  let num = 0;
  while (power >= 0) {
    const index = upper.length - 1 - power;
    const val = upper.charCodeAt(index) - 64
    num += val * Math.pow(26, power);
    power--;
  }
  num--;
  return num;
}