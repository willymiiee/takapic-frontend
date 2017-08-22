import React, {Component} from 'react';

class Footer extends Component{
  constructor(props){
    super(props);
    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  onLanguageChange(event){
    let val = event.target.value;
    this.props.onLanguageChange(val);
  }

  render(){
    return(
      <div id="footer" className="margin-top-65">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 margin-bottom-30">
              <img className="footer-logo" src="/images/takapic-logo/CL h small.png" alt="" />
              <br /><br />
              <select value={this.props.currentLocale} onChange={this.onLanguageChange} className="selectpicker margin-bottom-10">
                <option value="en-US">English</option>
                <option value="id-ID">Indonesia</option>
              </select>
              <select className="selectpicker">
                <option>Dollar</option>
                <option>Rupiah</option>
              </select>
            </div>
            <div className="col-sm-5 margin-bottom-30">
              <h4>TakaPic</h4>
              <ul className="footer-links">
                <li><a href="">About Us</a></li>
                <li><a href="">How it Works</a></li>
                <li><a href="">Packages</a></li>
                <li><a href="">FAQs</a></li>
                <li><a href="">Privacy Policy</a></li>
              </ul><ul className="footer-links">
                <li><a href="">About Us</a></li>
                <li><a href="">How it Works</a></li>
                <li><a href="">Packages</a></li>
                <li><a href="">FAQs</a></li>
                <li><a href="">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h4>Contact Us</h4>
              <div id="footer-social">
                <a href=""><i className="fa fa-facebook-official"></i></a>
                <a href=""><i className="fa fa-instagram"></i></a>
                <a href=""><i className="fa fa-weibo"></i></a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="copyrights">© 2017 Takapic. All Rights Reserved.</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;