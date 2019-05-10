import React, { Component } from "react";
import Selection from "./Selection";
import PropTypes from 'prop-types';

class Selectors extends Component {
  render() {
    const { cellSelections } = this.props
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
        <Selection
          index={-1}
          cellSelections={this.props.cellSelections}
        />
      </>
    );
  }
}

Selectors.propTypes = {
  cellSelections: PropTypes.object.isRequired
}

export default Selectors;