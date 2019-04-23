import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  root: {
    transition: "height 0.3s",
    width: 200,
    position: "fixed",
    boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    overflow:"hidden",
    zIndex:10,
    background:"#fff"
  }
}

class RightTools extends Component {
  render() {
    const { classes, open, children } = this.props;
    const length = children.length || 1;
    const height = open ? length * 48 : 0;
    return (
      <div className={classes.root} style={{ height }}>
        {children}
      </div>
    )
  }
}

RightTools.propTypes = {
  open: PropTypes.bool.isRequired
}

export default injectSheet(styles)(RightTools)