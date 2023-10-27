function videoControl(name, controls) {
  const video = document.querySelector(`#${name} video`);
  video.removeAttribute("controls");

  if (controls.control) {
    const play = document.querySelector(`#${controls.controlsId} .play`);
    const stop = document.querySelector(`#${controls.controlsId} .stop`);
    const rwd = document.querySelector(`#${controls.controlsId} .rwd`);
    const fwd = document.querySelector(`#${controls.controlsId} .fwd`);

    const timerWrapper = document.querySelector(
      `#${controls.controlsId} .timer`
    );
    const timer = document.querySelector(`#${controls.controlsId} .timer span`);
    const timerBar = document.querySelector(
      `#${controls.controlsId} .timer div`
    );

    play.addEventListener("click", playPauseMedia);

    function playAction() {
      play.classList.add("playing");
      play.setAttribute("data-icon", "u");
      video.play();
    }

    function pauseAction() {
      play.classList.remove("playing");
      play.setAttribute("data-icon", "P");
      video.pause();
    }

    controls.autoplay ? playAction() : pauseAction;

    function playPauseMedia() {
      clearInterval(intervalFwd);
      clearInterval(intervalRwd);
      fwd.classList.remove("active");
      rwd.classList.remove("active");
      play.classList.contains("playing") ? pauseAction() : playAction();
    }

    stop.addEventListener("click", stopMedia);
    video.addEventListener("ended", stopMedia);

    function stopMedia() {
      clearInterval(intervalFwd);
      fwd.classList.remove("active");
      rwd.classList.remove("active");
      video.currentTime = 0;
      pauseAction();
    }

    timerWrapper.addEventListener("click", seekTime);
    function seekTime(event) {
      var bounds = event.target.getBoundingClientRect();
      var x = event.clientX - bounds.left;
      let width = timerWrapper.offsetWidth;
      let position = (video.duration * x) / width;
      video.currentTime = position.toFixed(2);
    }

    rwd.addEventListener("click", mediaBackward);
    fwd.addEventListener("click", mediaForward);

    let intervalFwd;
    let intervalRwd;

    function mediaBackward() {
      clearInterval(intervalFwd);
      fwd.classList.remove("active");

      if (rwd.classList.contains("active")) {
        rwd.classList.remove("active");
        clearInterval(intervalRwd);
        playAction();
      } else {
        rwd.classList.add("active");
        intervalRwd = setInterval(windBackward, 200);
        pauseAction();
      }
    }

    function mediaForward() {
      clearInterval(intervalRwd);
      rwd.classList.remove("active");

      if (fwd.classList.contains("active")) {
        fwd.classList.remove("active");
        clearInterval(intervalFwd);
        playAction();
      } else {
        fwd.classList.add("active");
        intervalFwd = setInterval(windForward, 200);
        pauseAction();
      }
    }

    function windBackward() {
      if (video.currentTime <= 1) {
        rwd.classList.remove("active");
        clearInterval(intervalRwd);
        stopMedia();
      } else {
        video.currentTime -= 1;
      }
    }

    function windForward() {
      if (video.currentTime >= video.duration - 3) {
        fwd.classList.remove("active");
        clearInterval(intervalFwd);
        stopMedia();
      } else {
        video.currentTime += 3;
      }
    }

    video.addEventListener("timeupdate", setTime);

    function setTime() {
      const minutes = Math.floor(video.currentTime / 60);
      const seconds = Math.floor(video.currentTime - minutes * 60);

      const minuteValue = minutes.toString().padStart(2, "0");
      const secondValue = seconds.toString().padStart(2, "0");

      const mediaTime = `${minuteValue}:${secondValue}`;
      timer.textContent = mediaTime;

      const barLength =
        timerWrapper.clientWidth * (video.currentTime / video.duration);
      timerBar.style.width = `${barLength}px`;
    }

    rwd.classList.remove("active");
    fwd.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
  } else {
    const controlsDiv = document.querySelector(`#${controls.controlsId}`);
    controlsDiv.style.display = "none";
    controls.autoplay ? video.play() : "";
  }
}

export default videoControl;
