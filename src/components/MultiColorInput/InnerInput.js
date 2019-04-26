import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { COLORS_HEX } from "../../constant";

const styles = COLORS_HEX.reduce((result, item, i) => {
  result[`color${i}`] = { color: item, background: "#fff" }
  return result;
}, {});

Object.assign(styles,{
  colorB:{
    color:"#222"
  }
});

class InnerInput extends Component {
  render() {
    const { structure, classes } = this.props;
    return (
      <>
        {structure.map((item, i) => (
          <span
            key={`innerSpan${i}`}
            id={`innerSpan${i}`}
            className={classes[`color${item.colorID}`]}
          >
            {item.text}
          </span>
        ))}
      </>
    )
  }
}

export default injectSheet(styles)(InnerInput);