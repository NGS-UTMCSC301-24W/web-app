import React from 'react';
import Social from "./social";


const FollowUsSection = () => (
  <div className="mt-2 bg-utm-dark-blue container-fluid py-3">
    <section className="align-content-center text-center py-2">
      <Social/>
      <p> UNIVERSITY OF TORONTO - SINCE 1827</p>
    </section>
  </div>
);

const Footer = () => (
  <footer className="mt-5 bg-primary" style={{ marginBottom: 0 }}>
    <div className="container row px-4 py-4">
    </div>
    <FollowUsSection />
  </footer>
);

export default Footer;