/* Functions for updating section background color, color code and time stamp for UCC
*/

update();

function update() {
  let t = new Date();
  let hours = t.getHours().toString().padStart(2, '0');
  let mins = t.getMinutes().toString().padStart(2, '0');
  let timeKey = hours + ":" + mins;
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let strTime = hours + ":" + mins + ' ' + ampm;

  let r = Math.trunc(m.get(timeKey)[1])
  let g = Math.trunc(m.get(timeKey)[2])
  let b = Math.trunc(m.get(timeKey)[3])

  let r_p3 = (r / 255.0).toPrecision(5)
  let g_p3 = (g / 255.0).toPrecision(5)
  let b_p3 = (b / 255.0).toPrecision(5)

  let colorCode = m.get(timeKey)[0]

  let colorChipTime = document.getElementById("color-chip-time")
  let colorCodeTag = document.getElementById("color-code")
  let currTimeTitle = document.getElementById("current-time")
  
  let uccColorChangeBG = document.getElementById("ucc-color-change")

  currTimeTitle.innerHTML = `${strTime}`
  colorChipTime.innerHTML = `${strTime}`
  colorCodeTag.innerHTML = `${colorCode}`
  uccColorChangeBG.style.backgroundColor = `rgb(${r}, ${g}, ${b})`

  if (window.matchMedia("(color-gamut: p3)").matches) {
    uccColorChangeBG.style.backgroundColor = `color(display-p3 ${r_p3} ${g_p3} ${b_p3})`
  }
}

setInterval(() => {
  update()
}, 1000)



/** Function to update Alarm color section background color and hue code for full saturation */

updateFullSat();

function updateFullSat() {
  var t = new Date();
  var hours = t.getHours().toString().padStart(2, '0');
  var mins = t.getMinutes().toString().padStart(2, '0');
  var timeKey = hours + ":" + mins;
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  let r = Math.trunc(m.get(timeKey)[4])
  let g = Math.trunc(m.get(timeKey)[5])
  let b = Math.trunc(m.get(timeKey)[6])

  let r_p3 = (r / 255.0).toPrecision(5)
  let g_p3 = (g / 255.0).toPrecision(5)
  let b_p3 = (b / 255.0).toPrecision(5)

  let colorCode = m.get(timeKey)[0]

  let colorChipCode = document.getElementById("color-chip-code")
  let colorChipBG = document.getElementById("color-chip-container")

  colorChipCode.innerHTML = `${colorCode}`

  colorChipBG.style.backgroundColor = `rgb(${r}, ${g}, ${b})`

  if (window.matchMedia("(color-gamut: p3)").matches) {

    colorChipBG.style.backgroundColor = `color(display-p3 ${r_p3} ${g_p3} ${b_p3})`
  }
}
setInterval(() => {
  updateFullSat()
}, 1000)




/** Functions for updating section background color, color code and time stamp in rapid time
*/

function fastUpdate() {
  
  let interval = setInterval(fastTimer, 100);
  let sec = 0;
  let min = 0;
  let hr = 1;

  function fastTimer() {
    min++
    if (min === 60) {
      min = 0;
      hr++;
    }

    if (hr === 24) {
      hr = 1;
    }

    let timeKey = hr.toString().padStart(2, '0') + ":" + min.toString().padStart(2, '0')
    let r = Math.trunc(m.get(timeKey)[1])
    let g = Math.trunc(m.get(timeKey)[2])
    let b = Math.trunc(m.get(timeKey)[3])

    let r_p3 = (r / 255.0).toPrecision(5)
    let g_p3 = (g / 255.0).toPrecision(5)
    let b_p3 = (b / 255.0).toPrecision(5)
    let fastBGChange = document.getElementById("ucc-rapid-color-change");

    fastBGChange.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    if (window.matchMedia("(color-gamut: p3)").matches) {
      fastBGChange.style.backgroundColor = `color(display-p3 ${r_p3} ${g_p3} ${b_p3})`
    }

    let hour = hr % 12;
    hour = hr ? hr : 12;
    let amp = hr >= 12 ? 'pm' : 'am'
    

    document.getElementById("rapid-time-change").innerHTML =
      "<div>@</div>" + "<div id='hr-box'>"
    + hour + "</div>" + "<div>:</div>"
    + "<div id='min-box'>"
    + min.toString().padStart(2, '0')
    + "</div>" + "<div>" + amp + "</div>";
  }

}

fastUpdate()
