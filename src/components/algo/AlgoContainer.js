import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { numToLetters, OPERATORS } from "../../utils";
import { AlgoFunctions } from "../../functions/AlgoFunctions";
import { CellSelections } from "../../functions/CellSelections";
import { getCellsFromBox, getCellsFromBoxSpecial, splitCellName } from "../../functions/helpers";
import AlgoCell from "./AlgoCell";
import AlgoHeader from "./AlgoHeader";
import RightTools from "./RightTools";
import Selectors from "./Selectors";
import MultiColorInput from "../MultiColorInput";

const styles = {
  root: {
    width: "100%",
    height: "80%",
  },
  copyHolder: {
    position: "fixed",
    top: -500,
    left: -500
  },
  mainTable: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    position: "relative"
  },
  letterHeader: {
    display: "flex",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  topHeader: {
    minWidth: 100,
    border: "solid",
    borderWidth: 1,
    borderRight: "none",
    borderBottom: "none",
    padding: "1px 0px",
    background: "#ccc",
    borderColor: "#aaa",
    textAlign: "center"
  },
  side: {
    minWidth: 24,
    maxWidth: 24,
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
  flex: {
    display: "flex"
  },
  sideHeader: {
    minWidth: 24,
    maxWidth: 24,
    background: "#ccc",
    padding: 4,
    lineHeight: "",
    border: "solid",
    borderWidth: 1,
    borderColor: "#aaa",
    textAlign: "center",
    borderRight: "none",
    borderBottom: "none",
    position: "sticky",
    left: 0,
    zIndex: 999
  }
}

class AlgoContainer extends Component {
  state = {
    open: false,
    left: 0,
    top: 0
  }

  gVariables = {
    holder: {},
    definedCells: {},
    functionCells: {}
  };

  pMouse = {
    start: "",
    end: ""
  }

  mainHolderKeys = [];
  cellSelections = new CellSelections(15);
  algoFunctions = new AlgoFunctions(this.gVariables);
  Algo = { writing: false, currentItem: {}, selectedCell: null }
 
  firstCopy = true;
  textareaRef = React.createRef();
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
      const outcome = this.algoFunctions.CalculateLocal(item);

      item.props.outcome = outcome;
      item.props.handleChange(outcome);
    }
  }

  handleFocus = item => event => {
    this.Algo.currentItem = item;
    const { algorithm, outcome } = item.props;
    // console.log("item.props", item.props);

    if (outcome[0] !== "=" && algorithm[0] === "=") {
      // console.log("switch!")
      item.props.handleChange(algorithm);
    }
    // console.log("item", item)
    this.gVariables.holder.active.setName(item.name);
    this.gVariables.holder.active.setAlgorithm(algorithm);
    this.gVariables.holder.active.item = item;
  }

  handleKeyDown = item => event => {
    const { x, y, algorithm } = item.props;
    const algoItems = algorithm[0] === "=" ? this.algoFunctions.splitAlgorithm(algorithm) : [1];
    const canMove = !isNaN(algoItems[algoItems.length - 1]);

    const moveItem = (nx, ny) => {
      if (canMove) {
        const newName = `${numToLetters(y - nx)}${x + 1 - ny}`;
        this.gVariables.holder[newName].ref.current.focus();
        this.cellSelections.ChangeSelection(0, newName)
      }
    }

    console.log({ key:event.key });
    switch (event.key) {
      case "ArrowDown":
        canMove && moveItem(0, -1);
        break;
      case "ArrowUp":
        canMove && moveItem(0, 1);
        break;
      case "ArrowLeft":
        canMove && moveItem(1, 0);
        break;
      case "ArrowRight":
        canMove && moveItem(-1, 0);
        break;
      case "Enter":
        item.props.ref.current.blur();
        break;
      case "Escape":
        item.props.ref.current.blur();
        this.cellSelections.ChangeSelection(0, "")
        break;
        case "Delete":{
          this.handleDelete();
        }
    }


  }

  handleMouseDown = item => event => {
    this.pMouse.start = this.pMouse.end = item.name;
    this.cellSelections.ChangeSelection(0, this.pMouse.start, this.pMouse.end)

    console.log("Down", this.Algo.currentItem.props);
    if (this.Algo.currentItem.props) { // currently focused item
      const { props } = this.Algo.currentItem;
      const { algorithm } = props;
      if (this.Algo.writing && item !== this.Algo.currentItem && this.Algo.currentItem.name) {
        event.preventDefault();
        const selection = props.ref.current.selectionStart;
        if (this.Algo.selectedCell) {
          props.algorithm = algorithm.replace(this.Algo.selectedCell, item.name);
          props.handleChange(props.algorithm);
        } else if (OPERATORS.includes(algorithm[selection - 1])) {
          this.Algo.selectedCell = item.name;
          props.algorithm = algorithm.slice(0, selection) + item.name + algorithm.slice(selection, algorithm.length)
          props.handleChange(props.algorithm);
        }
        // console.log("selection",selection);
      }
    }
  }

  handleMouseLeftUp = item => {
    this.pMouse.start = this.pMouse.end = "";

  }

  handleMouseEnter = item => event => {
    if (this.pMouse.start !== "") {
      this.pMouse.end = item.name;
      const { start, end } = this.pMouse
      // this.cellFunctionHolder[0](start, end);
      this.cellSelections.ChangeSelection(0, start, end)

    }
  }

  handlePaste = item => event => {
    var clipboardData, pastedData;

    // Stop data actually being pasted into div
    event.stopPropagation();
    event.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = event.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');

    const sideDiv = String.fromCharCode(9);
    const HorizonDiv = String.fromCharCode(13, 10);

    const horizonSplit = pastedData.split(HorizonDiv);
    const nameSplit = splitCellName(item.name);
    for (var y = 0; y < horizonSplit.length; y++) {
      const sideSplit = horizonSplit[y].split(sideDiv);
      for (var x = 0; x < sideSplit.length; x++) {
        const pasteItem = this.gVariables.holder[`${numToLetters(x + nameSplit.x)}${y + nameSplit.y}`]
        pasteItem.handleChange(sideSplit[x]);
      }
    }

    // for (var i = 0; i < pastedData.length; i++) {
    //   console.log(pastedData.charCodeAt(i), pastedData[i]);
    // }
  }

  handleCopy = item => event => {
    var clipboardData, copiedData;
    const sideDiv = String.fromCharCode(9);
    const HorizonDiv = String.fromCharCode(13, 10);
    // Stop data actually being pasted into div

    console.log("firstCopy", this.firstCopy)
    if (this.firstCopy) {
      this.firstCopy = false;
      event.stopPropagation();
      event.preventDefault();

      const { start, end } = this.cellSelections.GetSelection(0);
      const selection = getCellsFromBoxSpecial(start, end);
      let newCopy = "";
      for (var x = 0; x < selection.length; x++) {
        for (var y = 0; y < selection[x].length; y++) {
          const item = this.gVariables.holder[selection[x][y]].algorithm
          const isLast = y === selection[x].length - 1
          newCopy += isLast ? item : item + sideDiv;
        }
        newCopy += HorizonDiv;
      }
      // console.log("Copy", newCopy);
      // for (var i = 0; i < newCopy.length; i++) {
      //   console.log(newCopy.charCodeAt(i), newCopy[i]);
      // }

      this.textareaRef.current.value = newCopy;
      this.textareaRef.current.select();
      document.execCommand("copy");
    } else {
      this.firstCopy = true
    }

  }

  handleDelete = () => {
    const {start,end} = this.cellSelections.GetSelection(0);
    const cellBox = getCellsFromBox(start,end);
    for(var i =0;i< cellBox.length;i++){
      this.gVariables.holder[cellBox[i]].handleChange("");
    }
  }

  handleMouseUp = item => event => {
    // event.preventDefault()
    const { clientX, clientY } = event;
    if (event.button === 2) {
      this.setState(() => ({
        open: true,
        left: clientX,
        top: clientY
      }))
    } else if (this.state.open) {
      this.setState(() => ({
        open: false
      }))
    } else {
      this.handleMouseLeftUp(item);
    }
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
  }

  render() {
    const { classes } = this.props;
    const { open, top, left } = this.state;
    return (
      <div className={classes.root}>
      
        <textarea ref={this.textareaRef} className={classes.copyHolder} />
        <RightTools open={open} left={left} top={top} />
        <AlgoHeader active={this.gVariables.holder.active} />
        <div className={classes.mainTable}>
          <div className={classes.letterHeader}>
            <div className={classes.side} />
            {this.mainHolderKeys[0].map((row, i) => (
              <div key={`row-top${i}`} className={classes.topHeader}>{numToLetters(i)}</div>
            ))}
          </div>
          {this.mainHolderKeys.map((row, i) => (
            <div key={`row${i}`} className={classes.flex}>
              <div className={classes.side}>{i + 1}</div>
              {row.map(column => (
                <AlgoCell
                  key={column.name}
                  item={column}
                  onBlur={this.handleBlur}
                  onFocus={this.handleFocus}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}
                  onMouseEnter={this.handleMouseEnter}
                  onPaste={this.handlePaste}
                  onCopy={this.handleCopy}
                />
              ))}
            </div>
          ))}
          <Selectors cellSelections={this.cellSelections} />
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