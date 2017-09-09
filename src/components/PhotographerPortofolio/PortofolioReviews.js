import React, { Component } from 'react';
import PhotographerPortofolio from 'components/PhotographerPortofolio';

export default class PortofolioReviews extends Component {
  render() {
    return (
      <PhotographerPortofolio>
        <div className="col-sm-9 margin-top-50">
          <div
            id="photographer-portofolio-reviews"
            className="photographer-portofolio-container"
          >
            <div>
              <div>
                <div className="photographer-photo">
                  <img
                    src="images/photographer/white-photography-ideas.jpg"
                    className="cover"
                  />
                </div>
                <h4>Name</h4>
                <div className="ratings">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                  <i className="fa fa-star-o" />
                </div>
              </div>
              <p>I'm quite happy with his work.</p>
            </div>
            <div>
              <div>
                <div className="photographer-photo">
                  <img
                    src="images/photographer/white-photography-ideas.jpg"
                    className="cover"
                  />
                </div>
                <h4>Name</h4>
                <div className="ratings">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                  <i className="fa fa-star-o" />
                </div>
              </div>
              <p>I'm quite happy with his work.</p>
            </div>
            <div>
              <div>
                <div className="photographer-photo">
                  <img
                    src="images/photographer/white-photography-ideas.jpg"
                    className="cover"
                  />
                </div>
                <h4>Name</h4>
                <div className="ratings">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                  <i className="fa fa-star-o" />
                </div>
              </div>
              <p>I'm quite happy with his work.</p>
            </div>
            <div>
              <div>
                <div className="photographer-photo">
                  <img
                    src="images/photographer/white-photography-ideas.jpg"
                    className="cover"
                  />
                </div>
                <h4>Name</h4>
                <div className="ratings">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                  <i className="fa fa-star-o" />
                </div>
              </div>
              <p>I'm quite happy with his work.</p>
            </div>
          </div>
        </div>
      </PhotographerPortofolio>
    );
  }
}
