import { connectedCells } from "../helpers";

// WYSZUKAJ.PIONOWO
export const VLOOKUP_FUNC = function ( algoFunctions) {
  return {
    algoFunctions,
    count: avg,
    spread: avg_spread,
    skip: 6
  }
}

function avg(parts, index) {
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

function avg_spread(parts, index) {
  console.log([parts[index + 2], parts[index + 4]])
  return connectedCells(parts[index + 2], parts[index + 4])
}