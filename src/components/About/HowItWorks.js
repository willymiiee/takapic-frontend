import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import cloudinary from 'cloudinary-core';

import Page from '../Page';

class HowItWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchState: true,
      matchState: false,
      bookState: false,
      selectState: false
    };
    this.searchClick = this.searchClick.bind(this);
    this.bookClick = this.bookClick.bind(this);
    this.matchClick = this.matchClick.bind(this);
    this.selectClick = this.selectClick.bind(this);

    this.cloudinaryInstance = cloudinary.Cloudinary.new({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      secure: true
    });

  }

  componentWillUnmount() {
    this.cloudinaryInstance = null;
  }

  searchClick() {
    this.setState({searchState: true});
    this.setState({matchState: false});
    this.setState({bookState: false});
    this.setState({selectState: false});
  }

  bookClick() {
    this.setState({searchState: false});
    this.setState({matchState: false});
    this.setState({bookState: true});
    this.setState({selectState: false});
  }

  matchClick() {
    this.setState({searchState: false});
    this.setState({matchState: true});
    this.setState({bookState: false});
    this.setState({selectState: false});
  }

  selectClick() {
    this.setState({searchState: false});
    this.setState({matchState: false});
    this.setState({bookState: false});
    this.setState({selectState: true});
  }


  render() {
    return (
      <Page>
        <div className="container" style={{marginTop: '50px'}}>
          <div className="panel setup-content no-box-shadow">
            <div className="panel-body" style={{padding: '0px'}}>
              <h2 style={{textAlign: "center"}}>How It Works</h2>
              <hr/>

              <div className="row" style={{position:'relative', paddingLeft:'15px',paddingRight:'15px'}}>
                <div className="col-sm-3 how-it-works-icon" onClick={this.searchClick}>
                  <div className="icon-box-2">
                    <i className="im im-icon-Location-2"/>
                    <h3>1. Search</h3>
                  </div>
                  <div className={this.state.searchState ? "row how-it-works" : "row how-it-works how-it-works-hide"} id="search">
                    <div className="col-sm-4">
                      <span className="">"Search for a Takapic local photographer by where and when you want to go"</span>
                    </div>
                    <div className="col-sm-8" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                      <img
                        className="image-responsive"
                        src={this.cloudinaryInstance.url('assets/search', { width: 800, crop: 'scale', quality: 'auto:best' })}
                        alt="This is an alt text with meaning full explanation"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 how-it-works-icon" onClick={this.matchClick}>
                  <div className="icon-box-2">
                    <i className="im im-icon-Handshake"/>
                    <h3>2. Match</h3>
                  </div>
                  <div className={this.state.matchState ? "row how-it-works" : "row how-it-works how-it-works-hide"} id="match">
                    <div className="col-sm-4">
                      <span className="">"View available photographers’ style and photos and choose one that you like at a price that suits you"</span>
                    </div>
                    <div className="col-sm-8" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                      <img
                        className="image-responsive"
                        src={this.cloudinaryInstance.url('assets/match', { width: 800, crop: 'scale', quality: 'auto:best' })}
                        alt="This is an alt text with meaning full explanation"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 how-it-works-icon" onClick={this.bookClick}>
                  <div className="icon-box-2">
                    <i className="im im-icon-Calendar-4"/>
                    <h3>3. Book</h3>
                  </div>
                  <div className={this.state.bookState ? "row how-it-works" : "row how-it-works how-it-works-hide"} id="book">
                    <div className="col-sm-4">
                      <span className="">"Request to book the photographer, confirm shoot times and meet up place, and pay it all through Takapic’s secure platform"</span>
                    </div>
                    <div className="col-sm-8" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                      <img
                        className="image-responsive"
                        src={this.cloudinaryInstance.url('assets/book', { width: 800, crop: 'scale', quality: 'auto:best' })}
                        alt="This is an alt text with meaning full explanation"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 how-it-works-icon" onClick={this.selectClick}>
                  <div className="icon-box-2">
                    <i className="im im-icon-Sharethis"/>
                    <h3>4. Share</h3>
                  </div>
                  <div className={this.state.selectState ? "row how-it-works" : "row how-it-works how-it-works-hide"} id="select">
                    <div className="col-sm-4">
                      <span className="">"Within 48 hours of your photoshoot, you can view the photos on your personal Takapic online gallery which you can download to keep or share on social media"</span>
                    </div>
                    <div className="col-sm-8" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                      <img
                        className="image-responsive"
                        src={this.cloudinaryInstance.url('assets/select', { width: 800, crop: 'scale', quality: 'auto:best' })}
                        alt="This is an alt text with meaning full explanation"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="how-it-works-book">
                <Link
                  to="/search/?destination=&date="
                  className="button button-white"
                >Book Now
                </Link>
              </div>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe title="Video promo" className="embed-responsive-item" src="https://www.youtube.com/embed/Yy-9EVSWsSg"/>
              </div>

            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default HowItWorks;
