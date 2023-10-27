import horizontalLoop from "./horizontalLoop.js";

function slider3d() {
	const wrapper = $(".wrapper-level1");
	const wrapper2 = $(".wrapper-level2");
	const wrapper3 = $(".wrapper-level3");

	const boxes = gsap.utils.toArray(".box-level1");
	const boxes2 = gsap.utils.toArray(".box-level2");
	const boxes3 = gsap.utils.toArray(".box-level3");

	let scaleValue1 = 1;
	let scaleValue2 = 0.7;
	let scaleValue3 = 0.4;

	let transformValue1 = 0;
	let transformValue2 = 0;
	let transformValue3 = 0;

	let play = 1;
	let scroll = 0;

	console.clear();

	let activeElement;
	let activeElement2;
	let activeElement3;

	const loop = horizontalLoop(boxes, {
		paused: true,
		speed: 5,
		draggable: false,
		center: true,
		onChange: (element, index) => {
			activeElement && activeElement.classList.remove("active");
			element.classList.add("active");
			activeElement = element;
		},
		paddingRight: 240,
	});

	const loop2 = horizontalLoop(boxes2, {
		paused: true,
		speed: 3,
		draggable: false,
		center: true,
		onChange: (element, index) => {
			activeElement2 && activeElement2.classList.remove("active");
			element.classList.add("active");
			activeElement2 = element;
		},
		paddingRight: 240,
	});

	const loop3 = horizontalLoop(boxes3, {
		paused: true,
		speed: 3,
		draggable: false,
		center: true,
		onChange: (element, index) => {
			activeElement3 && activeElement3.classList.remove("active");
			element.classList.add("active");
			activeElement3 = element;
		},
		paddingRight: 240,
	});

	let tl = gsap.timeline({ defaults: { duration: 2 } });

	var heroAnimation = () => {
		tl.clear();
		tl.timeScale(1);
		tl.set(".hero .content", { opacity: 0 });
		tl.set(".hero > div", { transform: "translate(-50%, -50%)" });
		tl.set(".hero > div", { top: "50%" });
		tl.to(`.hero > div`, { opacity: 1, delay: 1, duration: 1 });
		tl.to(`.hero > div`, { width: "100vw" });
		tl.to(`.hero > div`, {
			height: "80vh",
		});
		tl.to(
			`.hero > div`,
			{
				top: "0",
				transform: "translate(-50%,0)",
			},
			"-=0.5"
		);
		tl.to(`.hero .media`, { height: "80vh" }, "<");
		tl.to(`.hero`, { height: "100vh" }, "<");
		tl.to(`.hero > div`, { height: "auto" });
		tl.to(".hero .content", { opacity: 1 });
	};

	var repatedActions = (box) => {
		
		loop.pause();
		loop2.pause();
		loop3.pause();
		play = 0;
		$(".hero").empty();
		$(box).clone().appendTo(".hero");
		$(".hero .box").removeAttr("style");
		transformValue1 = 0;
		transformValue2 = 0;
		transformValue3 = 0;

		if ($(box).parents(".wrapper-level1").length) {
			scaleValue1 = 1;
			scaleValue2 = 0.7;
			scaleValue3 = 0.4;
		} else if ($(box).parents(".wrapper-level2").length) {
			scaleValue1 = 5;
			scaleValue2 = 1;
			scaleValue3 = 0.7;
		} else if ($(box).parents(".wrapper-level3").length) {
			scaleValue1 = 8;
			scaleValue2 = 5;
			scaleValue3 = 1;
		}

		$(".carousel").addClass("hero-active");
		tl.play();
		heroAnimation();
	};

	boxes.forEach((box, i) =>
		box.addEventListener("click", () => {
			loop.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
			loop2.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
			loop3.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
			repatedActions(box);
		})
	);

	boxes2.forEach((box, i) =>
		box.addEventListener("click", () => {
			loop.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
			loop2.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
			loop3.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
			repatedActions(box);
		})
	);

	boxes3.forEach((box, i) =>
		box.addEventListener("click", () => {
			loop.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
			loop2.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
			loop3.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
			repatedActions(box);
		})
	);

	window.addEventListener(
		document.body.onpointermove ? "pointermove" : "mousemove",
		(event) => {
			if (play) {
				loop.timeScale(event.pageX / window.innerWidth - 0.5).resume();
				loop2.timeScale(event.pageX / window.innerWidth - 0.5).resume();
				loop3.timeScale(event.pageX / window.innerWidth - 0.5).resume();

				if (event.pageY / window.innerHeight > 0.5) {
					transformValue1 =
						((event.pageY / window.innerHeight) * window.innerHeight) / 2 - 200;
					transformValue2 =
						(((event.pageY / window.innerHeight) * window.innerHeight) / 2 -
							200) *
						0.4;

					transformValue3 =
						(((event.pageY / window.innerHeight) * window.innerHeight) / 2 -
							200) *
						0.8;
				} else {
					transformValue1 =
						(((1 - event.pageY / window.innerHeight) * window.innerHeight) /
							2) *
							-1 +
						200;
					transformValue2 =
						((((1 - event.pageY / window.innerHeight) * window.innerHeight) /
							2) *
							-1 +
							200) *
						0.4;
					transformValue3 =
						((((1 - event.pageY / window.innerHeight) * window.innerHeight) /
							2) *
							-1 +
							200) *
						0.8;
				}
			}
		}
	);

	window.addEventListener("wheel", (event) => {
		if (scroll > 138) {
			scroll = 138;
		} else {
			scroll = scaleValue1 + scroll + event.deltaY;
		}


		scaleValue1 = (scroll * -0.5) / 500 + 1;
		scaleValue2 = (scroll * -0.1) / 500 + 0.8;
		scaleValue3 = (scroll * -0.05) / 500 + 0.5;


		if (scaleValue1 < 1) {
			138;
			scaleValue1 = 1;
		}
	});

	function transformFunction() {
		wrapper.css(
			"transform",
			`scale(${scaleValue1}) translate3d(0, ${transformValue1}px ,0)`
		);

		wrapper2.css(
			"transform",
			`scale(${scaleValue2}) translate3d(0, ${transformValue2}px, 0)`
		);

		wrapper3.css(
			"transform",
			`scale(${scaleValue3}) translate3d(0, ${transformValue3}px, 0)`
		);

		if (scaleValue1 <= 3) {
			wrapper.find(".media").css("opacity", "1");
			wrapper2.find(".media").css("opacity", "0.5");
			wrapper3.find(".media").css("opacity", "0.2");

			wrapper.css("opacity", "1");
			wrapper2.css("opacity", "1");
			wrapper3.css("opacity", "1");
			
			boxes.css("pointer-events", "all");
			boxes2.css("pointer-events", "all");
		} else if (scaleValue1 > 3 && scaleValue1 < 7) {
			wrapper.find(".media").css("opacity", "0");
			wrapper2.find(".media").css("opacity", "1");
			wrapper3.find(".media").css("opacity", "0.5");

			wrapper.css("opacity", "0");
			wrapper2.css("opacity", "1");
			wrapper3.css("opacity", "1");

			boxes.css("pointer-events", "none");
			boxes2.css("pointer-events", "all");
		} else if (scaleValue1 >= 7) {
			wrapper.css("opacity", "0");
			wrapper2.css("opacity", "0");
			wrapper3.css("opacity", "1");

			wrapper.find(".media").css("opacity", "0");
			wrapper2.find(".media").css("opacity", "0");
			wrapper3.find(".media").css("opacity", "1");

			boxes.css("pointer-events", "none");
			boxes2.css("pointer-events", "none");
		}

		setTimeout(transformFunction, 200);
	}

	transformFunction();

	$("#close").click(function () {
		tl.timeScale(3).reverse();
		$(".carousel").removeClass("hero-active");
		play = 1;
	});
}
export default slider3d;
