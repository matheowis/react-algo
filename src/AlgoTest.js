import {AlgoFunctions} from "./functions/AlgoFunctions";

export const AlgoTest = () => {
  const holder = {
    "A1": { algorithm: "6" },
    "A2": { algorithm: "=A1*2" },
    "A3": { algorithm: "=A2*2" },
    "B1": { algorithm: "=A1+A2" },
    "B2": { algorithm: "=5*21" },
  }
  const definedCells = {
    "KM":{value:42}
  }
  const gVariables = {
    holder,
    definedCells,
    functionCells:{}
  }
  const algorithm2 = "=SUM(A1:A3)+B2";
  const algoFunctions = new AlgoFunctions(gVariables);
  
  const timer = new Date().getTime();
  const myTest = algoFunctions.Generate(algorithm2);
  console.log("Timer=", new Date().getTime() - timer)
  console.log({myTest});
  console.log({gVariables})
}