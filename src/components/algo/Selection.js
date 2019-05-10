import React, { Component } from "react";
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { COLORS_HEX, OPACITY_HEX, CELL_SIZE, FINAL_HEX, FINAL_OPACITY_HEX } from "../../constant";
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
    if (this.props.index === -1) {
      this.props.cellSelections.finalInitialization(this.handleChange)
    } else {
      this.props.cellSelections.CellInitialization(this.handleChange);
    }
  }

  handleChange = (start, end) => {
    this.setState(() => ({ start, end }));
  }

  getBoxPositionStyles = () => {
    const { start, end } = this.state;
    const valid = start !== "" && end !== "";
    const startSplit = splitCellName(start) || 0;
    const endSplit = splitCellName(end) || 0;
    const { X, Y } = CELL_SIZE;
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

  getColorStyles = () => {
    const { index } = this.props;
    const bg = COLORS_HEX[index % COLORS_HEX.length] + OPACITY_HEX;
    const bgc = COLORS_HEX[index % COLORS_HEX.length];
    const bg_f = FINAL_HEX + FINAL_OPACITY_HEX;
    const bgc_f = FINAL_HEX;
    return {
      background: index === -1 ? bg_f : bg,
      borderColor: index === -1 ? bgc_f : bgc,
      borderStyle: index === -1 ? "dashed" : "solid",
    }
  }

  render() {
    const { classes, index } = this.props;
    return (
      <div
        className={classes.base}
        style={{
          ...this.getBoxPositionStyles(),
          ...this.getColorStyles(),
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