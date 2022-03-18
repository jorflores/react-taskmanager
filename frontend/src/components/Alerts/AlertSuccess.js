import React from "react";
import { Alert } from "reactstrap";

const AlertSuccess = (props) => {

  return(
    <div className= {props.isVisible? 'center' : ''}>
    <Alert color="success" isOpen={props.isVisible} >
    Task added!
  </Alert>
    </div>

  )
};




export default AlertSuccess;
