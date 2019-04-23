import React, { Component } from 'react'
import injectSheet from 'react-jss';

import AlgoContainer from './algo/AlgoContainer';
import RightTools from "./RightTools";
import { eventFunctions } from "../events";

const styles = {

}



class Main extends Component {
  state = {
    open: false,
    top: 0,
    left: 0
  }
  componentDidMount() {
    eventFunctions.mouseRight = this.handleMouseRight;
  }
  handleMouseRight = (top, left) => {
    this.setState(() => ({
      top,
      left,
      open: true
    }));
  }
  render() {
    // setTimeout(() => {
    //   this.setState(prev => ({open: !prev.open}));
    // }, 1000);
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <AlgoContainer rows={40} columns={20} />
        <RightTools open={this.state.open} top={this.state.top} left={this.state.left}>
          <div>test123</div>
          <div>test1235</div>
        </RightTools>
      </div>
    )
  }
}

export default injectSheet(styles)(Main)