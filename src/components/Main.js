import React, { Component } from 'react'
import injectSheet from 'react-jss';

import AlgoContainer from './algo/AlgoContainer';
import RightTools from "./algo/RightTools";

const styles = {

}

class Main extends Component {
  functionContainer = {};
  handleAddData = () => {
    console.log("ADD_DATA");
    // { typeName: 'a', value: 1, parentName: "base", isArray:true, arrIndex:0 },
    const carrier = {
      emptyA: ["2.70 ", "2.70 ", "2.70 ", "2.70 ", "2.70 ", "2.70 ", "2.70 ", "2.70 ", "2.70 ", "2.70 "],
      emptyB: ["0.00 ", "0.00 ", "0.00 ", "0.00 ", "0.00 ", "0.00 ", "0.00 ", "0.00 ", "0.00 ", "0.00 "],
      filledA: ["3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 "],
      filledB: ["3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 ", "3.20 "],
      isImpuls: false,
      name: "ANESS",
      type: "Wszystko",
      unloadingA: ["50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 "],
      unloadingB: ["50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 ", "50.00 "],
    };
    const route = {
      code: "32",
      cost: "",
      currency: "",
      distance: 225,
      distanceReal: "",
      filledDist: 113,
      filledDistImpuls: 0,
      idFirmy: 1,
      idTrasy: 24900,
      kodkierowcy: "",
      nrFaktury: "",
      odlWgPrzewoznikaPowrot: 111,
      stojak: true,
      time: "",
      unloadings: 3,
      unloadingsReal: "",
      uuid: "80efc00e-a08c-49b7-a74c-d62feb16fdba",
      uwagi: "",
    }

    const fCode = parseFloat(route.code[0]);
    const index = fCode === "0" ? 9 : fCode - 1;

    const data = [
      [
        { typeName: null, value: "adres", parentName: null },
        { typeName: null, value: route.code, parentName: null },
      ],
      [
        { typeName: null, value: "St-Zaladowany", parentName: null },
        { parentName: 'carrier', typeName: 'filledA', value: carrier.filledA[index], index }
      ],
      [
        { typeName: null, value: "St-Pusty", parentName: null },
        { parentName: 'carrier', typeName: 'emptyA', value: carrier.emptyA[index], index }
      ],
      [
        { typeName: null, value: "St-Rozladunki", parentName: null },
        { parentName: 'carrier', typeName: 'unloadingA', value: carrier.unloadingA[index], index }
      ],
      [
        { typeName: null, value: "Si-Zaladowany", parentName: null },
        { parentName: 'carrier', typeName: 'filledB', value: carrier.filledB[index], index }
      ],
      [
        { typeName: null, value: "Si-Pusty", parentName: null },
        { parentName: 'carrier', typeName: 'emptyB', value: carrier.emptyB[index], index }
      ],
      [
        { typeName: null, value: "Si-Rozladunki", parentName: null },
        { parentName: 'carrier', typeName: 'unloadingB', value: carrier.unloadingB[index], index }
      ],
    ]

    this.functionContainer.dispatchData(data);
  }

  handleSetFinal = (AlgorithmObj) => {

    console.log("Got Final Selection", AlgorithmObj)
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <AlgoContainer
          rows={40}
          columns={20}
          functionContainer={this.functionContainer}
          onAddData={this.handleAddData}
          onSetFinal={this.handleSetFinal}
        />
      </div>
    )
  }
}

export default injectSheet(styles)(Main)