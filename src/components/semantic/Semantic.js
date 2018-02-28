/* global chrome */

import React from 'react';
import Slider from 'react-rangeslider';
// import { Button } from 'semantic-ui-react';
import "./Semantic.css"
import "../../../node_modules/semantic-ui-forest-themes/semantic.darkly.css";

class Semantic extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 1,
    }
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value,
    })
    console.log('Change event completed')
    let currentMoodValue = {
      vals: [],
      dates: []
    };
    chrome.storage.sync.get('moodValue', function(value) {
      currentMoodValue = value.hasOwnProperty("moodValue") ? value.moodValue : currentMoodValue; 
    
      let newMoodValue = {};
      newMoodValue.vals = [...currentMoodValue.vals, value]
      newMoodValue.dates = [...currentMoodValue.dates, new Date().toString()]
        chrome.storage.sync.set({'moodValue': newMoodValue });
      // localStorage.setItem('moodValue', {
      //   dates: this.state.dates,
      //   values: this.state.values
      // })
      chrome.storage.sync.get('moodValue', function(value) {
        console.log(value);
      });
      // localStorage.getItem('moodValue', function(value) {
      //   console.log(value);
      // });
    });
  };

  handleChangeComplete = value => {
  //   this.setState({
  //     value: value
  //   })
  //   console.log('Change event completed')
  //   chrome.storage.sync.set({'moodValue': this.state.value})
  //   chrome.storage.sync.get('moodValue', function(value) {
  //     console.log(value);
  //   });
  };

  handleClickEvent(e) {
    e.preventDefault();
    chrome.storage.sync.clear(function() {
      var error = chrome.runtime.lastError;
      if (error) {
          console.error(error);
      }
   });
  };

  // clearStorage = () => {
  //   console.log("it's working");
  // };
  
  render () {
    const value = this.state.value;
    const horizontalLabels = {
      0: 'ANGRY KITTY',
      1: 'NEUTRAL KITTY',
      2: 'HAPPY KITTY'
    }
    return (
      <div>
      <div className="ui animated button">
        <div className="visible content" onClick={this.handleClickEvent}>
          Erase the Past
        </div>
        <div className="hidden content">
          Be Gone!
        </div>
      </div>
      <div>
      <Slider
        min={0}
        max={2}
        value={value}
        labels={horizontalLabels}
        onChangeStart={this.handleChangeStart}
        onChange={this.handleChange}
        onChangeComplete={this.handleChangeComplete}
      />
      </div>
      </div>
    )
  }
}

export default Semantic;
