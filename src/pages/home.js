import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopPhotographer from 'components/TopPhotographer';
import Page from 'components/Page';
import DateTime from 'react-datetime';
import moment from 'moment';

import axios from 'axios';
import Autocomplete from 'react-autocomplete';

import intl from 'react-intl-universal';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        destination: '',
        date: '',
      },
      cities: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSearchChange(key, event) {
    let value = '';
    if (key === 'date') {
      value = event.format('MM-DD-YYYY');
    } else {
      value = event.target.value;
    }

    this.setState({
      search: Object.assign({}, this.state.search, { [key]: value }),
    });
  }

  handleSubmit(e) {
    let { destination, date } = this.state.search;
    e.preventDefault();
    this.props.history.push({
      pathname: '/search/',
      search: 'destination=' + destination + '&date=' + date,
      state: {
        referrer: '/',
        search: this.state.search,
      },
    });
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  componentDidMount() {
    var bgSlide = window.$('#bg-slide');

    window.$('.search-toggle').click(function() {
      window.$('#landing-page-search').slideToggle();
    });

    setInterval(function() {
      window.$('#bg-slide > img:first').appendTo(bgSlide);
    }, 6000);
  }

  render() {
    let yesterday = moment().subtract(1, 'day');
    let valid = function(current) {
      return current.isAfter(yesterday);
    };
    return (
      <Page>
        <div id="bg-slide">
          <img src="/images/insung-yoon-259475.jpg" alt="" />
          <img src="/images/hero_1.jpg" alt="" />
          <img src="/images/hero_2.jpg" alt="" />
        </div>
        <div className="container">
          <div id="landing-page-top">
            <img src="/images/takapic-logo/CL small w.png" alt="" />
            <h1>{intl.get('TAGLINE')}</h1>
            <p>{intl.get('SUBHEADER')}</p>
            <div id="landing-page-search">
              <span>
                <i className="fa fa-chevron-up search-toggle" />
                <a href="">Clear all</a>
              </span>
              <Autocomplete
                inputProps={{ placeholder: 'Destination' }}
                items={this.state.cities}
                menuStyle={{
                  borderRadius: '3px',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                  background: 'white',
                  padding: '2px 0',
                  position: 'fixed',
                  overflow: 'auto',
                  maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
                  color: '#333',
                }}
                getItemValue={item => item}
                renderItem={(item, highlighted) => (
                  <div
                    style={{
                      backgroundColor: highlighted ? '#eee' : 'transparent',
                      padding: '2px 6px',
                      fontSize: '14px',
                    }}
                  >
                    {item}
                  </div>
                )}
                value={this.state.search.destination}
                onChange={e => {
                  this.setState({
                    search: Object.assign({}, this.state.search, {
                      destination: e.target.value,
                    }),
                  });
                  axios
                    .get('/tes/cities.json')
                    .then(res => {
                      let cities = res.data.cities;
                      this.setState({ cities });
                    })
                    .catch(error => console.log(error));
                }}
                onSelect={value => {
                  this.setState({
                    search: Object.assign({}, this.state.search, {
                      destination: value,
                    }),
                  });
                }}
                wrapperStyle={{}}
              />
              <DateTime
                value={this.state.search.date}
                onChange={this.onSearchChange.bind(this, 'date')}
                inputProps={{ placeholder: 'Date' }}
                timeFormat={false}
                dateFormat="MM-DD-YYYY"
                isValidDate={valid}
              />
              <button className="button" onClick={this.handleSubmit}>
                <i className="fa fa-search" />
                <span>Search</span>
              </button>
            </div>
          </div>
          <h1 className="title margin-bottom-40">Featured Destination Here</h1>
          <div className="text-right margin-bottom-10">
            <Link to="">See All</Link>
          </div>
          <div className="row posters">
            <div className="col-xs-4">
              <a className="poster" href="">
                <div className="text">BALI</div>
                <img src="images/location/bali.jpg" alt="" />
              </a>
            </div>
            <div className="col-xs-4">
              <a className="poster" href="">
                <div className="text">SEOUL</div>
                <img src="images/location/seoul.jpg" alt="" />
              </a>
            </div>
            <div className="col-xs-4">
              <a className="poster" href="">
                <div className="text">PARIS</div>
                <img src="images/location/paris.jpg" alt="" />
              </a>
            </div>
          </div>

          <h1 className="title margin-bottom-40">Themes</h1>
          <div className="text-right margin-bottom-10">
            <Link to="">See All</Link>
          </div>
          <div className="row posters">
            <div className="col-xs-6 col-sm-4">
              <a className="poster grid" href="">
                <div className="text">FAMILY</div>
                <img src="images/theme/shubham-sharma-224917.jpg" alt="" />
              </a>
            </div>
            <div className="col-xs-6 col-sm-4">
              <a className="poster grid" href="">
                <div className="text">COUPLE</div>
                <img src="images/theme/tord-sollie-865.jpg" alt="" />
              </a>
            </div>
            <div className="col-xs-6 col-sm-4">
              <a className="poster grid" href="">
                <div className="text">OUTDOOR</div>
                <img src="images/theme/chris-herath-182666.jpg" alt="" />
              </a>
            </div>
            <div className="col-xs-6 col-sm-4">
              <a className="poster grid" href="">
                <div className="text">FOOD</div>
                <img src="images/theme/brooke-lark-158022.jpg" alt="" />
              </a>
            </div>
            <div className="col-xs-6 col-sm-4">
              <a className="poster grid" href="">
                <div className="text">WEDDING</div>
                <img src="images/theme/anne-edgar-119371.jpg" alt="" />
              </a>
            </div>
            <div className="col-xs-6 col-sm-4">
              <a className="poster grid" href="">
                <div className="text">PROFILE</div>
                <img src="images/theme/autumn-goodman-242825.jpg" alt="" />
              </a>
            </div>
          </div>

          <h1 className="title margin-bottom-50">Top Photographers</h1>
          <TopPhotographer />

          <h1 className="title">Why be a Takapic traveller?</h1>
          <div className="row icons-container">
            <div className="col-sm-4">
              <div className="icon-box-2 with-line">
                <i className="im im-icon-Map2" />
                <h3>Travel like a local</h3>
                <p>
                  Local photographers will guide you to the best locations in
                  their city so you will not feel like a tourist
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="icon-box-2 with-line">
                <i className="im im-icon-Camera-5" />
                <h3>Capture your precious moments</h3>
                <p>
                  Forget about selfies and photos taken by random strangers. You
                  will be in the hands of a talented photographer with a
                  creative eye ready to capture your best travel memories
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="icon-box-2">
                <i className="im im-icon-Checked-User" />
                <h3>Trust and Safety</h3>
                <p>
                  Only verified photographers are registered and you can view
                  ratings and reviews left by travellers like you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default Home;
