import throttled from "./throttle.js";

function mouseTracker(className) {
  const video = document.getElementById(className);
  const media = document.querySelector(`#${className} video`);
  console.log(className);
  if (!video) {
    console.error("there's no Video with this ID");
  } else {
    let videoframes = document.querySelectorAll("video");

    videoframes.forEach((videoframe) => {
      videoframe.style.border = "";
    });

    document.querySelector(`#${className} video`).style.border =
      "2px solid red";

    var timeline = [];
    var startTime;
    var endTime;
    var duration;
    var code = "";

    function recordMovement(e) {
      var offset = video.getBoundingClientRect();
      var posX = ((e.clientX - offset.left) * 100) / video.clientWidth;
      var posY = ((e.clientY - offset.top) * 100) / video.clientHeight;

      timeline.push({
        time: media.currentTime.toFixed(2),
        posX: posX.toFixed(2),
        posY: posY.toFixed(2),
      });
    }

    const tHandler = throttled(100, recordMovement);

    window.onkeydown = function (el) {
      if (el.keyCode === 82) {
        timeline = [];
        startTime;
        endTime;
        duration;
        code = "";
        document.querySelector(".tracking").style.display = "block";
        startTime = media.currentTime.toFixed(2);
        video.addEventListener("mousemove", tHandler);
      }
      if (el.keyCode === 83) {
        document.querySelector(".tracking").style.display = "none";
        video.removeEventListener("mousemove", recordMovement);
        createKeyframes();
        opentextarea();
      }
    };

    function createKeyframes() {
      endTime = media.currentTime.toFixed(2);
      duration = (endTime - startTime).toFixed(2);

      timeline.map((keyframe) => {
        var point = ((keyframe.time - startTime) * 100) / duration;
        code += `"${point.toFixed(2)}%":{ "left": "${
          keyframe.posX
        }%", "top": "${keyframe.posY}%"},\n`;
      });
    }

    function opentextarea() {
      document.getElementById("keyframes").innerHTML = "";

      var input = Object.assign(document.createElement("textarea"), {
        id: "keyframearea",
        value: code,
      });

      var input2 = Object.assign(document.createElement("input"), {
        id: "input2",
        value: duration,
      });

      var input3 = Object.assign(document.createElement("input"), {
        id: "input3",
        value: startTime,
      });

      var label1 = Object.assign(document.createElement("h3"), {
        id: "label1",
        textContent: "Keyframes",
      });

      var label2 = Object.assign(document.createElement("h3"), {
        id: "label2",
        textContent: "Duration",
      });

      var label3 = Object.assign(document.createElement("h3"), {
        id: "label3",
        textContent: "Start Time",
      });

      var oBody = document.getElementById("keyframes");
      oBody.append(label2, input2, label3, input3, label1, input);
    }
  }
}

export default mouseTracker;
