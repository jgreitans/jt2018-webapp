function processResponse() {
    var json = JSON.parse(this.responseText);
    document.getElementById("temperature").innerHTML = json;
}

function processError() {
    console.error("Could not get temperature.");
    document.getElementById("temperature").innerHTML = "&#x2639;";
}

function sendRequest() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", processResponse);
    xhr.addEventListener("error", processError);
    xhr.open("GET", "/temperature", true);
    xhr.send();
}

function start() {
    setInterval(sendRequest, 5000);
    sendRequest();
}

start();
