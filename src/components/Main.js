import React, { Component } from 'react'
import injectSheet from 'react-jss';

import AlgoContainer from './algo/AlgoContainer';
import RightTools from "./RightTools";
const styles = {

}

class Main extends Component {
  state={
    open:false
  }
  render() {
    setTimeout(() => {
      this.setState(prev => ({open: !prev.open}));
    }, 1000);
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <AlgoContainer rows={40} columns={20} />
        <RightTools open={this.state.open} >
          <div>test123</div>
          <div>test1235</div>
        </RightTools>
      </div>
    )
  }
}

export default injectSheet(styles)(Main)