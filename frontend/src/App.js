import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import profile from './components/profile';

import './bs/css/bootstrap.min.css';
import './bs/css/custom.css';
import './bs/js/bootstrap.bundle.min.js';

const App = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    
  }, []);

  return (
    <StateProvider>
      <Router>
        <div>
          <Layout>
            <Switch>
              {!isLoggedIn ? (
                <>
                  <Route path="/" exact component={Listings} />
                  <Route path="/profile" component={profile} />
                  <Route path="/listing" component={Filter} />
                  <Route path="/listings" exact component={Listings} />
                  <Route path="/create-listing" component={CreateListingPage} />
                  <Route path="/discussion-board" exact component={DiscussionBoard} />
                  <Route path="/discussion-board/new" exact component={UpsertPost} />
                  <Route path="/discussion-board/edit/:id" exact component={UpsertPost} />
                  <Route path="/discussion-board/:id" exact component={Post} />
                  <Route path="/list/:id" component={Details} />
                  <Route path="/search-results" exact component={SearchResults} />
                </>
              ) : (
                <>
                  <Route path="/" exact component={Listings} />
                  <Route path="/list/:id" component={Details} />
                  <Route path="/login" component={Login} />
                  <Route path="/registration" component={Registration} />
                </>
              )}
            </Switch>
          </Layout>
        </div>
      </Router>
    </StateProvider>
  );
};

export default App;
