import React from 'react';

const Brand = () => (
  <a className="navbar-brand p-4" href="javascript:void(0)">
    Uhome
  </a>
);

const SearchForm = () => (
  <form className="d-flex align-items-center">
    <input className="form-control me-2" type="text" placeholder="Search" />
    <button className="btn btn-primary" type="button">
      Search
    </button>
  </form>
);

const ToggleButton = () => (
  <button
    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#mynavbar"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
);

const NavigationLinks = () => (
  <ul className="navbar-nav me-5">
    <NavItem label="My Account" />
    <NavItem label="Ask" />
    <NavItem label="Rental Information" />
    <NavItem label="Favourites" />
    <NavItem label="UTM" />
  </ul>
);

const NavItem = ({ label }) => (
  <li className="nav-item m-2">
    <a className="nav-link" href="javascript:void(0)">
      <button className="btn btn-primary mt-2">{label}</button>
    </a>
  </li>
);

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
      <Brand />
      <SearchForm />
      <ToggleButton />
      <div className="collapse navbar-collapse justify-content-end" id="mynavbar">
        <NavigationLinks />
      </div>
    </div>
  </nav>
);

export default Nav;
