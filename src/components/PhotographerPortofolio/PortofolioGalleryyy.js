import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPhotographerServiceInformation,
  resetPhotographerServiceInformationData
} from "../../store/actions/photographerServiceInfoActions";
import { Modal } from 'react-bootstrap';

import Animator from '../common/Animator';
import Page from '../Page';
import PersonalInfoAndNav from './PersonalInfoAndNav';

import MasonryGalleryThumbnails from './ImagesGallery/MasonryGalleryThumbnails';
import ImagePopupAndSlider from './ImagesGallery/ImagePopupAndSlider';

class PortofolioGalleryyy extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      initialSlide: 0,
    };
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

  close = () => {
    this.setState({ showModal: false });
  };

  open = (evt, indexSlide) => {
    evt.preventDefault();
    this.setState({ showModal: true, initialSlide: indexSlide });
  };

  render() {
    if (!this.props.photographerServiceInformation.loading) {
      const {
        photographerServiceInformation: {
          data: {
            userMetadata: photographerUserMetadata,
            photosPortofolio
          }
        }
      } = this.props;

      const imagesUrlList = photosPortofolio ? photosPortofolio.map(item => item.url) : [];

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
                  <div className="masonry-container">
                    <MasonryGalleryThumbnails images={imagesUrlList} openFunc={this.open} />

                    <Modal show={this.state.showModal} onHide={this.close}>
                      <Modal.Header closeButton />
                      <Modal.Body>
                        <ImagePopupAndSlider initialSlide={this.state.initialSlide} images={imagesUrlList} />
                      </Modal.Body>
                    </Modal>
                  </div>
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
