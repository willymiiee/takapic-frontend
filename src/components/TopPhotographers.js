import React, { Component } from 'react';
import TopPhotographerSingle from './TopPhotographerSingle';

class TopPhotographers extends Component {
  componentDidMount() {
    window.$('#photographer-list').slick({
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 481,
          settings: {
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    });
  }

  render() {
    const { topPhotographers } = this.props;
    return (
      <div id="photographer-list" className="profile-list" style={{marginBottom:'0px'}}>
        {
          topPhotographers &&
          topPhotographers.map((item, index) => <TopPhotographerSingle key={`top-photographer-${index}`} item={item}/>)
        }
      </div>
    );
  }
}

export default TopPhotographers;
