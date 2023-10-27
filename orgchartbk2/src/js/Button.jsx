/* eslint-disable no-underscore-dangle */
import React from 'react';

function Button(props) {
  const { node } = props;
  const { children } = node;
  return (
    <div className={`expand-button ${children ? 'expanded' : 'collapsed'}`}>

      <span>
        {
          children
            ? <i className="fas fa-angle-up" />
            : <i className="fas fa-angle-down" />
        }
        {node.data._totalSubordinates}
      </span>

    </div>
  );
}

export default Button;
