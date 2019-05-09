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
        { name: 'a', value: 1, parentName: "base" },
        { name: 'b', value: 2, parentName: "base" },
        { name: 'c', value: 3, parentName: "base" },
        { name: 'd', value: 4, parentName: "base" },
      ],
      [
        { name: 'aa', value: 11, parentName: "base" },
        { name: 'bb', value: 22, parentName: "base" },
        { name: 'cc', value: 33, parentName: "base" },
        { name: 'dd', value: 44, parentName: "base" },
      ],
    ]
    this.functionContainer.dispatchData(data);
  }

  handleSetFinal = () => {

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