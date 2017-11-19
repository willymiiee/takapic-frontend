import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {selfDescription} from '../../store/actions/photographerServiceInfoActions';

import Page from 'components/Page';

class Step1GrabInterestingSelfIntroduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selfDescription: '',
        };

        this.nextStepHandler = this.nextStepHandler.bind(this);
        this.selfDescriptionChangeHandler = this.selfDescriptionChangeHandler.bind(
            this
        );
    }

    nextStepHandler(evt) {
        this.props.selfDescription(this.state.selfDescription);
    }

    selfDescriptionChangeHandler(evt) {
        this.setState({selfDescription: evt.target.value});
    }

    render() {
        return (
            <Page>
                <div className="container" id="photographer-landing">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="card radius-0">
                                <div className="steps steps-3">
                                    <div/>
                                    <div className="active"/>
                                    <div/>
                                </div>
                                <hr/>
                                <h4>Tell travellers something interesting about yourself</h4>
                                <textarea
                                    defaultValue={this.state.selfDescription}
                                    onChange={this.selfDescriptionChangeHandler}
                                    style={{marginTop: '30px'}}
                                    placeholder={'I am...'}
                                />
                                <div style={{overflow:'hidden'}}>
                                    <Link
                                        to="/become-our-photographer/step-1-3"
                                        className="button"
                                        onClick={this.nextStepHandler}
                                        style={{float: 'right'}}
                                    >
                                        Next
                                    </Link>
                                    <Link
                                        to="/become-our-photographer/step-1-1"
                                        className="button button-white-no-shadow u"
                                        style={{float: 'right'}}
                                    >
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default connect(null, dispatch => ({
    selfDescription: description => dispatch(selfDescription(description)),
}))(Step1GrabInterestingSelfIntroduction);
