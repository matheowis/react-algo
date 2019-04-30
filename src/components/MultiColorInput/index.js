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
      // position: "absolute",
      overflow: "initial",
      zIndex: 3,
    },
    "&:focus span": {
      position:"relative",
      zIndex:30,
      backgroundColor: "#fff",
    }
  }
}

const allowChange = (key, special) => (
  key === "Backspace" ||
  key === "Delete" ||
  key.length === 1 &&
  !special.ctrl &&
  !special.alt
);
const specialKeysSet = (holder, key, bool) => {
  switch (key) {
    case "Control": {
      holder.ctrl = bool;
      break;
    }
    case "Alt": {
      holder.alt = bool;
      break;
    }
  }
}
class MultiColorInput extends Component {

  valueHolder = "";
  specialKeys = {
    ctrl: false,
    alt: false,
  }
  myRef = React.createRef();

  componentWillMount() {
    this.props.itemProps.handleChange = this.handleChange;
    this.props.itemProps.ref = this.myRef;
    this.props.itemProps.algorithm = "";
    // this.props.item.props.handleInclude = this.handleInclude;
    // this.props.item.props.handleChange = this.handleChange;
    // this.props.item.props.ref = this.myRef;
  }

  handleKeyDown = (event) => {
    this.props.onKeyDown(event);
    const { key, target } = event;
    let newSelection = 0;
    // switch(key)
    specialKeysSet(this.specialKeys, key, true);
    console.log(key);
    console.log("KeyDown!");

    if (allowChange(key, this.specialKeys)) {
      event.preventDefault();
      const selection = mciFunctions.getSelection(target);
      if (key === "Backspace" || key === "Delete") {
        selection.selectionStart -= 1;
        // selection.selectionEnd -= 1;
        this.valueHolder = mciFunctions.getAfterErase(this.valueHolder, selection);
        newSelection = selection.selectionStart;
      } else if (key.length === 1) {
        this.valueHolder += key;
        newSelection = selection.selectionStart + 1;
      }

      const structure = this.props.createSegments(this.valueHolder);
      this.props.itemProps.algorithm = this.valueHolder;

      const elem = document.createElement('div');
      const JSX = (<InnerInput structure={structure} />);

      this.props.onChange({ value: this.valueHolder, selectionStart: selection.selectionStart });

      ReactDOM.render(JSX, elem, () => {
        target.innerHTML = elem.innerHTML;

        console.log(elem.innerHTML);
        const { elIndex, selectionIndex } = mciFunctions.getSelectionElement(target, newSelection);
        mciFunctions.selectElementContents(target.children[elIndex], selectionIndex, selectionIndex);
      });
    }
  }

  handleChange = (value, addLength, total = false) => {
    console.log("change!");
    const target = this.myRef.current;
    const structure = this.props.createSegments(value);
    this.props.itemProps.algorithm = value;
    const selection = mciFunctions.getSelection(target);
    const newSelection = total ? addLength : selection.selectionStart + addLength;
    this.valueHolder = value;

    const elem = document.createElement('div');
    const JSX = (<InnerInput structure={structure} />);

    ReactDOM.render(JSX, elem, () => {
      target.innerHTML = elem.innerHTML;
      const { elIndex, selectionIndex } = mciFunctions.getSelectionElement(target, newSelection);
      console.log("SELECTION_INDEX",selectionIndex);
      mciFunctions.selectElementContents(target.children[elIndex], selectionIndex, selectionIndex);
    });
  }

  handleKeyUp = event => {
    const { key } = event;
    specialKeysSet(this.specialKeys, key, false);
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
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlure}
        onFocus={this.handleFocus}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseEnter={this.props.onMouseEnter}
        onPaste={this.props.onPaste}
        onCopy={this.props.onCopy}
        ref={this.myRef}
        spellCheck={false}
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
  itemProps: PropTypes.object.isRequired

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