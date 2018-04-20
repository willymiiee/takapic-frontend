import React, { Component } from 'react';

import Page from '../Page';

class BlogDetail extends Component {
  render() {
    return (
      <Page>
        <div className="container">
        	<img className="blog-header" src="/images/blog/header1.png"></img>
        	<div className="blog-body">
        		<div className="bd-header">
	        		<div className="bd-title">BALI</div>
	        		<div className="bd-subtitle">THE ISLAND OF GOD</div>
	        		<div className="bd-owner">by. Dana Kim</div>
	        		<div className="seen-detail">
	        			<i className="fa fa-eye"></i> <span>123</span>
	        			<i className="fa fa-heart-o"></i> <span>123</span>
	        		</div>
				</div>

				<div className="bd-content">
					<p>
						It was once lonely, but it is no more. Thirty years ago, the Gili Island was uninhabited and only discovered by the seafaring Bugis people from Sulawesi. It was only a matter of time before the adventurous backpackers discovered the islands and developed Gili into a getaway destination. In the Sasak language, Gili means small islands, and there are approximately thirty Gilis around the island of Lombok. The main islets that build up Gili Island altogether, Gili Trawangan, Gili Meno, and Gili Air, are amassing more visitors, gaining popularity following its neighboring island, Bali, and its mother island, Lombok. They have become a much loved itinerary for visitors hopping from Bali looking for new adventures.
					</p>
					<img src=""></img>
					<p>
						In Gili, the beaches are still powdery white, the pristine turquoise seawaters are home to more than 3500 marine species including reef sharks, turtles, pygmy seahorses and colorful corals. They are also positioned perfectly for sunsets over Bali’s Mount Agung and sunrise over Lombok’s Mount Rinjani. You won’t see any cars or motorbikes here, since all forms of motorized transport are still not allowed in the Gilis. It means that the only way to get around is on foot, by bicycle and in horse carts known as cidomos. The Gilis are also deemed as one of the best diving and snorkeling spots as well as learning-to dive destinations in the world.

						<br/><br/><strong>GILI TRAWANGAN</strong><br/><br/>

						Gili Trawangan lies furthest from its mother island, Lombok, but larger in size compared to its two other twins, Gili Meno and Gili Air. Since it is the most developed of the Gilis, Gili Trawangan provides more entertainment for visitors and has gained the reputation as vibrant party-island amongt the others.

						<br/><br/>
						Source: hindustantimes.com
						<br/><br/>
						In here, chill party seekers come here to enjoy the great nightlife in restaurants, bars, and beach clubs. There are many beach bars with live bands that will provide the perfect soundtrack for your night. There is even a cinema straw hut that will bring you a novel experience in watching movies. The crowd camps on the southern part of the island where the partying hotpots and lively bars are, so if you need a quieter ambience, you can head further north and west of the island to find more quiet and serene beaches to relax.

						<br/><br/><strong>The Giant Swing</strong><br/><br/>

						Who would not know the iconic giant swing that might have decorated the internet world as the face of Gili? The first ocean swing in Gili Trawangan, Datu Swing, is even more popular than Gili Trawangan itself, located on the high-end Hotel Ombak Sunset. Since the construction of Datu Swing, others ocean swing began to surfacing in all corners of not only Gili Trawangan but also the other Gilis. 
					</p>
				</div>

				<div id="findthisplace">FIND THIS PLACE
				<br/>WITH OUR AWESOME PHOTOGRAPHERS!</div>
				<a href="" className="btn-check-it-out" style={{marginBottom:'64px'}}>CHECK IT OUT</a>
				<div className="blog-tab">
		        	<span className="tab-item active">RELATED POST</span>
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
	        </div>
        </div>
      </Page>
    )
  }
}

export default BlogDetail;
