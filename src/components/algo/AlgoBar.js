import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import MultiColorInput from './MultiColorInput'
const styles = {
  bar: {
    width: 100,
    height: 24,
    fontSize: 18,
    cursor: "cell",
    "&:disabled": {
      backgroundColor: "white"
    }
  },
  selected: {

  },
  graber: {
    width: 4,
    height: 4,
    position: "absolute",
    bottom: 0,
    right: 0,
    background: "#0b0",
    zIndex: 5
  }
};

class AlgoBar extends Component {
  state = {
    value: "",
    color: "rgb(238,238,238)",
    selected: false
    // color: "rgb(238,255,0)"
  }

  componentWillMount() {
    this.props.item.props.Include = this.handleInclude;
  }

  handleInclude = (color) => {
    console.log("do Stuff", this);
    this.setState(() => ({ color }));
  }

  handleBlur = () => {
    const { item } = this.props;
    if (item.props.algorithm !== "") {
      console.log("Calculate");
      // this.setState(() => ({value: item.props.}))
    }
  }

  handleChange = e => {
    const { item } = this.props
    const value = e.target.value;
    if (value[0] === "=") {
      item.props.algorithm = value.slice(1);
      this.setState(() => ({ value }))
      // function mode
    } else {
      item.props.outcome = value
      this.setState(() => ({ value }))
    }

    console.log(e.target.value);
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    console.log("rendered", this.props.item.name);

    return (
      <div style={{ position: "relative" }}>
        {/* <input
          type="text"
          className={classes.bar}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          value={value}
          style={{ borderColor: this.state.color }}
        /> */}
        <MultiColorInput />
        {this.state.selected && <div className={classes.graber} />}
      </div>
    )
  }
}

AlgoBar.propTypes = {
  item: PropTypes.object.isRequired
}

export default injectSheet(styles)(AlgoBar);

<code contenteditable="true">
  <span style="color: blue">var</span> foo = <span style="color: green">"bar"</span>;
</code>