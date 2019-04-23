import {ALGO_FUNCTIONS} from "./constant";
import {isBetween} from "./helpers";

class AlgoFunctions{
  constructor(gVariables){
    this.gVariables = gVariables;
    this.funcs = ALGO_FUNCTIONS(gVariables);
  }
  /**
   * object example {"SUMA": {}, }
   */
  setFunctions = (obj) => {
    this.funcs = {};
    const keys = Object.keys(obj);
    for(var i =0;i< keys.length; i++){
      this.funcs
    }
  }
  /**
   * {
   *  "SUM":"SUMA"
   * }
   */
  changeFunctionNames = (obj) => {
    const keys = Object.keys(obj);
    for(var i =0; i< keys.length; i++){
      if(!this.funcs[obj[keys[i]]]){
        this.funcs[obj[keys[i]]] = this.funcs[keys[i]];
        delete this.funcs[obj[keys[i]]];
      }
    }
  }
  getBaseFunctions = () => {
    return ALGO_FUNCTIONS(this.gVariables);
  }

  Generate(rawAlgorithm) {
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
        console.log({stringHolder,stringPart});
        console.log("clearAlgo[i]",clearAlgo[i]);
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
      if(this.funcs[parts[i]]){
        console.log(`Skipping ${parts[i]} by ${this.funcs[parts[i]].skip}`);
        i += this.funcs[parts[i]].skip;
        continue;
      }
      if (this.gVariables.holder[parts[i]]) {
        const { algorithm } = this.gVariables.holder[parts[i]]
        const cellParts = ["(", ...this.Generate(algorithm, this.gVariables.holder), ")"]
        parts.splice(i, 1, ...cellParts);
      }
      i++;
    }
  
    // for (var i = 0; i < parts.length; i++) {
    //   if (this.gVariables.holder[parts[i]]) {
    //     const { algorithm } = this.gVariables.holder[parts[i]]
    //     const cellParts = ["(", ...this.Generate(algorithm, this.gVariables.holder), ")"]
    //     parts.splice(i, 1, ...cellParts);
    //   }
    // }
    return parts;
  }
}


export {AlgoFunctions}