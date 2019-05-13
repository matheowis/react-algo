import { getCellsFromBox } from "../helpers";
export const AVG_FUNC = function () {
  return {
    // algoFunctions,
    count: avg,
    spread: avg_spread,
    skip: 6
  }
}

function avg(parts, index) {
  const avgParts = ['('];
  const cellNames = getCellsFromBox(parts[index + 2], parts[index + 4]);
  const ln = cellNames.length
  for(var i =0;i< ln;i++){
    if (i === ln - 1){
      avgParts.push(cellNames[i])
    }else{
      avgParts.push(cellNames[i], '+');
    }
  }
  avgParts.push(')','/',ln);
  return avgParts;
}

function avg_spread(parts, index) {
  return getCellsFromBox(parts[index + 2], parts[index + 4])
}
