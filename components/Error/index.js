import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { ic_arrow_right_alt } from "react-icons-kit/md/ic_arrow_right_alt";
import "./styles.scss";

const Error = (props) => {
  return (
    <div className="errors-wrapper">
      <div className="error">
        <h3>Whoops...</h3>
        <p>Something went very wrong....</p>
        <Link to="/">
          <div className="button" onClick={props.handleError}>
            Back <Icon icon={ic_arrow_right_alt} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Error;
