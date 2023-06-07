import React from "react";
import { Link } from "react-router-dom";
const BadConnection = () => {
  return (
    <div className="bad-connection">
      <h3> Kindly check your internet connection and reload the page</h3>
      <p>
        Click the <Link to="/">link</Link> to refresh
      </p>
    </div>
  );
};

export default BadConnection;
