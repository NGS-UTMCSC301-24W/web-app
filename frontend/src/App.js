import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Filter from "./components/Filter";
import CreateListingPage from './components/CreateListingPage';

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
              <Link to="/filter">Filter</Link>
            </li>
            <li>
              <Link to="/create-listing">Create Listing</Link>
            </li>
          </ul>
        </nav>

        <hr />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/Registration" component={Registration} />
          <Route path="/filter" component={Filter}/>
          <Route path="/create-listing" component={CreateListingPage}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
