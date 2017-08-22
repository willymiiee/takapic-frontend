import React, { Component } from 'react';
import TopPhotographerSingle from './TopPhotographerSingle';

class TopPhotographer extends Component {
  componentDidMount() {
    window.$('#photographer-list').slick({
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [{
        breakpoint: 481,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }, {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      }]
    });
  }
  render() {
    return (
      <div id="photographer-list" className="profile-list">
        <TopPhotographerSingle
          name="Photographer 1"
          rating={3.5}
          tags={['Wedding', 'Snap']}
          id={1}
          city="London"  
        />
        <TopPhotographerSingle
          name="Photographer 2"
          rating={4.5}
          tags={['Wedding', 'Party']}
          id={2}
          city="New York"
          img="images/photographer/outlook-photography-jobs-2.jpg"
        />
        <TopPhotographerSingle
          name="Photographer 3"
          rating={3.5}
          tags={['Wedding', 'Snap']}
          id={3}
          city="London"  
        />
        <TopPhotographerSingle
          name="Photographer 4"
          rating={4.5}
          tags={['Wedding', 'Party']}
          id={4}
          city="New York"
          img="images/photographer/outlook-photography-jobs-2.jpg"
        />
        <TopPhotographerSingle
          name="Photographer 5"
          rating={3.5}
          tags={['Wedding', 'Snap']}
          id={1}
          city="London"  
        />
        <TopPhotographerSingle
          name="Photographer 6"
          rating={4.5}
          tags={['Wedding', 'Party']}
          id={1}
          city="New York"
          img="images/photographer/outlook-photography-jobs-2.jpg"
        />
        <TopPhotographerSingle
          name="Photographer 7"
          rating={3.5}
          tags={['Wedding', 'Snap']}
          id={1}
          city="London"  
        />
        <TopPhotographerSingle
          name="Photographer 8"
          rating={4.5}
          tags={['Wedding', 'Party']}
          id={1}
          city="New York"
          img="images/photographer/outlook-photography-jobs-2.jpg"
        />
      </div>
    )
  }
}

export default TopPhotographer;