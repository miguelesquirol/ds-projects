import interactiveVideo from "./interactiveVideo.js";
import videoControl from "./videoControls.js";
import SelectVideoForTracking from "./selectvideo.js";
import throttled from "./throttle.js";

function videos(data) {
  SelectVideoForTracking();

  function runVideo() {
    data.map((video) => {
      interactiveVideo(
        video.hotspots,
        video.interactiveVideoId,
        video.controls
      );
    });
  }
  runVideo();
  const tHandler = throttled(100, runVideo);
  window.addEventListener("resize", tHandler);

  data.map((video) => {
    videoControl(video.interactiveVideoId, video.controls);
  });
}

export default videos;
