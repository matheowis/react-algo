import { connectedCells } from "./helpers";
import { algorithm } from "../algorithm";
export const SUM_FUNC = function ( algoFunctions) {
  return {
    algoFunctions,
    count: sum2,
    spread: sum_spread,
    skip: 6
  }
}

function sum(parts, index) {
  const {definedCells, funcs } = this.algoFunctions.gVariables;

  // const {gVariables} = this.gVariables;
  const cellNames = connectedCells(parts[index + 2], parts[index + 4])
  cellNames.forEach(cellName => {
    
    // definedCells[cellName]
    // Do Stuff after algoFunctions calculate function
  })
}

function sum2(parts, index) {
  const sumParts = [];
  const cellNames = connectedCells(parts[index + 2], parts[index + 4]);
  const ln = cellNames.length
  for(var i =0;i< ln;i++){
    if (i === ln - 1){
      sumParts.push(cellNames[i])
    }else{
      sumParts.push(cellNames[i], '+');
    }
  }
  console.log({sumParts})
  return sumParts;
}

function sum_spread(parts, index) {
  console.log([parts[index + 2], parts[index + 4]])
  return connectedCells(parts[index + 2], parts[index + 4])
}
