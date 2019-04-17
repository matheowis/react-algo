import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { numToLetters } from "../../utils";
import AlgoCell from "./AlgoCell";
import AlgoHeader from "./AlgoHeader";

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
  mainHolder = {};
  mainHolderKeys = [];

  componentWillMount() {
    const { rows, columns } = this.props;
    for (var x = 0; x < rows; x++) {
      this.mainHolderKeys[x] = [];
      for (var y = 0; y < columns; y++) {
        const name = `${numToLetters(y)}${x + 1}`;
        const obj = { algorithm: "", outcome: "", isOver: false, name, x, y };
        this.mainHolder[name] = obj;
        this.mainHolderKeys[x].push({ name, props: obj });
      }
    }
    this.mainHolder.active = { name: "", algorithm: "", outcome: "" }
  }
  componentDidMount() {
    // TEST
    // this.mainHolder["B3"].Include("rgb(255,0,0)");
  }

  handleBlur = item => event => {
    const { algorithm } = item.props;
    this.mainHolder.active.setName("");
    this.mainHolder.active.setAlgorithm("");
    this.mainHolder.active.item = null;

    if (algorithm[0] === "=") {
      //calculate
      const outcome = eval(algorithm.slice(1));
      item.props.outcome = outcome;
      item.props.handleChange(outcome);
    }
  }

  handleFocus = item => event => {
    event.preventDefault();
    console.log("item", item)
    const { algorithm } = item.props;
    this.mainHolder.active.setName(item.name);
    this.mainHolder.active.setAlgorithm(algorithm);
    this.mainHolder.active.item = item;
  }

  handleKeyDown = item => event => {
    const { x, y } = item.props;
    const blureItem = (nx, ny) => {
      const newName = `${numToLetters(y - nx)}${x + 1 - ny}`;
      this.mainHolder[newName].ref.current.focus();
    }
    switch (event.key) {
      case "ArrowDown":
        blureItem(0, -1);
        break;
      case "ArrowUp":
        blureItem(0, 1);
        break;
      case "ArrowLeft":
        blureItem(1, 0);
        break;
      case "ArrowRight":
        blureItem(-1, 0);
        break;
      case "Enter":
        item.props.ref.current.blur();
        break;
      case "Escape":
        item.props.ref.current.blur();
        break;
    }
  }

  handleChange = item => event => {
    // const { item } = this.props
    const value = event.target.value;
    item.props.algorithm = value;
    item.props.handleChange(value);
    this.mainHolder.active.setAlgorithm(item.props.algorithm);
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
        <AlgoHeader active={this.mainHolder.active} />
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
                  tabs={this.mainHolder}
                  onBlur={this.handleBlur}
                  onFocus={this.handleFocus}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  lock={this.lock}
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