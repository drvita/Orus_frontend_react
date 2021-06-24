import React from "react";

const CardMenuComponent = (props) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">
          <i
            className={
              props.icon
                ? "mr-2 fas fa-" + props.icon
                : "mr-2 fas fa-ellipsis-v"
            }
          ></i>
          {props.title ?? "Menu"}
        </h5>
      </div>
      <div className="card-body p-0">
        <ul className="nav nav-pills flex-column">{props.children}</ul>
      </div>
    </div>
  );
};

export default CardMenuComponent;
