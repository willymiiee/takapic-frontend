import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class PhotographerPortofolio extends Component {
  render() {
    return (
      <Page>
        <div className="container" id="photographer-portofolio">
          <div className="row">
            <div className="col-sm-3 margin-top-50">
              <div id="photographer-portofolio-left">
                <img src="/images/photographer/outlook-photography-jobs-2.jpg"/>
                <h3>Dana Kim</h3>
                <h5>Seoul, Korea</h5>
                <div className="ratings">
                  <i className="fa fa-star"/>
                  <i className="fa fa-star"/>
                  <i className="fa fa-star"/>
                  <i className="fa fa-star-half-o"/>
                  <i className="fa fa-star-o"/>
                </div>
                <hr/>
                <div className="a-block">
                  <Link to="/photographer-portofolio/1"><b>Gallery</b></Link>
                  <Link to="/photographer-portofolio-about">About Me</Link>
                  <Link to="/photographer-portofolio-reviews">Reviews</Link>
                </div>
                <Link to="/photographer/2" className="button w-100 margin-top-30 margin-bottom-15">Contact</Link>
                <h3>Share</h3>
                <div id="photographer-portofolio-share">
                  <i className="fa fa-facebook-official"/>
                  <i className="fa fa-google-plus"/>
                  <i className="fa fa-weibo"/>
                </div>
                <hr/>
                <div className="a-block">
                  <a href>Go to Takapic Home</a>
                  <a href>Edit this page</a>
                </div>
              </div>
            </div>
            {this.props.children}
          </div>
        </div>
      </Page>
    )
  }
}
