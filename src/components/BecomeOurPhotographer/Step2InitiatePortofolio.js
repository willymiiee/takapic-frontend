import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class Step2IntiatePortofolio extends Component {
  componentDidMount() {
    var photoPreview = window.$('#photo-preview');

    window.$(function() {
      function preview(files) {
        photoPreview.html('');
        if (window.File && window.FileReader && window.FileList) {
          for (var i = 0, n = Math.min(files.length, 10); i < n; i++) {
            if (files[i]) {
              var reader = new FileReader();
              reader.onload = function(e) {
                window
                  .$('#photo-preview')
                  .append(
                    '<div><img src="' +
                      e.target.result +
                      '"><i title="Remove Photo"></i></div>'
                  );
              };
              reader.readAsDataURL(files[i]);
            }
          }
          window
            .$('#photographer-landing > h3')
            .html('Great! You are ready to impress travellers with your work!');
          window.$('#next-button').prop('disabled', false);
        } else {
          alert('The File APIs are not fully supported in this browser!');
        }
      }

      window.$('#upload-btn').click(function() {
        window.$('#upload-file').trigger('click');
      });

      window.$('#upload-file').change(function() {
        preview(this.files);
      });

      photoPreview.on('click', 'i', function() {
        window
          .$(this)
          .parent()
          .remove();
        if (window.$('#photo-preview').children().length === 0) {
          window
            .$('#photographer-landing > h3')
            .html('Let start building your portofolio! (Maximum 10 photos)');
          window.$('#next-button').prop('disabled', true);
        }
      });
    });
  }

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div />
            <div />
            <div className="active" />
            <div />
          </div>
          <hr />
          <h3>Let start building your portofolio! (Maximum 10 photos)</h3>
          <div className="row">
            <div className="col-sm-7 margin-top-15 margin-bottom-30">
              <div>
                <input
                  accept="image/*"
                  id="upload-file"
                  className="hidden"
                  multiple
                  type="file"
                />
                <button className="button" id="upload-btn">
                  Upload
                </button>
                <div id="photo-preview" />
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
            to="/become-our-photographer/step-2-2"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>
          <Link to="/become-our-photographer/step-2-4a" className="button">
            Next
          </Link>
        </div>
      </Page>
    );
  }
}
