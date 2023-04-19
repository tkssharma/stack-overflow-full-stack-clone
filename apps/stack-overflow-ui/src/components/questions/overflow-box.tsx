import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import "./css/OverflowBox.css";
import { selectUser } from "../../features/user.slice";

function QuoraBox() {
  const user = useSelector(selectUser);
  return (
    <div className="overflowBox">
      <div className="overflowBox__info">
        <Avatar src={user?.photo} />
      </div>
      <div className="overflowBox__overflow">
        <h5>What is your question or link?</h5>
      </div>
    </div>
  );
}

export default QuoraBox;
