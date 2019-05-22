// import { connectedCells } from "../helpers";
//TODO
export const COUNTIF_FUNC = function () {
  return {
    // algoFunctions,
    count: countIf,
    spread: countIf_spread,
    skip: 8
  }
}

// rownanie
function countIf(parts, index) {
  const sumParts = [parts[index + 2],'?',parts[index + 4],':',parts[index + 6]];
  return sumParts;
}

// lista komorek biorących udział w funkcji
// parts[0] = "COUNTIF"
// parts[1] = "("
// parts[2] = "A1"
// parts[3] = ";"
// parts[4] = "A2" ...
function countIf_spread(parts, index) {
  return [parts[index + 2], parts[index + 4],parts[index + 6]];
}
