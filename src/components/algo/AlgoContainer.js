import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { numToLetters } from "../../utils";
import AlgoBar from "./AlgoBar";
const styles = {

}
// TODEL
// mainHolderDefault = {
//   "A1":{algorithm:"", outcome:"", isOver:false}
// }

class AlgoContainer extends Component {
  mainHolder = {};
  mainHolderKeys = [];
  componentWillMount() {
    const { rows, columns } = this.props;
    for (var x = 0; x < rows; x++) {
      this.mainHolderKeys[x] = [];
      for (var y = 0; y < columns; y++) {
        const obj = { algorithm: "", outcome: "", isOver: false };
        this.mainHolder[`${numToLetters(x)}${y + 1}`] = obj;
        this.mainHolderKeys[x].push({ name: `${numToLetters(x)}${y + 1}`, props: obj });
      }
    }
  }
  componentDidMount(){
    // TEST
    this.mainHolder["B3"].Include("rgb(255,0,0)");
  }
  render() {
    console.log(this.props);
    console.log(this.mainHolderKeys)
    return (
      <div>
        {this.mainHolderKeys.map((row,i) => (
          <div key={`row${i}`} style={{ display: "flex" }}>
            {row.map(column => (
              <AlgoBar
                key={column.name}
                item={column}
              />
            ))}
          </div>
        ))}
        {this.props.size}
      </div>
    )
  }
}

AlgoContainer.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
}

AlgoContainer.defaultProps = {
  /**
   * Static
   */
  rows: 6,
  /**
   * Static
   */
  columns: 6,
}

export default injectSheet(styles)(AlgoContainer);