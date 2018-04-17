import React, { Component } from 'react';

import Page from '../Page';

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
		        		<img className="blog-thumbnail" src="/images/blog/blog1.png"></img>
		        		<div className="topic">LOCATION</div>
		        		<div className="title">BALI</div>
		        		<div className="subtitle">THE ISLAND OF GOD</div>
		        	</div>
		        	<div className="blog-item col-xs-12 col-sm-6 col-md-4">
		        		<img className="blog-thumbnail" src="/images/blog/blog2.png"></img>
		        		<div className="topic">LOCATION</div>
		        		<div className="title">BALI</div>
		        		<div className="subtitle">THE ISLAND OF GOD</div>
		        	</div>
		        	<div className="blog-item col-xs-12 col-sm-6 col-md-4">
		        		<img className="blog-thumbnail" src="/images/blog/blog3.png"></img>
		        		<div className="topic">LOCATION</div>
		        		<div className="title">BALI</div>
		        		<div className="subtitle">THE ISLAND OF GOD</div>
		        	</div>
		        </div>
		        <div className="row" style={{marginTop:'34px'}}>
		        	<div className="blog-item col-xs-12 col-sm-6 col-md-4">
		        		<img className="blog-thumbnail" src="/images/blog/blog4.png"></img>
		        		<div className="topic">LOCATION</div>
		        		<div className="title">BALI</div>
		        		<div className="subtitle">THE ISLAND OF GOD</div>
		        	</div>
		        	<div className="blog-item col-xs-12 col-sm-6 col-md-4">
		        		<img className="blog-thumbnail" src="/images/blog/blog3.png"></img>
		        		<div className="topic">LOCATION</div>
		        		<div className="title">BALI</div>
		        		<div className="subtitle">THE ISLAND OF GOD</div>
		        	</div>
		        	<div className="blog-item col-xs-12 col-sm-6 col-md-4">
		        		<img className="blog-thumbnail" src="/images/blog/blog2.png"></img>
		        		<div className="topic">LOCATION</div>
		        		<div className="title">BALI</div>
		        		<div className="subtitle">THE ISLAND OF GOD</div>
		        	</div>
		        </div>
	        </div>
        </div>
      </Page>
    )
  }
}

export default BlogHomepage;
