export const connectedCells = (cellNameA,cellNameB) => {
  let NameXa = "";
  let NameYa = "";
  for(var i =0;i<cellNameA.length;i++){
    if(isNaN(cellNameA[i])){
      NameXa +=cellNameA[i]
    }else{
      NameYa +=cellNameA[i]
    }
  }
  let NameXb = "";
  let NameYb = "";
  for(var i =0;i<cellNameB.length;i++){
    if(isNaN(cellNameB[i])){
      NameXb +=cellNameB[i];
    }else{
      NameYb +=cellNameB[i];
    }
  }
  if(NameXa === NameXb){
    const start = parseFloat(NameYa);
    const length = parseFloat(NameYb) - start;
    return new Array(length).fill(0).map((_,i) => `${NameYa}${i+start}`);
  }else if(NameYa === NameYb){
    const start =lettersToNum(NameXa);
    const length = lettersToNum(NameXb) - start;
    return new Array(length).fill(0).map((_,i) => `${numToLetters(i+start)}${NameYa}`);
  }else{
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