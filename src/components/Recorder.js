import React, { Component, Fragment } from 'react';
import Counter from './Counter';

class Recorder extends Component {
  state = {
    isRecording: false
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
    clearTimeout(this.timer);
  }

  // arrow functions and binding this-context - https://stackoverflow.com/questions/50375440/binding-vs-arrow-function-for-react-onclick-event
  toggleRecording = () => {
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      if (this.props.hasMedia) {
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
      this.props.handleNewAudioURL(URL.createObjectURL(blob)); // calls setState() in the parent component (App.js)
    }
  }

  render() {
    return (
      <div id="recorder">
        <button id="toggle-record-button" className={this.state.isRecording ? "is-recording" : "not-recording"} onClick={this.toggleRecording}>
          {this.state.isRecording ? 'Stop' : 'Record'}
        </button>

        <p>
          {this.state.isRecording ? <Counter /> : ""}
        </p>
      </div>   
    )
  }
}

export default Recorder;