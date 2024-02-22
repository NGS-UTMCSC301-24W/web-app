import React from 'react';
import Nav from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;