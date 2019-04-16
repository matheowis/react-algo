import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = {
  bar: {
    width: 100,
    height:24,
    fontSize: 18,
    cursor: "cell",
    "&:disabled":{
      backgroundColor:"white"
    }
  },
  selected:{

  }
};

class AlgoBar extends Component {
  state = {
    value: "",
    color: "rgb(238,238,238)"
    // color: "rgb(238,255,0)"
  }

  math = "";
  outcome= "";
  name = this.props.name;

  componentWillMount(){
    this.props.item.props.Include = this.handleInclude;
  }

  handleBlur = () => {

  }

  handleInclude = (color) => {
    console.log("do Stuff",this);
    this.setState(() => ({color}));
  }

  render() {
    const {classes} = this.props;
    const {value} = this.state;

    console.log("rendered", this.props.item.name);

    return (
      <input
        type="text"
        className={classes.bar}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        value={this.value}
        style={{borderColor:this.state.color}}
        disabled
      />
    )
  }
} 

AlgoBar.propTypes = {
  item: PropTypes.object.isRequired
}

export default injectSheet(styles)(AlgoBar);