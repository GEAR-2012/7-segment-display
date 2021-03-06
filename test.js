/* 
JavaScript for the Display tests profile
Copyright © 2020 GEAR webdevelopment ltd.
*/

function initTests() {
  // get the sub control panel div from the DOM
  const getSub = document.querySelector("#sub");

  // ***************** Building up the control element into the html *****************
  function ctrBuild() {
    // make the main control container
    let ctrDiv = document.createElement("div");
    // add the neccessary class name to the control container
    ctrDiv.classList.add("coolMainContainer");
    // make the inner html for the main control container
    let iHtml = `
     <div class="coolContainer">
          <div class="optionCool">
            <input
              type="radio"
              id="op3"
              name="ctr"
              onchange="initTests.mainController(this.id)"
            />
            <label for="op3"></label>
          </div>
          <h3 class="coolLabel">Regular</h3>
        </div>

        <div class="coolContainer">
          <div class="optionCool">
            <input
              type="radio"
              id="op1"
              name="ctr"
              onchange="initTests.mainController(this.id)"
            />
            <label for="op1"></label>
          </div>
          <h3 class="coolLabel">Blink</h3>
        </div>

        <div class="coolContainer">
          <div class="optionCool">
            <input
              type="radio"
              id="op2"
              name="ctr"
              onchange="initTests.mainController(this.id)"
            />
            <label for="op2"></label>
          </div>
          <h3 class="coolLabel">Roll</h3>
      </div>`;
    // insert the inner html into the main control container
    ctrDiv.innerHTML = iHtml;
    // append the main control container to the sub control panel div
    getSub.appendChild(ctrDiv);
  }

  // ********************** this is the main controller function **********************

  // timer variables for the different test sequenceses
  let myRegular; // for regular
  let myBlink; // for blinker
  let myRoll; // for roller

  // Starts the timers and the functions of the corresponding test sequence.
  function mainController(callerId) {
    if (callerId) {
      switch (callerId) {
        case "op1": // blinker
          stop();
          offAll();
          blinker();
          break;
        case "op2": // roller
          stop();
          offAll();
          roller();
          break;
        case "op3": // regular
          stop();
          offAll();
          regular();
          break;
        default:
          // error
          console.log("err");
          break;
      }
    }

    // this function kill the corresponding timer
  }

  function start() {
    // call the buider function
    ctrBuild();
  } /* 
JavaScript for the Running text profile
Copyright © 2020 GEAR webdevelopment ltd.
*/

  //  it stops the correspondent timer
  function stop(str) {
    // myRegular
    // myBlink
    // myRoll
    console.log(str);

    switch (str) {
      case "myRegular":
        clearInterval(myRegular);
        break;
      case "myBlink":
        clearInterval(myBlink);
        break;
      case "myRoll":
        clearInterval(myRoll);
        break;
      case undefined:
        clearInterval(myRegular);
        clearInterval(myBlink);
        clearInterval(myRoll);
      default:
        break;
    }
  }

  initTests.start = start;
  initTests.stop = stop;
  initTests.mainController = mainController;
  initTests.roller = roller;

  // ************************** different test sequenceses **************************

  // Regular
  // This is a regular test on all digits on the full display at the same time
  // numbers after circular, middle , decimal point (but it can be changed)
  function regular() {
    // hexa array for the sequence
    let hexArr = [];
    // the sequence
    let json = `{
    "0": "11111100",
    "1": "01100000",
    "2": "11011010",
    "3": "11110010",
    "4": "01100110",
    "5": "10110110",
    "6": "10111110",
    "7": "11100000",
    "8": "11111110",
    "9": "11110110",
    "sa": "10000000",
    "sb": "01000000",
    "sc": "00100000",
    "sd": "00010000",
    "se": "00001000",
    "sf": "00000100",
    "sg": "00000010",
    "sdp": "00000001"
  }`;
    // convert json to JavaScript oject
    let obj = JSON.parse(json);
    // get the values into an array from the object
    let values = Object.values(obj);
    // making the hexadecimal values for the sequence
    for (let val of values) {
      let hexA = parseInt(val.slice(0, 4), 2).toString(16);
      let hexB = parseInt(val.slice(4, 8), 2).toString(16);
      let hex = hexA + hexB;
      hexArr.push(hex);
    }
    let countHexArr = 0;
    // display
    myRegular = setInterval(function () {
      // the main hexa array for the full display
      let hexArrMain = [];
      // making the main hex array, fill up with the next character's hex code
      for (let i = 0; i < dispSize; i++) {
        hexArrMain.push(hexArr[countHexArr]);
      }
      // calling function to lit segments based on the main hexadecimal array
      mySwitcher(hexArrMain);
      // stepping the counter
      if (countHexArr < hexArr.length - 1) {
        countHexArr++;
      } else {
        countHexArr = 0;
      }
    }, 200);
  }

  // Blinking
  // lit and after a few millisec set off
  // all segments in all digit on the full display 10 times
  function blinker() {
    let lited = false;
    myBlink = setInterval(function () {
      if (!lited) {
        litAll();
        lited = true;
      } else {
        offAll();
        lited = false;
      }
    }, 600);
  }

  // Rolling
  // roll over on all segments
  // move on segment by segment
  function roller() {
    let countA = 0; // digit
    let countB = 0; // segment per digit
    let newHexArray = [];
    // fill up the hexArray with code nothing ("00")
    for (let i = 0; i < dispSize; i++) {
      newHexArray.push("00");
    }
    // timing the lit of segments
    myRoll = setInterval(function () {
      mySwitcher(newHexArray);
      if (countA < dispSize) {
        if (countB < 8) {
          // bitwise shifting in the binary number
          let binFull = (128 >> countB).toString(2).padStart(8, "0");
          let bin4a = binFull.slice(0, 4);
          let bin4b = binFull.slice(4, 8);
          let hexA = parseInt(bin4a, 2);
          let hexB = parseInt(bin4b, 2);
          let hexFull = hexA.toString(16) + hexB.toString(16);
          newHexArray[countA] = hexFull;
          countB++;
        } else {
          countB = 0;
          newHexArray[countA] = "00";
          countA++;
        }
      } else {
        countA = 0;
      }
    }, 100);
  }
}
