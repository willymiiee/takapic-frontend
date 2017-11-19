import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setMeetingPoint} from '../../store/actions/photographerServiceInfoActionsStep2';
import {dashify} from "../../helpers/helpers";

import MapWithASearchBox from './../MapWithASearchBox';
import Page from '../Page';

class Step2SetupMeetingPointA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingPoints: [],
            mapLoaded: false,
        };
    }

    componentDidMount() {
        this.setState({mapLoaded: true});
    }

    handleSubmit = event => {
        event.preventDefault();
        let {meetingPoints} = this.state;
        if (meetingPoints.length < 1) {
            alert('Please create at least one meeting point. You cannot leave this empty');
            return false;
        } else {
            const {
                photographerServiceInfoStep2: {detailMasterPackage},
                user: {uid, email, userMetadata: {accountProviderType}},
                userInitProfile: {notAvailableDates}
            } = this.props;

            let {meetingPoints} = this.state;
            let packagesPrice = [];

            for (let key in detailMasterPackage) {
                if (detailMasterPackage.hasOwnProperty(key)) {
                    let value = detailMasterPackage[key];
                    packagesPrice = [
                        ...packagesPrice,
                        {
                            packageName: value.packageName,
                            price: value.price,
                            requirement: value.requirement,
                        },
                    ];
                }
            }

            meetingPoints = meetingPoints.map(p => {
                return {
                    lat: p.generalLocation.lat,
                    long: p.generalLocation.long,
                    meetingPointName: p.generalLocation.meetingPointName,
                    placeLocationNotes: p.specificLocation,
                    formattedAddress: p.generalLocation.formattedAddress
                };
            });

            let reference = '';
            if (accountProviderType === 'google.com') {
                reference = 'googlecom-' + uid;
            } else {
                reference = dashify(email);
            }

            const params = {
                reference,
                packagesPrice,
                meetingPoints,
                notAvailableDates
            };
            this.props.setMeetingPoint(params);
        }
    };

    handleAddition = params => {
        if (
            params.generalLocation &&
            params.specificLocation &&
            this.state.meetingPoints.length < 3
        ) {
            const {generalLocation, specificLocation} = params;
            let {meetingPoints} = this.state;
            meetingPoints = [...meetingPoints, {generalLocation, specificLocation}];
            this.setState({meetingPoints});
        }
    };

    render() {
        return (
            <Page>
                <div className="container" id="photographer-landing">
                    <div className="steps steps-4">
                        <div/>
                        <div/>
                        <div className="active"/>
                        <div/>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-8">
                            <h4>Please choose three different meeting points</h4>
                            <hr/>
                            {this.state.mapLoaded && (
                                <MapWithASearchBox
                                    handleAddition={this.handleAddition}
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBrXtsaqVz4UqYExEyRaf9jv5sEPJqeke8&v=3.exp&libraries=geometry,drawing,places"
                                    loadingElement={<div style={{height: `100%`}}/>}
                                    containerElement={<div style={{height: `400px`}}/>}
                                    mapElement={<div style={{height: `100%`}}/>}
                                />
                            )}
                        </div>
                        <div className="col-md-4">
                            <h4>Your Created Point</h4>
                            <hr/>
                            {this.state.meetingPoints.map((p, key) => (
                                <div key={key}>
                                    {/* ini list number meeting point */}
                                    <div className="row">
                                        <div className="number-of-meetpoint col-xs-2">{key + 1}</div>
                                        <div className="detail-of-meetpoint col-xs-8">
                                            <stong>{p.generalLocation.meetingPointName}</stong>
                                            <p>{p.generalLocation.formattedAddress}</p>
                                            <h6>{p.specificLocation}</h6>
                                        </div>
                                        <button
                                            className="delete-button col-xs-2"
                                            onClick={event => {
                                                let {meetingPoints} = this.state;
                                                meetingPoints = [
                                                    ...meetingPoints.slice(0, key),
                                                    ...meetingPoints.slice(key + 1),
                                                ];
                                                this.setState({meetingPoints});
                                            }}>
                                            <i className="fa fa-close"/>
                                        </button>
                                    </div>
                                    <hr/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr/>
                    <div style={{overflow: 'hidden'}}>

                    </div>
                    <Link
                        to="/become-our-photographer/step-2-4"
                        className="button"
                        onClick={this.handleSubmit}
                        style={{float: 'right'}}
                    >
                        Next
                    </Link>
                    <Link
                        style={{float: 'right'}}
                        to="/become-our-photographer/step-2-2" className="button">
                        Back
                    </Link>
                </div>
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userAuth,
    photographerServiceInfoStep2: state.photographerServiceInfoStep2,
    userInitProfile: state.userInitProfile
});

const mapDispatchToProps = dispatch => ({
    setMeetingPoint: payload => dispatch(setMeetingPoint(payload)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Step2SetupMeetingPointA)
);
