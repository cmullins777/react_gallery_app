import React from 'react';
import { NavLink } from 'react-router-dom';

// Navigation buttons for 3 image selections
const Nav = () => {
  return (
    <nav className="main-nav">
      <ul >
        <li><NavLink to='/penguins'>Penguins</NavLink></li>
        <li><NavLink to='/dolphins'>Dolphins</NavLink></li>
        <li><NavLink to='/puffins'>Puffins</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
