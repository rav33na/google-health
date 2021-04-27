import './App.css';
import React, { useState } from "react";
import Info from './Info';
import "./Scan.scss"
import pillBottle from "../src/assets/PillBottle.png";
import xIcon from "../src/assets/XIcon.svg";
import profile from "../src/assets/ProfileIcon.svg";
import home from "../src/assets/Home.svg";
import threedots from "../src/assets/threedots.svg";
import axios from "axios";

function Scan() {
  const[image, setImage] = useState({});

  const fileOnChange = (event) => {
    setImage(event.target.files[0]);
  };
  const uploadImage = (event) => {
    let formData = new FormData();
    formData.append("image", image);
    fetch("http://localhost:8080/uploadFile", {
      method: "post",
      body: formData,
    })
    .then((res) => res.text())
    .then((resBody) => {
      console.log(resBody);
    });
    axios.get("http://localhost:8080")
    .then(response => {
    this.setState({infos:response.data});
    this.synthesizeVoice()
})
  };

  function synthesizeVoice() {
    axios.get("http://localhost:8080/audio")
    .then((response)=> {
     this.setState({url: response.data})
    })
  }

  return (
    
    <div className="scanner">
      <div className="scanner__top">
        <img className="exit__icon" src={xIcon}></img>
        <label for="input">Scanning
          <input className="scanner__input" type="file" onChange={fileOnChange} id="input" />
      </label>
        <img className="hamburger__icon" src={threedots}></img>
      </div>

      <img className="scanner__image" src={pillBottle} alt="Uploaded image"></img>
      <div className="scanner__box">
        <img src={home} alt="home icon"></img>
      
      <label for="button">
        <button className="scanner__button" onClick={uploadImage} id="button">Upload</button>
      </label>
    

        <img src={profile}></img>
      </div>
      <Info />
        </div>

  );
}

export default Scan;