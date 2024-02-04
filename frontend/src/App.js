import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/RegisterForm';
import Filter from "./components/Filter/Filter";
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
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/listing">Filter</Link>
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
          <Route path="/register" component={Register} />
          <Route path="/listing" component={Filter}/>
          <Route path="/create-listing" component={CreateListingPage}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
