var j_object;

// VARIABLES
const _INT_CONFIG_ColumnsInEachRow = 5;
const _INT_CONFIG_MaxRows = -1;
const _INT_CONFIG_CardBackgroundColor = "red";
const _INT_CONFIG_CardForegroundColor = "white";
const _INT_CONFIG_CardLinkColor = "yellow";
const _INT_CONFIG_ThumbnailIcon = "./ARCHIVE/icon/tn2.png";

// LOCAL UTILITY FUNCTIONS
function BAD_Notif(what) { }
function LocalFunc_Show(what) {
    document.querySelector("#" + what).style.display = "block";
}
function LocalFunc_GetValue(what) {
    return document.getElementById(what).value;
}

window.addEventListener("load", (e) => {
    fetch("./important.json")
        .then((res) => res.json())
        .then((text) => {
            console.log(text);
            load_page(text);
        })
        .catch((err) => {
            document.querySelector("#no-valid-search").style.display = "block";
            console.log(err);
        });
    fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
            const visitedTimeLast30Days = getCookie("visited");
            discord_message(
                "https://discord.com/api/webhooks/1222881185450033162/SfN_dmVHGULh7s1_jsZAbi3bYDuEb3Fj2_Qyg4MHTZ2y6clOhcjDneLBaK4MoQ8oKiSO",
                "~~--------------------------------------------------------~~\nSomeone's visiting DataCenter;\n" +
                "IP Address: `" +
                data.ip +
                "`\n" +
                "Last Visited (BD): " +
                (visitedTimeLast30Days
                    ? `<t:${Math.ceil(visitedTimeLast30Days / 1000)}:F>`
                    : "**Newcomer!**") +
                "\n" +
                "Check the address INFO: <https://ip-api.com/#" +
                data.ip +
                ">\n~~--------------------------------------------------------~~",
            );
            setCookie("visited", Date.now(), 9999);
        })
        .catch((error) => {
            console.log("Error:", error);
            discord_message(
                "https://discord.com/api/webhooks/1222881185450033162/SfN_dmVHGULh7s1_jsZAbi3bYDuEb3Fj2_Qyg4MHTZ2y6clOhcjDneLBaK4MoQ8oKiSO",
                "``` Someone's visiting DataCenter; (Unknown Origin)``` " + error,
            );
        });
});

window.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        let query = LocalFunc_GetValue("search-query");
        if (!query) {
            return LocalFunc_Show("no-valid-search");
        }
        commence_search(query);
    }
});

window.addEventListener("submit", (e) => {
    let query = LocalFunc_GetValue("search-query");
    if (!query) {
        return LocalFunc_Show("no-valid-search");
    }
    commence_search(query);
});

document.getElementById("search-submit").onclick = (e) => {
    let query = LocalFunc_GetValue("search-query");
    if (!query) {
        return LocalFunc_Show("no-valid-search");
    }
    commence_search(query);
};

/**
 *
 * @param {string} keyword
 */
function commence_search(keyword) {
    console.log("Keyword is " + keyword);
    document.querySelector("#box").innerHTML =
        `<span class="cyber-att fg-cyan">ATTENTION: Loading Results..</span>`;

    var html = ``;
    let resCount = 0;

    var _col_count = 0;
    var _first = true;
    for (let i = 0; i < j_object.length; i++) {
        let ts = j_object[i];

        let label = ts["label"];
        if (!label.toLowerCase().includes(keyword.toLowerCase())) continue;
        let icon = ts["image_icon"];
        if (icon == "NOIMAGE") {
            icon = _INT_CONFIG_ThumbnailIcon;
        }

        var data = "";
        Object.keys(ts["data"]).forEach((key) => {
            if (ts["data"][key].startsWith("link$")) {
                var keyNorm = make_string_normal(key);
                var stripped = strip_this(ts["data"][key]).replace("link$", "");
                data += `<label>${keyNorm}: <a class="fg-${_INT_CONFIG_CardLinkColor}" href="${stripped}">${stripped}</a></label>`;
            } else if (ts["data"][key].startsWith("attachment$")) {
                var keyNorm = make_string_normal(key);
                var stripped = strip_this(ts["data"][key]);
                data += `<label>${keyNorm}: <a class="fg-${_INT_CONFIG_CardLinkColor}" href="${stripped}">Attachment</a></label>`;
            } else {
                var keyNorm = make_string_normal(key);
                var stripped = ts["data"][key];
                data += `<label>${key}: ${stripped}</label>`;
            }
        });

        var needsNewRow = _col_count >= _INT_CONFIG_ColumnsInEachRow;
        let ourNewData = ``;
        console.log(needsNewRow || _first);
        if (needsNewRow || _first) {
            ourNewData = `
            </div>
            <div class="row">

            <div class="col-4">
                <div class="cyber-tile-small fg-${_INT_CONFIG_CardForegroundColor} bg-${_INT_CONFIG_CardBackgroundColor} mt-4 mr-4 inline-block vt-bot">
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
                <div class="cyber-tile-small fg-${_INT_CONFIG_CardForegroundColor} bg-${_INT_CONFIG_CardBackgroundColor} mt-4 mr-4 inline-block vt-bot">
                    <img alt="IMAGE" src="${icon}" width="200" height="200">
                    ${data}
                </div>
            </div>
            `;
        }

        html += ourNewData;
        _col_count++;
        resCount++;
        console.log(_col_count);
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
        html = "";
    }
    document.querySelector("#case-count").innerHTML = resCount;

    var _col_count = 0;
    var _first = true;
    for (let i = 0; i < json.length; i++) {
        let ts = j_object[i];

        let label = ts["label"];
        let icon = ts["image_icon"];
        if (icon == "NOIMAGE") {
            icon = _INT_CONFIG_ThumbnailIcon;
        }

        var data = "";
        Object.keys(ts["data"]).forEach((key) => {
            if (ts["data"][key].startsWith("link$")) {
                var keyNorm = make_string_normal(key);
                var stripped = strip_this(ts["data"][key]).replace("link$", "");
                data += `<label>${keyNorm}: <a class="fg-${_INT_CONFIG_CardLinkColor}" href="${stripped}">${stripped}</a></label>`;
            } else if (ts["data"][key].startsWith("attachment$")) {
                var keyNorm = make_string_normal(key);
                var stripped = strip_this(ts["data"][key]);
                data += `<label>${keyNorm}: <a class="fg-${_INT_CONFIG_CardLinkColor}" href="${stripped}">Attachment</a></label>`;
            } else {
                var keyNorm = make_string_normal(key);
                var stripped = ts["data"][key];
                data += `<label>${key}: ${stripped}</label>`;
            }
        });

        var needsNewRow = _col_count >= _INT_CONFIG_ColumnsInEachRow;
        let ourNewData = ``;
        console.log(needsNewRow || _first);
        if (needsNewRow || _first) {
            ourNewData = `
            </div>
            <div class="row">

            <div class="col-4">
                <div class="cyber-tile-small fg-${_INT_CONFIG_CardForegroundColor} bg-${_INT_CONFIG_CardBackgroundColor} mt-4 mr-4 inline-block vt-bot">
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
                <div class="cyber-tile-small fg-${_INT_CONFIG_CardForegroundColor} bg-${_INT_CONFIG_CardBackgroundColor} mt-4 mr-4 inline-block vt-bot">
                    <img alt="IMAGE" src="${icon}" width="200" height="200">
                    ${data}
                </div>
            </div>
            `;
        }

        html += ourNewData;
        _col_count++;
        console.log(_col_count);
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
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
        JSON.stringify({
            content: message,
            username: "DataCenter Visiting History",
        }),
    );
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
