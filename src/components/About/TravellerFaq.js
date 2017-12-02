import React from 'react';

import Page from '../Page';

const TravellerFaq = props => {
  return (
    <Page>
      <div className="container" style={{ marginTop: '50px'}}>
        <div className="panel setup-content">
          <div className="panel-body" style={{padding:'0px'}}>
            <h2 style={{marginBottom:'30px', textAlign:'center'}}>Traveller FAQ</h2>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">How do I book my photo shoot?</h3>
              <p className="content-faq">First search and select your photographer. Once you are on his profile using the booking widget to fill when you want the shoot and hit "Request to book" . This will take you to a secured page where you will enter additional information. Once complete, your booking will be sent to the photographer to accept or reject. Once he accepts, Takapic will link both parties up and you can discuss finer details with your photographer.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Will I be able to contact or chat with my photographer?</h3>
              <p className="content-faq">Yes you can! Before you decide to book, you can use our Takapic chat function to talk to a photographer to find out more about his shooting style. We want you to be comfortable that you will not be meeting a stranger and encourage you to get to know the photographer beforehand.  Once booking is confirmed, your photographer will contact you via chat or email to finalise meet up location and other details of the shoot.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Can my photographer suggest the best photo shoot spots?</h3>
              <p className="content-faq">Definitely, your photographer can suggest the best places according to your style and what you want to explore. This is your benefit of booking a Takapic photographer who is a local to the city you are visiting. </p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Where do I meet my photographer?</h3>
              <p className="content-faq">On your booking summary page, your photographer will suggest a few meet up locations for you to choose. You can select from these locations or you can specify where you would like to meet  for example, your hotel lobby. You can also arrange for a different meet up location nearer the date with your photographer through chat function or email if there is a change in plans.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Do I get charged if the photographer cancels?</h3>
              <p className="content-faq">No, you don't. If the photographer cancels the shoot for any reason you will be entirely reimbursed.
                Do I get charged if the photographer does not accept my booking request?
                No. When you send a request to book a photo shoot your card is not charged but simply authorized. If the photographer declines or fails to respond, we will cancel the transaction and you will not be charged.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">How do I modify the date & time of a booking?</h3>
              <p className="content-faq">To modify a booking, simply go to your dashboard > photo shoots > upcoming section and hit the button with a pen icon. You can then send a modification request to your photographer to change the date & time.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">How do I cancel a booking?</h3>
              <p className="content-faq">Go to dashboard > photo shoots > upcoming section and hit the red cross button. Make sure you are aware the cancellation policy (see below) before you cancel the shoot.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Can I reschedule or cancel my photo shoot?</h3>
              <p className="content-faq">Our refund policy is as follows:<br/>
                <ul>
                  <li>At least 3 days in advance, you will receive a 90% refund.</li>
                  <li>After 3 days or within 72 hours of your photo shoot, no refund will be issued (unless in case of emergency).</li>
                </ul></p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">When do I receive the pictures of my photo shoot?</h3>
              <p className="content-faq">You will receive your pictures within 48 hours after your photoshoot.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">How do I receive the pictures of my photo shoot?</h3>
              <p className="content-faq">You will be able to view your pictures in your exclusive Takapic online gallery.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">When does my card get charged?</h3>
              <p className="content-faq">Your card will be authorized when you request to book and you will be charged when the photographer confirms.
                How are Takapic photographers selected to be on the platform?
                All of the photographers who join our platform are verified, screened and approved by our team. Each photographer also has reviews based on recommendations from previous clients to help make an informed decision. A Takapic photographer is typically a freelancer who is passionate about his work and has his own style.
              </p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Who can leave a review for the photographer?</h3>
              <p className="content-faq">All the reviews on Takapic are written by past clients, so any review you see is based on a photo shoot that was booked through Takapic. A photographer needs to receive star ratings from at least 3 clients before their aggregate score appears.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Can I see the photographer’s portfolio before I book?</h3>
              <p className="content-faq">Of course! You can view each photographer’s personal portfolio page.  On each page, you can discover more about the Takapic photographer, his style and experience, selection of camera equipment and examples of his photography.   </p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">How long in advance should I book my shoot?</h3>
              <p className="content-faq">There is no fixed duration that you should book in advance as long as your selected photographer is available for the date and time you require. However, we suggest you book at least a week in advance to avoid disappointment if his slot is taken up nearer the date you are looking at. </p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">How many people can book a shoot together?</h3>
              <p className="content-faq">This is a time-based model; however, if you have 6 or more people in your group,we recommend to go for at least the 2 hours package if you've got a long list of 'must have' shots.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Will you share my photos online without asking permission first? </h3>
              <p className="content-faq">Absolutely not. We fully respect your choice on whether to share. Any photos you see on our website and social media pages are from customers who have given us their consent that we can share their photos online. In your online gallery page, you have the option of 1) allowing Takapic to share your photos for others to admire, 2) only selected photos that you would like to share or 3) keeping the photos private to yourself.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Do I own the rights to my photos?</h3>
              <p className="content-faq">You have the right to use the photos for personal use. While we encourage you to share them with the world or print them out,  you may not alter or re-sell them. Takapic retains the copyright of the photos.
                What happens if I don’t make it to my photo shoot?
                No refund will be issued for no-shows with the exception of emergencies or unforeseen circumstances.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">What if I am running late?</h3>
              <p className="content-faq">Please text or email your photographer if you are delayed. If you arrive late, keep in mind your photographer may have another shoot booked right after, and it's unlikely your shoot can be extended (although it's always possible, so please ask!). We suggest arriving early and even having a drink nearby so you don't begin your experience in a 'rushed' state of mind.
                If you arrive late for your session, any time that has passed from your original start time will be forfeited, and you may shoot for the remainder of the time you have booked. The number of photos delivered may be adjusted to reflect the actual time spent together. You may add additional time if the photographer is free and add on time will be prorated based on 30 minute blocks.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">What happens if it’s raining?</h3>
              <p className="content-faq">We shoot rain or shine and it is no problem – just bring your favourite umbrella. However, if it is a thunderstorm, then the photoshoot can be rescheduled.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">What format will I receive my photos in?</h3>
              <p className="content-faq">Photos in your online gallery and high resolution link are provided in JPEG format.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Can I choose which photos I receive in my gallery?</h3>
              <p className="content-faq">The Takapic photographer delivers only your best photos to you. As industry practice, your photographer removes any photos with funny faces, closed eyes, and improper lighting. Due to the nature of candid photography, not all shots that are taken will turn out as planned, but if you have any 'must have' shots, we would be more than happy to prioritize those shots so that that they end up in your final gallery. </p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">What kind of photo editing is included in my package? </h3>
              <p className="content-faq">Our style is typically candid and natural with outdoor lighting. Photographers will provide only basic editing, such as colour balance and cropping. Photoshopping or extensive editing is not included.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Can I book a Takapic photographer for a commercial project?</h3>
              <p className="content-faq">For questions about commercial shoots, please contact us with the details of your project. We will then send you more information about commercial pricing options. </p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Can I book a Takapic photographer for my wedding?</h3>
              <p className="content-faq">Currently, Takapic does not cover wedding day event services. However, we suggest you can consider a pre-wedding photoshoot at your travel destination city by selected Takapic photographers. Couples should feel free to dress in their wedding attire, but keep in mind that our photo shoots are limited to a private, candid shoots.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Takapic does not seem to have photographers in my desired destination. What are my options?  </h3>
              <p className="content-faq">
                We are always looking for new destinations where travellers can enjoy the Takapic experience. Please contact us and we will see what we can do!
                Once I pay for the photo shoot, are there any additional fees or charges I need to be aware of?

                You are responsible for any admission fees or transportation fees during the photo shoot. This could include but is not limited to for example paid entry to museums or attractions, Uber, transportation etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default TravellerFaq;
