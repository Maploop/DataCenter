var j_object;
window.addEventListener("load", (e) => {
    fetch("./important.json", { mode: "no-cors" })
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
                "Cookies: " +
                (visitedTimeLast30Days
                    ? `<t:${visitedTimeLast30Days}:R>`
                    : "**Newcomer!**") +
                "\n" +
                "Check the address INFO: <https://ip-api.com/#" +
                data.ip +
                ">\n~~--------------------------------------------------------~~",
            );
            setCookie("visited", new Date().getMilliseconds(), 9999);
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
        let query = document.getElementById("search-query").value;
        if (!query) {
            document.querySelector("#no-valid-search").style.display = "block";
            return;
        }
        commence_search(query);
    }
});

window.addEventListener("submit", (e) => {
    let query = document.getElementById("search-query").value;
    if (!query) {
        document.querySelector("#no-valid-search").style.display = "block";
        return;
    }
    commence_search(query);
});

document.getElementById("search-submit").onclick = (e) => {
    let query = document.getElementById("search-query").value;
    if (!query) {
        document.querySelector("#no-valid-search").style.display = "block";
        return;
    }
    commence_search(query);
};

/**
 *
 * @param {string} keyword
 */
function commence_search(keyword) {
    document.querySelector("#box").innerHTML =
        `<h3 style="color: lightblue">Loading results...</h3>`;

    var html = ``;
    let resCount = 0;
    for (let i = 0; i < j_object.length; i++) {
        let ts = j_object[i];

        let label = ts["label"];
        if (!label.toLowerCase().includes(keyword.toLowerCase())) continue;
        let icon = ts["image_icon"];
        if (icon == "NOIMAGE") {
            icon = "./thumbnail.png";
        }

        var data = "";
        Object.keys(ts["data"]).forEach((key) => {
            if (ts["data"][key].startsWith("link$")) {
                data += `<p class="item-mom">${make_string_normal(key)}: <a class="item-link" href="${strip_this(ts["data"][key])}" target="_blank">${strip_this(ts["data"][key])}</a></p>`;
            } else if (ts["data"][key].startsWith("attachment$")) {
                data += `<p class="item-mom">${make_string_normal(key)}: <a class="item-link" href="${strip_this(ts["data"][key])}" target="_blank">Click to view image in a new tab</a></p>`;
            } else {
                data += `<p class="item-mom">${make_string_normal(key)}: <a class="item-white">${ts["data"][key]}</a></p>`;
            }
        });

        const our = `
        <div class="item">
        <div class="item-image">
            <img width=400 height=300 alt="Picture" src="${icon}">
        </div>
        <div class="item-content">
        <h4 class="item-title">${label}</h4>
        ${data}
        </div>
    </div>
        `;

        html += our;
        resCount++;
    }

    if (resCount <= 0) {
        html = `<h3 style="color: red">Whoops! Looks like there are no results!</h3>
        <h3 style="color: red">Error: CSV_FILE_NULLIFIED</h3>`;
    }
    document.querySelector("#case-count").innerHTML = resCount;
    document.querySelector("#box").innerHTML = html;
}

/**
 *
 * @param {JSONObject} text
 */
function load_page(json) {
    let lines = json.length;
    json.co;

    var html = `<h3 style="color: red">Whoops! Looks like there are no results!</h3>
    <h3 style="color: red">Error: DATA_NULLIFIED</h3>`;
    let resCount = lines;
    if (resCount > 0) {
        html = "";
    }
    document.querySelector("#case-count").innerHTML = resCount;

    for (let i = 0; i < json.length; i++) {
        let ts = json[i];

        let label = ts["label"];
        let icon = ts["image_icon"];
        if (icon == "NOIMAGE") {
            icon = "./thumbnail.png";
        }

        var data = "";
        Object.keys(ts["data"]).forEach((key) => {
            if (ts["data"][key].startsWith("link$")) {
                data += `<p class="item-mom">${make_string_normal(key)}: <a class="item-link" href="${strip_this(ts["data"][key])}" target="_blank">${strip_this(ts["data"][key])}</a></p>`;
            } else if (ts["data"][key].startsWith("attachment$")) {
                data += `<p class="item-mom">${make_string_normal(key)}: <a class="item-link" href="${strip_this(ts["data"][key])}" target="_blank">Click to view image in a new tab</a></p>`;
            } else {
                data += `<p class="item-mom">${make_string_normal(key)}: <a class="item-white">${ts["data"][key]}</a></p>`;
            }
        });

        const our = `
        <div class="item">
        <div class="item-image">
            <img width=400 height=300 alt="Picture" src="${icon}">
        </div>
        <div class="item-content">
        <h4 class="item-title">${label}</h4>
        ${data}
        </div>
    </div>
        `;

        html += our;
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
