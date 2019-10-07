import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.scss";

const Menu = () => (
  <nav className="nav">
    <ul className="menu">
      <li className="menu__item">
        <NavLink
          to="/dashboard"
          className="menu__link"
          activeClassName="menu__link--active"
        >
          Inicio
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink
          to="/cobros"
          className="menu__link"
          activeClassName="menu__link--active"
        >
          Cobros Juridicos
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Menu;
