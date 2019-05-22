import {ALGO_FUNCTIONS} from './constant';

export default calculateFromJson

function  calculateFromJson (holder,json) {
    const final = json[json['@final']];
    delete json['@final'];
    const cells = Object.keys(json).reduce((prev,curr) => {
      const cell = json[curr];
      if(cell.parentName){
        prev[curr] = [holder[cell.parentName][cell.typeName]];
      }else{
        // prev[curr] = cell.algorithm;
        prev[curr] = cell;
      }
      return prev
    }, {});
    // console.log('cells',cells);
    // console.log('final',final);
    const flatted = flatAlgorithmJson(cells,final);
    // console.log("JSON flatted", flatted);
    return eval(flatted.join(''));
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
        newParts.push(...flatAlgorithmJson(cells,cells[part]));
      } else if (ALGO_FUNCTIONS[part]) {
        // Function
        // console.log({funcs:ALGO_FUNCTIONS});
        const funParts = ALGO_FUNCTIONS[part].count(final, i);
        funParts.forEach(funPart => {
          if (cells[funPart]) {
            newParts.push('(', ...flatAlgorithmJson(cells,cells[funPart]), ')');
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