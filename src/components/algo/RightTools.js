import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  root: {
    width: 120,
    position: "fixed",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    overflow: "hidden",
    zIndex: 1000,
    background: "#fff"
  },
  button: {
    width: 120,
    textAlign: "center",
    padding: "6px 0",
    cursor: "pointer",
    background: "#f4f4f4",
    "&:hover": {
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      background: "#fff"
    }
  }
}

class RightTools extends Component {
  render() {
    const {
      classes,
      open,
      top,
      left,
      localization,
      onAddData,
      onSetFinal
    } = this.props;
    const height = open ? 60 : 0;
    return (
      <div
        className={classes.root}
        style={{ height, top, left }}
        onContextMenu={e => { e.preventDefault() }}
      >
        <div className={classes.button} onClick={onAddData}>{localization.addData}</div>
        <div className={classes.button} onClick={onSetFinal}>{localization.setFinal}</div>
      </div>
    )
  }
}

RightTools.propTypes = {
  open: PropTypes.bool.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  localization: PropTypes.object,
  onAddData: PropTypes.func.isRequired,
  onSetFinal: PropTypes.func.isRequired
}

RightTools.defaultProps = {
  localization: {
    addData: "Add Data",
    setFinal: "Set Final"
  }
}

export default injectSheet(styles)(RightTools)