import React, { Component } from 'react';
import withLocale from 'hoc/withLocale';
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
                src="/images/takapic-logo/CL h small.png"
                alt=""
              />
              <br />
              <br />
              <select
                value={this.props.currentLocale}
                onChange={this.onLanguageChange}
                className="selectpicker margin-bottom-10"
              >
                <option value="en-US">English</option>
                <option value="id-ID">Mandarin</option>
              </select>
              <select className="selectpicker hide">
                <option>Dollar</option>
                <option>Rupiah</option>
              </select>
              <div>
                <a href="https://www.algolia.com/">
                  <img
                      style={{height: '17px'}}
                    className="footer-logo"
                    src="/images/search-by-algolia.png"
                    alt=""
                    target="_blank"
                  />
                </a>
              </div>
            </div>
            <div className="col-sm-5 margin-bottom-30">
              <h4>TakaPic</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">How it Works</Link>
                </li>
                <li>
                  <Link to="/">Packages</Link>
                </li>
                <li>
                  <Link to="/">FAQs</Link>
                </li>
                <li>
                  <Link to="/">Privacy Policy</Link>
                </li>
              </ul>
              <ul className="footer-links">
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">How it Works</Link>
                </li>
                <li>
                  <Link to="/">Packages</Link>
                </li>
                <li>
                  <Link to="/">FAQs</Link>
                </li>
                <li>
                  <Link to="/">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h4>Contact Us</h4>
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
              <div className="copyrights">
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
