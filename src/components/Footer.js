import React, { Component } from 'react';
import withLocale from '../hoc/withLocale';
import { Link } from 'react-router-dom';

class Footer extends Component {
  onLanguageChange = event => {
    let val = event.target.value;
    this.props.onLanguageChange(val);
  };

  render() {
    return (
      <div id="footer" className="margin-top-65">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 margin-bottom-30">
              <img
                className="footer-logo"
                src="https://res.cloudinary.com/debraf3cg/image/upload/v1515688718/assets/CL_h_small.png"
                alt=""
                style={{width:'130px',height:'auto'}}
              />

              <br />
              <br />

              <select
                value={this.props.currentLocale}
                onChange={this.onLanguageChange}
                className="selectpicker margin-bottom-10 footer-change-language"
              >
                <option value="en-US">English</option>
                <option value="id-ID">Mandarin</option>
              </select>

              <select className="selectpicker hide">
                <option>Dollar</option>
                <option>Rupiah</option>
              </select>

              <div>
                <a href="https://www.algolia.com/" target="_blank" rel="noopener noreferrer">
                  <img
                    style={{height: '17px'}}
                    className="footer-logo"
                    src="https://res.cloudinary.com/debraf3cg/image/upload/v1514881409/assets/search-by-algolia.png"
                    alt=""
                  />
                </a>
              </div>
            </div>

            <div className="col-sm-5 col-sm-offset-1 margin-bottom-30">
              <h4>Takapic</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/how-it-works">How it Works</Link>
                </li>
                <li>
                  <Link to="/packages">Packages</Link>
                </li>
                <li>
                  <Link to="/photographer-faq">Photographer FAQs</Link>
                </li>
                <li>
                  <Link to="/traveller-faq">Traveller FAQs</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div className="col-sm-2">
              <div id="footer-social">
                <Link to="/">
                  <i className="fa fa-facebook-official" />
                </Link>
                <Link to="/">
                  <i className="fa fa-instagram" />
                </Link>
                <Link to="/">
                  <i className="fa fa-weibo" />
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="copyrights" style={{fontSize:'14px'}}>
                © 2017 Takapic. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withLocale(Footer);
