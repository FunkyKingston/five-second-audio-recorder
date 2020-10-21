import React, { Component } from 'react';
import Recorder from './Recorder';
import Player from './Player';
import '../../static/css/main.css' // $ npm i -D style-loader css-loader   <- also, add under module rules in webpack.config.js, see https://webpack.js.org/loaders/style-loader/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMedia: false,
      audioURL: null
    }
    // console.log(navigator);
    if (navigator.mediaDevices) {
      this.state.hasMedia = true;
    } 
  }

  // https://reactjs.org/docs/lifting-state-up.html
  handleNewAudioURL = (recorderAudioURL) => { // this function is passed in as props to the Recorder component and called from within it
    this.setState({audioURL: recorderAudioURL});
  }

  render() {
    return(
      <div id="app-container">
        <header><h1>Tomas 5 Second Recorder</h1></header>

        <div id="alert-div">
          {this.state.hasMedia ? "" : "Warning! navigator.mediaDevices only accessible on localhost and on secure connection (https)"}
        </div>

        <Recorder handleNewAudioURL={this.handleNewAudioURL} hasMedia={this.state.hasMedia} />
        <Player audioURL={this.state.audioURL} />
      </div>
    );
  }
}

export default App;
