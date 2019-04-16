import React from "react";
import injectSheet from 'react-jss'

const styles = {
  root: {
    color: "#f00",
    "&:hover": {
      color: "#0f0"
    }
  },
  test:{
    height: "100%",
    width:"100%",
    background:"#ff0"
  }
}

class Test extends React.Component {
  render() {
    const { classes, className } = this.props;

    return (
      <div className={className}>
        <div className={classes.test}>aaa</div>
        <h1 className={classes.root}>
          test2
        </h1>
      </div>
    )
  }
}

export default injectSheet(styles)(Test);