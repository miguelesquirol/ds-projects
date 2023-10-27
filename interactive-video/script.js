import videos from "./assets/js/videos.js";
import includeHTML from "./assets/js/includeHtml.js";

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open("GET", path);
  httpRequest.send();
}

includeHTML(myCallback);

function myCallback() {
  fetchJSONFile("./assets/json/hotspots.json", function (data) {
    videos(data);
  });
}
