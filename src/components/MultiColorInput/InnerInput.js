import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { colorsHex } from "../../utils";

const styles = colorsHex.reduce((result, item, i) => {
  result[`color${i}`] = { color: item }
  return result;
}, {});

class InnerInput extends Component {
  render() {
    const { structure, classes } = this.props;
    console.log("this.props", this.props);
    return (
      <div>
        {structure.map((item, i) => (
          <span key={`TestSpan-${i}`} className={classes[`color${item.colorID}`]}>{item.text}</span>
        ))}
      </div>
    )
  }
}

export default injectSheet(styles)(InnerInput);