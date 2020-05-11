/* 
JavaScript for display the content on the main display
Copyright © 2020 GEAR webdevelopment ltd.
*/

let segColorNoLit = "rgba(255, 255, 255, 0.04"; // when the segment (LED) is not lit
let segColorLit = "#ff0000"; // when the segment (LED) is lit

// This is the  CONTROLLER function, for display any string
function theMain(str) {
  let myNewString = myStringValidator(str);
  let hexDigits = convertToHexArray(myNewString);
  mySwitcher(hexDigits);
}

// fetch all digit's div into the 'theFullDisplay' array
const theFullDisplay = [];
readDisplay();
offAll(); // because first all LEDs are off
function readDisplay() {
  // delete all arr item
  while (theFullDisplay.length > 0) {
    theFullDisplay.pop();
  }
  for (let i = 0; i < dispSize; i++) {
    theFullDisplay.push(
      document.querySelectorAll(".digit.pos" + (i + 1) + " .segment")
    );
  }
}

// lit all segments in all digit on the full display
function litAll() {
  let newArr = [];
  for (let i = 0; i < dispSize; i++) {
    newArr.push("FF");
  }
  mySwitcher(newArr);
}

// set off all segments in all digit on the full display
function offAll() {
  let newArr = [];
  for (let i = 0; i < dispSize; i++) {
    newArr.push("00");
  }
  mySwitcher(newArr);
}

// return a taylored string
function myStringValidator(str) {
  str = str.toString();
  return str;
}

function convertToHexArray(str) {
  let bin = ""; // final binary string

  let array = str.split("");
  for (let i = 0; i < array.length; i++) {
    let dot = false; // this will follow if a dot included after the digit
    let d_bin = ""; // one digit binary string

    // If the current character of the given string is a dot, and before it was not a dot
    // except it is not the first character
    // the jump up over the rest of the loop
    if (array[i] === "." && array[i - 1] != "." && i != 0) {
      continue;
    }

    if (
      (array[i] === "." && i === 0) ||
      (array[i] === "." && array[i - 1] === ".")
    ) {
      // If the string starts with a dot, or there was a dot before a dot.
      // then the actual digit will be empty
      d_bin = "0000000"; //digit to empty
      dot = true; // digit with dot
    } else {
      switch (array[i]) {
        // start of number characters *****
        case "0":
        case "O":
          d_bin = "1111110";
          break;
        case "1":
          d_bin = "0110000";
          break;
        case "2":
        case "Z":
          d_bin = "1101101";
          break;
        case "3":
          d_bin = "1111001";
          break;
        case "4":
          d_bin = "0110011";
          break;
        case "5":
        case "S":
          d_bin = "1011011";
          break;
        case "6":
          d_bin = "1011111";
          break;
        case "7":
          d_bin = "1110000";
          break;
        case "8":
        case "B":
          d_bin = "1111111";
          break;
        case "9":
          d_bin = "1111011";
          break;
        // end of number characters *****

        // start of alphabet characters *****
        case "a":
          d_bin = "0011001";
          break;
        case "A":
          d_bin = "1110111";
          break;
        case "b":
          d_bin = "0011111";
          break;
        case "c":
          d_bin = "0001101";
          break;
        case "C":
        case "(":
          d_bin = "1001110";
          break;
        case "d":
          d_bin = "0111101";
          break;
        case "D":
          d_bin = "1111100";
          break;
        case "e":
          d_bin = "0001100";
          break;
        case "E":
          d_bin = "1001111";
          break;
        case "F":
        case "f":
          d_bin = "1000111";
          break;
        case "g":
          d_bin = "1001101";
          break;
        case "G":
          d_bin = "1011110";
          break;
        case "h":
          d_bin = "0010111";
          break;
        case "H":
        case "N":
          d_bin = "0110111";
          break;
        case "I":
        case "l":
          d_bin = "0000110";
          break;
        case "i":
          d_bin = "0000100";
          break;
        case "j":
          d_bin = "0111000";
          break;
        case "J":
          d_bin = "1111100";
          break;
        case "k":
          d_bin = "1001011";
          break;
        case "K":
          d_bin = "0101111";
          break;
        case "L":
          d_bin = "0001110";
          break;
        case "m":
          d_bin = "1010100";
          break;
        case "M":
          d_bin = "1010101";
          break;
        case "n":
          d_bin = "0010101";
          break;
        case "o":
          d_bin = "0011101";
          break;
        case "P":
        case "p":
          d_bin = "1100111";
          break;
        case "q":
          d_bin = "1110011";
          break;
        case "Q":
          d_bin = "1101110";
          break;
        case "r":
          d_bin = "0000101";
          break;
        case "R":
          d_bin = "1101111";
          break;
        case "s":
        case "x":
        case "z":
        case "=":
          d_bin = "0001001";
          break;
        case "t":
          d_bin = "0001111";
          break;
        case "T":
          d_bin = "1000110";
          break;
        case "u":
          d_bin = "0011100";
          break;
        case "U":
          d_bin = "0111110";
          break;
        case "v":
          d_bin = "0011000";
          break;
        case "V":
          d_bin = "0111010";
          break;
        case "w":
          d_bin = "0101010";
          break;
        case "W":
          d_bin = "0101011";
          break;
        case "X":
          d_bin = "1001001";
          break;
        case "Y":
        case "y":
          d_bin = "0111011";
          break;
        // end of alphabet characters *****

        // start of exxxtra characters *****
        case ",":
          d_bin = "0000100";
          break;
        case "!":
          d_bin = "0110000";
          dot = true;
          break;
        case "/":
          d_bin = "0100101";
          break;
        case " ":
          d_bin = "0000000";
          break;
        case "_":
          d_bin = "0001000";
          break;
        case "-":
          d_bin = "0000001";
          break;
        case ")":
          d_bin = "1111000";
          break;
        // end of exxxtra characters *****
        case ".":
          d_bin = "0000000";
          dot = true;
          break;
        default:
          // Everything else will be an error digit
          d_bin = "0000000";
      }
    }

    if (array[i + 1] === ".") {
      dot = true;
    }
    if (dot) {
      // Handle the dots, they goes into the eighth segment
      d_bin += "1";
    } else {
      d_bin += "0";
    }
    bin += d_bin;
  }

  // extend the binary string to the required length
  bin = bin.padEnd(dispSize * 8, "0");

  // Making the actual array of hexadecimal numbers
  let hexaArray = [];
  for (let i = 0; i < dispSize; i++) {
    hexaArray[i] = parseInt(bin.slice(i * 8, (i + 1) * 8), 2)
      .toString(16)
      .toUpperCase();
  }
  return hexaArray;
}

// It ignites the appropriate digits, using a hexadecimal array.
function mySwitcher(hexArray) {
  for (let x = 0; x < hexArray.length; x++) {
    let myFlag = parseInt(hexArray[x], 16).toString(2).padStart(8, "0");
    let flagArray = myFlag.split("");
    for (let i = 0; i < 8; i++) {
      if (flagArray[i] === "1") {
        // theFullDisplay[x][i].classList.add("lit");
        theFullDisplay[x][i].style.fill = segColorLit;
      } else if (flagArray[i] === "0") {
        // theFullDisplay[x][i].classList.remove("lit");
        theFullDisplay[x][i].style.fill = segColorNoLit;
      }
    }
  }
}
