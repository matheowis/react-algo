import React, { Component } from 'react';

class MultiColorInput extends Component {
  handleKeyDown = (e) => {
    // const newSpan = document.createElement("span");
    // newSpan.innerHTML = "Test"
    const value = e.target.innerHTML;
    // e.target.innerHTML = "a"
    console.dir(e.target)
    console.log(e.target.selectionStart)
    console.log(window.getSelection().getRangeAt(0));
  }

  render() {
    return(
    <div contenteditable="true" onKeyDown={this.handleKeyDown}>
      <span style={{ color: "blue" }}>var</span>
      foo =
      <span style={{ color: "green" }}>"bar"</span>;
    </div>
    )
  }
}

export default MultiColorInput