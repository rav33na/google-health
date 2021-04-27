import React, { Component } from 'react';
import axios from 'axios'

class info extends Component {
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

    render() {

        return (
            <div>
              <h2>{this.state.infos}</h2>
              <audio controls src={this.state.url}>Audio</audio>
             
                
            </div>
        );
    }
}

export default info;