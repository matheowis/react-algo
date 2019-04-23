import { getCellsFromBox } from "../helpers";
//TODO
export const VLOOKCROSS_FUNC = function ( algoFunctions) {
  return {
    algoFunctions,
    count: avg,
    spread: avg_spread,
    skip: 6
  }
}

function vLookCross(parts, index) {
  const avgParts = ['('];
  const cellNames = connectedCells(parts[index + 2], parts[index + 4]);
  const ln = cellNames.length
  for(var i =0;i< ln;i++){
    if (i === ln - 1){
      avgParts.push(cellNames[i])
    }else{
      avgParts.push(cellNames[i], '+');
    }
  }
  avgParts.push(')','/',ln);
  console.log({avgParts})
  return avgParts;
}

function vLookCross_spread(parts, index) {
  console.log([parts[index + 2], parts[index + 4]])
  return connectedCells(parts[index + 2], parts[index + 4])
}