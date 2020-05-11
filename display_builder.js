/* 
JavaScript for the built of 7 segment display
Copyright © 2020 GEAR webdevelopment ltd.
*/

// number of digits for a new display
let dispSize = 12;

displayBuilder(dispSize);

function displayBuilder(dig) {
  const cont = document.querySelector(".container-display");
  cont.innerHTML = "";
  cont.style.display = "grid";
  cont.style.gridTemplateColumns = `repeat(${dispSize}, 1fr)`;
  cont.style.alignItems = "center"; // new
  cont.style.gap = "2px";

  for (let i = 0; i < dig; i++) {
    let str = ""; // for the inner html
    str += `
        <svg
          class="digit"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 540 760"
        >
          <rect id="bg" class="bg" width="540" height="760" />
          <path
            id="a"
            class="segment"
            d="M397.9 131.1L208.8 131.1 149.7 59.4C162.9 49.4 178.5 42.7 194.8 40.8 234.6 36.3 277.7 34.3 320.4 34.5 363.1 34.3 405.6 36.3 443.7 40.8 459.4 42.7 472.6 49.4 482.2 59.4L397.9 131.1Z"
          />
          <path
            id="b"
            class="segment"
            d="M489.1 68L404.9 139.6 373.8 316.1 420.5 372.9C431.5 372.1 442.6 367.4 451.6 359.6 461.6 351.1 468.3 339.5 470.2 327.4 482.7 249.4 492.5 175.8 499.1 111.1 500.6 94.8 496.9 79.9 489.1 68Z"
          />
          <path
            id="c"
            class="segment"
            d="M379.1 692L320.1 620.4 351.2 443.9 418 387.1C428.7 387.9 438.1 392.6 444.4 400.4 451.3 409 454 420.6 451.7 432.6 436.7 510.6 420.4 584.3 404.2 648.9 400.1 665.2 391.1 680.1 379.1 692Z"
          />
          <path
            id="d"
            class="segment"
            d="M310.1 628.9L369.2 700.6C356 710.6 340.4 717.3 324.1 719.2 284.4 723.7 241.2 725.7 198.5 725.5 155.8 725.7 113.4 723.7 75.2 719.2 59.6 717.3 46.3 710.6 36.7 700.6L121 628.9 310.1 628.9Z"
          />
          <path
            id="e"
            class="segment"
            d="M29.8 692L114 620.4 145.1 443.9 98.4 387.1C87.4 387.9 76.4 392.6 67.3 400.4 57.4 409 50.7 420.6 48.7 432.6 36.2 510.6 26.5 584.3 19.9 648.9 18.3 665.2 22 680.1 29.8 692Z"
          />
          <path
            id="f"
            class="segment"
            d="M139.9 68L198.8 139.6 167.7 316.1 100.9 372.9C90.2 372.1 80.8 367.4 74.5 359.6 67.6 351.1 65 339.5 67.3 327.4 82.2 249.4 98.5 175.8 114.7 111.1 118.9 94.8 127.9 79.9 139.9 68Z"
          />
          <path
            id="g"
            class="segment"
            d="M110.6 380L162.7 335.7 371.8 335.7 408.4 380 356.2 424.4 147.1 424.4 110.6 380Z"
          />
          <circle id="dp" class="segment" cx="475.5" cy="675.5" r="45" />
        </svg>
`;

    let digDiv = document.createElement("div");
    digDiv.classList.add("digit", `pos${i + 1}`);
    digDiv.innerHTML = str;

    cont.appendChild(digDiv);
  }
}
