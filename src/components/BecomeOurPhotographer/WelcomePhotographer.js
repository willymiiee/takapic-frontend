import React from 'react';
import { Link } from 'react-router-dom';

import Page from '../Page';

const WelcomePhotographer = props => {
  return (
    <Page>
      <div className="container" style={{ marginTop: '50px'}}>
        <div className="panel setup-content">
          <div className="panel-body" style={{padding:'0px'}}>
            <div className="card radius-0" style={{padding:'0px'}}>
              <div className="scroll-view" style={{marginBottom:'20px'}}>
                <h2 className='title-welcome'>Earn Money as a Takapic Photographer</h2>
                <div style={{backgroundColor:'#f4f4f4', padding:'16px'}}>
                  <div className="speech-detail-wrapper">
                    <h4 className="speech-title">Why become a Takapic Photographer</h4>
                    <hr/>
                    <h4  className="speech-sub-title">1. Free sign up</h4>
                    <p>No subscription or sign up fees to be on the platform</p>

                    <h4  className="speech-sub-title">2. Easy access to global travellers</h4>
                    <p>
                      Get discovered by travellers all over the world, not just within your city. Utilise Takapic to manage your schedule
                      effectively so you can just concentrate on taking beautiful pictures and earning extra income.
                    </p>

                    <h4  className="speech-sub-title">3. Your personalized portfolio page</h4>
                    <p>
                      Takapic will provide you with a personalized portfolio page where you can showcase yourself and your work.
                      You also decide on your pricing. This is your art, your rules, your price.
                    </p>

                    <hr/>
                    <h3>Sign up to be a Takapic Photographer</h3>
                    <hr/>
                    <h4 className="speech-title">Start by creating your profile</h4>
                    <hr/>
                    <h4 className="speech-sub-title">What's in a profile</h4>
                    <p>
                      You'll fill out your location, short description of yourself, your camera equipment, your specialties and
                      languages spoken, upload your best photos, and assign a price for each photography package. Your profile
                      listing help travellers get a sense of what you are like.
                    </p>

                    <h4 className="speech-sub-title">Who can book</h4>
                    <p>
                      You set the availability and price for your listing. Photographer controls and calendar settings can help
                      make scheduling easier.
                    </p>

                    <h4 className="speech-sub-title">Travellers find your listing and book</h4>
                    <p>
                      You'll get a reservation confirmation and a message from your traveller
                    </p>

                    <h4 className="speech-sub-title">Message your traveller</h4>
                    <p>
                      Messaging online via chat functions helps you get to know travellers and answer any questions.
                    </p>

                    <h4 className="speech-sub-title">How travellers pay</h4>
                    <p>
                      Takapic handles all of the payments you never have to deal directly with money. Travellers get charged
                      before the photoshoot.
                    </p>

                    <h4 className="speech-sub-title">How you get paid</h4>
                    <p>
                      Some of the ways you can choose to get paid include Paypal, direct deposit, and international money wire.
                      Your payment is automatically sent 48 hours after the photoshoot. Easy!
                    </p>

                    <h4 className="speech-sub-title">Earning and fees</h4>
                    <p>
                      Listing your profile on Takapic is free! Takapic takes a service fee on each reservation.
                    </p>

                    <h4 className="speech-sub-title">What to charge</h4>
                    <p>
                      What you charge is up to you. Takapic will provide a suggested price range based on location and traveller trends
                      but it is not compulsory for you to follow it.
                    </p>

                    <hr/>
                    <h4 className="speech-title">We've got your back</h4>
                    <hr/>
                    <h4>Takapic is built on trust</h4>
                    <p>
                      We require verified information from both photographers and travellers, including phone number. After a trip,
                      everyone gets a chance to write a review. Reviews keeps guests accountable for treating hosts and their homes
                      with respect.
                    </p>

                    <h4>So much more than money</h4>
                    <p>
                      Besides extra income, photographers join a supportive worldwide community. There are always opportunities
                      to learn from Takapic and other photographers.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{overflow:'hidden'}}>
                <Link className="button speech-button"
                      to="/photographer-registration/s1" >Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default WelcomePhotographer;
