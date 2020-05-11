/* 
JavaScript for the Digital clock profile
Copyright © 2020 GEAR webdevelopment ltd.
*/

function initClock() {
  let clockTimer;

  function start() {
    // call function from 'control.js'
    changeDispSizeSlider(8);

    clockTimer = setInterval(function () {
      let d = new Date();
      let h = d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds();
      h = h.toString(10);
      if (h.length === 1) {
        h = "0" + h;
      }
      m = m.toString(10);
      if (m.length === 1) {
        m = "0" + m;
      }
      s = s.toString(10);
      if (s.length === 1) {
        s = "0" + s;
      }
      let time = `${h}-${m}-${s}`;
      theMain(time);
    }, 1000);
  }

  function stop() {
    clearInterval(clockTimer);
  }

  initClock.start = start;
  initClock.stop = stop;
}
