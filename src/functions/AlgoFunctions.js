import { ALGO_FUNCTIONS } from "./constant";
import { isBetween, splitCellName } from "./helpers";

class AlgoFunctions {
  constructor(gVariables) {
    this.gVariables = gVariables;
    this.funcs = ALGO_FUNCTIONS;
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
  recalculationStack = {}
  RecalculateParents = (cell, stack) => {
    if (!stack) {
      this.recalculationStack = {};
    }
    if (!cell.props.parents) {
      console.log("UNDEFINED PARENTS IN RECALCULATION", cell.props);
      return;
    }
    // const { algorithm } = cell.props;
    // const parts = this.Generate(algorithm, cell.name);
    const allParents = Object.keys(cell.props.parents);
    console.log("Parents", cell.props);
    console.log({ allParents });
    for (var i = 0; i < allParents.length; i++) {
      const parent = this.gVariables.holder[allParents[i]];
      if (parent) {
        console.log("parent", parent)
        if (parent.children.includes(cell.props.name)) {
          if (this.recalculationStack[parent.name]) {
            continue;
          } else {
            const outcome = this.CalculateLocal({ props: parent });
            parent.outcome = outcome;
            this.recalculationStack[parent.name] = outcome;
            console.log("RecalculateParents, outcome=", outcome);
            parent.handleChange(outcome, undefined, false, true);
            this.RecalculateParents({ props: parent });
          }
        } else {
          delete cell.props.parents[cell.name];
        }
      }
      // const childCell = this.gVariables.holder[parts[i]];
      // if(childCell){
      //   if(cell.props.children.includes(cell.name)){
      //     childCell.parents[cell.name] = 1
      //   }else{
      //     delete childCell.parents[cell.name]
      //   }
      // }
    }
  }
  // 1
  CalculateLocal = (cell) => {
    // local value calculations for cell
    // You can refresh cells here via STATE REFERANCE
    const { algorithm } = cell.props;
    const parts = this.Generate(algorithm, cell.name);

    cell.props.children = [];
    for (var i = 0; i < parts.length; i++) {
      const childCell = this.gVariables.holder[parts[i]];
      if (childCell) {
        cell.props.children.push(parts[i]);
        childCell.parents[cell.props.name] = 1;
      }
    }

    console.log("CalculateLocal Parts=", parts);
    console.log("gVariables", this.gVariables);
    const { functionCells } = this.gVariables;

    const flatted = this.flatAlgorithm(functionCells,parts);
    const flatAlgo = flatted.join("");
    console.log({ flatted })
    return eval(flatAlgo).toFixed(2);
  }

  calculateFromJson = (holder, json) => {
    const final = json['@final'];
    delete json['@final'];
    const cells = Object.keys(json).reduce((prev, curr) => {
      const cell = json[curr];
      if (cell.parentName) {
        prev[curr] = [holder[cell.parentName][cell.name]];
      } else {
        prev[curr] = cell.algorithm;
      }
      return prev
    }, {});
    console.log('cells',cells);
    const flatted = this.flatAlgorithm(cells, cells[final]);
    console.log("JSON flatted", flatted);
    return eval(flatted.join(''));

  }

  flatAlgorithm = (cells, final) => {
    // const { functionCells } = this.gVariables;
    // const cells = cells
    const newParts = [];
    var i = 0;
    while (i < final.length) {
      var part = final[i];
      if (cells[part]) {
        // Cell
        newParts.push(...this.flatAlgorithm(cells, cells[part]));
      } else if (this.funcs[part]) {
        // Function
        // console.log({funcs:ALGO_FUNCTIONS});
        const funParts = this.funcs[part].count(final, i);
        funParts.forEach(funPart => {
          if (cells[funPart]) {
            newParts.push('(', ...this.flatAlgorithm(cells, cells[funPart]), ')');
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
          const { algorithm } = this.gVariables.holder[element] || this.gVariables.definedCells[element];
          // const result = this.Generate(algorithm, this.gVariables.holder);
          const result = this.Generate(algorithm, element);
          // filter out "" from functionCells at the end
          this.gVariables.functionCells[element] = result;

        });
        i += this.funcs[parts[i]].skip;
        continue;
      }
      if (this.gVariables.holder[parts[i]] || this.gVariables.definedCells[parts[i]]) {
        // if (this.gVariables.holder[parts[i]] && !this.gVariables.functionCells[parts[i]]) {
        const { algorithm } = this.gVariables.holder[parts[i]] || this.gVariables.definedCells[parts[i]];
        const { canCalc, result } = this.isCalculable(algorithm);
        if (canCalc) {
          this.gVariables.functionCells[parts[i]] = result;
        } else {
          this.gVariables.functionCells[parts[i]] = this.Generate(algorithm, name, true);
        }
      }
      i++;
    }
    if (!stack && name) {
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
      // const isDot = algorithm[i] === "." || algorithm[i] === ",";
      if (algorithm[i] === ",") {
        algorithm[i] = '.';
      }
      const isLast = i === algorithm.length - 1;
      if (isCellID) {
        stringHolder += algorithm[i];
        if (isLast) {
          parts.push(stringHolder);
        }
      } else {
        // ERROR
        // if (isDot) {
        //   stringHolder += ".";
        //   continue;
        // }
        if (stringHolder !== "") {
          parts.push(stringHolder);
        }
        parts.push(algorithm[i]);
        stringHolder = "";
      }
    }
    return parts;
  }



  partsToColorStructure = (parts) => {
    const structure = []
    let colorID = 1;

    var i = 0;
    while (i < parts.length) {
      const last = structure[structure.length - 1]
      if (this.gVariables.holder[parts[i]] || this.gVariables.definedCells[parts[i]]) {
        structure.push({ text: [parts[i]], colorID, start: parts[i], end: parts[i] });
        colorID++;
      } else if (parts[i] === ":") {
        last.text.push(parts[i], parts[i + 1]);
        last.end = parts[i + 1];
        i++;
      } else {
        if (last && last.colorID === "B") {
          last.text.push(parts[i]);
        } else {
          structure.push({ text: [parts[i]], colorID: "B" });
        }
      }
      i++;
    }

    for (var i = 0; i < structure.length; i++) {
      structure[i].text = structure[i].text.join("");
    }

    return structure;
  }

  SelectionGroups = parts => {
    const newParts = []
    var i = 0;
    while (i < parts.length) {
      if (splitCellName(parts[i])) {
        newParts.push({ start: parts[i], end: parts[i] });
      } else if (parts[i] === ":") {
        newParts[newParts.length - 1].end = parts[i + 1];
        i++;
      }
      i++;
    }
    return newParts;
  }

  // flatAlgorithm = (outerParts = []) => {
  //   const { functionCells } = this.gVariables;
  //   const newParts = [];
  //   var i = 0;
  //   while (i < outerParts.length) {
  //     var part = outerParts[i];
  //     if (functionCells[part]) {
  //       // Cell
  //       newParts.push(...this.flatAlgorithm(functionCells[part]));
  //     } else if (this.funcs[part]) {
  //       // Function
  //       // console.log({funcs:this.funcs});
  //       const funParts = this.funcs[part].count(outerParts, i);
  //       funParts.forEach(funPart => {
  //         if (functionCells[funPart]) {
  //           newParts.push('(', ...this.flatAlgorithm(functionCells[funPart]), ')');
  //         } else {
  //           // FOperator
  //           newParts.push(funPart)
  //         }
  //       });
  //       i += this.funcs[part].skip;
  //       continue;
  //     } else if (part === "") {
  //       //invalid
  //       newParts.push("0");
  //     } else {
  //       // Operator
  //       newParts.push(part);
  //     }
  //     i++;
  //   }
  //   return newParts;
  // }

  createFinalAlgorithmJSON = (finalName) => {

    const parts = this.gVariables.functionCells[finalName]
    const includedParts = Object.keys(this.filterFinalParts(parts));
    // const JsonAlgorithm = { [finalName]: parts, ['@final']: finalName };
    const JsonAlgorithm = {
      ['@final']: finalName,
      [finalName]: { algorithm: parts }
    };
    console.log('Test');
    console.log({ parts, includedParts });
    for (var i = 0; i < includedParts.length; i++) {
      const definedCell = this.gVariables.definedCells[includedParts[i]]
      if (definedCell) {
        // JsonAlgorithm[includedParts[i]] = `${definedCell.parentName}.${definedCell.typeName}[${definedCell.index}]`
        JsonAlgorithm[includedParts[i]] = { parentName: definedCell.parentName, name: definedCell.typeName }
      } else {
        // JsonAlgorithm[includedParts[i]] = this.gVariables.functionCells[includedParts[i]];
        JsonAlgorithm[includedParts[i]] = { algorithm: this.gVariables.functionCells[includedParts[i]] };
      }
    }
    return JsonAlgorithm;
  }


  // find included 
  filterFinalParts = (outerParts, inloop, includedCells = {}) => {
    const { functionCells } = this.gVariables;
    const newParts = [];
    const addIncludedCells = (name) => {
      if (includedCells[name]) {
        includedCells[name]++;
      } else {
        includedCells[name] = 1;
      }
    }
    var i = 0;
    while (i < outerParts.length) {
      var part = outerParts[i];
      if (functionCells[part]) {
        addIncludedCells(part);
        // Cell
        newParts.push(...this.filterFinalParts(functionCells[part], true, includedCells));
      } else if (this.funcs[part]) {
        console.log("Funcs", part);
        // Function
        const funParts = this.funcs[part].count(outerParts, i);
        funParts.forEach(funPart => {
          if (functionCells[funPart]) {
            addIncludedCells(funPart);
            newParts.push('(', ...this.filterFinalParts(functionCells[funPart], true, includedCells), ')');
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
    if (inloop) {
      return newParts;
    } else {
      return includedCells;
    }
  }
}


export { AlgoFunctions }