function interactiveVideo(data, name, controls) {
  const media = document.querySelector(`#${name} video`);
  const overlay = `#${name} .overlay`;
  const overlayClose = `#${name} .overlay-close`;
  const timer = document.querySelector(`#${controls.controlsId} .timer`);

  const hotspots = document.querySelector(`#${controls.controlsId} .hotspots`);
  hotspots.innerHTML = "";

  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.5,
      repeatDelay: 5,
    },
  });

  // Sync the animation with the video
  function Update() {
    var newValue = media.currentTime / media.duration;
    tl.progress(newValue);
  }

  // Sync the animation with the video
  gsap.ticker.add(Update);

  // Fucntion to close overlays

  function overlayCloseFunction() {
    media.play();
    gsap.to(overlay, { opacity: 0, scale: 0 });
  }

  document.querySelectorAll(overlayClose).forEach((item) => {
    item.addEventListener("click", overlayCloseFunction);
  });

  // Maping all the hotspots

  data.map((element, i) => {
    let elementSelector = `#${name}  [data-id="${element.id}"]`;
    let overlaySelector = `#${name} [data-id="${element.overlayId}"]`;
    let selector = document.querySelector(elementSelector);

    if (controls.markers) {
      const positionX = (element.start * timer.clientWidth) / media.duration;
      const span = document.createElement("span");
      hotspots.appendChild(span).style.cssText = `left: ${positionX}px`;
    }
    // MAKE THE MARKES HOTSPOTS FOR ALL

    // FUNCTIONALITY OF EACH TYPE OF HOTSPOTS

    switch (element.type) {
      case "jump":
        var myFuncName = element.id + "Function";
        window[myFuncName] = function () {
          media.currentTime = element.jumpTo;
          media.play();
        };
        break;
      case "overlay":
        var myFuncName = element.id + "Function";
        window[myFuncName] = function () {
          media.pause();
          gsap.to(overlaySelector, {
            opacity: 1,
            scale: 1,
          });
        };
        break;

      case "externalButton":
        var myFuncName = element.id + "Function";
        window[myFuncName] = function () {
          media.pause();
          window.open(element.url, element.blank ? "_blank" : "_self");
        };

        break;
    }

    //   ADD LISTENERS TO EACH HOTSPOT

    selector
      ? selector.addEventListener("click", window[element.id + "Function"])
      : console.log("There's a ID Missing on the DOM");

    // EXTRA GSAP ANIMATIONS

    var gsapTo = element.gsapTo;
    var gsapFrom = element.gsapFrom;

    // MAIN ANIMATION FOR EACH HOTSPOT
    gsap.set(elementSelector, {
      opacity: 0,
      display: "none",
      transformOrigin: "top left",
      // top: element.initialY + "%",
      // left: element.initialX + "%",
      y: (element.initialY * media.offsetHeight) / 100,
      x: (element.initialX * media.offsetWidth) / 100,
      ...gsapFrom,
    });

    tl.to(
      elementSelector,

      {
        display: "flex",
        opacity: 1,
        scale: 1,
        yoyo: true,
        repeat: 1,
        repeatDelay: element.length ? element.length : 5,
        ...gsapTo,
      },
      element.start
    ).to(elementSelector, {
      opacity: 0,
      display: "none",
    });
  });

  // TICKER TO CONTROL LENGTH OF ANIMATION

  tl.to({}, { duration: media.duration }, 0);
}

export default interactiveVideo;
