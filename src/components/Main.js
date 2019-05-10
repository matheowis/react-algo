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
    const data = [
      [
        { typeName: 'a', value: 1, parentName: "base" },
        { typeName: 'b', value: 2, parentName: "base" },
        { typeName: 'c', value: 3, parentName: "base" },
        { typeName: 'd', value: 4, parentName: "base" },
      ],
      [
        { typeName: 'aa', value: 11, parentName: "base" },
        { typeName: 'bb', value: 22, parentName: "base" },
        { typeName: 'cc', value: 33, parentName: "base" },
        { typeName: 'dd', value: 44, parentName: "base" },
      ],
    ]
    this.functionContainer.dispatchData(data);
  }

  handleSetFinal = (AlgorithmObj) => {

    console.log("Got Final Selection",AlgorithmObj)
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