import React, { Component } from 'react';
import Counter from './Counter';
import Player from './Player';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMedia: false,
      isRecording: false,
      audioURL: null
    }
    // console.log(navigator);
    if (navigator.mediaDevices) {
      this.state.hasMedia = true;
    } 
  }

  startRecording = () => {
    this.setState({isRecording: true});
    this.mediaRecorder.start()

    this.timer = setTimeout(() => {
      // console.log("timer expired (5 seconds passed)")
      this.stopRecording();  
    },
    5000
    );
  }

  stopRecording = () => {
    this.mediaRecorder.stop();
    this.setState({isRecording: false});
    this.setState({count: 5});
    clearTimeout(this.timer);
  }

  // arrow functions and binding this-context - https://stackoverflow.com/questions/50375440/binding-vs-arrow-function-for-react-onclick-event
  toggleRecording = () => {
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      if (this.state.hasMedia) {
       this.startRecording();
      }
    }
  }
  
  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    this.mediaRecorder = new MediaRecorder(stream);
    let chunks = []; // init data storage for audio chunks
    
    this.mediaRecorder.ondataavailable = e => {
      chunks.push(e.data);
    };

    this.mediaRecorder.onstop = e => {
      const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      // console.log(blob);
      chunks = [];
      this.setState({audioURL: URL.createObjectURL(blob)});
    }
  }

  render() {
    return(
      <div id="app-container">
        <header><h1>Tomas 5 Second Recorder</h1></header>

        <div id="alert-div">
          {this.state.hasMedia ? "" : "Warning! navigator.mediaDevices only accessible on localhost and on secure connection (https)"}
        </div>

        <div id="recorder">
          <button id="toggle-record-button" className={this.state.isRecording ? "is-recording" : "not-recording"} onClick={this.toggleRecording}>
            {this.state.isRecording ? 'Stop' : 'Record'}
          </button>

          <p>
            {this.state.isRecording ? <Counter /> : ""}
          </p>
        </div>   

        <Player audioURL={this.state.audioURL} />
        
      </div>
    );
  }
}

export default App;
