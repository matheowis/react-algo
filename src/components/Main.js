import React, { Component } from 'react'
import injectSheet from 'react-jss';

import AlgoContainer from './algo/AlgoContainer';
import RightTools from "./algo/RightTools";

const styles = {

}

class Main extends Component {

  render() {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <AlgoContainer rows={40} columns={20} />
      </div>
    )
  }
}

export default injectSheet(styles)(Main)