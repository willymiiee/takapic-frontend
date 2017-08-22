import React, {Component} from 'react';
import SearchResult from './SearchResult';
import queryString from 'query-string';
import DateTime from 'react-datetime';
import moment from 'moment';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: {
                destination: '',
                date: ''
            },
            cities: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onSearchChange(key, event) {
        let value = '';
        if(key === 'date'){
            value = event.format('MM-DD-YYYY');
        } else {
            value = event.target.value;
        }

        this.setState({
           search: Object.assign({}, this.state.search, {[key]: value})
        });
    }

    handleSubmit(e){
        let {destination, date} = this.state.search;
        e.preventDefault();
        this.props.history.push({
            pathname: '/search',
            search: 'destination='+destination+'&date='+date,
            state: {
                referrer: '/',
                search: this.state.search
            }
        })
    }

    componentWillMount(){
        let search = queryString.parse(this.props.location.search);
        this.setState({search: search});
    }

    componentDidMount(){
        window.$('#landing-page-search > div > input').focus(function() {
            window.$('#landing-page-search').addClass('focus');
        }).blur(function() {
            window.$('#landing-page-search').removeClass('focus');
        });
    }

    render(){
        let {destination, date} = queryString.parse(this.props.location.search);
        let yesterday = moment().subtract( 1, 'day' );
        let valid = function( current ){
            return current.isAfter( yesterday );
        };
        return(
            <div>
                <div className="container">
                    <div id="landing-page-top" className="srp">
                        <div id="landing-page-search" className="srp">
                            <Autocomplete
                                inputProps={{placeholder: "Destination"}}
                                items={this.state.cities}
                                menuStyle={{
                                    borderRadius: '3px',
                                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                    background: 'white',
                                    padding: '2px 0',
                                    position: 'fixed',
                                    overflow: 'auto',
                                    maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
                                    color: '#333'
                                }}
                                getItemValue={item => item}
                                renderItem={(item, highlighted) =>
                                    <div
                                        style={{
                                            backgroundColor: highlighted ? '#eee' : 'transparent',
                                            padding: '2px 6px',
                                            fontSize: '14px'}}
                                    >
                                        {item}
                                    </div>
                                }
                                value={this.state.search.destination}
                                onChange={e => {
                                    this.setState({
                                        search: Object.assign({}, this.state.search, {destination: e.target.value})
                                    });
                                    axios.get('/tes/cities.json')
                                        .then((res) => {
                                            let cities = res.data.cities;
                                            this.setState({cities})
                                            console.log(res.data)
                                        })
                                        .catch((error) => console.log(error));
                                }}
                                onSelect={value => {
                                    this.setState({
                                        search: Object.assign({}, this.state.search, {destination: value})
                                    })
                                }}
                                wrapperStyle={{}}
                            />
                            <DateTime value={this.state.search.date}
                                onChange= {this.onSearchChange.bind(this, 'date')}
                                inputProps={{placeholder: "Date"}} timeFormat={false}
                                dateFormat="MM-DD-YYYY"
                                isValidDate={valid} />
                            <button className="button" onClick={this.handleSubmit}>
                                <i className="fa fa-search"></i><span>Search</span>
                            </button>
                        </div>
                    </div>

                    <div id="result-filter">
                        <div>
                            <div>Price Range<div className="hidden">: $14 USD - $15 USD+</div><i className="fa fa-caret-down margin-left-5"></i></div>
                        </div>
                    </div>
                    <div id="result-view">
                        <i id="result-view-grid" className="fa fa-th-large active" title="Grid View"></i>
                        <i id="result-view-list" className="fa fa-th-list" title="List View"></i>
                    </div>
                    <SearchResult 
                      destination={destination}
                      date={date} />
                </div>
            </div>
        )
    }
}

export default Search;