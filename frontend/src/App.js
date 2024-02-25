import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/RegisterForm';
import Filter from "./components/Filter";
import Listings from './components/Listings';
import CreateListingPage from './components/CreateListingPage';

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
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/filter">Filter</Link>
            </li>
            <li>
              <Link to="/listings">Listings</Link>
            </li>
            <li>
              <Link to="/create-listing">Create Listing</Link>
            </li>
          </ul>
        </nav>

        <hr />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/filter" component={Filter} />
          <Route path="/listings" component={Listings} />
          <Route path="/create-listing" component={CreateListingPage}/>
        </Switch>
      </div>
    </Router >
  );
};

export default App;
