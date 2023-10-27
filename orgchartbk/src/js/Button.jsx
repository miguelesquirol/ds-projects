 import React from 'react';

const Button=(props)=>
{
    let children = props.node.children
    return <div className={`expand-button ${children?"expanded":"collapsed"}`}> <span>{
          children
            ? <i className="fas fa-angle-up"></i>
            : <i className="fas fa-angle-down"></i>
        }
        {props.node.data._totalSubordinates}</span> </div>;
}
 
export default Button;

