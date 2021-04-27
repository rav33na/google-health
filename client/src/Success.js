import React, { Component } from 'react';
import './Success.scss';
import doctorImg from "./assets/Doctor.png";
import axios from 'axios';

class Success extends Component {
    state={
        infos:[]
      }
    
      componentDidMount () {
        axios.get("http://localhost:8080")
        .then(response => {
        this.setState({infos:response.data});
        this.synthesizeVoice()
})}
     
          synthesizeVoice(){
            axios.get("http://localhost:8080/audio")
            .then((response)=> {
             this.setState({url: response.data})
            })
          }

          playFile () {
         const getAudio = document.getElementById('player').play();
         console.log(getAudio)
            ;
          }
    render() {
        return (
            <div className="success">
                <div className="success__box">
                <img src={doctorImg} alt="doctor_img" className="success__img"/>
                <h1 className="success_heading">Your prescription has been saved </h1>
                <p className="success__desc">You can play the audio by clicking the button</p>
                <audio src={this.state.url} id="player" className="player">Audio</audio>
                    
                    </div>
            </div>
        );
    }
}

export default Success;