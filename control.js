/* 
JavaScript for the Global controls
Copyright © 2020 GEAR webdevelopment ltd.
*/

// Global control panel
const getSub = document.querySelector("#sub");
let profile = "";
let compareLamp = false; // true if the compare display is on
let controlsLamp = true; // true if the control panels are on

// show the controls slider if the control panel is hidden
function fadeIn(caller) {
  if (!controlsLamp) {
    caller.style.opacity = 1;
    document.querySelector("#footer-main").style.opacity = 1;
  }
}

// hide the controls slider if the control panel is hidden
function fadeOut(caller) {
  if (!controlsLamp) {
    caller.style.opacity = 0;
    document.querySelector("#footer-main").style.opacity = 0;
  }
}

// displays and hides the control panels
function controlsOnOff() {
  // dispaly roll down
  let dispCont = document.querySelector(".container-display");
  dispCont.classList.toggle("roll-up");

  let ctrlBtnContainer = document.querySelector("#ctsls-container");

  // hide the control panel
  let mainControlContainer = document.querySelector(".controls");
  mainControlContainer.classList.toggle("hide");

  if (controlsLamp && runText.compareDisplay && !compareLamp) {
    // Switch Off
    compareLamp = true; // remember for next time if it was on
    runText.onOffCompareDispl();
  }
  if (!controlsLamp && !runText.compareDisplay && compareLamp) {
    // Switch On
    // if it was on before
    runText.onOffCompareDispl();
    compareLamp = false;
  }
  if (controlsLamp) {
    // hide the controls slider when the control panel is to hide
    ctrlBtnContainer.style.opacity = "0";
    controlsLamp = false;
  } else {
    // show the controls slider when the control panel is to show
    ctrlBtnContainer.style.opacity = "1";
    controlsLamp = true;
  }
}

// change the size of the display
function dispSizeChange(num) {
  // start kill the tests/roll
  let testFunc = document.querySelector("#op2");
  if (profile === "tests" && testFunc.checked === true) {
    initTests.stop("myRoll");
  }
  // end kill the tests/roll

  // start of rebuild the display
  dispSize = num;
  displayBuilder(num); // from 'string_to_display.js'
  readDisplay(); // from 'string_to_display.js'
  offAll(); // from 'string_to_display.js'
  // end of rebuild the display

  switch (profile) {
    case "run-text":
      // reload the compare display
      runText.onOffCompareDispl();
      runText.onOffCompareDispl();
      // recalculate the new font size for the compare display
      runText.calcCompFontSize(num);
      // restart
      runText.init(false);
      break;
    default:
      break;
  }

  // start resart the tests/roll
  if (profile === "tests" && testFunc.checked === true) {
    initTests.roller();
  }
  // end resart the tests/roll
}

// change the display size slider and it's output
function changeDispSizeSlider(num) {
  dispSize = num;
  displayBuilder(dispSize); // from 'string_to_display.js'
  readDisplay(); // from 'string_to_display.js'
  offAll(); // from 'string_to_display.js'
  // change the display size slider and it's output
  document.querySelector("#sl-01").value = dispSize;
  document.querySelector("#slo-01").innerText = `${dispSize} digit`;
}
changeDispSizeSlider(dispSize);

// change the color of segments
function segmentColorChange(val) {
  segColorLit = val;
}

function bgColorChange(val) {
  document.querySelector("html").style.backgroundColor = val;
}

function profileController(callerId) {
  getSub.innerHTML = "";
  offAll();

  switch (callerId) {
    case "run-text":
      if (profile != "") {
        tests(true);
        clock(true);
      }
      profile = "run-text";
      runTxt(false);
      break;
    case "tests":
      if (profile != "") {
        runTxt(true);
        clock(true);
      }
      profile = "tests";
      tests(false);
      break;
    case "clock":
      if (profile != "") {
        runTxt(true);
        tests(true);
      }
      profile = "clock";
      clock(false);
      break;
    default:
      break;
  }
}

function runTxt(stop) {
  if (stop) {
    runText.stop();
  } else {
    runText.start();
  }
}

function tests(stop) {
  if (stop) {
    initTests.stop();
  } else {
    initTests.start();
  }
}

function clock(stop) {
  if (stop) {
    initClock.stop();
  } else {
    initClock.start();
  }
}
