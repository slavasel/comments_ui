import React, { useState } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Badge } from 'react-bootstrap';


const styles = theme => ({
	root: {
		fontSize: '13px',
		margin: '0 10px',
		'& span': {
			margin: '5px',
			fontSize: '12px',
			cursor: 'pointer',
		}
	},
});

const Badges = (props) => {
	// STATE VARS
	const [selected, changeSelected] = useState([]);

	// PROPS
	const { tags, onChange, classes } = props;

	// METHODS
	const toggleBadge = (tag) => {
		const idx = selected.indexOf(tag);
		const newSelected = [...selected];
		if (idx !== -1) {
			newSelected.splice(idx, 1);
		} else {
			newSelected.push(tag);
		}
		changeSelected(newSelected);
		onChange(newSelected);
	};

	return (
		<div className={classes.root}>
			Filter by tags:
			{tags.map(tag => (
				<Badge
					key={tag}
					onClick={() => toggleBadge(tag)}
					variant={selected.indexOf(tag) !== -1 ? 'primary' : 'secondary'}
				>
					{tag}
				</Badge>
			))}
		</div>
	);
};

Badges.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default injectSheet(styles)(Badges);