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
import Layout from './layout';
import StateProvider from './StateProvider/StateProvider';

import './bs/css/bootstrap.min.css';
import './bs/css/custom.css';
import './bs/js/bootstrap.bundle.min.js';

const App = () => {

  return (
    <StateProvider>
      <Router>
        <div>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/Registration" component={Registration} />
              <Route path="/listing" component={Filter}/>
              <Route path="/listings" component={Listings} />
              <Route path="/create-listing" component={CreateListingPage}/>
              <Route path="/list/:id" component={Details}/>
            </Switch>
          </Layout>
        </div>
      </Router >
    </StateProvider>
  );
};

export default App;
