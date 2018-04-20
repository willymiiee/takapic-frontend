import React, { Component } from 'react';

import Page from '../Page';
import { Link } from 'react-router-dom';

class BlogHomepage extends Component {
  render() {
    return (
      <Page>
        <div className="container">
        	<img className="blog-header" src="/images/blog/header.png"></img>
        	<div className="blog-body">
	        	<div className="blog-tab">
		        	<span className="tab-item active">RECENT</span>
		        	<span className="tab-item">POPULAR</span>
		        </div>
		        <div className="row" style={{marginTop:'34px'}}>
		        	<div className="blog-item col-xs-12 col-sm-6 col-md-4">
		        		<Link to="/blog/bali">
			        		<img className="blog-thumbnail" src="/images/blog/bali/geographicalfacts1.png"></img>
			        		<div className="topic">LOCATION</div>
			        		<div className="title">BALI</div>
			        		<div className="subtitle">THE ISLAND OF GOD</div>
			        	</Link>
		        	</div>
		        	<div className="blog-item col-xs-12 col-sm-6 col-md-4">
		        		<Link to="/blog/gili">
			        		<img className="blog-thumbnail" src="/images/blog/gili/gilimeno.png"></img>
			        		<div className="topic">LOCATION</div>
			        		<div className="title">GILI</div>
			        		<div className="subtitle">THE LONELY ISLAND</div>
			        	</Link>
		        	</div>
		        	<div className="blog-item col-xs-12 col-sm-6 col-md-4">
		        		<Link to="/blog/belitung">
			        		<img className="blog-thumbnail" src="/images/blog/belitung/lengkuasisland.png"></img>
			        		<div className="topic">LOCATION</div>
			        		<div className="title">BELITUNG</div>
			        		<div className="subtitle">TOP 6 TRAVEL DESTINATION</div>
			        	</Link>
		        	</div>
		        </div>
	        </div>
        </div>
      </Page>
    )
  }
}

export default BlogHomepage;
