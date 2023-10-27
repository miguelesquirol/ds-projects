import React from 'react';

function Card(props) {
  const node = props;
  const spinalCase = (str) => str
    .split(' ')
    .map((c) => c.toLowerCase())
    .join('-');

  const bodyCSS = {
    height: `${node.d.height - 4}px`,
  };
  return (
    <div
      className={`card ${
        node.d.data.area ? spinalCase(node.d.data.area) : ''
      } ${node.d.data.tag} ${node.d.children ? 'expanded' : 'collapsed'}`}
      style={bodyCSS}
    >
      <div className="card-header" />
      <div className="card-body">
        <div className="member-name">
          {node.d.data.name}
        </div>
        <div className="member-position">
          {node.d.data.positionName}
        </div>
      </div>
    </div>
  );
}
export default Card;
