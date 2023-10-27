import Slide from "./Slide";
import React from "react";
import { gsap } from "gsap";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import horizontalLoop from "../assets/js/horizontalloop";

function Carousel({ level, mousePos, setIsPlay, isPlay, zoomLevel, yTransfrom }) {
	const arr = ["box1", "box2", "box3", "box4", "box5", "box6", "box7"];

	const [itemIndex, setitemIndex] = useState(0);
	const [zoom, setZoom] = useState(0);
	
	const app = useRef();
	const loop = useRef();

	let activeElement;

	const handleClick = (e, key) => {
		console.log("click");
		setitemIndex(key);
		setIsPlay(false);
		setZoom(1);
		console.log("setzoom", 1);
	};



	useLayoutEffect(() => {
		const boxes = gsap.utils.toArray(`.box-level${level}`);

		let ctx = gsap.context(() => {
			loop.current = horizontalLoop(boxes, {
				paused: true,
				speed: 10,
				draggable: false,
				center: true,
				repeat: -1,
				onChange: (element, index) => {
					activeElement && activeElement.classList.remove("active");
					element.classList.add("active");
					activeElement = element;
				},
				paddingRight: 240,
			});
		}, app);

		return () => ctx.revert();
	}, []);



	useEffect(() => {
		if (isPlay) {
			loop.current.timeScale(mousePos.x / window.innerWidth - 0.5).resume();
		}
		else {
			loop.current.pause();
		}

	});



	useEffect(() => {
		loop.current.toIndex(itemIndex, { duration: 0.8, ease: "power1.inOut" });
	}, [itemIndex]);

	let className = `wrapper wrapper-level${level}`;


	const style = {
		transform: `scale(${zoom?"1":(zoomLevel * 1/level + 1/level) })  translate3d(0, ${yTransfrom}px, 0)`,
	};


	return (
		<div ref={app} className={className} style={style}>
			{arr.map((element, key) => (
				<Slide
					level={level}
					id={`level-${level}-slide1`}
					key={key}
					onClick={(e) => handleClick(e, key)}
				>
					{element}
				</Slide>
			))}
		</div>
	);
}

export default Carousel; // Don’t forget to use export default!
