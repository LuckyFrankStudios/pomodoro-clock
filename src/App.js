import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

const [breakLength, setBreakLength] = React.useState(300)
const [sessionLength, setSessionLength] = React.useState(1500)
const [sessionTime, setSessionTime] = React.useState(1500) 
const [breakAudio, setBreakAudio] = React.useState(new Audio("./BeepSound.mp3"))

const playBreakSound = () => {
  breakAudio.currentTime = 0;
  breakAudio.play()
}

var timeConvert = (secs) => {
  var sec_num = parseInt(secs, 10)
  var hours   = Math.floor(sec_num / 3600)
  var minutes = Math.floor(sec_num / 60) % 60
  var seconds = sec_num % 60

  return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
}

const decrement = () => {
  if (breakLength <= 0){
    return
  } else 
  setBreakLength((prev) => prev - 60)
}
 

const increment = () => {
  setBreakLength((prev) => prev + 60)
}

const decrementSession = () => {
  if (sessionLength <= 0){
    return
  } else 
  setSessionLength((prev) => prev - 60)
  setSessionTime(() => sessionLength - 60)
  document.getElementById("play").disabled = false
  clearInterval(localStorage.getItem("interval-id"))
}
 

const incrementSession = () => {
  setSessionLength((prev) => prev + 60)
  setSessionTime(() => sessionLength + 60)
  document.getElementById("play").disabled = false
  clearInterval(localStorage.getItem("interval-id"))
}

const startTimer = () =>{
  
  let clear = setInterval(() => {setSessionTime((prev) => {if (prev <= 0){
    return prev & pauseTimer() & playBreakSound() & 
    setSessionTime(breakLength)  & startTimer()
  } else 
    return prev - 1})
     
  }, 1000)
  localStorage.setItem("interval-id", clear)
  document.getElementById("play").disabled = true;
  
  }





const pauseTimer = () => {
  clearInterval(localStorage.getItem("interval-id"))
  document.getElementById("play").disabled = false
}
 
const resetTimer = () => {
  setSessionTime(() => sessionLength)
  clearInterval(localStorage.getItem("interval-id"))
  document.getElementById("play").disabled = false
}

  return (
    <div className="container">
      <h1>Pomodoro Clock</h1>
      <div className = "length-container">
      <div className = "break-box">
        <h2>Break Length</h2>
        
        <div className = "button-area">
          <button onClick = {decrement}><i class="fas fa-arrow-down"></i></button>
          <div className = "session-break">{timeConvert(breakLength)}</div>
          <button onClick = {increment}><i class="fas fa-arrow-up"></i></button>

          </div>
      </div>
      <div className = "break-box">
<h2>Session Length</h2>

<div className = "button-area">
<button onClick = {decrementSession}><i class="fas fa-arrow-down"></i></button>
          <div className = "session-break">{timeConvert(sessionLength)}</div>
          <button onClick ={incrementSession}><i class="fas fa-arrow-up"></i></button>
</div>
      </div>
      </div>
      <br></br>
      <div className = "session-container">
<h2 className = "session">Session</h2>
<div className = "session-time">{timeConvert(sessionTime)}</div>
<br></br>
<div className = "play-buttons">
  <button id = "play" onClick = {startTimer}><i class="fas fa-play"></i></button>
  <button id = "pause" onClick  = {pauseTimer}><i class="fas fa-pause-circle"></i></button>
  <button id = "reset" onClick = {resetTimer}><i class="fas fa-sync-alt"></i></button>

</div>

      </div>
    </div>
  );
}

export default App;
