import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Filter from "./components/Filter/Filter";
import Listings from './components/Listings';
import CreateListingPage from './components/CreateListingPage';
import Details from './components/Details';

import './bs/css/bootstrap.min.css';
import './bs/css/custom.css';
import './bs/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/Registration">Registration</Link>
            </li>
            <li>
              <Link to="/listing">Filter</Link>
            </li>
            <li>
              <Link to="/listings">Listings</Link>
            </li>
            <li>
              <Link to="/create-listing">Create Listing</Link>
            </li>
            <li>
              <Link to="/list/65bfafc116524254cd07f34b">Example Listing Details</Link>
            </li>
          </ul>
        </nav>

        <hr />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/Registration" component={Registration} />
          <Route path="/listing" component={Filter}/>
          <Route path="/listings" component={Listings} />
          <Route path="/create-listing" component={CreateListingPage}/>
          <Route path="/list/:id" component={Details}/>
        </Switch>
      </div>
    </Router >
  );
};

export default App;
