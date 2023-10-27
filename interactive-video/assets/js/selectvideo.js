import mouseTracker from "./mousetrackers.js";

function selectVideo() {
  const mouseTrackerClass = document.querySelector(".mousetracker");

  if (mouseTrackerClass) {
    mouseTrackerClass.style.display = "none";

    document
      .querySelector(".mousetracker-open")
      .addEventListener("click", function () {
        document.querySelector(".mousetracker").style.display = "block";
        document.querySelector("body").style.marginLeft = "25%";
        window.dispatchEvent(new Event("resize"));
      });

    document
      .querySelector(".mousetracker-close")
      .addEventListener("click", function () {
        document.querySelector(".mousetracker").style.display = "none";
        document.querySelector("body").style.marginLeft = "0";
        window.dispatchEvent(new Event("resize"));
      });

    const collection = document.getElementsByClassName("interactive-video");

    var select = document.getElementById("selectElementId");
    var btn = document.getElementById("trackme");

    for (var i = 0; i < collection.length; i++) {
      var opt = document.createElement("option");
      opt.value = collection[i].id;
      opt.innerHTML = collection[i].id;
      select.appendChild(opt);
    }

    btn.addEventListener("click", function () {
      document.querySelector(".instructions").style.display = "block";
      document.getElementById(select.value).scrollIntoView();

      mouseTracker(select.value);
    });
  }
}

export default selectVideo;
