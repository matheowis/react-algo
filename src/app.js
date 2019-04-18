import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./components/Main";
import { algorithm } from "./algorithm";

const container = {
  "A1": { algorithm: "6" },
  "A2": { algorithm: "=12" },
  "B1": { algorithm: "=A1+A2" },
}
const algorithm2 = "=SUMA.ILOCZYN(A1:A2)";
const myTest = algorithm.Generate(algorithm2, container)
console.log(myTest);


ReactDOM.render(<Main />, document.getElementById('app'));