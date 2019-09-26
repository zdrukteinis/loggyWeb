import React from "react";
import errorImage from "../images/error.png";
const Error = props => {
  return (
    <div className="Error">
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4">
          <div className="mt-5 text-center">
            <p>
              <img src={errorImage} alt="error" />
            </p>
            <code>{props.error.errorMessage}</code>
          </div>
        </div>
        <div className="col-md-4" />
      </div>
    </div>
  );
};

export default Error;
