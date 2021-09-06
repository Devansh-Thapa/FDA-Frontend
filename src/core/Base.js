import React from "react";
import Nav from "./nav";

const Base = ({
  title = "",
  description = "",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Nav />
      <div className="coantainer-fluid">
        <div className="jombotron bg-dark text-white text-center">
          {/* <h2 className="display-4">{title}</h2> */}
          {/* <p className="lead">{description}</p> */}
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Base;
