import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InnerInput from "./InnerInput";
import PropTypes from 'prop-types';
import { mciFunctions } from "./helpers";

class MultiColorInput extends Component {
  valueHolder = "";
  handleKeyDown = (event) => {
    const { key, target } = event;
    console.log("key=", e.key);
    e.preventDefault();
    if (key === "Backspace" || key === "Delete") {
      this.valueHolder = mciFunctions.getAfterErase(event);
    } else if (e.key.length === 1) {
      const value2 = mciFunctions.getString(e.target);
      console.log({ value2 });
      //get Key from event
      this.valueHolder += e.key;
      console.log(this.valueHolder)
      const value = e.target.innerHTML;
      // e.target.innerHTML = "a"
      const range = window.getSelection().getRangeAt(0)
      // console.log({range});
      // const mainDiv = 
      // const inputChildrens = 
      const target = e.target;
      // console.dir(target);

      // let fullValue = "";
      // const children = e.target.children
      // for (var i = 0; i < children.length; i++) {
      //   fullValue += children[i].textContent;
      // }
      // const testParts = fullValue.split(".");
      // fullValue+= e.key;

      const testParts = this.valueHolder.split(".");
      const structure = testParts.map((part, i) => {
        const isLast = i !== testParts.length - 1
        return {
          text: isLast ? part + e.key : part + ".",
          colorID: i
        }
      })
      console.log({ structure });
      // console.log({ fullValue })
      // const structure = [];
      // e.target.children.map(child => {
      //   fullValue += child.textContent
      // })

      const elem = document.createElement('div');
      const JSX = (<InnerInput
        structure={structure}
      // structure={[
      //   { text: "ABC", colorID: 0 },
      //   { text: " ABC2", colorID: 6 },
      // ]}
      />);

      ReactDOM.render(JSX, elem, () => {
        // console.log("Change DIV", elem.innerHTML);
        // console.dir(elem)
        target.innerHTML = elem.innerHTML;
      });
      // range.commonAncestorContainer.parentElement.parentElement.children
      // console.log("nodeType", range.startContainer.nodeType)
      console.log(window.getSelection());
    }
  }

  render() {
    return (
      <div
        contentEditable="true"
        onKeyDown={this.handleKeyDown}
        onFocus={e => { console.log("Focus", e.target) }}
        style={{
          width: 100,
          whiteSpace: "nowrap",
          overflow: "initial"
        }}>
        <span style={{ color: "blue" }}>var</span>
        <span>foo =</span>
        <span style={{ color: "green" }}>"bar"</span>
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
  createSegments:PropTypes.func.isRequired
}


export default MultiColorInput