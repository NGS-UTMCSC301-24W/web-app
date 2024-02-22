import React from 'react';

const PrivacyTermsSection = () => (
  <section className="col-md-6 col-sm-12 px-2">
    <h5>Privacy & Terms</h5>
  </section>
);

const ContactSection = () => (
  <section className="col-md-6 col-sm-12 px-2">
    <h5>Contact</h5>
  </section>
);

const FollowUsSection = () => (
  <div className="mt-2 bg-utm-dark-blue container-fluid py-3">
    <section className="align-content-center text-center py-2">
      <h4>Follow Uhome</h4>
      <ul className="list-unstyled">
        <li className="list-inline-item">Instagram</li>
        <li className="list-inline-item">Twitter</li>
        <li className="list-inline-item">YouTube</li>
        <li className="list-inline-item">More Social Media</li>
      </ul>
    </section>
  </div>
);

const Footer = () => (
  <footer className="mt-5 bg-primary" style={{ marginBottom: 0 }}>
    <div className="container row px-4 py-4">
      <PrivacyTermsSection />
      <ContactSection />
    </div>
    <FollowUsSection />
  </footer>
);

export default Footer;