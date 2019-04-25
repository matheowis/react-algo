export const connectedCells = (cellNameA, cellNameB) => {
  const a = splitCellName(cellNameA);
  const b = splitCellName(cellNameB);
  if (a.x === b.x) {
    const length = Math.abs(b.y - a.y + 1);
    return new Array(length).fill(0).map((_, i) => `${numToLetters(a.x)}${i + a.y}`);
  } else if (a.y === b.y) {
    const length = Math.abs(lettersToNum(b.x) - a.x + 1);
    return new Array(length).fill(0).map((_, i) => `${numToLetters(i + a.x)}${a.y}`);
  } else {
    return [];
  }
}
// export const connectedCells = (cellNameA, cellNameB) => {
//   const a = splitCellName(cellNameA);
//   const b = splitCellName(cellNameB);
//   if (a.x === b.x) {
//     const start = parseFloat(a.y);
//     const length = Math.abs(parseFloat(b.y) - start + 1);
//     return new Array(length).fill(0).map((_, i) => `${a.x}${i + start}`);
//   } else if (a.y === b.y) {
//     const start = lettersToNum(a.x);
//     const length = Math.abs(lettersToNum(b.x) - start + 1);
//     return new Array(length).fill(0).map((_, i) => `${numToLetters(i + start)}${a.y}`);
//   } else {
//     return [];
//   }
// }

export const getCellsFromBox = (cellNameA, cellNameB) => {
  const a = splitCellName(cellNameA);
  const b = splitCellName(cellNameB);
  const cells = [];
  for (var x = Math.min(a.x, b.x); x < Math.max(a.x, b.x) + 1; x++) {
    for (var y = Math.min(a.y, b.y); y < Math.max(a.y, b.y) + 1; y++) {
      cells.push(`${numToLetters(x)}${y}`);
    }
  }
  return cells;
}

export const getCellsFromBoxSpecial = (cellNameA, cellNameB) => {
  const a = splitCellName(cellNameA);
  const b = splitCellName(cellNameB);
  const cells = [];
  for (var y = Math.min(a.y, b.y); y < Math.max(a.y, b.y) + 1; y++) {
    var prevIndex = cells.push([]) - 1;
    for (var x = Math.min(a.x, b.x); x < Math.max(a.x, b.x) + 1; x++) {
      cells[prevIndex].push(`${numToLetters(x)}${y}`);
    }
  }
  return cells;
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

export function splitCellName(name) {
  let x = "";
  let y = "";
  for (var i = 0; i < name.length; i++) {
    if(!isBetween(name.charCodeAt(i), [48, 65], [57, 90], true)){
      return null;
    }
    if (isNaN(name[i])) {
      x += name[i];
    } else {
      y += name[i];
    }
  }
  if(x === "" || y === ""){
    return null
  }
  x = lettersToNum(x);
  y = parseFloat(y);
  return { x, y };
}
function splitCellName2(name) {
  let x = "";
  let y = "";
  for (var i = 0; i < name.length; i++) {
    if (isNaN(name[i])) {
      x += name[i];
    } else {
      y += name[i];
    }
  }
  return { x, y };
}