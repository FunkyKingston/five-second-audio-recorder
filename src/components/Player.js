import React, { Component, Fragment } from 'react';

class Player extends Component {
  state = {
    isPlaying: false,
  }
  
  startPlaying = () => {
    this.setState({isPlaying: true});

    // don't set src to the same URL again, that will rewind the clip to the start (e.g. after pausePlaying)
    if (this.props.audioURL && this.props.audioURL != this.audio.src) { 
      this.audio.src = this.props.audioURL
    }

    // console.log("this.audioContext.state:", this.audioContext.state)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }
    // this.audioContext.suspend()
    this.audio.play();
    this.audio.onended = () => {this.setState({isPlaying: false})};
  }

  pausePlaying = () => {
    this.setState({isPlaying: false});
    this.audio.pause(); // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
  }

  componentDidMount() {
    // console.log("componentDidMount in Player.js - this.props.audioURL:", this.props.audioURL);
    // console.log(this)
    this.audio = new Audio();
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.source = this.audioContext.createMediaElementSource(this.audio); 
    this.gainNode = this.audioContext.createGain();
    this.source.connect(this.gainNode).connect(this.audioContext.destination);
  }

  render() {
    return (
      <Fragment>
      
        {this.props.audioURL ? 
          <div id="player">
            <h2>Playback last recording</h2>
            <div id="player-buttons">
              <button id="play-button" className={this.state.isPlaying ? "btn-inactive" : "btn-active"} onClick={this.startPlaying}>Play</button>
              <button id="pause-button" className={this.state.isPlaying ? "btn-active" : "btn-inactive"} onClick={this.pausePlaying}>Pause</button>
            </div>
          </div>
          : 
          "" // this.props.audioURL is null
        }
    
      </Fragment>
    );
  }
}

export default Player;
