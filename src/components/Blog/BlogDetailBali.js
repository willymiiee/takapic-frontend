import React, { Component } from 'react';

import Page from '../Page';
import { Link } from 'react-router-dom';

class BlogDetail extends Component {
  render() {
    return (
      <Page>
        <div className="container">
        	<img className="blog-header" src="/images/blog/bali/kecakdance.png"></img>
        	<div className="blog-body">
        		<div className="bd-header">
	        		<div className="bd-title">BALI</div>
	        		<div className="bd-subtitle">Getting to Know Bali, the Island of Gods</div>
	        		<div className="bd-owner">by. Dana Kim</div>
	        		<div className="seen-detail">
	        			<i className="fa fa-eye"></i> <span>123</span>
	        			<i className="fa fa-heart-o"></i> <span>123</span>
	        		</div>
				</div>

				<div className="bd-content">
					<p>
						It is not without reason that Bali earns the nickname as Pulau Dewata (the Island of Gods). The Gods seemingly do favor this small island, only 5700 kilometers in area, and bless it with striking natural splendor and well-preserved cultural heritage. It is not without reason either that almost four millions tourists visit Bali alone in Indonesia every year. With all that this island has to offer, we understand that it might be quite a hassle to decide how you can level up your trip to Bali. That’s why it important to get to know Bali in general so you know where to start.
					</p> 

					<br/>
					<h5 className="section-title">Geographical Facts</h5>
					<img className="img-content" src="/images/blog/bali/geographicalfacts1.png"></img>
					<span className="img-source width-100">Source: amatravel.com</span>
					<p>
						Often known as an independent island to foreign tourists, Bali is actually part of Indonesia, on the westernmost end of the Lesser Sunda Islands, between Java to the west and Lombok to the east. The capital, Denpasar, is located in the southern part of the island. Bali also acts as a province that consists of few smaller neighboring islands, namely Nusa Penida, Nusa Lembongan, and Nusa Ceningan that are not less in terms of natural attractions. A part of the Coral Triangle, Bali is among the ones who have the highest diversity of marine species on earth, set aside the spectacular coral reefs that surround the island. On the southern part of the island, the beaches are predominantly white-sand, while the northern and western parts have black sand beaches.
					</p> 

					<br/>
					<img className="img-content" src="/images/blog/bali/geographicalfacts2.png"></img>
					<span className="img-source">Source: baliqualitytour.com</span>
					<p>
						Bali also has the whole package of tropical features, thanks to its volcanic nature, among of them are tall mountains, wild jungles, and lush rice terraces. Being not far of the equator, Bali has a fairly even climate all year round. Tip: the high season in Bali is during the dry season in July until September and again during Christmas, New Year, and Easter holiday in April. Outside these peak seasons, Bali can be surprisingly quiet and hotels often offer good discounts for the stay. The downside of these low seasons is that it happens during rainy season. And although the rainfall is usually not excessive, you might have to cut out some activities like mountain treks during these times.
					</p> 
					<br/>
					<h5 className="section-title">Local Traditional and Customer</h5>
					<p>
						Unlike the majority of Muslim adherents in Indonesia, Bali is home to most of Indonesia's Hindu minority. The Balinese Hinduism was uniquely formed as a combination of existing local beliefs and Hindu influences from mainland Southeast Asia and South Asia.  It represents a distinct form of Hindu worship incorporating local animism, ancestor worship, and reverence for Bodhisattava. That’s why the Bali tradition adopted the pre-existing animistic traditions of the indigenous people. This influence strengthened the belief that the gods and goddesses are present in all things; rock, tree, dagger, or woven cloth are believed to be a potential home for spirits. For this reason, you can also see a lot of Hindu offerings or sesajen on the side of the street.
					</p> 

					<br/>
					<h5 className="img-title">New Moon Ceremony and Flower Offerings</h5>
					<div style={{textAlign:'center'}}>
						<img className="img-content" style={{display:"inline", marginRight:'16px'}} src="/images/blog/bali/moonceremony1.png"></img>
						<img className="img-content" style={{display:"inline"}} src="/images/blog/bali/moonceremony2.png"></img>
					</div>
					<span className="img-source">Source: flickr.com</span>
					<img className="img-content" src="/images/blog/bali/ceremony.png"></img>
					<span className="img-source">Source: luxagraf.net</span>
					<p>
						Nevertheless, the spirituality and devotion in Bali is very strongly felt. Remembering the very traditional society of Bali, compliance to local rules and customs is expected at all times. Butdo not be overly worried , if you behave sensibly and courteously enough, these local customs can also bring you novel sensations and enhance your experience in this mystic island. Tip: before travelling, remember to note important holidays when you are scheduling the trip, as ceremonies are often carried out publicly and throughout the island. This includes Nyepi, where all activities are paused and airports gets shut down for a whole day.
					</p> 

					<br/>
					<h4 className="section-title">Regions and Its Characteristics</h4>
					<h5 className="section-title">South Bali</h5>
					<p>
						Celebrated for its white sandy beaches, South Bali is the most visited part of the island by far. There is no doubt South Bali can rightfully claim to have it all; from traditional markets to busy malls, cheap souvenirs stalls to fancy art galleries, boozy dives in Kuta to upscale bars and beach clubs in Seminyak. 
					</p> 
					<img className="img-content" src="/images/blog/bali/anantara-seminyak.png"></img>
					<span className="img-source">Source: travelonline.com</span>
					<p>
						The capital city of Denpasar trails from the center and the Ngurah Rai international airport is located strategically in the heart of the island that stretches to the greater Kuta Area to the north, and Jimbaran to the south. The South Bali region is associated most with shopping, beaches and partying, while also showcasing Balinese local culture through the presence of holy temples and monuments, and the performance of Balinese traditional dance, Kecak, at Uluwatu Temple.
					</p> 

					<br/>
					<h5 className="img-title">Kecak Dance at Uluwatu Cliff Temple</h5>
					<img className="img-content" src="/images/blog/bali/kecakdance.png"></img>
					<span className="img-source">Source: balimagictour.com</span>
					<p>
						Each region in South Bali bears its own characteristics and never ending attraction for tourists. You must have heard of Kuta being the most popular destination for surfers and those who love hanging out on the beach. For more secluded and luxurious villas, you can found them toward the south in Jimbaran Bay and Nusa Dua. A growing number of younger crowds look for exciting night life in Seminyak, while elder people and middle-aged families usually prefer Sanur for its quieter and more relaxed ambience. It goes without saying that you can’t say you have been in Bali if you never fully explored South Bali.
						See also: Kuta, Legian, Seminyak, Denpasar, Jimbaran, Bukit Peninsula, Canggu, Nusa Dua, Uluwatu
					</p> 

					<br/>
					<h5 className="img-title">Jimbaran</h5>
					<img className="img-content" src="/images/blog/bali/jimbaran.png"></img>
					<span className="img-source">Source: ticbali.net</span>
					<h5 className="section-title">Central Bali</h5>
					<p>
						Thanks to its mountainous range, Central Bali has the most picturesque scenery in the island with numerous temples, deep river gorges, stunning rice terraces, waterfalls and mountains. This region surely is a great escape from the hype partying in the south. Central Bali also stands as the cultural heart of the island, where Ubud, the artistic and cultural capital of Bali, can be found. The area around Ubud is characterized by gently rolling rice paddies that leaves an impression of greenness like no other. You can paddle round your way through Jatiluwih and Tegalalang rice terraces to marvel the stunning view that results from Balinese centuries old water management system, Subak.
					</p> 

					<br/>
					<h5 className="img-title">Tegalalang Rice Terrace</h5>
					<img className="img-content" src="/images/blog/bali/tegalalang.png"></img>
					<span className="img-source">Source: putubalitourguide.com</span>
					<p>
						This region also hosts many historical sites of great significances, such as Tampaksiring, which acts as Bali’s oldest and largest ancient monument and also known for its temple, Gunung Kawi; and Tirta Empul, a temple of the 10th century and was built around hot springs that still functions as bathing pool. If you are interested for a pleasant walk up in the cooler area, you can take a sightseeing tour in Kintamani and Mount Batur area that encompasses it. To the west of Kintamani lies the town of Bedugul, where you can find the beautiful Bali Botanical Gardens, known as the fruit and vegetable basket of Bali. After all, this region is a perfect fit for people who prefer green mountainsides to the beach; have high interest in in arts, culture, and historical sites; and last but not least, honeymooners! 
						See also: Ubud, Kintamani, Tabanan, Tampaksiring
					</p> 

					<br/>
					<h5 className="img-title">Kintamani</h5>
					<img className="img-content" src="/images/blog/bali/kintamani.png"></img>
					<span className="img-source">Source: putubalitourguide.com</span>
					<h5 className="section-title">East Bali</h5>
					<p>
						If you plan on taking a tranquil retreat away from fancy resorts and entertainments they have in the southern part of the island, then you should head east and find the peaceful and authentic scene East Bali has to offer. Here lies the shadow of the mighty Mount Agung, or the Mother Mountain, as this region sits on the foothills of the mountain. You might not hear East Bali as a tourist destination, nor the towns that dominate it, Amed, Candidasa, and Tenganan. But that is exactly  where its uniqueness lies ; there’s very little number of tourists to share it with. It has what Bali already had this whole time; misty mountains, rice terraces on hillsides, and wild volcanic beaches. 
					</p> 

					<br/>
					<h5 className="img-title">Besakih Temple</h5>
					<img className="img-content" src="/images/blog/bali/besakih.png"></img>
					<span className="img-source">Source: villa-bali.com</span>
					<p>
						The whole east coast of Bali is littered with amazing beaches and surf breaks, but many surfers who make the discovery keep the locations to themselves, so that surely gives a personal challenge for you to discover one for yourself. East Bali also hosts Bali’s holiest of temples, The Mother Temple of Besakih, that stands as one of the most significant Hindu temples. This temple must be added to the go-to list of every visitor to Bali. You can see now, how this region has nothing less to offer than the others, and that probably it’s time for you to have a taste of East Bali, ‘the antidote to the modern world.’
						See also: Amed, Klungkung, Candidasa, Padang Bai, Tenganan, Mount Agung, Tirta Gangga
					</p>
					<br/> 

					<h5 className="section-title">West Bali</h5>
					<p>
						Being the least populated and least visited of Bali, this region is dominated by the West Bali National Park and a huge area of protected reserve. The West Bali National Pak is mountainous and consists of very varied forests, such as monsoon and mangrove, dry savanna, acacia scrub and lowland rain forest, as well as both shallow and deep sea waters. If you are feeling adventurous, you can do trekking and bird-watching while hoping you might get to spot some exotic species preserved in this national park.  

						See also: Amed, Klungkung, Candidasa, Padang Bai, Tenganan, Mount Agung, Tirta Gangga
					</p> 

					<br/>
					<h5 className="img-title">Ulun Danu Bratan</h5>
					<img className="img-content" src="/images/blog/bali/ulundanu.png"></img>
					<span className="img-source">Source: justgola.com</span>
					<p>
						Although this area remains mostly less visited, you can still find some top sights in West Bali, such as Tanah Lot for its spectacular sunset view, Ulun Danu Bratan Temple on the shore of the lake, or Taman Ayun Temple, a formerly royal water of the Mengwi Kingdom that is surrounded by a wide and elegant moat. This western coast of Bali also host popular surfing spots such as Balian and Medewi Beach. Or shall you need to hop to Java, you can head to the town of Gilimanuk that sits on the westernmost tip of Bali, as departure point for ferries. When you travel to this western part of Bali, make sure that you have a heart for a whole new Bali experience.
						See also: Negara, Gilimanuk, Medewi, Pemuteran, Tabanan
					</p> 
					<br/> 

					<h5 className="section-title">North Bali</h5>
					<p>
						For a long time, the northern region of Bali has been isolated from the others due to the mountain barriers that divide it apart from east to west. This also accounts for the fact that North Bali still has its own typical rites and customs. North Bali consists mainly of the district of Buleleng with the city of Singaraja acts as its capital. Singaraja is also the second largest city in Bali that is dominated by tree-lined streets and the remains of Dutch colonial buildings.
					</p> 

					<br/>
					<h5 className="img-title">Dolphin Watching at Lovina Beach</h5>
					<img className="img-content" src="/images/blog/bali/dolphin.png"></img>
					<span className="img-source">Source: balitarisland.com</span>
					<p>
						Close to Singaraja, you can find the secluded tourist resort of Lovina Beach that harbors black sand beach and is well known for dolphin-watching site that will enchant you during sunrise hour. You can also flock to some of Bali’s best waterfalls and hotsprings in Banjar, where people come to soak in sacred spring waters flowing out of dragon mouths. Or if you seek more misty mountains and chilly air, Bedugul is where you should go. All the more, Bedugul also hosts the famed pre-wedding photoshoot destination, Tamblingan Lake, which is filled with picturesque nature serving as the perfect backdrop for your timeless memory. All in all, North Bali surely earns its name as ‘the other side of Bali’ thanks to the blend of authentic culture and pristine nature, accompanied by its tranquil and rural surroundings.
						See also: Lovina, Singaraja, Bedugul, Banjar
					</p> 

					<h5 className="section-title">Southeastern Islands</h5>
					<p>
						The Southeastern Islands of Bali consist of three main islands, such as Nusa Lembongan, Nusa Penida, and Nusa Ceningan. They are quiet offshore islands popular for diving and surfing activities, and also provide one of the most relaxing atmospheres all across Bali. The Southeastern Islands are separated from the mainland by the Badung Strait, and you can reach these islands by taking boat from Bali. Nusa Lembongan has been praised as ‘a surfer’s dream,’ and by far the best known island in the southeast. With the gradual tourism-related infrastructure development, Nusa Lembongan now provides more comfortable places to stay while still remains as popular surfing location with three highly rated breaks. Heading to the west from Nusa Lembongan, you can reach to Nusa Ceningan, the smallest of the trio, through a yellow suspension bridge. Nusa Ceningan also has notable surf breaks which attract some surfers away from the more crowded breaks on Nusa Lembongan. And if you seek for a wild and untamed island which provides world class diving among these three, Nusa Penida is only 10 kilometers away west of Nusa Ceningan. Although it has very little in the way of tourist facilities, this island possesses stunning natural rugged beauty worth visiting to complement your adventurous quest.
					</p> 
					<br/>
					<h5 className="img-title">Nusa Penida</h5>
					<img className="img-content" src="/images/blog/bali/nusapenida.png"></img>
					<span className="img-source">Source: journeyera.com</span>
					<p>
						Now that you’ve known the very basic things of Bali, you can start preparing for your trip and unravel the mysteries of Bali in the most exciting ways. Find out more from our other articles and we will guide you and deep dive on what to do all across Bali!
					</p> 

				</div>

				<div id="findthisplace">FIND THIS PLACE
				<br/>WITH OUR AWESOME PHOTOGRAPHERS!</div>
				<Link  to="/search/?destination=&date=" style={{marginBottom:'64px'}} className="btn-check-it-out" >
                	CHECK IT OUT
                </Link>
				<div className="blog-tab">
		        	<span className="tab-item active">RELATED POST</span>
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

export default BlogDetail;
