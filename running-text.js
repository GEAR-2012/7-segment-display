// sample strings
let lowAlpha = "abcdefghijklmnopqrstuvwxyz";
let uppAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let preferredAlpha = "AbCdEFGHIjkLMnOPqrStUvWXYZ";
let mixedAlpha = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
let nums = "0123456789";
let exxtras = ",!/_- .=()";
let demo = lowAlpha + "   " + uppAlpha + "   " + nums + "  " + exxtras;
let txt_1 = "OPEN";
let txt_2 = "CLOSED";
let cusName = "Elvira and Petra";
let happyBirthDay = `
Happy Birthday to You,
Happy Birthday to You,
Happy Birthday dear ${cusName},
Happy Birhday to YOU!!!
`;
let veryLongText = `
In the first half of the century, the development of antibiotics and artificial fertilizer made global human population growth possible. At the same time, the structure of the atom and its nucleus was discovered, leading to the release of "atomic energy" (nuclear power). In addition, the extensive use of technological innovation stimulated by the wars of this century led to revolutions in transportation (automobiles and aircraft), the development of ICBMs, a space race, and a nuclear arms race.

The molecular structure of DNA was discovered in 1953. The discovery of the cosmic microwave background radiation in 1964 led to a rejection of the Steady State theory of the universe in favour of the Big Bang theory of Georges Lemaître.

The development of spaceflight in the second half of the century allowed the first astronomical measurements done on or near other objects in space, including manned landings on the Moon. Space telescopes lead to numerous discoveries in astronomy and cosmology.

Widespread use of integrated circuits in the last quarter of the 20th century combined with communications satellites led to a revolution in information technology and the rise of the global internet and mobile computing, including smartphones. The need for mass systematization of long, intertwined causal chains and large amounts of data led to the rise of the fields of systems theory and computer-assisted scientific modelling, which are partly based on the Aristotelian paradigm.

Harmful environmental issues such as ozone depletion, acidification, eutrophication and climate change came to the public's attention in the same period, and caused the onset of environmental science and environmental technology.`;

// ***************   SELECT A STRING TO RUN   ***************
// it can be taylored to desired
let strRunner = happyBirthDay;

// ******************   USER VARIABLES   ******************
let runAtStart = false; // The setected string starts to 'run' at the start
let compareDisplay = false; // potional compare display
let speed = 200; // time between steps in millisec
let compToPref = true; // the running string compare to the preferred alphabet or not
let sepString = " .......... "; // this string is placed in front of the choosen string

// check for compare function
if (compToPref) {
  strRunner = prefConverter(strRunner, preferredAlpha);
}

let myTimer; // for timing the running
strRunner = sepString + strRunner; // concetanate the separator string with the choosen string
strRunner = strExtender(strRunner); // extend the string to the display length
let strPaused = strRunner; // for first pause (the same)

// optional display for compare
if (compareDisplay) {
  compareDisplayBuilder();
}

// building the compare display
function compareDisplayBuilder() {
  const mainWrapper = document.querySelector(".main-wrapper");
  let compDispl = document.createElement("div");
  compDispl.classList.add("compare-display");
  compDispl.style.display = "grid";
  compDispl.style.gridTemplateColumns = `repeat(${dispSize}, 1fr)`;
  compDispl.style.gap = "8px";

  for (let i = 0; i < dispSize; i++) {
    let h1 = document.createElement("h1");
    h1.setAttribute("id", `let_${[i]}`);
    h1.classList.add("letter");
    h1.style.fontFamily = "roboto, arial";
    // h1.style.fontSize = "70%";
    h1.style.color = "rgba(255, 255, 0, 1)";
    h1.style.textAlign = "center";
    // h1.style.backgroundColor = "rgba(255, 255, 255, 1)";
    h1.style.padding = "10%";
    h1.style.borderRadius = "0.5rem";

    compDispl.appendChild(h1);
  }
  mainWrapper.appendChild(compDispl);
  displayOnCompare(strPaused.slice(0, dispSize));
}

// display on compare display
function displayOnCompare(str) {
  let strArr = str.split("");
  let letterArr = document.querySelectorAll(".letter");
  letterArr.forEach(function (item, i) {
    item.innerText = strArr[i];
  });
}

// add ADD / DELETE compare display function on DOUBLE CLICK event to a document
document.addEventListener("dblclick", function () {
  if (compareDisplay) {
    let compDiv = document.querySelector(".compare-display");
    compDiv.remove();
    compareDisplay = false;
  } else if (!compareDisplay) {
    compareDisplayBuilder();
    compareDisplay = true;
  }
});

// add PAUSE / START function on CLICK event to a document
document.addEventListener("click", function () {
  if (runAtStart) {
    clearInterval(myTimer);
    runAtStart = false;
  } else {
    runningText(strPaused);
    runAtStart = true;
  }
});

// extend the given string to the display size if the given string is shorter
function strExtender(str) {
  // check if the string is shorter then the display
  if (dispSize > str.length) {
    // repeat the string
    let len = Math.floor(dispSize / str.length);
    let newStr = "";
    for (let i = 0; i < len; i++) {
      newStr += str;
    }
    str = newStr;
    // padding the string to the exact display size
    str = str.padStart(dispSize, " ");
  }
  return str;
}

// this is the main function, it makes the string run
function runningText(str) {
  myTimer = setInterval(function () {
    // CUT from front / ADD to end
    let cut = str.slice(0, 1);
    str = str.slice(1);
    str += cut;
    // remembering the actual string if PAUSE
    strPaused = str;
    // calling the displayer function
    theMain(str);
    // calling the displayer on compare display
    if (compareDisplay) {
      displayOnCompare(str.slice(0, dispSize));
    }
  }, speed);
}

// check for running at the start
if (runAtStart) {
  runningText(strRunner);
}

// This function converts a text to the PREFERRED ALPHABET
// and returns a new string
// It is takes two arguments:
// 1. -> 'txt' to convert
// 2. -> 'pAlp' for the preferred alphabet
function prefConverter(txt, pAlp) {
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
}
