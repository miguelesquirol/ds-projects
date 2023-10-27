import Carousel from "./components/Carousel";
import "./App.scss";
import { useRef, useState, useEffect } from "react";

function App() {
	const app = useRef();
	const [mousePos, setMousePos] = useState({});
	const [wheelPos, setWheelPos] = useState(1);
	const [isPlay, setIsPlay] = useState(true);

	let zoom = 1;

	const handleMouseMove = (event) => {
		setMousePos({ x: event.clientX, y: event.clientY });
	};

	const handleWheelMove = (event) => {
		zoom = event.deltaY < 0 ? zoom + 0.2 : zoom - 0.2;
		setWheelPos(zoom);

		if (event.deltaY < 0 && wheelPos >= 0.4) {
			setWheelPos(wheelPos + 0.2);
		}
		else if  (event.deltaY > 0 && wheelPos > 0.4) {
			setWheelPos(wheelPos - 0.2);
		}
		else {
			setWheelPos(0.4);
			
		}
		console.log(wheelPos);

		
	};

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	});

	useEffect(() => {
		window.addEventListener("wheel", handleWheelMove);

		return () => {
			window.removeEventListener("wheel", handleWheelMove);
		};
	});

	return (
		<div ref={app} className="carousel">
			<Carousel
				level="1"
				mousePos={mousePos}
				wheelPos={wheelPos}
				setIsPlay={setIsPlay}
				isPlay={isPlay}
				zoomLevel={wheelPos * 1}
				yTransfrom={3}
			/>
			<Carousel
				level="2"
				mousePos={mousePos}
				wheelPos={wheelPos}
				setIsPlay={setIsPlay}
				isPlay={isPlay}
				zoomLevel={wheelPos * 0.6}
				yTransfrom={3}
			/>

<Carousel
				level="2"
				mousePos={mousePos}
				wheelPos={wheelPos}
				setIsPlay={setIsPlay}
				isPlay={isPlay}
				zoomLevel={wheelPos * 0.05}
				yTransfrom={3}
			/>

			{/* <Carousel level="2" mousePos={mousePos} zoomLevel={wheelPos} setIsPlay={setIsPlay} isPlay={isPlay}/> */}
			{/* <Carousel level="3" mousePos={mousePos} zoomLevel={wheelPos * 0.5} setIsPlay={setIsPlay} isPlay={isPlay}/> */}
		</div>
	);
}

export default App;
