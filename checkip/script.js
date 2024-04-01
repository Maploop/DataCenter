const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var inputIP = urlParams.get("input");
console.log(inputIP);

const searchBar = document.getElementById("search-query");

window.addEventListener("load", () => {
    if (inputIP != null) {
        searchBar.textContent = inputIP;
    
        fetch("https://ip-api.com/json/" + inputIP).then(res => res.json()).then(json => {
            var html = '';
            console.log(json);
            var data = '';

            let label = inputIP;
            data += `<p class="item-mom">Country: <a class="item-white"> ${json["country"]}</a></p>`;
            data += `<p class="item-mom">City: <a class="item-white"> ${json["city"]}</a></p>`;
            data += `<p class="item-mom">ISP: <a class="item-white"> ${json["isp"]}</a></p>`;
            data += `<p class="item-mom">ZIP: <a class="item-white"> ${json["zip"]}</a></p>`;
            data += `<p class="item-mom">Latitude: <a class="item-white"> ${json["lat"]}</a></p>`;
            data += `<p class="item-mom">Longtitude: <a class="item-white"> ${json["lon"]}</a></p>`;
            data += `<p class="item-mom">Organization: <a class="item-white"> ${json["org"]}</a></p>`;
         
                const our = `
                <div class="item">
                <div class="item-content">
                <h4 class="item-title">${label}</h4>
                ${data}
                </div>
            </div>
                `

            html += our;
        
            document.querySelector("#box").innerHTML = html;
        });

    }
})