import React from "react";
import robot from "../images/robot.svg";
const Success = props => {
  return (
    <div className="Success">
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4">
          <div className="mt-5 text-center">
            <p>
              <img src={robot} alt="success" />
            </p>
            <code>{props.success.successMessage}</code>
          </div>
        </div>
        <div className="col-md-4" />
      </div>
    </div>
  );
};

export default Success;
