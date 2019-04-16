import React, {Component} from 'react'
import injectSheet from 'react-jss';
import AlgoContainer from './algo/AlgoContainer';
const styles = {

}

 class Main extends Component{
   render(){
     return (
       <div>
         <AlgoContainer />

       </div>
     )
   }
 }

 export default injectSheet(styles)(Main)