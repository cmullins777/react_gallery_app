import React from 'react';
import { NavLink } from 'react-router-dom';


// Header with app title, search bar
const Header = () => {
  return (
    <header className="main-nav">
        <ul>
          <li><NavLink to='/penguins'>Penguins</NavLink></li>
          <li><NavLink to='/dolphins'>Dolphins</NavLink></li>
          <li><NavLink to='/puffins'>Puffins</NavLink></li>
        </ul>
    </header>
  );
}

export default Header;
