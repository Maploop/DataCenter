var j_object;

// VARIABLES
const _INT_CONFIG_ColumnsInEachRow = 3;
const _INT_CONFIG_MaxRows = -1;

// LOCAL UTILITY FUNCTIONS
function BAD_Notif(what) {}
function LocalFunc_Show(what) { document.querySelector('#' + what).style.display = 'block'; }
function LocalFunc_GetValue(what) { return document.getElementById(what).value; }

window.addEventListener('load', (e) => {
    fetch('./important.json').then(res => res.json()).then((text) => {
        console.log(text);
      load_page(text);
    });
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        discord_message("https://discord.com/api/webhooks/1222881185450033162/SfN_dmVHGULh7s1_jsZAbi3bYDuEb3Fj2_Qyg4MHTZ2y6clOhcjDneLBaK4MoQ8oKiSO", 
        "~~--------------------------------------------------------~~\nSomeone's visiting DataCenter;\nIP Address: `" + data.ip + "`\n" + 
        "Check the address INFO: <https://ip-api.com/#" + data.ip + ">\n~~--------------------------------------------------------~~");
    })
    .catch(error => {
        console.log('Error:', error);
        discord_message("https://discord.com/api/webhooks/1222881185450033162/SfN_dmVHGULh7s1_jsZAbi3bYDuEb3Fj2_Qyg4MHTZ2y6clOhcjDneLBaK4MoQ8oKiSO", 
        "``` Someone's visiting DataCenter; (Unknown Origin)``` " + error);
    });
});

window.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        let query = LocalFunc_GetValue("search-query");
        if (!query) {
            return LocalFunc_Show("no-valid-search");
        }
        commence_search(query);
    }
})

window.addEventListener('submit', (e) => {
    let query = LocalFunc_GetValue("search-query");
    if (!query) {
        return LocalFunc_Show("no-valid-search");
    }
    commence_search(query);
})

document.getElementById('search-submit').onclick = (e) => {
    let query = LocalFunc_GetValue("search-query");
    if (!query) {
        return LocalFunc_Show("no-valid-search");
    }
    commence_search(query);
}

/**
 * 
 * @param {string} keyword 
 */
function commence_search(keyword) {
    console.log("Keyword is " + keyword);
    document.querySelector("#box").innerHTML = `<span class="cyber-att fg-cyan">ATTENTION: Loading Results..</span>`;

    var html = ``;
    let resCount = 0;

    var _col_count = 0;
    var _first = true;
    for (let i = 0; i < j_object.length; i++) {
        let ts = j_object[i];
        
        let label = ts['label'];
        if (!label.toLowerCase().includes(keyword.toLowerCase())) continue;
        let icon = ts['image_icon'];
        if (icon == "NOIMAGE") {
            icon = "./thumbnail.png";
        }
        
        var data = "";
        Object.keys(ts['data']).forEach((key) => {
            if (ts['data'][key].startsWith("link$")) {
                var keyNorm = make_string_normal(key);
                var stripped = strip_this(ts['data'][key]).replace("link$", "");
                data += `<label>${keyNorm}: <a class="fg-yellow" href="${stripped}">${stripped}</a></label>`;
            }
            else if (ts['data'][key].startsWith("attachment$")) {
                var keyNorm = make_string_normal(key);
                var stripped = strip_this(ts['data'][key]);
                data += `<label>${keyNorm}: <a class="fg-yellow" href="${stripped}">Attachment</a></label>`;
            } else {
                var keyNorm = make_string_normal(key);
                var stripped = ts['data'][key];
                data += `<label>${key}: ${stripped}</label>`;
            }
        });

        var needsNewRow = _col_count >= 3;
        let ourNewData = ``;
        console.log(needsNewRow || _first);
        if (needsNewRow || _first) {
            ourNewData = `
            </div>
            <div class="row">

            <div class="col-4">
                <div class="cyber-tile fg-white bg-dark mt-4 mr-4 inline-block vt-bot">
                    <img alt="IMAGE" src="${icon}" width="200" height="200">
                    ${data}
                </div>
            </div>

            `;
            _col_count = 0;
            _first = false;
        } else {
            ourNewData = `
            <div class="col-4">
                <div class="cyber-tile fg-white bg-dark mt-4 mr-4 inline-block vt-bot">
                    <img alt="IMAGE" src="${icon}" width="200" height="200">
                    ${data}
                </div>
            </div>
            `;
        }

        html += ourNewData;
        _col_count++;
        resCount++;
        console.log(_col_count)
    }

    if (resCount <= 0) {
        html = `<span class="mt-5 mb-5 cyber-att">ATTENTION: No Results For This Query (ERR_JSON_NULL)</span>`;
    }
    document.querySelector("#case-count").innerHTML = resCount;
    document.querySelector("#box").innerHTML = html;
}

/**
 * 
 * @param {JSONObject} text 
 */
function load_page(json) {
    j_object = json;
    let lines = json.length;

    var html = `<h3 style="color: red">Whoops! Looks like there are no results!</h3>
    <h3 style="color: red">Error: DATA_NULLIFIED</h3>`;
    let resCount = lines;
    if (resCount > 0) {
        html = '';
    }
    document.querySelector("#case-count").innerHTML = resCount;

    var _col_count = 0;
    var _first = true;
    for (let i = 0; i < json.length; i++) {
        let ts = j_object[i];
        
        let label = ts['label'];
        let icon = ts['image_icon'];
        if (icon == "NOIMAGE") {
            icon = "./thumbnail.png";
        }
        
        var data = "";
        Object.keys(ts['data']).forEach((key) => {
            if (ts['data'][key].startsWith("link$")) {
                var keyNorm = make_string_normal(key);
                var stripped = strip_this(ts['data'][key]).replace("link$", "");
                data += `<label>${keyNorm}: <a class="fg-yellow" href="${stripped}">${stripped}</a></label>`;
            }
            else if (ts['data'][key].startsWith("attachment$")) {
                var keyNorm = make_string_normal(key);
                var stripped = strip_this(ts['data'][key]);
                data += `<label>${keyNorm}: <a class="fg-yellow" href="${stripped}">Attachment</a></label>`;
            } else {
                var keyNorm = make_string_normal(key);
                var stripped = ts['data'][key];
                data += `<label>${key}: ${stripped}</label>`;
            }
        });

        var needsNewRow = _col_count >= 3;
        let ourNewData = ``;
        console.log(needsNewRow || _first);
        if (needsNewRow || _first) {
            ourNewData = `
            </div>
            <div class="row">

            <div class="col-4">
                <div class="cyber-tile fg-white bg-dark mt-4 mr-4 inline-block vt-bot">
                    <img alt="IMAGE" src="${icon}" width="200" height="200">
                    ${data}
                </div>
            </div>

            `;
            _col_count = 0;
            _first = false;
        } else {
            ourNewData = `
            <div class="col-4">
                <div class="cyber-tile fg-white bg-dark mt-4 mr-4 inline-block vt-bot">
                    <img alt="IMAGE" src="${icon}" width="200" height="200">
                    ${data}
                </div>
            </div>
            `;
        }

        html += ourNewData;
        _col_count++;
        console.log(_col_count)
    }

    document.querySelector("#box").innerHTML = html;
    j_object = json;
}

/**
 * 
 * @param {string} str 
 * @returns string
 */
function make_string_normal(str) {
    return str.replaceAll("_", " ");
}

function strip_this(str) {
    return str.replace("attachment$", "");
}

function discord_message(webHookURL, message) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", webHookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'content': message,
        'username':'DataCenter Visiting History',
    }));
}