import React from 'react';
import AuthorizedComponent from './Route/AuthorizedComponent';

class Secret2 extends AuthorizedComponent{
  componentWillMount(){
    console.log(this.props, 'secret');
  }

  render(){
    return (
      <div>
        asdfyugsbdufsadfd<br/>asdfyugsbdufsadfd<br/>asdfyugsbdufsadfd<br/>asdfyugsbdufsadfd<br/>asdfyugsbdufsadfd<br/>
      </div>
    )
  }
}

export default Secret2;