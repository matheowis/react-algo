import React, { Component } from "react";
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import MultiColorInputHeader from "../MultiColorInput/Header";

const styles = {
  name: {
    // flex: 0,
    width: 100,
    margin: 10
  },
  algorithm: {
    flex: 1,
    margin: 10
  }
}

class AlgoHeader extends Component {
  state = {
    name: "",
    algorithm: "",
  }

  componentWillMount() {
    this.props.active.setName = this.setName;
    this.props.active.setAlgorithm = this.setAlgorithm;
  }

  setName = (name) => {
    this.setState(() => ({ name }));
  }

  setAlgorithm = (algorithm) => {
    // this.props.active.props.handleChange(algorithm,0,false,true);
    // this.props.active.props.handleChange("",0,false,true);
    this.props.active.props.handleChangeSimple(algorithm);
  }

  render() {
    const { classes, active } = this.props;
    const { name, algorithm } = this.state;
    console.log("Active",active)
    return (
      <div style={{ display: "flex", flexDirection: "row", margin: 20 }}>
        <input
          className={classes.name}
          value={name}
          readOnly
        />
        {/* <input
          id="AlgoMainTextField"
          className={classes.algorithm}
          value={algorithm}
          readOnly

        /> */}
        <MultiColorInputHeader
          id="AlgoMainTextField"
          className={classes.algorithm}
          active={active}
          // id={`cell-${item.name}`}
          onBlur={this.props.onBlur(active)}
          onFocus={this.props.onFocus(active)}
          onChange={this.props.onChange(active)}
          createSegments={this.props.createSegments(active)}
          onKeyDown={this.props.onKeyDown(active)}
          onMouseDown={this.props.onMouseDown(active)}
          onMouseUp={this.props.onMouseUp(active)}
          onMouseEnter={this.props.onMouseEnter(active)}
          onPaste={this.props.onPaste(active)}
          onCopy={this.props.onCopy(active)}
          // customRef={this.myRef}
          // itemProps={this.props.item.props}
        />
      </div>
    )
  }
}

AlgoHeader.propTypes = {
  active: PropTypes.object.isRequired,
  // item: PropTypes.object.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  createSegments: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
}


export default injectSheet(styles)(AlgoHeader);