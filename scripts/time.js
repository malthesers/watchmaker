"use strict";

//Declare consts of pointers
const secondsPointer = document.querySelector("#secound_hand");
const minutesPointer = document.querySelector("#MinutesPointer1");
const hoursPointer = document.querySelector("#hour_hand");

//Declare variables for degrees
let secondsDeg = 0;
let minutesDeg = 0;
let hoursDeg = 0;

function setCurrentDegrees() {
  //Get currentData and currentSeconds
  const currentDate = new Date();
  const currentSeconds = currentDate.getSeconds();
  const currentMinutes = currentDate.getMinutes();
  const currentHours = currentDate.getHours();

  //Multiply by 6 to get degrees
  secondsDeg = currentSeconds * 6;
  minutesDeg = currentMinutes * 6;
  hoursDeg = currentHours * 30;

  //Rotate poionters accordingly
  secondsPointer.style.transform = `rotate(${secondsDeg}deg)`;
  minutesPointer.style.transform = `rotate(${minutesDeg}deg)`;
  hoursPointer.style.transform = `rotate(${hoursDeg}deg)`;

  //Initiate incrementing functions
  incrementSeconds();

  //Handle date display
  showDate(currentDate);
}

function incrementSeconds() {
  //Rotate pointer accordingly
  secondsPointer.style.transform = `rotate(${secondsDeg}deg)`;

  //Increment degrees
  secondsDeg += 6;

  //Increment minutes when seconds is 60
  if (secondsDeg % 360 === 0) {
    incrementMinutes();
  }

  //Iterate every second
  setTimeout(incrementSeconds, 1000);
}

function incrementMinutes() {
  //Increment degrees
  minutesDeg += 6;

  //Rotate pointer accordingly
  minutesPointer.style.transform = `rotate(${minutesDeg}deg)`;

  //Increment hours when seconds is 60
  if (minutesDeg % 360 === 0) {
    incrementHours();
  }
}

function incrementHours() {
  //Increment degrees
  hoursDeg += 30;

  //Rotate pointer accordingly
  hoursPointer.style.transform = `rotate(${hoursDeg}deg)`;
}

function showDate(currentDate) {
  const currentDay = currentDate.getDate();

  document.querySelector("#date-text").textContent = currentDay;
}
