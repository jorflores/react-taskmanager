import React from "react";

const Card = (props) => {
  const classes = props.className;
  return(

  <div className={classes}>
    <div className="row">{props.children}</div>
  </div>
  )
};




export default Card;
