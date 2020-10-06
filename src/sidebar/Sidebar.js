import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
export const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar">
        <Link className="sidebar__item" to="/jobs">
          Jobs
        </Link>
        <Link className="sidebar__item" to="/people">
          People
        </Link>
        <Link className="sidebar__item" to="/about">
          About
        </Link>
      </div>
    </Fragment>
  );
};
