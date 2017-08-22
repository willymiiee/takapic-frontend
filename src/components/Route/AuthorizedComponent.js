import React from 'react';
// import _ from 'lodash';
 
class AuthorizedComponent extends React.Component {
 
  componentWillMount() {
    console.log(this.props);
    // const { routes } = this.props; // array of routes
    // const { router } = this.context;
 
    // // check if user data available
    // const user = this.props.user;
    // console.log(user, 'from auth');
    // if (!user) {
    //   // redirect to login if not
    //   router.push('/sigin');
    // }
 
    // // get all roles available for this route
    // const routeRoles = _.chain(routes)
    //   .filter(item => item.authorize) // access to custom attribute
    //   .map(item => item.authorize)
    //   .flattenDeep()
    //   .value();

    // console.log(routeRoles);
 
    // compare routes with user data
    // if (_.intersection(routeRoles, user.roles).length === 0) {
    //   router.push('/not-authorized');
  }
}

export default AuthorizedComponent;