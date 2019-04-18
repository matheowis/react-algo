import {isBetween} from "./utils"
// TODO
export const algorithm = {
  Generate,
  functions: {},
};

function mapFunctions(obj) {
  algorithm.functions = obj;
};


function Generate(rawAlgorithm, container) {
  if (rawAlgorithm[0] !== "=" && !isNaN(rawAlgorithm)) {
    return [rawAlgorithm];
  }
  const clearAlgo = rawAlgorithm.slice(1);
  if (clearAlgo === "") {
    return ["0"];
  }
  const parts = [];
  let stringHolder = "";
  let stringPart = "";
  for (var i = 0; i < clearAlgo.length; i++) {
    const isCellID = isBetween(clearAlgo.charCodeAt(i), [48, 65], [57, 90], true);
    const isDot = clearAlgo[i] === "." || clearAlgo[i] === ",";
    const isLast = i === clearAlgo.length - 1;
    if ((isCellID || isDot) && !isLast) {// stringHolder !== "" &&
      if (stringHolder === "" && stringPart !== "") {
        parts.push(stringPart);
        stringPart = "";
      }
      stringHolder += isDot ? "." : clearAlgo[i];
    } else {
      if (i === clearAlgo.length - 1) {
        if(stringPart !== ""){
          parts.push(stringPart);//new
        }
        if(clearAlgo[i] === ")"){
          parts.push(stringHolder)
          stringHolder=clearAlgo[i]
        }else{
          stringHolder += clearAlgo[i]
        }
      } else {
        stringPart += clearAlgo[i]
      }
      parts.push(stringHolder);
      stringHolder = "";
    }
  }
  var i = 0;
  while(i < parts.length){
    if(algorithm.functions[parts[i]]){
      i += algorithm.functions[parts[i]].skip;
      continue;
    }
    if (container[parts[i]]) {
      const { algorithm } = container[parts[i]]
      const cellParts = ["(", ...Generate(algorithm, container), ")"]
      parts.splice(i, 1, ...cellParts);
    }
    i++;
  }

  for (var i = 0; i < parts.length; i++) {
    if (container[parts[i]]) {
      const { algorithm } = container[parts[i]]
      const cellParts = ["(", ...Generate(algorithm, container), ")"]
      parts.splice(i, 1, ...cellParts);
    }
  }
  return parts;
}

//Private functions
