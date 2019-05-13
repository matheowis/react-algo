import { getCellsFromBox } from "../helpers";
export const SUM_FUNC = function () {
  return {
    // algoFunctions,
    count: sum,
    spread: sum_spread,
    skip: 6
  }
}

function sum(parts, index) {
  const sumParts = [];
  const cellNames = getCellsFromBox(parts[index + 2], parts[index + 4]);
  const ln = cellNames.length
  for(var i =0;i< ln;i++){
    if (i === ln - 1){
      sumParts.push(cellNames[i])
    }else{
      sumParts.push(cellNames[i], '+');
    }
  }
  return sumParts;
}

function sum_spread(parts, index) {
  return getCellsFromBox(parts[index + 2], parts[index + 4])
}
