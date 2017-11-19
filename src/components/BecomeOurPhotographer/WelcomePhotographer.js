import React from 'react';
import { Link } from 'react-router-dom';

import Page from '../Page';

const WelcomePhotographer = props => {
  return (
    <Page>
      <div className="container" style={{ marginTop: '25px', padding: '0 25px' }}>
        <div className="panel setup-content">
          <div className="panel-body">
            <div className="welcome-photographer-wrapper">
              <div className="speech-headline">
                <h1>Earn money as a Takapic Photographer</h1>
                <Link to="/photographer-registration/s1" className="push">Get Started</Link>
              </div>

              <div className="speech-detail-wrapper">
                <h2 className="speech-title">Why become a Takapic Photographer</h2>

                <h3>1. Free sign up</h3>
                <p>No subscription or sign up fees to be on the platform</p>

                <h3>2. Easy access to global travellers</h3>
                <p>
                  Get discovered by travellers all over the world, not just within your city. Utilise Takapic to manage your schedule
                  effectively so you can just concentrate on taking beautiful pictures and earning extra income.
                </p>

                <h3>3. Your personalized portofolio page</h3>
                <p>
                  Takapic will provide you with a personalized portofolio page where you can showcase yourself and your work.
                  You also decide on your pricing. This is your art, your rules, your price.
                </p>

                <h1 style={{ textAlign: 'center' }}>Sign up to be a Takapic Photographer</h1>

                <h2 className="speech-title">Start by creating your profile</h2>

                <h3 className="speech-sub-title">What's in a profile</h3>
                <p>
                  You'll fill out your location, short description of yourself, your camera equipment, your specialties and
                  languages spoken, upload your best photos, and assign a price for each photography package. Your profile
                  listing help travellers get a sense of what you are like.
                </p>

                <h3 className="speech-sub-title">Who can book</h3>
                <p>
                  You set the availability and price for your listing. Photographer controls and calendar settings can help
                  make scheduling easier.
                </p>

                <h3 className="speech-sub-title">Travellers find your listing and book</h3>
                <p>
                  You'll get a reservation confirmation and a message from your traveller
                </p>

                <h3 className="speech-sub-title">Message your traveller</h3>
                <p>
                  Messaging online via chat functions helps you get to know travellers and answer any questions.
                </p>

                <h3 className="speech-sub-title">How travellers pay</h3>
                <p>
                  Takapic handles all of the payments you never have to deal directly with money. Travellers get charged
                  before the photoshoot.
                </p>

                <h3 className="speech-sub-title">How you get paid</h3>
                <p>
                  Some of the ways you can choose to get paid include Paypal, direct deposit, and international money wire.
                  Your payment is automatically sent 48 hours after the photoshoot. Easy!
                </p>

                <h3 className="speech-sub-title">Earning and fees</h3>
                <p>
                  Listing your profile on Takapic is free! Takapic takes 5% service fee on each reservation.
                </p>

                <h3 className="speech-sub-title">What to charge</h3>
                <p>
                  What you charge is up to you. Takapic will provide a suggested price range based on location and traveller trends
                  but it is not compulsory for you to follow it.
                </p>

                <h2 className="speech-title">We've got your back</h2>

                <h3>Takapic is built on trust</h3>
                <p>
                  We require verified information from both photographers and travellers, including phone number. After a trip,
                  everyone gets a chance to write a review. Reviews keeps guests accountable for treating hosts and their homes
                  with respect.
                </p>

                <h3>So much more than money</h3>
                <p>
                  Besides extra income, photographers join a supportive worldwide community. There are always opportunities
                  to learn from Takapic and other photographers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default WelcomePhotographer;
