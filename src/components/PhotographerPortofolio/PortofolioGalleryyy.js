import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import cloudinary from 'cloudinary-core';
import Gallery from 'react-grid-gallery';
import {
  fetchPhotographerServiceInformation,
  resetPhotographerServiceInformationData
} from "../../store/actions/photographerServiceInfoActions";

import Animator from '../common/Animator';
import Page from '../Page';
import PersonalInfoAndNav from './PersonalInfoAndNav';

const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

class PortofolioGalleryyy extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      initialSlide: 0,
    };

    this.cloudinaryInstance = cloudinary.Cloudinary.new({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      secure: true
    });
  }

  componentDidMount() {
    this.fetchPhotographerInformation();
  }

  componentWillUnmount() {
    this.props.resetPhotographerServiceInformationData();
  }

  fetchPhotographerInformation() {
    if (this.props.photographerServiceInformation.loading) {
      const { match: { params: { photographerId } } } = this.props;
      this.props.fetchPhotographerServiceInformation(photographerId);
    }
  }

  render() {
    if (!this.props.photographerServiceInformation.loading) {
      const {
        photographerServiceInformation: {
          data: {
            photosPortofolio,
            userMetadata: photographerUserMetadata
          }
        }
      } = this.props;

      const photosPortofolioSort = orderBy(photosPortofolio, ['width'], ['desc']);
      const galleries = photosPortofolioSort.map((item) => {
        const calculateResizeThumb = calculateAspectRatioFit(item.width, item.height, 480, item.height);
        const calculateResizeBig = calculateAspectRatioFit(item.width, item.height, 1280, item.height);

        return {
          src: this.cloudinaryInstance.url(item.publicId, {
            width: Math.round(calculateResizeBig.width),
            crop: 'scale',
            quality: 'auto:best'
          }),
          thumbnail: this.cloudinaryInstance.url(item.publicId, {
            width: Math.round(calculateResizeThumb.width),
            crop: 'thumb',
            quality: 'auto:best'
          }),
          thumbnailWidth: Math.round(calculateResizeThumb.width),
          thumbnailHeight: Math.round(calculateResizeThumb.height)
        };
      });

      return (
        <Page>
          <div className="container" id="photographer-portofolio">
            <div className="row">
              <div className="col-sm-3 margin-top-50">
                <PersonalInfoAndNav photographerUserMetadata={photographerUserMetadata}/>
              </div>

              {/**/}
              <div className="col-sm-9 margin-top-50">
                <div
                  id="photographer-portofolio-gallery"
                  className="photographer-portofolio-container"
                >
                  <Gallery
                    images={galleries}
                    margin={4}
                  />
                </div>
              </div>
              {/**/}

            </div>
          </div>
        </Page>
      );
    }

    return <Animator/>
  }
}

const mapStateToProps = state => ({
  photographerServiceInformation: state.photographerServiceInformation
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerServiceInformation: photographerId => dispatch(fetchPhotographerServiceInformation(photographerId)),
  resetPhotographerServiceInformationData: () => dispatch(resetPhotographerServiceInformationData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PortofolioGalleryyy)
);
