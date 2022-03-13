import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <Link className="navbar-brand ms-2" to="/">
        CRUD Nodejs-Mongo-React
      </Link>
      <Link className="navbar-brand ms-2" to="/">
        <button type="button" className="btn btn-link">
          Logoff
        </button>
      </Link>
    </nav>
  );
};

export default Navigation;
