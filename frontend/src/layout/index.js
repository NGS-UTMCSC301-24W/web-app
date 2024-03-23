import React from 'react';
import Nav from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div style={{ flex: 1, padding: '0', margin: '0' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;