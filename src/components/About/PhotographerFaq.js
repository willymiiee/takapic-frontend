import React from 'react';

import Page from '../Page';

const PhotographerFaq = props => {
  return (
    <Page>
      <div className="container" style={{ marginTop: '50px'}}>
        <div className="panel setup-content">
          <div className="panel-body" style={{padding:'0px'}}>
            <h2 style={{marginBottom:'30px', textAlign:'center'}}>Photographer FAQ</h2>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Why should I sign up with Takapic?</h3>
              <p className="content-faq">At Takapic, we can offer the following features, advantages and benefits to you, the photographer:</p>
              <div className="table-responsive table-content">
                <table className="table table-striped">
                  <thead>
                    <th>Key Features</th>
                    <th>Advantages</th>
                    <th>Benefits</th>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Easy and Free Sign Up</td>
                    <td>Saves advertising fees </td>
                    <td>Get charged transaction fee only upon confirmed jobs from customers</td>
                  </tr>
                  <tr>
                    <td>International Online Platform and Matching</td>
                    <td>Greater access to domestic and global customers</td>
                    <td>More business and revenue</td>
                  </tr>
                  <tr>
                    <td>Manage your Schedule</td>
                    <td>Convenient way to view all pending jobs</td>
                    <td>Better utilization of your working hours and camera equipment</td>
                  </tr>
                  <tr>
                    <td>Ratings system</td>
                    <td>Helps you understand your service quality vs peers as judged by your customers</td>
                    <td>Improve your service quality and get priority tdeatment if you are consistent highly rated photographer on the platform</td>
                  </tr>
                  <tr>
                    <td>Monthly competition for top photographer</td>
                    <td>Additional revenue/bonus</td>
                    <td>Recognition from customer of your quality of photos and reward from us for a job well done</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">How do I get started?</h3>
              <p className="content-faq">Create your profile page to display your best work. Each photographer has a beautiful profile on Takapic showcasing your best work and style.</p>
            </div>

            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h4 className="title-faq">As Takapic will be a middleman to connect traveler and photographer, How we filter the quality of photographers? How we manage a complaint between photographers and travelers?</h4>
              <p className="content-faq">Photographers will sign up either using google + account, fb account or email. They will also have to provide their mobile number and our team will conduct checking to ensure it is an actual photographer. As photography styles can be subjective, we do not restrict only professional photographers from joining us. We encourage free-lance and even hobbyist photographers who have the passion and like interacting with people to sign up with us as well. Ultimately, it is the traveller who decides which photographer they are comfortable with based on budget, photo styles, ratings and reviews.</p>
            </div>

            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">How do travellers get the photos from photographers?</h3>
              <p className="content-faq">We will have exclusive online galleries where the photographers will upload the photos taken of the travellers. These photos are password protected and only the traveller will have access to their own photos.</p>
            </div>

            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Payment method? Pay in advance? Or pay when traveller uses the service?</h3>
              <p className="content-faq">Similar to Airbnb, the traveller pays in advance when they book the photographer through our platform. After the photo shoot, we aim to release the fee to the photographer as soon as possible once both traveller and photographer provides rating/review that there is no dispute happening during the shoot. We are also working on the finer details to pay the photographer in their preferred local currency when they list their package prices.</p>
            </div>

            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h4 className="title-faq">Does Takapic have official Facebook or official Instagram to connect with users or promote the website?</h4>
              <p className="content-faq">Yes we have registered our official Facebook and Instagram account but am keeping it under wraps till we generate some promotional content to tie in with our soft launch.</p>
            </div>

            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">As the founders of Takapic, where is your income?</h3>
              <p className="content-faq">Our four founders age range between 29-40 and we all have enough working experience to put in our own starting funds to build up our MVP (minimum viable product). When we scale to more cities, we will raise more funds from angel investors and VCs as what start-ups typically do. We believe in Takapic as we are avid travellers and amateur photographers ourselves and we want to build a vibrant community for travellers and photographers alike.</p>
            </div>

            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h4 className="title-faq">If traveller visits a country for example Thailand for 10 days and they will be in 3 cities, how do they book a photographer? 1 for each city or 1 photographer follows the traveler in 3 cities.  What about the accommodation of photographer?  </h4>
              <p className="content-faq">We aim to be present and offer the service in every city. It is more economical and hassle free for the traveller to book a photographer in each city rather than have one photographer travel together with the traveller. This may also be awkward for both parties and intrude onto private time.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h4 className="title-faq">Is Takapic service completely free for me?  </h4>
              <p className="content-faq">It is absolutely free to sign up and build your profile and portfolio on our platform. You will only get charged a transaction fee upon successful completed jobs for the traveller/customer. The transaction fee is 5% of your list price. So for example, if you list price is $100 in your local currency for 1 hour service and you complete a job for this, Takapic will take $5 and you will get $95 for the job. This transaction fee is to cater for exchange rate conversion, bank/credit card charges when you get paid back to your local currency.</p>
            </div>
            <div className="smooth-card radius-0" style={{padding:'16px 24px 16px 24px'}}>
              <h3 className="title-faq">Why is the price on my public photographer page higher than the one I listed?</h3>
              <p className="content-faq">Your photographer page shows the final price that the traveller will pay in US dollars as this is the commonly accepted currency worldwide. This includes exchange rate conversion, service fee, and tax (when applicable). What the traveller sees is what he pays & what you list is what you get paid.</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PhotographerFaq;
