import React from "react";

export default function SideBarPartial(props) {
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
        <ul className="list-group nav list-group-flush">{props.children}</ul>
      </div>
    </div>
  );
}
