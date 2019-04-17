import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

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

class AlgoCell extends Component {
  state = {
    value: "",
    color: "rgb(238,238,238)",
    selected: false
    // color: "rgb(238,255,0)"
  }
  myRef = React.createRef();
  componentWillMount() {
    this.props.item.props.handleInclude = this.handleInclude;
    this.props.item.props.handleChange = this.handleChange;
    this.props.item.props.ref = this.myRef;
  }

  handleInclude = (color) => {
    console.log("do Stuff", this);
    this.setState(() => ({ color }));
  }

  handleChange = (value) => {
    this.setState(() => ({value}));
  }
  // handleBlur = () => {
  //   const { item } = this.props;
  //   if (item.props.algorithm !== "") {
  //     console.log("Calculate");
  //     // this.setState(() => ({value: item.props.}))
  //   }
  // }

  // handleFocus = () => {

  // }
  // handleChange = e => {
  //   const { item } = this.props
  //   const value = e.target.value;
  //   if (value[0] === "=") {
  //     item.props.algorithm = value.slice(1);
  //     this.setState(() => ({ value }))
  //     // function mode
  //   } else {
  //     item.props.outcome = value
  //     this.setState(() => ({ value }))
  //   }

  //   console.log(e.target.value);
  // }
  render() {
    const { classes, item } = this.props;
    const { value } = this.state;
    return (
      <div style={{ position: "relative" }}>
        <input
          type="text"
          className={classes.bar}
          onBlur={this.props.onBlur(item)}
          onFocus={this.props.onFocus(item)}
          onChange={this.props.onChange(item)}
          onKeyDown={this.props.onKeyDown(item)}
          onMouseDown={this.props.onMouseDown(item)}
          value={value}
          style={{ borderColor: this.state.color }}
          ref={this.myRef}
        />
        {/* <MultiColorInput /> */}
        {this.state.selected && <div className={classes.graber} />}
      </div>
    )
  }
}

AlgoCell.propTypes = {
  item: PropTypes.object.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  lock: PropTypes.bool.isRequired
}

export default injectSheet(styles)(AlgoCell);

{/* <code contenteditable="true">
  <span style="color: blue">var</span> foo = <span style="color: green">"bar"</span>;
</code> */}