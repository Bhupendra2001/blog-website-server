
import React from "react";
import './App.css'
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      input :'',
      showPara : false,
    }
  };

  render(){

    return (
      <div>
        <textarea
        value={this.state.input}
        onChange={(e)=> this.setState({input : e.target.value})}/>
        <br/>
        <button
        onClick={()=>{
          this.setState({showPara : !this.state.showPara})
        }} > Display in UpperCase</button>
        {this.state.showPara && <p id="up">{this.state.input.toUpperCase()}</p>}
      </div>
    )
  }
}

export default App;
