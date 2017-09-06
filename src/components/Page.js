import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default props =>
	<div>
		<Header />
		{props.children}
		<Footer />
	</div>;
