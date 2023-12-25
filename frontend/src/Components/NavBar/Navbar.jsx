import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";

const Navbar = (props) => {
  return (
    <div className='navbar-container'>
      <div className='navbar'>
        <Link to="/" className="navbar-title">
          D<span className='navbar-subtitle'>Repo</span>
        </Link>
      </div>

      {props.searchBar ?
        <div className="search-bar">
          <input placeholder='Type / to search for user' id='inp'/>
          <img src="logo512.png" alt="" id='avatar'/>
        </div>
        : <div className='empty-div'></div>
      }
    </div>
  )
}

export default Navbar