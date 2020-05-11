/* 
JavaScript for the Running text profile
Copyright © 2020 GEAR webdevelopment ltd.
*/

/*

 *************************   THE MAIN OBJECT   *************************
 */
const runText = {
  /*

   *************************   VARIABLES / PROPERTIES   *************************
   */
  // sample strings
  lowAlpha: "abcdefghijklmnopqrstuvwxyz",
  uppAlpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  preferredAlpha: "AbCdEFGHIjkLMnOPqrStUvWXYZ",
  mixedAlpha: "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
  nums: "0123456789",
  exxtras: ",!/_- .=()",
  get demo() {
    return (
      this.lowAlpha +
      "   " +
      this.uppAlpha +
      "   " +
      this.nums +
      "  " +
      this.exxtras
    );
  },
  txt_1: "OPEN",
  txt_2: "CLOSED",
  cusName: "Elvira and Petra",
  happyBirthDay: `
Happy Birthday to You,
Happy Birthday to You,
Happy Birthday dear ${this.cusName},
Happy Birhday to YOU!!!
`,
  veryLongText: `
In the first half of the century, the development of antibiotics and artificial fertilizer made global human population growth possible. At the same time, the structure of the atom and its nucleus was discovered, leading to the release of "atomic energy" (nuclear power). In addition, the extensive use of technological innovation stimulated by the wars of this century led to revolutions in transportation (automobiles and aircraft), the development of ICBMs, a space race, and a nuclear arms race.

The molecular structure of DNA was discovered in 1953. The discovery of the cosmic microwave background radiation in 1964 led to a rejection of the Steady State theory of the universe in favour of the Big Bang theory of Georges Lemaître.

The development of spaceflight in the second half of the century allowed the first astronomical measurements done on or near other objects in space, including manned landings on the Moon. Space telescopes lead to numerous discoveries in astronomy and cosmology.

Widespread use of integrated circuits in the last quarter of the 20th century combined with communications satellites led to a revolution in information technology and the rise of the global internet and mobile computing, including smartphones. The need for mass systematization of long, intertwined causal chains and large amounts of data led to the rise of the fields of systems theory and computer-assisted scientific modelling, which are partly based on the Aristotelian paradigm.

Harmful environmental issues such as ozone depletion, acidification, eutrophication and climate change came to the public's attention in the same period, and caused the onset of environmental science and environmental technology.`,

  // initial user variables
  displaySize: 20,
  fontSizeComp: "",
  runSlider: "",
  activated: false, // like on off light
  firstTime: true, // for initialization
  userString: "1234567890abcdef", // string to display
  changedString: "",
  sepString: "---", // this string is placed in front of the choosen string
  strPaused: "",
  running: false, // The selected string starts to 'run' at the start
  compareDisplay: false, // potional compare display
  compToPref: false, // the running string compare to the preferred alphabet or not
  speed: 400, // time between steps in millisec

  // for initial user variables copies
  firstTimeCopy: false, // for initialization
  userStringCopy: "", // string to display
  sepStringCopy: "", // this string is placed in front of the choosen string
  runningCopy: false, // The selected string starts to 'run' at the start
  compareDisplayCopy: false, // potional compare display
  compToPrefCopy: false, // the running string compare to the preferred alphabet or not
  speedCopy: 0, // time between steps in millisec

  /*

     *********************************   METHODS   *********************************
     */

  //  remember to the original user variables
  copyVariables() {
    this.firstTimeCopy = this.firstTime;
    this.userStringCopy = this.userString;
    this.sepStringCopy = this.sepString;
    this.runningCopy = this.running;
    this.compareDisplayCopy = this.compareDisplay;
    this.compToPrefCopy = this.compToPref;
    this.speedCopy = this.speed;
  },

  // reload the original's copies into the original variables
  reloadVariables() {
    this.firstTime = this.firstTimeCopy;
    this.userString = this.userStringCopy;
    this.sepString = this.sepStringCopy;
    this.running = this.runningCopy;
    this.compareDisplay = this.compareDisplayCopy;
    this.compToPref = this.compToPrefCopy;
    this.speed = this.speedCopy;
  },

  start() {
    if (!this.activated) {
      this.copyVariables();
      this.activated = true;
      // call function from 'control.js'
      changeDispSizeSlider(this.displaySize);
      this.calcCompFontSize(this.dispSize);
      this.init(true);
      this.setControlElements();
    }
  },

  stop() {
    if (this.activated) {
      if (this.compareDisplay) {
        this.onOffCompareDispl();
      }
      this.stopRun();

      this.reloadVariables();
      this.activated = false;
    }
  },

  // concetanate the separator string with the choosen string
  strSepUser: function () {
    this.changedString = this.sepString + this.userString;
  },

  // extend the string to the display length
  strExtended: function () {
    this.changedString = this.strExtender(this.changedString);
  },

  // convert the string to the preferred alphabet if required
  strConverted: function () {
    if (this.compToPref) {
      this.changedString = this.prefConverter(
        this.changedString,
        this.preferredAlpha
      );
    }
  },

  // copy the actual string, initially it is the same
  changeStrPaused: function () {
    this.strPaused = this.changedString;
  },

  // Start sequence at first time
  init(bool) {
    // soft
    this.strSepUser();
    this.strExtended();
    this.strConverted();
    this.changeStrPaused();
    // deep
    if (bool) {
      this.displayControls();
      this.runSlider = document.querySelector("#slideCool01");
      let text = document.querySelector("#textInput1");
      let sep = document.querySelector("#textInput2");
      text.value = this.userString;
      sep.value = this.sepString;
      if (this.firstTime) {
        this.pauseStart();
        this.runSlider.checked = true;
      }
    }
  },

  setControlElements() {
    let range2 = document.querySelector("#sl-02");
    let range2Out = document.querySelector("#slo-02");
    range2.value = this.speed;
    range2Out.innerText = `${this.speed} ms`;
  },

  // this is the main method, it makes the string run
  runningText(str) {
    this.slicerMachine(str);
  },

  // CUT from front / ADD to end
  slicerMachine(origString) {
    let firstLetter = origString.slice(0, 1); // first letter
    let newString = origString.slice(1); // rest of the string
    newString += firstLetter; // put the first letter to the end of the rest

    // remembering to the new string for the case of PAUSE
    runText.strPaused = newString;
    console.log(newString);
    // calling the displayer method from 'string_to_display.js'
    theMain(newString);
    // calling the displayer on compare display if required
    if (this.compareDisplay) {
      this.displayOnCompare(newString.slice(0, dispSize));
    }
    return newString;
  },

  // build and display the control panel
  displayControls: function () {
    let controls = document.querySelector("#sub");
    let innerT = `
            <!-- A group of text inputs -->
            <div class="coolMainContainer">
              <!-- Text input 1 -->
              <h3 class="coolLabel">Text to display</h3>
              <div class="coolContainerTextInput">
                <input
                  onchange="runText.mainControl(this)"
                  class="textInput"
                  id="textInput1"
                  type="text"
                />
              </div>
              <!-- Text input 2 -->
              <div class="coolContainerTextInput">
              <h3 class="coolLabel">Separator string</h3>
                <input
                  onchange="runText.mainControl(this);"
                  class="textInput"
                  id="textInput2"
                  type="text"
                />
              </div>
            </div>

            <!-- A group of sliders (checkboxes) -->
            <div class="coolMainContainer">
              <!-- Slider 1 -->
              <div class="coolContainer">
                <div class="slideCool">
                  <input
                    onchange="runText.mainControl(this);"
                    type="checkbox"
                    id="slideCool01"
                    name="check"
                  />
                  <label for="slideCool01"></label>
                </div>
                <h3 class="coolLabel">Run the text</h3>
              </div>

              <!-- Slider 2 -->
              <div class="coolContainer">
                <div class="slideCool">
                  <input
                    onchange="runText.mainControl(this);"
                    type="checkbox"
                    id="slideCool02"
                    name="check"
                  />
                  <label for="slideCool02"></label>
                </div>
                <h3 class="coolLabel">Compare display</h3>
              </div>
              <!-- Slider 3 -->
              <div class="coolContainer">
                <div class="slideCool">
                  <input
                    onchange="runText.mainControl(this);"
                    type="checkbox"
                    id="slideCool03"
                    name="check"
                  />
                  <label for="slideCool03"></label>
                </div>
                <h3 class="coolLabel">Prefered alphabet</h3>
              </div>
              <!--  -->
            </div>
            <!-- 
            Speed changer
            -->
            <div class="slide-container">
              <div class="label-out-container">
                <div class="slide-label">Speed</div>
                <div class="slide-out" id="slo-02">No input !</div>
              </div>
              <input
                oninput="document.querySelector('#slo-02').innerText = this.value + ' ms';
                runText.mainControl(this);"
                class="slider"
                type="range"
                id="sl-02"
                min="100"
                max="1000"
              />
            </div>
`;
    controls.innerHTML = innerT;
  },

  // building the compare display
  compareDisplayBuilder: function () {
    const displayContainer = document.querySelector(".container-display");
    let compDispl = document.createElement("div");
    compDispl.classList.add("compare-display");
    compDispl.style.marginBottom = "10px";
    compDispl.style.display = "grid";
    compDispl.style.gridTemplateColumns = `repeat(${dispSize}, 1fr)`;
    compDispl.style.gap = "8px";

    for (let i = 0; i < dispSize; i++) {
      let h1 = document.createElement("h1");
      h1.setAttribute("id", `let_${[i]}`);
      h1.classList.add("letter");
      h1.style.fontFamily = "roboto, arial";
      h1.style.color = "rgba(255, 255, 0, 1)";
      h1.style.textAlign = "center";
      h1.style.padding = "10%";

      compDispl.appendChild(h1);
    }
    displayContainer.after(compDispl);
    this.displayOnCompare(this.strPaused.slice(0, dispSize));
  },

  // display on compare display
  displayOnCompare: function (str) {
    let strArr = str.split("");
    let letterArr = document.querySelectorAll(".letter");
    letterArr.forEach(function (item, i) {
      item.innerText = strArr[i];
      item.style.fontSize = runText.fontSizeComp;
    });
  },

  // This method converts a text to the PREFERRED ALPHABET
  prefConverter: function (txt, pAlp) {
    // It is returns a new string
    // It is takes two arguments:
    // 1. -> 'txt' to convert
    // 2. -> 'pAlp' for the preferred alphabet
    let txtArr = txt.split("");
    let newStr = "";
    txtArr.forEach(function (let) {
      // Start to compare each letter (from the given string 'txt) to the preferred alphabet 'pAlp'.
      if (pAlp.indexOf(let) < 0) {
        // stage 1
        // check for match
        let = let.toUpperCase(); // stage 3 // to UpperCase
        if (pAlp.indexOf(let) < 0) {
          // stage 4
          // check for match
          let = let.toLowerCase(); // stage 6 // to LowerCase
          if (pAlp.indexOf(let) < 0) {
            // stage 7
            // check for match
            newStr += let; // stage 9 // not letter not changed
          } else {
            // stage 8
            // changed to Lower
            newStr += let;
          }
        } else {
          // stage 5
          // changed to Upper
          newStr += let;
        }
      } else {
        // stage 2
        // already mached
        newStr += let;
      }
    });
    return newStr;
  },

  // extend the given string to the display size if the given string is shorter
  strExtender: function (str) {
    if (str.length === 0) {
      // if there is no string fill the string with spaces
      str = str.padStart(dispSize, " ");
    } else if (dispSize > str.length) {
      // check if the string is shorter then the display
      let newStr = "";
      // repeat the string
      while (newStr.length + str.length <= dispSize) {
        newStr += str;
      }
      str = newStr;
      // padding the string to the exact display size
      str = str.padStart(dispSize, " ");
    }
    return str;
  },

  // PAUSE / START
  pauseStart() {
    if (this.firstTime) {
      this.init(false);
      this.firstTime = false;
    }
    if (!this.running) {
      // if not running
      //call the function with 'setInterval'
      this.timer = setInterval(function () {
        runText.runningText(runText.strPaused);
      }, this.speed);
      this.running = true;
    } else if (this.running) {
      // if already runnig
      clearInterval(this.timer);
      this.running = false;
    }
  },

  // ON / OFF compare display
  onOffCompareDispl() {
    if (this.compareDisplay) {
      let compDiv = document.querySelector(".compare-display");
      compDiv.remove();
      this.compareDisplay = false;
    } else if (!this.compareDisplay) {
      this.compareDisplayBuilder();
      this.compareDisplay = true;
    }
  },

  // stop the running text profile to run
  // RESET and STOP
  stopRun: function () {
    this.firstTime = true; // because of this the 'pauseStart' method will call the 'init' method as well the next time
    if (this.running) {
      this.pauseStart();
      let slider = document.querySelector("#slideCool01");
      if (slider != null) {
        slider.checked = false;
      }
    }
  },

  // it controls if something change on the control panel
  mainControl: function (caller) {
    switch (caller.id) {
      // text to display
      case "textInput1":
        this.userString = caller.value;
        this.reloadEverything();
        break;
      // separator string
      case "textInput2":
        this.sepString = caller.value;
        this.reloadEverything();
        break;
      // run the text
      case "slideCool01":
        this.pauseStart();
        break;
      // compare display
      case "slideCool02":
        this.onOffCompareDispl();
        break;
      // preferred alphabet
      case "slideCool03":
        if (this.compToPref) {
          this.compToPref = false;
        } else {
          this.compToPref = true;
        }
        this.reloadEverything();
        break;
      // speed
      case "sl-02":
        this.speed = parseInt(caller.value, 10);
        this.reloadParameters();
        this.setControlElements();
        break;
      default:
        break;
    }
  },

  // full stop, start
  reloadEverything() {
    // full stop...
    let isItRunned = this.running;
    this.stopRun();
    // ...and start againg if required
    if (isItRunned) {
      let slider = document.querySelector("#slideCool01");
      this.pauseStart();
      slider.checked = true;
    }
  },

  // pause, start
  reloadParameters() {
    // start againg if required
    let slider = document.querySelector("#slideCool01");
    let isItRunned = this.running;
    if (isItRunned) {
      this.pauseStart();
      this.pauseStart();
      slider.checked = true;
    } else {
    }
  },

  // calculate the compare displays font size
  calcCompFontSize(num) {
    // num is the main display size in digits
    const d1 = 4; // minimum display size
    const d2 = 32; // maximum display size
    const f1 = 10; // minimum font size
    const f2 = 30; // maximum font size
    let f = f1 + (d2 - num) * ((f2 - f1) / (d2 - d1));
    f = f.toFixed(1);
    f = parseFloat(f, 10);
    // store the font size in variable
    runText.fontSizeComp = `${f}px`;
  },

  /*

   ******************************   END OF THE OBJECT   ******************************
   */
};
