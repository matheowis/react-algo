import React, { Component } from "react";
import PropTypes from 'prop-types';
import injectSheet from "react-jss";

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
    const { active } = this.props;
    active.setName = this.setName;
    active.setAlgorithm = this.setAlgorithm;
  }

  setName = (name) => {
    this.setState(() => ({ name }));
  }

  setAlgorithm = (algorithm) => {
    this.setState(() => ({ algorithm }));
  }

  render() {
    const { classes } = this.props;
    const { name, algorithm } = this.state;
    return (
      <div style={{ display: "flex", flexDirection: "row", margin: 20 }}>
        <input
          className={classes.name}
          value={name}
          readOnly
        />
        <input
          className={classes.algorithm}
          value={algorithm}
          readOnly

        />
      </div>
    )
  }
}

AlgoHeader.propTypes = {
  active: PropTypes.object.isRequired,
}

export default injectSheet(styles)(AlgoHeader);