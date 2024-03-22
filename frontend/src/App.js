import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
import useSharedState from './StateProvider/useSharedState';

import './bs/css/bootstrap.min.css';
import './bs/css/custom.css';
import './bs/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <StateProvider>
        <Main />
    </StateProvider>
  );
};

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { sharedState } = useSharedState();
  return (
    <Route {...rest} render={(props) => (
      sharedState.isLoggedIn ? (
        !allowedRoles || allowedRoles.includes(sharedState.role)
          ? <Component {...props} />
          : <Redirect to="/" /> // Redirect user to home page or another appropriate page
      ) : (
        <Redirect to="/login" />
      )
    )} />
  );
};

const AuthRoute = ({ component: Component, ...rest }) => {
  const { sharedState } = useSharedState();
  return (
    <Route {...rest} render={(props) => (
      sharedState.isLoggedIn
        ? <Redirect to="/" /> // Redirect logged-in users to home page
        : <Component {...props} />
    )} />
  );
};

const Main = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <PrivateRoute path="/create-listing" component={CreateListingPage} allowedRoles={['landlord']} />
          <Route path="/" exact component={Listings} />
          <PrivateRoute path="/listing" component={Filter} />
          <PrivateRoute path="/listings" exact component={Listings} />
          <PrivateRoute path="/discussion-board" exact component={DiscussionBoard} />
          <PrivateRoute path="/discussion-board/new" exact component={UpsertPost} />
          <PrivateRoute path="/discussion-board/edit/:id" exact component={UpsertPost} />
          <PrivateRoute path="/discussion-board/:id" exact component={Post} />
          <PrivateRoute path="/list/:id" component={Details} />
          <PrivateRoute path="/search-results" exact component={SearchResults} />
          <PrivateRoute path="/profile/:username?" exact component={profile} />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/registration" component={Registration} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
