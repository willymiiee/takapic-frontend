import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Rate, Tag } from 'element-react';
import PhotoProfile from '../Profile/PhotoProfile';

class oldHome extends Component {
  componentDidMount() {
    window.$('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '0',
      container: '#search-date',
      autoclose: true,
    });
  }
  render() {
    return (
      <div>
        {/*<!-- Banner
        ================================================== -->*/}
        <div className="main-search-container-takapic">
          <div className="main-search-inner">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2>Capture your travel moments</h2>
                  <h4>Connect with takapic photographer</h4>
                  <div className="col-md-10 col-md-offset-1">
                    <div className="main-search-input">
                      <div className="main-search-input-item">
                        <input type="text" placeholder="Destination" value="" />
                      </div>
                      <div className="main-search-input-item" id="search-date">
                        <input
                          type="text"
                          placeholder="Date"
                          className="datepicker"
                          value=""
                        />
                      </div>
                      <Link to="/search/Tokyo" className="button">
                        Search
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*<!-- Content
        ================================================== -->*/}
        <section
          id="location"
          className="fullwidth padding-top-25 padding-bottom-25"
          data-background-color="#f8f8f8"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="headline centered margin-bottom-45">
                  Popular Location
                  <span>Discover top-rated local businesses</span>
                </h3>
                <a className="see-all">
                  <h4>See All &gt;&gt;</h4>
                </a>
              </div>
            </div>
            <div className="row-padding-5">
              <div className="col-sm-3 col-xs-6 padding-5">
                <a
                  href="listings-single-page.html"
                  className="listing-item-container"
                >
                  <div className="listing-item location-image vertical-image">
                    <img src="images/bali.jpeg" alt="Bali" />
                    <div className="listing-item-content">
                      <span className="tag">Bali</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-3 col-xs-6 padding-5">
                <a
                  href="listings-single-page.html"
                  className="listing-item-container"
                >
                  <div className="listing-item location-image vertical-image">
                    <img src="images/sydney.jpg" alt="Sydney" />
                    <div className="listing-item-content">
                      <span className="tag">Sydney</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-3 col-xs-6 padding-5">
                <a
                  href="listings-single-page.html"
                  className="listing-item-container"
                >
                  <div className="listing-item location-image vertical-image">
                    <img src="images/tokyo.jpg" alt="Tokyo" />
                    <div className="listing-item-content">
                      <span className="tag">Tokyo</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-3 col-xs-6 padding-5">
                <a
                  href="listings-single-page.html"
                  className="listing-item-container"
                >
                  <div className="listing-item location-image vertical-image">
                    <img src="images/queenstown.jpg" alt="Queenstown" />
                    <div className="listing-item-content">
                      <span className="tag">Queenstown</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/*<!-- Themes Section -->*/}
        <section
          id="themes"
          className="fullwidth padding-top-25 padding-bottom-25"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="headline centered margin-bottom-45">
                  Themes
                  <span>Discover top-rated local businesses</span>
                </h3>
                <a className="see-all">
                  <h4>See All &gt;&gt;</h4>
                </a>
              </div>
            </div>
            <div className="row-padding-5">
              <div className="col-sm-4 col-xs-6 padding-5">
                <a
                  href="listings-single-page.html"
                  className="listing-item-container"
                >
                  <div className="listing-item">
                    <img src="images/slider-bg-02.jpg" alt="" />
                    <div className="listing-item-content">
                      <span className="tag">Family</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 col-xs-6 padding-5">
                <a
                  href="listings-single-page.html"
                  className="listing-item-container"
                >
                  <div className="listing-item">
                    <img src="images/popular-location-04.jpg" alt="" />
                    <div className="listing-item-content">
                      <span className="tag">Outdoor</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 col-xs-6 padding-5">
                <a
                  href="listings-single-page.html"
                  className="listing-item-container"
                >
                  <div className="listing-item">
                    <img src="images/single-listing-03.jpg" alt="" />
                    <div className="listing-item-content">
                      <span className="tag">Food</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 col-xs-6 padding-5">
                <a
                  href="listings-single-page.html"
                  className="listing-item-container"
                >
                  <div className="listing-item">
                    <img src="images/listing-item-01.jpg" alt="" />
                    <div className="listing-item-content">
                      <span className="tag">Cooking</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 col-xs-6 padding-5">
                <a
                  href="listings-single-page.html"
                  className="listing-item-container"
                >
                  <div className="listing-item">
                    <img src="images/slider-bg-01.jpg" alt="" />
                    <div className="listing-item-content">
                      <span className="tag">Travelling</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 col-xs-6 padding-5">
                <a
                  href="listings-single-page.html"
                  className="listing-item-container"
                >
                  <div className="listing-item">
                    <img src="images/listing-item-03.jpg" alt="" />
                    <div className="listing-item-content">
                      <span className="tag">Home</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/*<!-- Themes Section / End-->*/}

        {/*<!-- Top Photographer Carousel -->*/}
        <section
          id="photographers"
          className="fullwidth padding-top-25 padding-bottom-25"
          data-background-color="#f8f8f8"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="headline centered">
                  Top Photographer
                  <span>
                    Browse <i>the most desirable</i> categories
                  </span>
                </h3>
                <a className="see-all">
                  <h4>See All &gt;&gt;</h4>
                </a>
              </div>
            </div>
          </div>

          <div
            id="photographer"
            className="fullwidth-carousel-container margin-top-25"
          >
            <div className="fullwidth-slick-carousel category-carousel">
              {/*<!-- Item -->*/}
              <div className="fw-carousel-item">
                <div className="category-box-container">
                  <div className="category-box">
                    <div className="category-box-content">
                      <PhotoProfile
                        src="images/happy-client-01.jpg"
                        size="160px"
                        name="Photografer 1"
                      />
                      <h4>
                        <i>San Francisco</i>
                      </h4>
                      <Rate
                        colors={['#99a9bf', '#f7ba2a', '#ff9900']}
                        disabled={true}
                        value={2}
                      />
                      <h4>
                        <i className="sl sl-icon-camera" /> Cannon
                      </h4>
                      <div className="specialist-tag">
                        <Tag color="gray">Wedding</Tag>
                        <Tag color="success">Party</Tag>
                      </div>
                      <a>
                        <span className="category-box-btn">Detail</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/*<!-- Item -->*/}
              <div className="fw-carousel-item">
                <div className="category-box-container">
                  <div className="category-box">
                    <div className="category-box-content">
                      <PhotoProfile
                        src="images/reviews-avatar.jpg"
                        size="160px"
                        name="Photographer 2"
                      />
                      <h4>
                        <i>Mexico</i>
                      </h4>
                      <Rate
                        colors={['#99a9bf', '#f7ba2a', '#ff9900']}
                        disabled={true}
                        value={3}
                      />
                      <h4>
                        <i className="sl sl-icon-camera" /> Cannon
                      </h4>
                      <div className="specialist-tag">
                        <Tag color="gray">Wedding</Tag>
                        <Tag color="success">Party</Tag>
                      </div>
                      <a>
                        <span className="category-box-btn">Detail</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/*<!-- Item -->*/}
              <div className="fw-carousel-item">
                <div className="category-box-container">
                  <div className="category-box">
                    <div className="category-box-content">
                      <PhotoProfile
                        src="images/happy-client-03.jpg"
                        size="160px"
                        name="Photographer 3"
                      />
                      <h4>
                        <i>China</i>
                      </h4>
                      <Rate
                        colors={['#99a9bf', '#f7ba2a', '#ff9900']}
                        disabled={true}
                        value={5}
                      />
                      <h4>
                        <i className="sl sl-icon-camera" /> Cannon
                      </h4>
                      <div className="specialist-tag">
                        <Tag color="gray">Wedding</Tag>
                        <Tag color="success">Party</Tag>
                      </div>
                      <a>
                        <span className="category-box-btn">Detail</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/*<!-- Item -->*/}
              <div className="fw-carousel-item">
                <div className="category-box-container">
                  <div className="category-box">
                    <div className="category-box-content">
                      <PhotoProfile
                        src="images/happy-client-02.jpg"
                        size="160px"
                        name="Photografer 4"
                      />
                      <h4>
                        <i>New York</i>
                      </h4>
                      <Rate
                        colors={['#99a9bf', '#f7ba2a', '#ff9900']}
                        disabled={true}
                        value={3.5}
                      />
                      <h4>
                        <i className="sl sl-icon-camera" /> Cannon
                      </h4>
                      <div className="specialist-tag">
                        <Tag color="gray">Wedding</Tag>
                        <Tag color="success">Party</Tag>
                      </div>
                      <a href="dadasds">
                        <span className="category-box-btn">Detail</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*<!-- Top Photographer Carousel / End -->*/}

        {/*<!-- Info Section -->*/}
        <section
          id="benefit"
          className="fullwidth padding-top-25 padding-bottom-25"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <h2 className="headline centered">
                  Why Us?
                  <span className="margin-top-25">
                    Explore some of the best tips from around the world from our
                    partners and friends. Discover some of the most popular
                    listings in Sydney.
                  </span>
                </h2>
              </div>
            </div>

            <div className="row icons-container">
              {/*<!-- Stage -->*/}
              <div className="col-md-4">
                <div className="icon-box-2 with-line">
                  <i className="im im-icon-Affiliate" />
                  <h3>Professional</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Suscipit odio nesciunt optio exercitationem blanditiis. Quae
                    repudiandae explicabo iste nihil est, suscipit, accusantium
                    inventore atque dicta harum ea culpa in officiis.
                  </p>
                </div>
              </div>

              {/*<!-- Stage -->*/}
              <div className="col-md-4">
                <div className="icon-box-2 with-line">
                  <i className="im im-icon-Handshake" />
                  <h3>Trusted</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Expedita enim, nisi. Ipsa aliquam excepturi necessitatibus!
                    Quisquam praesentium harum ducimus architecto ad, delectus
                    assumenda soluta consequuntur repudiandae placeat deserunt
                    obcaecati aspernatur.
                  </p>
                </div>
              </div>

              {/*<!-- Stage -->*/}
              <div className="col-md-4">
                <div className="icon-box-2">
                  <i className="im im-icon-Photo-Album2" />
                  <h3>Friendly</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nobis temporibus, placeat, quae aliquam harum modi. Ipsum
                    quia laborum, sit accusantium ex voluptatibus dignissimos
                    dolore, quibusdam rerum harum enim, ab perferendis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*<!-- Info Section / End -->*/}
      </div>
    );
  }
}

export default Home;
