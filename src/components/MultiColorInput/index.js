import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InnerInput from "./InnerInput";
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { mciFunctions } from "./helpers";
import { CELL_SIZE } from "../../constant";
const styles = {
  input: {
    width: CELL_SIZE.X - 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    "&:focus": {
      position: "absolute",
      overflow: "initial",
      zIndex: 2,
    }
  }
}

const allowChange = key => (
  key === "Backspace" ||
  key === "Delete" ||
  key.length === 1
);

class MultiColorInput extends Component {

  valueHolder = "";

  handleKeyDown = (event) => {
    this.props.onKeyDown(event);
    const { key, target } = event;
    let newSelection = 0;
    event.preventDefault();
    if (allowChange(key)) {
      const selection = mciFunctions.getSelection(target);
      if (key === "Backspace" || key === "Delete") {
        this.valueHolder = mciFunctions.getAfterErase(this.valueHolder, selection);
        newSelection = selection.selectionStart;
      } else if (key.length === 1) {
        this.valueHolder += key;
        newSelection = selection.selectionStart + 1;
      }
      this.props.onChange({ value: this.valueHolder, ...selection });

      const structure = this.props.createSegments(this.valueHolder)

      const elem = document.createElement('div');
      const JSX = (<InnerInput structure={structure} />);

      ReactDOM.render(JSX, elem, () => {
        target.innerHTML = elem.innerHTML;
        const { elIndex, selectionIndex } = mciFunctions.getSelectionElement(target, newSelection);
        mciFunctions.selectElementContents(target.children[elIndex],selectionIndex,selectionIndex );
      });
    }
  }

  handleBlure = event => {
    this.valueHolder = "";
    this.props.onBlur(event);
  }

  handleFocus = event => {
    this.valueHolder = mciFunctions.getString(event.target);
    this.props.onFocus(event);
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        id={this.props.id}
        className={`${classes.input} ${this.props.className}`}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlure}
        onFocus={this.handleFocus}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseEnter={this.props.onMouseEnter}
        onPaste={this.props.onPaste}
        onCopy={this.props.onCopy}
        ref={this.props.customRef}
      >
        {/* <span style={{ color: "blue" }}>var</span>
        <span>foo =</span>
        <span style={{ color: "green", background: "#fff" }}>"bar"</span> */}
      </div>
    )
  }
}

MultiColorInput.propTypes = {
  /**
   * gets string as input
  * has to return segments
  * example : 
  * [
  *   {text:"this is ", colorID:1},
  *   {text:"test", colorID:5}
  * ]
  */
  createSegments: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onPaste: PropTypes.func,
  onCopy: PropTypes.func,
  id: PropTypes.string,
  customRef: PropTypes.object
}

MultiColorInput.defaultProps = {
  onBlur: () => { },
  onFocus: () => { },
  onChange: () => { },
  onKeyDown: () => { },
  onMouseDown: () => { },
  onMouseUp: () => { },
  onMouseEnter: () => { },
  onPaste: () => { },
  onCopy: () => { },
  id: "",
  className: ""
}



export default injectSheet(styles)(MultiColorInput);