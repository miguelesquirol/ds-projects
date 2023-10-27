import React from 'react';

const Card = (props) => {
  let spinalCase = (str) => {
    return str
      .split(" ")
      .map((c) => c.toLowerCase())
      .join("-");
  };

  const bodyCSS = {
    height: `${props.d.height - 4}px`,
  };
  return (
    <>
      <div
        className={`card ${
          props.d.data.area ? spinalCase(props.d.data.area) : ""
        } ${props.d.data.tag} ${props.d.children ? "expanded" : "collapsed"}`}
        style={bodyCSS}
      >
        <div className="card-header"></div>
        <div className="card-body">
          <div className="member-name"> {props.d.data.name} </div>
          <div className="member-position"> {props.d.data.positionName} </div>
        </div>
      </div>
    </>
  );
};
export default Card;
