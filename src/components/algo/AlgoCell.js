import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = {
  bar: {
    width:100,
    height: 24,
    fontSize: 18,
    cursor: "cell",
    padding: "1px 0px",
    "&:disabled": {
      backgroundColor: "white"
    },
    // "&:focus":{
    //   width:600,
    //   zIndex:2,
    //   position:"absolute"
    // },
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
    this.setState(() => ({ value }));
  }
  render() {
    const { classes, item } = this.props;
    const { value } = this.state;
    return (
      <div style={{ position: "relative" }}>
        <input
          type="text"
          id={`cell-${item.name}`}
          className={classes.bar}
          onBlur={this.props.onBlur(item)}
          onFocus={this.props.onFocus(item)}
          onChange={this.props.onChange(item)}
          onKeyDown={this.props.onKeyDown(item)}
          onMouseDown={this.props.onMouseDown(item)}
          onMouseUp={this.props.onMouseUp(item)}
          onMouseEnter={this.props.onMouseEnter(item)}
          onPaste={this.props.onPaste(item)}
          onCopy={this.props.onCopy(item)}
          value={value}
          style={{ borderColor: this.state.color }}
          ref={this.myRef}
        />
        {/* {this.state.selected && <div className={classes.graber} />} */}
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
  onMouseUp: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
}

export default injectSheet(styles)(AlgoCell);
