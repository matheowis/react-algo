import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { numToLetters, OPERATORS } from "../../utils";
import AlgoCell from "./AlgoCell";
import AlgoHeader from "./AlgoHeader";
import { AlgoFunctions } from "../../functions/AlgoFunctions";
const styles = {
  side: {
    minWidth: 24, maxWidth: 24,
    background: "#ccc",
    padding: 4,
    lineHeight: "",
    border: "solid",
    borderWidth: 1,
    borderColor: "#aaa",
    textAlign: "center",
    borderRight: "none",
    borderBottom: "none",
  },
  top: {
    minWidth: 101,
    border: "solid",
    borderWidth: 1,
    borderRight: "none",
    borderBottom: "none",
    padding: 1,
    background: "#ccc",
    borderColor: "#aaa",
    textAlign: "center"
  }
}
// TODEL
// mainHolderDefault = {
//   "A1":{algorithm:"", outcome:"", isOver:false, static:}
// }

class AlgoContainer extends Component {
  // mainHolder = {};
  gVariables = {
    holder: {},
    definedCells: {},
    functionCells: {}
  };
  mainHolderKeys = [];
  algoFunctions = new AlgoFunctions(this.gVariables);
  Algo = { writing: false, currentItem: {}, selectedCell: null }
  componentWillMount() {
    const { rows, columns } = this.props;
    for (var x = 0; x < rows; x++) {
      this.mainHolderKeys[x] = [];
      for (var y = 0; y < columns; y++) {
        const name = `${numToLetters(y)}${x + 1}`;
        const obj = { algorithm: "", outcome: "", isOver: false, name, x, y };
        this.gVariables.holder[name] = obj;
        this.mainHolderKeys[x].push({ name, props: obj });
      }
    }
    this.gVariables.holder.active = { name: "", algorithm: "", outcome: "" }
  }

  handleBlur = item => event => {
    const { algorithm } = item.props;
    this.Algo.writing = false;
    this.gVariables.holder.active.setName("");
    this.gVariables.holder.active.setAlgorithm("");
    this.gVariables.holder.active.item = null;

    if (algorithm[0] === "=") {
      // calculate
      // const outcome = eval(algorithm.slice(1));
      const outcome = this.algoFunctions.CalculateLocal(item);

      item.props.outcome = outcome;
      item.props.handleChange(outcome);
    }
  }

  handleFocus = item => event => {
    this.Algo.currentItem = item;
    const { algorithm, outcome } = item.props;
    console.log("item.props", item.props);

    if (outcome[0] !== "=" && algorithm[0] === "=") {
      console.log("switch!")
      item.props.handleChange(algorithm);
    }
    // console.log("item", item)
    this.gVariables.holder.active.setName(item.name);
    this.gVariables.holder.active.setAlgorithm(algorithm);
    this.gVariables.holder.active.item = item;
  }

  handleKeyDown = item => event => {
    const { x, y, algorithm } = item.props;
    const blureItem = (nx, ny) => {
      const newName = `${numToLetters(y - nx)}${x + 1 - ny}`;
      this.gVariables.holder[newName].ref.current.focus();
    }
    const algoItems = algorithm[0] === "=" ? this.algoFunctions.splitAlgorithm(algorithm) : [1];
    const canMove = !isNaN(algoItems[algoItems.length - 1]);
    console.log({canMove});
    switch (event.key) {
      case "ArrowDown":
        canMove && blureItem(0, -1);
        break;
      case "ArrowUp":
        canMove && blureItem(0, 1);
        break;
      case "ArrowLeft":
        canMove && blureItem(1, 0);
        break;
      case "ArrowRight":
        canMove && blureItem(-1, 0);
        break;
      case "Enter":
        item.props.ref.current.blur();
        break;
      case "Escape":
        item.props.ref.current.blur();
        break;
    }
  }

  handleMouseDown = item => event => {
    if (this.Algo.currentItem.props) {
      const { algorithm } = this.Algo.currentItem.props;
      const { props } = this.Algo.currentItem
      if (this.Algo.writing && item !== this.Algo.currentItem && this.Algo.currentItem.name) {
        event.preventDefault();
        const selection = this.Algo.currentItem.props.ref.current.selectionStart;
        // console.log("algorithm[selection-1]",algorithm[selection-1])

        if (this.Algo.selectedCell) {
          props.algorithm = algorithm.replace(this.Algo.selectedCell, item.name);
          this.Algo.currentItem.props.handleChange(props.algorithm);
        } else if (OPERATORS.includes(algorithm[selection - 1])) {
          this.Algo.selectedCell = item.name;
          props.algorithm = algorithm.slice(0, selection) + item.name + algorithm.slice(selection, algorithm.length)
          // console.log("props.algorithm",props.algorithm);
          this.Algo.currentItem.props.handleChange(props.algorithm);
        }
        // console.log("selection",selection);
      }
    }



    //event.preventDefault();
  }

  handleChange = item => event => {
    const selection = event.target.selectionStart;
    const value = event.target.value;

    // console.log("OPERATORS",OPERATORS);
    if (OPERATORS.includes(value[selection - 1])) {
      this.Algo.selectedCell = null;
    }
    this.Algo.writing = value[0] === "=";

    item.props.algorithm = value;
    item.props.handleChange(value);
    this.gVariables.holder.active.setAlgorithm(item.props.algorithm);
    // if (value[0] === "=") {
    //   item.props.algorithm = value.slice(1);
    //   this.setState(() => ({ value }))
    //   // function mode
    // } else {
    //   item.props.outcome = value
    //   this.setState(() => ({ value }))
    // }

    // console.log(e.target.value);
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{ width: "100%", height: "80%" }}>
        <AlgoHeader active={this.gVariables.holder.active} />
        <div style={{ width: "100%", height: "100%", overflow: "auto", position: "relative" }}>
          <div style={{ display: "flex", position: "sticky", top: 0, zIndex: 3 }}>
            <div className={classes.side} />
            {this.mainHolderKeys[0].map((row, i) => (
              <div key={`row-top${i}`} className={classes.top}>{numToLetters(i)}</div>
            ))}
          </div>
          {this.mainHolderKeys.map((row, i) => (
            <div key={`row${i}`} style={{ display: "flex" }}>
              <div className={classes.side} style={{ position: "sticky", left: 0, zIndex: 2 }}>{i + 1}</div>
              {row.map(column => (
                <AlgoCell
                  key={column.name}
                  item={column}
                  onBlur={this.handleBlur}
                  onFocus={this.handleFocus}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  onMouseDown={this.handleMouseDown}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

AlgoContainer.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
}

AlgoContainer.defaultProps = {
  /**
   * Static
   */
  rows: 6,
  /**
   * Static
   */
  columns: 6,
}

export default injectSheet(styles)(AlgoContainer);