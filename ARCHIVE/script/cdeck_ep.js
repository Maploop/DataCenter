const console_e_holder = document.getElementById("ceholder");
const console_element = ``;

const endpoints = [
  {
    cname: "testProfile",
    url: "https://stackoverflow.com/questions/69814747/how-to-allow-and-show-extra-spaces-in-html"
  },
  {
    cname: "OLD_FORMAT_API",
    url: "https://raw.githubusercontent.com/Maploop/DataCenter/refs/heads/main/prices_endpoint.mdat"
  },
  {
    cname: "V2_FORMAT_API",
    url: "https://raw.githubusercontent.com/Maploop/DataCenter/refs/heads/main/MEOW.MRAT"
  },
  {
    cname: "OLD_FORMAT_BOT1301",
    url: "https://raw.githubusercontent.com/Maploop/DataCenter/refs/heads/main/personal/tkinter.exe"
  },
  {
    cname: "V3_FORMAT_SKID1301",
    url: "https://raw.githubusercontent.com/Maploop/DataCenter/refs/heads/main/personal/MX_0000x1.exe"
  }
];

addEventListener("load", (event) => {
  con_say("CHECKING FOR ENDPOINTS...");
  con_say("CURRENTLY EXISITING: " + endpoints.length + " ENDPOINTS.");
  if (endpoints.length <= 0) {
    con_say("PRESS <span class='bg-lime'>F5</span> TO REFRESH.");
    return;
  }
  start_checks();
});

var good = 0, bad = 0;
var done = 0;
function start_checks() {
  for (x of endpoints) {
    console.log('checking ' + x.cname);
    let xc = x.cname;
    fetch(x.url).catch(err => {
      con_say(`ENDPOINT CODENAME ${xc}: <span class='bg-red fg-black'>ERR</span>; (${err}).`);
      bad++;
      done++;
    }).then(res => {
      if (res.ok) {
        con_say(`ENDPOINT CODENAME ${xc}: <span class='bg-lime fg-black'>${res.status} OK</span>`);
        good++;
        done++;
        } else {
          con_say(`ENDPOINT CODENAME ${xc}: <span class='bg-red fg-black'>${res.status} NOT OK</span>`);
          bad++;
          done++;
        }
    });
  }

  // while (done < endpoints.length) {

  // }
  // con_say(`CHECKED ${endpoints.length} ENDPOINTS; TOTAL ${good} OK & ${bad} NOT OK.`);
  // con_say(`DONE. PRESS <span class='bg-lime'>F5</span> TO RUN AGAIN.`);
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

var queueFULL = false;
async function con_say(text) {
  if (queueFULL) {
    queueList.push({t: text, c: null});
    return;
  }

  queueFULL = true;
  var nextID = uuidv4();
  console_e_holder.innerHTML += `<div class="row"><span id="${nextID}" class="fg-red f-x1-5"></span></div>`
  var nextEL = document.getElementById(nextID);
  con_print_e(nextEL, text, null, 40);
}

function onComplete() {
  console.log("completed!");
}

var queueList = [];

function con_print_e(element, text, callback, speed) {
  console.log('went thru');
  fullText = text;
  currentOffset = 0;
  onComplete = callback;
  selElement = element;
  timer = setInterval(on_tick, speed);
}

function queue(element, text, callback, speed) {
  queueList.push({e: element, t: text, c: callback, s: speed});
}

function has_queued() {
  return queueList.length > 0;
}

var timer, fullText, currentOffset, onComplete, wordSet, selElement;
function on_tick() {
  currentOffset++;
  if (currentOffset == fullText.length) {
    complete();
    return;
  }
  var text = "";
  for (var i = 0; i <= currentOffset; i++) {
    text += fullText.charAt(i);
  }
  selElement.innerHTML = text;
}

function complete() {
  clearInterval(timer);
  timer = null;
  console.log('Completed');
  if (has_queued()) {
    queueFULL = false;
    let n = queueList[0];
    con_say(n.t);
    queueList.shift();
  }
}
