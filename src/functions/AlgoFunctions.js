import { ALGO_FUNCTIONS } from "./constant";
import { isBetween } from "./helpers";

class AlgoFunctions {
  constructor(gVariables) {
    this.gVariables = gVariables;
    this.funcs = ALGO_FUNCTIONS(this);
  }
  /**
   * object example {"SUMA": {}, }
   */
  setFunctions = (obj) => {
    this.funcs = {};
    const keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
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
    for (var i = 0; i < keys.length; i++) {
      if (!this.funcs[obj[keys[i]]]) {
        this.funcs[obj[keys[i]]] = this.funcs[keys[i]];
        delete this.funcs[obj[keys[i]]];
      }
    }
  }
  getBaseFunctions = () => {
    return ALGO_FUNCTIONS(this.gVariables);
  }
  // 1
  CalculateLocal = (cell) => {
    // local value calculations for cell
    // You can refresh cells here via STATE REFERANCE
    const {algorithm} = cell.props;
    const parts = this.Generate(algorithm,cell.name);
    // console.log({parts})
    // console.log("gVariables",this.gVariables);
    const flatted = this.flatAlgorithm(parts);
    const flatAlgo = flatted.join("");
    console.log({flatted})
    return eval(flatAlgo);
  }
  // 2?
  Calculate = () => {
    // final calculation for program just create new AlgoFunctions(obj)
    // where obj is the algorythm data from server
  }
  // 3?
  RefreshSheet = () => {
    // fill sheet based on this.gVariables
    // You can refresh cells here via STATE REFERANCE
  }

  Generate(rawAlgorithm,name,stack) {
    if (rawAlgorithm[0] !== "=" && !isNaN(rawAlgorithm)) {
      return [rawAlgorithm];
    }
    const clearAlgo = rawAlgorithm.slice(1);
    if (clearAlgo === "") {
      return ["0"];
    }
    const parts = this.splitAlgorithm(clearAlgo);
    var i = 0;
    while (i < parts.length) {
      if (this.funcs[parts[i]]) {
        const functionCells = this.funcs[parts[i]].spread(parts, i);
        functionCells.forEach(element => {
          const { algorithm } = this.gVariables.holder[element];
          this.gVariables.functionCells[element] = this.Generate(algorithm, this.gVariables.holder)
        });
        i += this.funcs[parts[i]].skip;
        continue;
      }
      if (this.gVariables.holder[parts[i]] && !this.gVariables.functionCells[parts[i]]) {
        const { algorithm } = this.gVariables.holder[parts[i]];
        const {canCalc, result} = this.isCalculable(algorithm);
        if(canCalc){
          this.gVariables.functionCells[parts[i]] = result;
        }else{
          this.gVariables.functionCells[parts[i]] = this.Generate(algorithm,name, true);
        }
      }
      i++;
    }
    if(!stack){
      this.gVariables.functionCells[name] = parts;
    }
    return parts;
  }

  isCalculable = (rawAlgorithm) => {
    let clearAlgo = rawAlgorithm;
    if (rawAlgorithm[0] === "=") {
      clearAlgo = clearAlgo.slice(1);
    }
    try {
      const result = [eval(clearAlgo).toString()];
      return { canCalc: true, result };
    } catch (err) {
      return { canCalc: false, result: "0" };
    }
  }

  splitAlgorithm = (algorithm) => {
    const parts = [];
    let stringHolder = "";
    for (var i = 0; i < algorithm.length; i++) {
      const isCellID = isBetween(algorithm.charCodeAt(i), [48, 65], [57, 90], true);
      const isDot = algorithm[i] === "." || algorithm[i] === ",";
      const isLast = i === algorithm.length - 1;
      if (isCellID) {
        stringHolder += algorithm[i];
        if (isLast) {
          parts.push(stringHolder);
        }
      } else {
        if (isDot) {
          stringHolder += ".";
          continue;
        }
        if (stringHolder !== "") {
          parts.push(stringHolder);
        }
        parts.push(algorithm[i]);
        stringHolder = "";
      }
    }
    return parts;
  }
  flatAlgorithm = (outerParts = []) => {
    const {functionCells} = this.gVariables;
    const newParts = [];
    var i =0;
    while(i<outerParts.length){
      var part = outerParts[i];
      console.log("Each part", part)
      if(functionCells[part]){
        // Cell
        // newParts.push('(',...this.flatAlgorithm(functionCells[part]),')');
        newParts.push(...this.flatAlgorithm(functionCells[part]));
      }else if(this.funcs[part]){
        // Function
        const funParts = this.funcs[part].count(outerParts,i);
        console.log("funParts",funParts);
        funParts.forEach(funPart => {
          if(functionCells[funPart]){
            newParts.push('(',...this.flatAlgorithm(functionCells[funPart]),')');
          }else{
            // FOperator
            newParts.push(funPart)
          }
        });
        console.log("skip",this.funcs[part].skip);
        i+=this.funcs[part].skip;
        continue;
      }else{
        // Operator
        console.log("Operator", part)
        newParts.push(part);
      }
      i++;
    }
    // outerParts.forEach((part,i) => {
    //   if(functionCells[part]){
    //     // Cell
    //     newParts.push('(',...this.flatAlgorithm(functionCells[part]),')');
    //   }else if(this.funcs[part]){
    //     // Function
    //     const funParts = this.funcs[part].count(outerParts,i);
    //     console.log("funParts",funParts);
    //     funParts.forEach(funPart => {
    //       newParts.push('(',...this.flatAlgorithm(functionCells[funPart]),')');
    //     });
    //   }else{
    //     // Operator
    //     newParts.push(part);
    //   }
    // });
    return newParts;
  }
  // probably not needed
  // flatAlgorithm = (cleanAlgorithm,defineBreak) => {
  //   const parts = this.splitAlgorithm(cleanAlgorithm);
  //   let withDefined = false;
  //   const newParts = [];
  //   parts.forEach((part, i) => {
  //     if(this.funcs[part]){
  //       this.funcs[part].spread(parts,i);
  //       newParts.push()
  //       //TODO finish
  //       continue;
  //     }
  //     if(this.gVariables.holder[part]){
  //       const { algorithm } = this.gVariables.holder[parts[i]];
  //       if(algorithm[0] === "="){
  //         const lCleanAlgorithm = algorithm.slice(1);
  //         const newPart = this.flatAlgorithm(lCleanAlgorithm,defineBreak);
  //         if(defineBreak && newPart.withDefined){
  //           withDefined = true;
  //           return {
  //             withDefined,
  //             parts
  //           }
  //         }
  //         newParts
  //         parts.splice(i,1,...newPart.parts);
  //       }else{
  //         parts.splice(i,1,algorithm);
  //       }
  //     }
  //     if(this.gVariables.definedCells[part]){
  //       withDefined = true;
  //       if(defineBreak){
  //         return{
  //           withDefined,
  //           parts
  //         }
  //       }
  //     }
  //   })
  //   return {
  //     withDefined,
  //     parts
  //   };
  // }
}


export { AlgoFunctions }