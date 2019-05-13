import {ALGO_FUNCTIONS} from './constant';



function  calculateFromJson (holder,json) {
    const final = json['@final'];
    delete json['@final'];
    const cells = Object.keys(json).reduce((prev,curr) => {
      const cell = json[curr];
      if(cell.parentName){
        prev[curr] = [holder[cell.parentName][cell.name]];
      }else{
        prev[curr] = cell.algorithm;
      }
      return prev
    }, {});
    console.log(cells);
    const flatted = flatAlgorithmJson(cells,final);
    console.log("JSON flatted", flatted);
    return eval(flatted);
    
  }

 function flatAlgorithmJson (cells,final) {
    // const { functionCells } = this.gVariables;
    // const cells = cells
    const newParts = [];
    var i = 0;
    while (i < final.length) {
      var part = final[i];
      if (cells[part]) {
        // Cell
        newParts.push(...this.flatAlgorithmJson(cells,cells[part]));
      } else if (ALGO_FUNCTIONS[part]) {
        // Function
        // console.log({funcs:ALGO_FUNCTIONS});
        const funParts = ALGO_FUNCTIONS[part].count(final, i);
        funParts.forEach(funPart => {
          if (cells[funPart]) {
            newParts.push('(', ...this.flatAlgorithmJson(cells,cells[funPart]), ')');
          } else {
            // FOperator
            newParts.push(funPart)
          }
        });
        i += ALGO_FUNCTIONS[part].skip;
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