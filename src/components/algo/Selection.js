import React, { Component } from "react";
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {COLORS_HEX,OPACITY_HEX,CELL_SIZE} from "../../constant";
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
    const startSplit = splitCellName(start) || 0;
    const endSplit = splitCellName(end) || 0;
    const {X,Y} = CELL_SIZE;
    return valid ? {
      left: Math.min(startSplit.x, endSplit.x) * X + 33,
      top: (Math.min(startSplit.y, endSplit.y) - 1) * Y + 21,
      width: (Math.abs(startSplit.x - endSplit.x) + 1) * X - 4,
      height: (Math.abs(startSplit.y - endSplit.y) + 1) * Y - 4
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
          background: COLORS_HEX[index % COLORS_HEX.length] + OPACITY_HEX,
          borderColor: COLORS_HEX[index % COLORS_HEX.length],
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