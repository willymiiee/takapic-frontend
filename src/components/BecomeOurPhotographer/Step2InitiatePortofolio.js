import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from 'components/Page';
import { ProgressBar } from 'react-bootstrap';
import { submitUploadPhotosPortfolio } from '../../store/actions/photographerServiceInfoActionsStep2';

class Step2IntiatePortofolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhotos: props.photographerServiceInfoStep2.files || [],
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

  handleSubmit = event => {
    event.preventDefault();
    const { selectedPhotos } = this.state;
    if (selectedPhotos.length < 1) {
      alert('Please upload at least on photo.');
    } else {
      const { user: { email } } = this.props;
      const params = {
        email,
        files: selectedPhotos,
      };
      this.props.submitUploadPhotosPortfolio(params);
    }
  };

  render() {
    const { selectedPhotos } = this.state;
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div />
            <div />
            <div />
            <div className="active" />
          </div>
          <hr />
          <h3>Let start building your portofolio! (Maximum 10 photos)</h3>
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
                  Upload
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
                      {this.props.photographerServiceInfoStep2.loading && (
                        <ProgressBar
                          striped
                          bsStyle="success"
                          now={
                            this.props.photographerServiceInfoStep2.percentages[
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
                      {!this.props.photographerServiceInfoStep2.loading && (
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
                <b>Why important to upload your nice photos</b>
                <p>
                  It will be shown on your profile. You can change it later.
                </p>
                <b>Tips for choosing nice photos</b>
                <p>Blah blah.</p>
              </div>
            </div>
          </div>
          <hr />
          <Link
            to="/become-our-photographer/step-2-3"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>
          <Link
            to="/become-our-photographer/step-2-5"
            className="button"
            onClick={this.handleSubmit}
          >
            Next
          </Link>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth,
  photographerServiceInfoStep2: state.photographerServiceInfoStep2,
});

const mapDispatchToProps = dispatch => ({
  submitUploadPhotosPortfolio: payload =>
    dispatch(submitUploadPhotosPortfolio(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Step2IntiatePortofolio)
);
