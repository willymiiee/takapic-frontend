import React, {Component} from 'react';
import PhotographerPortofolio from 'components/PhotographerPortofolio';

export default class PortofolioContent extends Component {

  componentDidMount() {
    let gallery = window.$('#photographer-portofolio-gallery'),
      footer = window.$('#footer'),
      load = window.$('.load');

    window.$(function () {

      load.click(function () {
        if (window.$(this).hasClass('loading')) return false;
        window.$(this).addClass('loading').html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>');
        // Dummy Request More Photos
        setTimeout(function () {
          var newPhoto = window.$('<div class="grid-item"><div><i class="fa fa-star-o"></i><img src="img/theme/shubham-sharma-224917.jpg"></div></div><div class="grid-item"><div><i class="fa fa-star-o"></i><img src="img/location/paris.jpg"></div></div><div class="grid-item"><div><i class="fa fa-star-o"></i><img src="img/theme/tord-sollie-865.jpg"></div></div><div class="grid-item"><div><i class="fa fa-star-o"></i><img src="img/theme/chris-herath-182666.jpg"></div></div><div class="grid-item"><div><i class="fa fa-star-o"></i><img src="img/theme/brooke-lark-158022.jpg"></div></div><div class="grid-item"><div><i class="fa fa-star-o"></i><img src="img/theme/anne-edgar-119371.jpg"></div></div><div class="grid-item"><div><i class="fa fa-star-o"></i><img src="img/theme/autumn-goodman-242825.jpg"></div></div><div class="grid-item"><div><i class="fa fa-star-o"></i><img src="img/location/bali.jpg"></div></div><div class="grid-item"><div><i class="fa fa-star-o"></i><img src="img/location/seoul.jpg"></div></div>');
          grid.append(newPhoto).masonry('appended', newPhoto);
          load.removeClass('loading').html('Load More');
        }, 750);
      });

      var grid = window.$('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true,
        gutter: '.gutter-sizer',
      });
      grid.on('click', '.grid-item', function () {
        window.$(this).toggleClass('gigante');
        grid.masonry('layout');
      });

    });

  }

  render() {
    return (
      <PhotographerPortofolio>
        <div className="col-sm-9 margin-top-50">
          <div id="photographer-portofolio-gallery" className="photographer-portofolio-container">
            <div className="grid">
              <div className="gutter-sizer"/>
              <div className="grid-item">
                <div>
                  <i className="fa fa-star"/>
                  <img src="/images/photo/01.jpg"/>
                </div>
              </div>
              <div className="grid-item">
                <div>
                  <i className="fa fa-star-o"/>
                  <img src="/images/photo/02.jpg"/>
                </div>
              </div>
              <div className="grid-item">
                <div>
                  <i className="fa fa-star"/>
                  <img src="/images/photo/03.jpg"/>
                </div>
              </div>
              <div className="grid-item">
                <div>
                  <i className="fa fa-star-o"/>
                  <img src="/images/photo/04.jpg"/>
                </div>
              </div>
              <div className="grid-item">
                <div>
                  <i className="fa fa-star-o"/>
                  <img src="/images/photo/05.jpg"/>
                </div>
              </div>
              <div className="grid-item">
                <div>
                  <i className="fa fa-star"/>
                  <img src="/images/photo/06.jpg"/>
                </div>
              </div>
              <div className="grid-item">
                <div>
                  <i className="fa fa-star-o"/>
                  <img src="/images/photo/01.jpg"/>
                </div>
              </div>
              <div className="grid-item">
                <div>
                  <i className="fa fa-star-o"/>
                  <img src="/images/photo/02.jpg"/>
                </div>
              </div>
              <div className="grid-item">
                <div>
                  <i className="fa fa-star-o"/>
                  <img src="/images/photo/03.jpg"/>
                </div>
              </div>
            </div>
            <div className="load">Load More</div>
          </div>
        </div>
      </PhotographerPortofolio>
    )
  }
}
