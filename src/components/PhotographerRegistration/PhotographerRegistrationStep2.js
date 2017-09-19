import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

class PhotographerRegistrationStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: '',
    };

    this.fileSelectChangeHandler = this.fileSelectChangeHandler.bind(this);
  }

  fileSelectChangeHandler(evt) {
    evt.preventDefault();
    let fileReader = new FileReader();
    let file = evt.target.files[0];

    fileReader.onloadend = () => {
      this.setState({ file: file, imagePreviewUrl: fileReader.result });
    };
    fileReader.readAsDataURL(file);
  }

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-3">
            <div />
            <div className="active" />
            <div />
          </div>

          <div className="panel setup-content" id="step-2">
            <div className="panel-body">
              <h2 className="text-center">Add your best photo profile</h2>
              <div id="profile-dragarea">
                <div
                  id="filedrag-photo"
                  className="center-block img-responsive"
                >
                  <div className="ph">
                    {this.state.imagePreviewUrl && (
                      <img
                        src={this.state.imagePreviewUrl}
                        className="center-block img-circle"
                      />
                    )}
                  </div>
                </div>
              </div>
              <p className="text-center">or choose file</p>
              <div className="form-group">
                <input
                  className="input-file"
                  type="file"
                  name=""
                  onChange={this.fileSelectChangeHandler}
                />
              </div>

              <Link
                to="/photographer-registration/s3"
                className="button next-btn"
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default PhotographerRegistrationStep2;
