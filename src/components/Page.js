import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default props =>
	<div>
		<Header />
		<div style={{ paddingTop: '25px'}}>
      {props.children}
		</div>
		<Footer />
	</div>;
