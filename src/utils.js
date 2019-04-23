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

export function getStringsBetween(string, prevArr, endArr) {
  let match = "";
  let prevMaches = new Array(prevArr.length).fill("");
  let endMatches = new Array(endArr.length).fill("");
  const between = [];
  const chars = string.split("");
  for (var i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (!prevMaches.some((m, i) => m === prevArr[i])) {
      match = "";
      for (var k = 0; k < prevArr.length; k++) {
        if (prevArr[k][prevMaches[k].length] === char) {
          endMatches[k] = "";
          prevMaches[k] += char;
          if (prevMaches[k] === prevArr[k]) break;
        } else {
          prevMaches[k] = "";
        }
      }
    } else if (!endMatches.some((m, i) => m === endArr[i])) {
      match += char;
      for (var k = 0; k < endArr.length; k++) {
        if (endArr[k][endMatches[k].length] === char) {
          endMatches[k] += char;
          if (endMatches[k] === endArr[k] && prevMaches[k] === prevArr[k]) {
            match = match.slice(0, match.length - endArr[k].length);
            // between[match] = `${prevArr[k]}*${endArr[k]}`;
            between.push({ value: match, type: `${prevArr[k]}*${endArr[k]}` })
            prevMaches = new Array(prevArr.length).fill("");
            match = "";
            break;
          };
        } else {
          endMatches[k] = "";
        }
      }
    }
  }
  return between
}

export const OPERATORS = ['=', ';', '/', '*', '-', '+','(',':',')','?'];

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