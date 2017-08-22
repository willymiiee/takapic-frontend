import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom'

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     props.user ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/signin',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

class PrivateRoute extends Component{
  render() {
    let {component: Component, ...rest} = this.props;
    return(
      rest.user !== null && <Route {...rest} render={props => (
        rest.user ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/signin',
            search: 'redirect='+this.props.path,
            state: { from: props.location }
          }}/>
        )
      )}/>
    )
  }
}

function mapStateToProps(state) {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(PrivateRoute);