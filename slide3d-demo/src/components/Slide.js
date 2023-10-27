import React, { Component } from "react";

function Slide({ level, id, children, onClick, opacity }) {

	const style = {
		opacity: opacity,
		pointerEvents: opacity?"all":"none",
		
	};


	let className = `box box-level${level}`;
	return <div className={className} id={id}  onClick={onClick} >{children}</div>;
}

export default Slide; // Don’t forget to use export default!
