import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const Logo = () => (
	<div className="LoaderWrapper">
		<FontAwesomeIcon className="fa-spin Loader" icon={faCircleNotch}/>
	</div>
);

export default Logo;