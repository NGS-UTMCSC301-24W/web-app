import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/RegisterForm';
import Filter from "./components/Filter";
import Listings from './components/Listings';

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
              <Link to="/filter">Filter</Link>
            </li>
            <li>
              <Link to="/listings">Listings</Link>
            </li>
          </ul>
        </nav>

        <hr />
        <switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/filter" component={Filter}/>
          <Route path="/listings" component={Listings}/>
        </switch>
      </div>
    </Router>
  );
};

export default App;
