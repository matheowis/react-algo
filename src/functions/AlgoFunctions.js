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
    const { algorithm } = cell.props;
    const parts = this.Generate(algorithm, cell.name);
    // console.log({ parts })
    // console.log("gVariables",this.gVariables);
    const flatted = this.flatAlgorithm(parts);
    const flatAlgo = flatted.join("");
    console.log({ flatted })
    return eval(flatAlgo).toString();
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

  Generate(rawAlgorithm, name, stack) {
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
        const { canCalc, result } = this.isCalculable(algorithm);
        if (canCalc) {
          this.gVariables.functionCells[parts[i]] = result;
        } else {
          this.gVariables.functionCells[parts[i]] = this.Generate(algorithm, name, true);
        }
      }
      i++;
    }
    if (!stack) {
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
    const { functionCells } = this.gVariables;
    const newParts = [];
    var i = 0;
    while (i < outerParts.length) {
      var part = outerParts[i];
      if (functionCells[part]) {
        // Cell
        newParts.push(...this.flatAlgorithm(functionCells[part]));
      } else if (this.funcs[part]) {
        // Function
        const funParts = this.funcs[part].count(outerParts, i);
        funParts.forEach(funPart => {
          if (functionCells[funPart]) {
            newParts.push('(', ...this.flatAlgorithm(functionCells[funPart]), ')');
          } else {
            // FOperator
            newParts.push(funPart)
          }
        });
        i += this.funcs[part].skip;
        continue;
      } else if (part === "") {
        //invalid
        newParts.push("0");
      } else {
        // Operator
        newParts.push(part);
      }
      i++;
    }
    return newParts;
  }
}


export { AlgoFunctions }