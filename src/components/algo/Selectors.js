import React, { Component } from "react";
import Selection from "./Selection";
import PropTypes from 'prop-types';

class Selectors extends Component {
  // functionHolder = [];
  // // Anim tests (success)
  // componentDidMount() {
  //   console.log("functionHolder", this.functionHolder);
  //   this.functionHolder[0]("A1", "F6");
  //   this.functionHolder[1]("A3", "B9");
  //   this.functionHolder[2]("D1", "F4");
  //   this.functionHolder[3]("A5", "G9");
  //   setTimeout(() => {
  //     this.functionHolder[0]("A15", "F6");
  //     this.functionHolder[1]("A1", "G3");
  //     this.functionHolder[2]("E3", "F4");
  //     this.functionHolder[3]("A1", "F6");
  //   }, 2000);
  // }
  render() {
    const {cellSelections} = this.props
    const selectors = new Array(cellSelections.size).fill(0);
    return (
      <>
        {selectors.map((_, i) => (
          <Selection
            key={`Selection-${i}`}
            index={i}
            cellSelections={this.props.cellSelections}
          />
        ))}
      </>
    )
  }
}

Selectors.propTypes = {
  cellSelections: PropTypes.object.isRequired
}

export default Selectors;