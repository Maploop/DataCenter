var _allText = '';

window.addEventListener('load', (e) => {
    fetch('https://raw.githubusercontent.com/Maploop/DataCenter/main/very_important.csv').then(res => res.text()).then((text) => {
        console.log(text);
      load_page(text);
    });
});

window.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        let query = document.getElementById("search-query").value;
        if (!query) {
            document.querySelector('#no-valid-search').style.display = 'block';
            return;
        }
        commence_search(query);
    }
})

window.addEventListener('submit', (e) => {
    let query = document.getElementById("search-query").value;
    if (!query) {
        document.querySelector('#no-valid-search').style.display = 'block';
        return;
    }
    commence_search(query);
})

document.getElementById('search-submit').onclick = (e) => {
    let query = document.getElementById("search-query").value;
    if (!query) {
        document.querySelector('#no-valid-search').style.display = 'block';
        return;
    }
    commence_search(query);
}

/**
 * 
 * @param {string} keyword 
 */
function commence_search(keyword) {
    document.querySelector("#box").innerHTML = `<h3 style="color: lightblue">Loading results...</h3>`;
    let lines = _allText.split('\n');

    var html = ``;
    let resCount = 0;
    for (let index in lines) {
        if (index == 0) continue;
        let line = lines[index];

        let splitted = line.split(',');
        let name = splitted[0];
        if (!name.toLowerCase().includes(keyword.toLowerCase())) continue;
        let phone = splitted[1];
        let instagram = splitted[2];
        let telegram = splitted[3];
        let mom = splitted[4];
        let dad = splitted[5];
        let address = splitted[6];
        let relatives = splitted[7];
        let additional = splitted[8];
        let image = splitted[9];
        if (!image || image == "N/A") {
            image = "https://cdn.discordapp.com/attachments/947500949214220328/1194997321801416734/noimage.png?ex=65b262fb&is=659fedfb&hm=1457e078225262d7cf5fb622db0412d749927e4506c70bd92614c485836bceac&";
        }

        const our = `
        <div class="item">
                <div class="item-image">
                    <img width=400 height=300 alt="Picture" src="${image}">
                </div>
                <div class="item-content">
                <h4 class="item-title">${name}</h4>
                <p class="item-phone">Phone Number: >${phone}</p>
                <p class="item-instagram">Instagram: >${instagram}</p>
                <p class="item-telegram">Telegram: >${telegram}</p>
                <p class="item-mom">Mom: >${mom}</p>
                <p class="item-dad">Dad:>${dad}</p>
                <p class="item-address">Address: >${address}</p>
                <p class="item-other_relatives">Other Relatives: >${relatives}</p>
                <p class="item-additional_information">Additional INFO: >${additional}</p>
                </div>
            </div>`

       html += our;

        console.log(name);
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
 * @param {string} text 
 */
function load_page(text) {
    let lines = text.split('\n');

    var html = `<h3 style="color: red">Whoops! Looks like there are no results!</h3>
    <h3 style="color: red">Error: CSV_FILE_NULLIFIED</h3>`;
    let resCount = lines.length - 1;
    if (resCount > 0) {
        html = '';
    }
    document.querySelector("#case-count").innerHTML = resCount;
    for (let index in lines) {
        if (index == 0) continue;
        let line = lines[index];

        let splitted = line.split(',');
        let name = splitted[0];
        let phone = splitted[1];
        let instagram = splitted[2];
        let telegram = splitted[3];
        let mom = splitted[4];
        let dad = splitted[5];
        let address = splitted[6];
        let relatives = splitted[7];
        let additional = splitted[8];
        let image = splitted[9];
        console.log(image);
        if (!image || image == "N/A") {
            image = "https://cdn.discordapp.com/attachments/947500949214220328/1194997321801416734/noimage.png?ex=65b262fb&is=659fedfb&hm=1457e078225262d7cf5fb622db0412d749927e4506c70bd92614c485836bceac&";
        }

        const our = `
        <div class="item">
                <div class="item-image">
                    <img width=400 height=300 alt="Picture" src="${image}">
                </div>
                <div class="item-content">
                <h4 class="item-title">${name}</h4>
                <p class="item-phone">Phone Number: >${phone}</p>
                <p class="item-instagram">Instagram: >${instagram}</p>
                <p class="item-telegram">Telegram: >${telegram}</p>
                <p class="item-mom">Mom: >${mom}</p>
                <p class="item-dad">Dad:>${dad}</p>
                <p class="item-address">Address: >${address}</p>
                <p class="item-other_relatives">Other Relatives: >${relatives}</p>
                <p class="item-additional_information">Additional INFO: >${additional}</p>
                </div>
            </div>`

       html += our;

        console.log(name);
    }

    document.querySelector("#box").innerHTML = html;
    _allText = text;
}