import React, { Component } from 'react';
import Gallery from '../../react-grid-gallery/Gallery';
import { ProgressBar } from 'react-bootstrap';
import cloudinary from 'cloudinary-core';

import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';

class PhotoAlbum extends Component {
  constructor() {
    super();
    this.state = {
      imagesUpload: [],
      images: [
        { pid: 'album/Imaje_eolgoy', isSelected: false },
        { pid: 'photos-portfolio/babababa_mgtxnn', isSelected: false },
        { pid: 'album/Jenis_omcdkb', isSelected: false },
        { pid: 'album/Jenis_omcdkb', isSelected: false }
      ],
      imagesSelectedCount: 0
    };

    this.cloudinaryInstance = cloudinary.Cloudinary.new({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      secure: true
    });
  }

  componentWillUnmount() {
    this.cloudinaryInstance = null;
  }

  browseImagesHandler = (evt) => {
    const files = evt.target.files;
    const fileOutOfSize = [];

    Object.keys(files).forEach((itemKey) => {
      const fileItemObject = files[itemKey];
      if (fileItemObject.size <= 10000000) {
        const fileReader = new FileReader();

        fileReader.onloadend = (evtObj) => {
          const imageItem = {imagePreview: evtObj.target.result, fileObject: fileItemObject};
          this.setState({ imagesUpload: [ ...this.state.imagesUpload, imageItem ] });
        };
        fileReader.readAsDataURL(fileItemObject);

      } else {
        fileOutOfSize.push(fileItemObject.name);
      }
    });

    if (fileOutOfSize.length > 0) {
      const filesStr = fileOutOfSize.join("\n");
      alert("Some photos will not be uploaded. Because there are one or more photos have more than 10MB size\n---------------------------------\n" + filesStr);
    }
  };

  selectedImagesHandler = (indexSelected, image) => {
    const newState = this.state.images.map((item, indexImage) =>
      indexSelected === indexImage
        ? { ...item, isSelected: !item.isSelected }
        : item);

    const selectedOnly = newState.filter((item) => item.isSelected === true);

    this.setState({ images: newState, imagesSelectedCount: selectedOnly.length });
  };

  render() {
    const images = this.state.images.map((item) => {
      return {
        src: this.cloudinaryInstance.url(item.pid, { width: 1024, crop: 'scale', quality: 'auto:best' }),
        thumbnail: this.cloudinaryInstance.url(item.pid, { width: 320, crop: 'scale', quality: 'auto:best' }),
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        isSelected: item.isSelected
      };
    });

    return (
      <Page style={{whiteSpace:'normal'}}>
        <UserAccountPanel>
          <div>
            <h3 className="margin-top-0">Photo Album</h3>
            <div className="upload-controls">
              <input
                type="file"
                accept="image/*"
                multiple
                ref={ref => (this._uploadFile = ref)}
                onChange={this.browseImagesHandler}
                className="hidden"
              />

              <button className="btn" onClick={() => this._uploadFile.click()}>Browse images</button>
              &nbsp;
              <button className="btn">Submit</button>
            </div>
          </div>

          <hr/>

          <Gallery
            images={images}
            onSelectImage={this.selectedImagesHandler}
          />

          <div style={{ clear: 'both' }}/>

          {
            this.state.imagesUpload && this.state.imagesUpload.map((item) => (
              <div className="my-my-tile">
                <div className="my-my-tile-viewport">
                  <ProgressBar
                    striped
                    bsStyle="success"
                    now={0}
                    style={{
                      position: 'absolute',
                      top: 70,
                      width: '100%',
                    }}
                  />
                  <img className="my-my-img-item" src={item.imagePreview} alt=""/>
                </div>
              </div>
            ))
          }

          <div style={{ clear: 'both' }}/>

          {
            this.state.imagesSelectedCount > 0 ? (
              <div>
                <div>
                  { this.state.imagesSelectedCount } selected file
                </div>
                <div>
                  <button type="button" className="btn">Delete selected files</button>
                </div>
                <div>
                  <p style={{ cursor: 'pointer' }}>Unselect all</p>
                </div>
              </div>
            ) : null
          }

        </UserAccountPanel>
      </Page>
    )
  }
}

export default PhotoAlbum;
