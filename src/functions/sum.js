import {connectedCells} from "./helpers";

export const SUM_FUNC = {
  count: sum,
  spread: sum_spread,
  skip: 5
}

function sum(cellA, cellB) {
  const cellNames = connectedCells(cellA.name, cellB.name)
}

function sum_spread(cellA, cellB) {

}
