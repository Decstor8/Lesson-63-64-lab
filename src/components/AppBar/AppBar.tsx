import React from 'react';
import { NavLink } from 'react-router-dom';

const AppBar: React.FC = () => {
  return (

    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <a href='#' className='main-title-text text-decoration-none text-black fw-bold text-uppercase'>Posts</a>
          <ul className="navbar-nav flex-row gap-3">
            <li className="nav-item">
              <NavLink to="/" className="nav-link active">
                Домашняя страница
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/new-post" className="nav-link active">
                Add
              </NavLink>
            </li>
          </ul>
      </div>
    </nav>

);
};

export default AppBar;
