import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'

export default class PhotosPortofolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhotos: [],
      loading: false,
      loaded: false,
      percentages: []
    };
  }

  handleUpload = event => {
    const files = event.target.files;
    for (let i = 0, n = Math.min(files.length, 10); i < n; i++) {
      if (files[i]) {
        const file = files[i];
        if (file.type.indexOf('image/') === 0) {
          var reader = new FileReader();
          reader.onload = e => {
            let { selectedPhotos } = this.state;
            selectedPhotos = [
              ...selectedPhotos,
              { file, reader: e.target.result },
            ];
            this.setState({ selectedPhotos });
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  handleRemove = (event, index) => {
    let { selectedPhotos } = this.state;
    selectedPhotos = [
      ...selectedPhotos.slice(0, index),
      ...selectedPhotos.slice(index + 1),
    ];
    this.setState({ selectedPhotos });
  };

  render() {
    const { selectedPhotos } = this.state;
    return (
      <div className="row">
        <div className="col-sm-7 margin-top-15 margin-bottom-30">
          <div>
            <input
              accept="image/*"
              ref={ref => (this._uploadFile = ref)}
              className="hidden"
              multiple
              type="file"
              onChange={this.handleUpload}
            />
            <button
              className="button"
              onClick={() => this._uploadFile.click()}
            >
              Browse images
            </button>
            <div id="photo-preview">
              {selectedPhotos.map((photo, key) => (
                <div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    }}
                  />
                  {this.props.loading && (
                    <ProgressBar
                      striped
                      bsStyle="success"
                      now={
                        this.props.percentages[
                          key
                        ]
                      }
                      style={{
                        position: 'absolute',
                        top: 70,
                        width: '100%',
                      }}
                    />
                  )}
                  <img src={photo.reader} />
                  {!this.props.loading && (
                    <i
                      title="Remove Photo"
                      onClick={event => this.handleRemove(event, key)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-sm-5 margin-top-15 margin-bottom-30">
          <div className="card tips">
            <h3>Why it's important to upload your nice photos</h3>
            <p>
              Customers will frequent your page and view your photos so this is your best chance to give them
              a powerfull impression!
            </p>

            <h3>Tips for choosing photos</h3>
            <p>
              You should select photos that best showcase your skills and represent your photography style.
              You can update / change your photos anytime you want.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
