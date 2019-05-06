import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { numToLetters } from "../../utils";
import { OPERATORS } from "../../constant";
import { AlgoFunctions } from "../../functions/AlgoFunctions";
import { CellSelections } from "../../functions/CellSelections";
import { getCellsFromBox, getCellsFromBoxSpecial, splitCellName } from "../../functions/helpers";
import { CELL_SIZE } from "../../constant";
import AlgoCell from "./AlgoCell";
import AlgoHeader from "./AlgoHeader";
import RightTools from "./RightTools";
import Selectors from "./Selectors";
import { mciFunctions } from '../MultiColorInput/helpers';

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
    minWidth: CELL_SIZE.X - 1,
    border: "solid",
    borderWidth: 1,
    borderRight: "none",
    borderBottom: "none",
    padding: "1px 0px",
    background: "#eee",
    borderColor: "#aaa",
    textAlign: "center"
  },
  side: {
    minWidth: 24,
    maxWidth: 24,
    background: "#eee",
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
    end: "",
    pStart: "",
    pEnd: ""
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
    this.gVariables.holder.active = { name: "header", algorithm: "", outcome: "", props: { algorithm: "", outcome: "" } }
  }

  componentDidMount() {
    const newName = `A1`;
    this.gVariables.holder.active.item = this.gVariables.holder[newName];
    this.gVariables.holder[newName].ref.current.focus();
    this.cellSelections.ChangeSelection(0, newName);

  }

  handleBlur = item => event => {
    console.log("Blure", event);
    // const { algorithm } = item.props;
    // this.Algo.writing = false;
    // this.gVariables.holder.active.setName("");
    // this.gVariables.holder.active.setAlgorithm("");
    // this.gVariables.holder.active.item = null;

    this.cellSelections.clearSelection(true);
    this.calculateCell(item);
    // if (algorithm[0] === "=") {
    //   const outcome = this.algoFunctions.CalculateLocal(item);

    //   item.props.outcome = outcome;
    //   item.props.handleChange(outcome);
    // }
  }

  calculateCell = item => {
    const { algorithm } = item.props;
    this.Algo.writing = false;
    if (algorithm[0] === "=") {
      const outcome = this.algoFunctions.CalculateLocal(item);

      item.props.outcome = outcome;
      item.props.handleChange(outcome, undefined, false, true);
      // item.props.handleChange(outcome);
    }
  }

  handleFocus = item => event => {
    if(item.name === 'header'){
      this.cellSelections.ChangeSelection(0, item.item.name);
    }else{
      console.log(item.name);
      this.Algo.currentItem = item;
      const { algorithm, outcome } = item.props;
      // console.log("item.props", item.props);
  
      if (outcome[0] !== "=" && algorithm[0] === "=") {
        // console.log("switch!")
        item.props.handleChange(algorithm);
      }
      // console.log("item", item)
      console.log("Setting active item",item);
      this.gVariables.holder.active.item = item.props;
      this.gVariables.holder.active.setName(item.name);
      this.gVariables.holder.active.setAlgorithm(algorithm);
    }
  }

  handleKeyDown = item => event => {
    const { x, y, algorithm } = item.props;
    const algoItems = algorithm[0] === "=" ? this.algoFunctions.splitAlgorithm(algorithm) : [1];
    const canMove = !isNaN(algoItems[algoItems.length - 1]);

    const moveItem = (nx, ny, force) => {
      if (canMove || force) {
        const newName = `${numToLetters(y - nx)}${x + 1 - ny}`;
        this.gVariables.holder[newName].ref.current.focus();
        this.cellSelections.ChangeSelection(0, newName)
      }
    }

    console.log({ key: event.key });
    switch (event.key) {
      case "ArrowDown":
        moveItem(0, -1);
        break;
      case "ArrowUp":
        moveItem(0, 1);
        break;
      case "ArrowLeft":
        moveItem(1, 0);
        break;
      case "ArrowRight":
        moveItem(-1, 0);
        break;
      case "Enter":
        event.preventDefault();
        this.calculateCell(item);
        this.cellSelections.clearSelection(true);
        moveItem(0, -1, true);
        break;
      case "Escape":
        item.props.ref.current.blur();
        this.cellSelections.clearSelection();
        break;
      case "Delete": {
        this.handleDelete();
        this.cellSelections.clearSelection(true);
      }
    }


  }

  // handleMouseDown = item => event => {
  //   this.pMouse.start = this.pMouse.end = item.name;
  //   if (!this.Algo.writing) {
  //     this.cellSelections.ChangeSelection(0, this.pMouse.start, this.pMouse.end)
  //   }
  //   console.log(item.name);
  //   console.log("Down", this.Algo.currentItem.props);
  //   if (this.Algo.currentItem.props) { // currently focused item
  //     const { props } = this.Algo.currentItem;
  //     const { algorithm } = props;
  //     if (this.Algo.writing && item !== this.Algo.currentItem && this.Algo.currentItem.name) {
  //       event.preventDefault();
  //       const selection = mciFunctions.getSelection(this.Algo.currentItem.props.ref.current).selectionStart

  //       if (this.Algo.selectedCell) {
  //         // replace jest do wywalenia (brak możliwości powtarzania komorek)
  //         props.algorithm = algorithm.replace(this.Algo.selectedCell, item.name);
  //         this.Algo.selectedCell = item.name;
  //         props.handleChange(props.algorithm,item.name.length - this.Algo.selectedCell.length);
  //       } else if (OPERATORS.includes(algorithm[selection - 1])) {
  //         this.Algo.selectedCell = item.name;
  //         props.algorithm = algorithm.slice(0, selection) + item.name + algorithm.slice(selection, algorithm.length);
  //         props.handleChange(props.algorithm, item.name.length);
  //       }
  //       // console.log("selection",selection);
  //     }
  //   }
  // }

  handleMouseDown = item => event => {
    console.log("handleMouseDown", item);
    this.pMouse.start = this.pMouse.end = item.name;
    if (!this.Algo.writing) {
      this.cellSelections.ChangeSelection(0, this.pMouse.start, this.pMouse.end)
    } else {
      if (item.name !== this.Algo.currentItem.props.name) {
        event.preventDefault();
        this.handleSelection(item);
      }
    }
  }

  handleSelection = (item) => {
    const startItem = this.gVariables.holder[this.pMouse.start];
    const endItem = this.gVariables.holder[this.pMouse.end];
    const selection = mciFunctions.getSelection(this.gVariables.holder.active.props.ref.current).selectionStart
    const parts = this.algoFunctions.splitAlgorithm(this.gVariables.holder.active.props.algorithm);
    // const selection = mciFunctions.getSelection(this.Algo.currentItem.props.ref.current).selectionStart
    // const parts = this.algoFunctions.splitAlgorithm(this.Algo.currentItem.props.algorithm);
    const { pIndex, pLength } = mciFunctions.getCurrentPartIndex(parts, selection);
    // const indexLength = 
    // let insertLength = 0;
    let insertLength = pLength;
    // console.log("currentPart=", parts[pIndex]);
    // console.log("pIndex=", pIndex);
    console.log(this.gVariables.holder.active.props.algorithm);
    console.log("parts=", parts);
    if (parts[pIndex].length >= 4) {
      throw "Error parts[pIndex] is to long";
    }
    if (OPERATORS.includes(parts[pIndex]) && parts[pIndex] !== ":") {
      // console.log("Type_O", parts[pIndex]);
      // console.log({ parts });
      if (startItem.name === endItem.name) {
        // single
        parts.splice(pIndex + 1, 0, startItem.name);
        insertLength += startItem.name.length + 1;
        // console.log("SET END START", endItem.name)
        Object.assign(this.pMouse, { pStart: startItem.name, pEnd: endItem.name });
      } else {
        //should never happen
        parts.splice(pIndex + 1, 0, startItem.name, ":", endItem.name);
        insertLength += 1 + startItem.name.length + endItem.name.length;
        // console.log("SET END", endItem.name)
        Object.assign(this.pMouse, { pStart: startItem.name, pEnd: endItem.name });
      }
      // this.Algo.currentItem.props.handleChange(parts.join(""), insertLength, true);
      this.gVariables.holder.active.props.handleChange(parts.join(""), insertLength, true);
    } else if (this.gVariables.holder[parts[pIndex]] || parts[pIndex] === ":") {
      // new group
      const { pStart, pEnd } = this.pMouse;
      if (parts[pIndex - 1] === ":") {
        // console.log("Type_A", parts[pIndex]);
        insertLength -= parts[pIndex - 2].length;
        parts.splice(pIndex - 2, 3, startItem.name, ":", endItem.name);
        insertLength += startItem.name.length + endItem.name.length;// - parts[pIndex].length

        Object.assign(this.pMouse, { pStart: startItem.name, pEnd: endItem.name });

      } else if (parts[pIndex] === ":") {
        //TOTEST
        console.log("Type_B", parts[pIndex]);
        parts.splice(pIndex - 1, 3, startItem.name, ":", endItem.name);
        // insertLength = 1 + startItem.name.length + endItem.name.length;//n
        // console.log("insertLength_B1", insertLength);
        insertLength += startItem.name.length + endItem.name.length - parts[pIndex + 1].length;//- parts[pIndex-1].length
        // console.log("insertLength_B2", insertLength);

      } else if (parts[pIndex + 1] === ":") {
        //TOTEST
        // what if parts[pIndex + 2] == undefined?
        // console.log("Type_C", parts[pIndex]);
        parts.splice(pIndex, 3, startItem.name, ":", endItem.name);

        // insertLength = startItem.name.length - pStart.length;
        insertLength += startItem.name.length + endItem.name.length;
        // insertLength = 1 + startItem.name.length + endItem.name.length;//n
      } else {
        //TOTEST
        // console.log("Type_D", parts[pIndex]);
        parts.splice(pIndex, 1, startItem.name, ":", endItem.name);
        insertLength += startItem.name.length + 1 + endItem.name.length;//k
        // from single to group
      }
      this.gVariables.holder.active.props.handleChange(parts.join(""), insertLength, true);
      // this.Algo.currentItem.props.handleChange(parts.join(""), insertLength, true);
    } else {
      // function?
      // console.log("Probably function")
    }
  }

  handleMouseLeftUp = item => {
    console.log("Up", item.name)
    this.pMouse.start = this.pMouse.end = "";

  }

  handleMouseEnter = item => event => {
    if (this.pMouse.start !== "") {
      console.log("MouseEnter");
      this.pMouse.end = item.name;
      if (!this.Algo.writing) {
        const { start, end } = this.pMouse
        // this.cellFunctionHolder[0](start, end);
        this.cellSelections.ChangeSelection(0, start, end)
      }
      this.handleSelection(item);
    }
  }

  handlePaste = item => event => {
    console.log("Paste!!!");
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
    const { start, end } = this.cellSelections.GetSelection(0);
    const cellBox = getCellsFromBox(start, end);
    for (var i = 0; i < cellBox.length; i++) {
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
    // DO NOT USE item.props.handleChange(value), will couse recursion
    console.log("OnChange item=", item);
    const { value, selectionStart } = event;

    // console.log("OPERATORS",OPERATORS);
    if (OPERATORS.includes(value[selectionStart - 1])) {
      this.Algo.selectedCell = null;
    }
    this.Algo.writing = value[0] === "=";

    item.props.algorithm = value;
    // item.props.handleChange(value);
    // this.gVariables.holder.active.setAlgorithm(item.props.algorithm);// Recursion alert
  }

  createSegments = item => value => {

    const parts = this.algoFunctions.splitAlgorithm(value);

    const structure = this.algoFunctions.partsToColorStructure(parts);
    const selections = structure.filter(s => s.colorID !== "B");
    for (var i = 0; i < selections.length; i++) {
      const { start, end, colorID } = selections[i];
      this.cellSelections.ChangeSelection(colorID, start, end);
    }
    console.log("value", value);
    // const structure = [
    //   { text: value, colorID: "B" }
    // ]
    return structure;
  }

  render() {
    const { classes } = this.props;
    const { open, top, left } = this.state;
    return (
      <div className={classes.root}>

        <textarea ref={this.textareaRef} className={classes.copyHolder} />
        <RightTools open={open} left={left} top={top} />
        <AlgoHeader
          active={this.gVariables.holder.active}
          // item={this.gVariables.holder.active}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseEnter={this.handleMouseEnter}
          onPaste={this.handlePaste}
          onCopy={this.handleCopy}
          createSegments={this.createSegments}
        />
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
                  createSegments={this.createSegments}
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