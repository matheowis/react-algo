import React, { Component } from "react";
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { opacityHex, colorsHex } from "../../utils";
import { splitCellName } from "../../functions/helpers";

const styles = {
  base: {
    pointerEvents: "none",
    position: "absolute",
    border: "solid",
    transition: "width 0.15s, height 0.15s, left 0.15s, top 0.15s"
  }
}

class Selection extends Component {
  state = {
    start: "",
    end: ""
  }

  componentDidMount() {
    this.props.cellSelections.CellInitialization(this.handleChange);
  }

  handleChange = (start, end) => {
    this.setState(() => ({ start, end }));
  }

  getBoxPositionStyles = () => {
    const { start, end } = this.state;
    const valid = start !== "" && end !== "";
    const startSplit = splitCellName(start);
    const endSplit = splitCellName(end);
    return valid ? {
      left: Math.min(startSplit.x, endSplit.x) * 104 + 33,
      top: (Math.min(startSplit.y, endSplit.y) - 1) * 30 + 21,
      width: (Math.abs(startSplit.x - endSplit.x) + 1) * 104 - 4,
      height: (Math.abs(startSplit.y - endSplit.y) + 1) * 30 - 4
    } : {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      }
  }
  render() {
    const { classes, index } = this.props;
    return (
      <div
        className={classes.base}
        style={{
          ...this.getBoxPositionStyles(),
          background: colorsHex[index % colorsHex.length] + opacityHex,
          borderColor: colorsHex[index % colorsHex.length],
          zIndex: 100 + index,
        }}
      />
    )
  }
}

Selection.propTypes = {
  cellSelections: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default injectSheet(styles)(Selection);