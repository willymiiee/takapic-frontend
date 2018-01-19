import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import fbpx from '../fbpixel';

fbpx.init();
GoogleAnalytics.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);

const withGATracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    GoogleAnalytics.set({
      page,
      ...options
    });
    GoogleAnalytics.pageview(page);
    fbpx.pageTrack();
  };

  const HoC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname + this.props.location.search;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HoC;
};

export default withGATracker;
