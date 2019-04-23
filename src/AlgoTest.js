import {AlgoFunctions} from "./functions/AlgoFunctions";

export const AlgoTest = () => {
  const container = {
    "A1": { algorithm: "6" },
    "A2": { algorithm: "=12" },
    "B1": { algorithm: "=A1+A2" },
  }
  const gVariables = {
    holder: container,
    definedCells: {},
  }
  const algorithm2 = "=SUM(A1:A2)+A2";
  const algoFunctions = new AlgoFunctions(gVariables);
  
  const myTest = algoFunctions.Generate(algorithm2);
  console.log({myTest});
  console.log({gVariables})
}