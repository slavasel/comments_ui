import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = theme => ({
	firstLetter: {
		color: '#ff7272',
		fontSize: '16px',
	}
});

const TaleMarkup = (props) => {
	const { text, classes } = props;
	const firstLetter = text.substring(0, 1).toUpperCase();
	const restText = text.substring(1);
	return (
		<div>
			<span className={classes.firstLetter}>
				{firstLetter}
			</span>
			{restText}
		</div>
	);
};

TaleMarkup.propTypes = {
	text: PropTypes.string.isRequired,
};

export default injectSheet(styles)(TaleMarkup);