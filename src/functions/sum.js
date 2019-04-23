import { connectedCells } from "./helpers";
import { algorithm } from "../algorithm";
export const SUM_FUNC = function (gVariables) {
  return {
    gVariables,
    count: sum,
    spread: sum_spread,
    skip: 5
  }
}

function sum(cellNameA, cellNameB) {
  // const {gVariables} = this.gVariables;
  const cellNames = connectedCells(cellNameA, cellNameB);
  
}

function sum_spread(cellNameA, cellNameB) {
  const { definedCells, holder } = this.gVariables;
  const cellNames = connectedCells(cellNameA, cellNameB);
  for (var i = 0; i < cellNames.length; i++) {
    if (!definedCells[cellNames[i]] && holder[cellNames[i]]) {
      definedCells[cellNames[i]] = algorithm.Generate(holder[cellNames[i]].algorithm, holder);
    }
  }
}
