import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Login from './components/Login';
import Registration from './components/Registration';
import Filter from "./components/Filter/Filter";
import Listings from './components/Home';
import CreateListingPage from './components/CreateListingPage';
import Details from './components/ExampleListing/Details.js';
import DiscussionBoard from './components/DiscussionBoard';
import UpsertPost from './components/DiscussionBoard/UpsertPost.js';
import Post from './components/DiscussionBoard/PostDetails.js';
import Layout from './layout';
import SearchResults from './components/Search/SearchResults';
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
            {<Route path="/" exact component={Listings} /> }
            <Route path="/login" component={Login} />
            <Route path="/Registration" component={Registration} />
            <Route path="/listing" component={Filter}/>
            <Route path="/listings" exact component={Listings} />
            <Route path="/create-listing" component={CreateListingPage}/>
            <Route path="/discussion-board" exact component={DiscussionBoard}/>
            <Route path="/discussion-board/new" exact component={UpsertPost}/>
            <Route path="/discussion-board/edit/:id" exact component={UpsertPost}/>
            <Route path="/discussion-board/:id" exact component={Post}/>
            <Route path="/list/:id" component={Details}/>
            <Route path="/search-results" exact component={SearchResults} />
          </Switch>
        </Layout>
        
      </div>
    </Router >
    </StateProvider>
  );
};

export default App;
