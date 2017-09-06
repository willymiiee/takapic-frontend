import React from 'react';

const Footer = () => (
  <div id="footer" className="sticky-footer">
    {/*<!-- Main -->*/}
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <img className="footer-logo" src="images/takapic-logo.png" alt="" />
          <br />
          <br />
          <p>
            Capture every precious moment with TakaPic. TakaPic makes it easy
            for you to book professional photographer
          </p>
          <select className="form-control takapic-chooser">
            <option>English</option>
            <option>B. Indonesia</option>
          </select>
          <select className="form-control takapic-chooser">
            <option>Dolar</option>
            <option>Rupiah</option>
          </select>
        </div>

        <div className="col-md-8 col-sm-12 ">
          <div className="col-sm-4">
            <h4>Takapic</h4>
            <ul className="footer-links-takapic">
              <li>
                <a>About Us</a>
              </li>
              <li>
                <a>Careers</a>
              </li>
              <li>
                <a>Press</a>
              </li>
              <li>
                <a>Privacy Policy</a>
              </li>
              <li>
                <a>Help</a>
              </li>
              <li>
                <a>Diversity &amp; Belonging</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-4">
            <h4>Discover</h4>
            <ul className="footer-links-takapic">
              <li>
                <a>Trust &amp; Safety</a>
              </li>
              <li>
                <a>Gift</a>
              </li>
              <li>
                <a>Our Partners</a>
              </li>
              <li>
                <a>Guidebook</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-4">
            <h4>Hosting</h4>
            <ul className="footer-links-takapic">
              <li>
                <a>Why Host</a>
              </li>
              <li>
                <a>Hospitality</a>
              </li>
              <li>
                <a>Responsible Hosting</a>
              </li>
              <li>
                <a>Commnity Center</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/*<!-- Copyright -->*/}
      <div className="row">
        <div className="col-md-12">
          <div className="copyrights">© 2017 Takapic. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
