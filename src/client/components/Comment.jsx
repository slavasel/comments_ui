import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';


const styles = theme => ({
	commentRoot: props => ({
		padding: '10px',
		background: '#fff',
		border: '1px solid #ccc',
		borderRadius: '10px',
		fontSize: theme.textFontSize,
		margin: '10px',
	}),
	commentTitle: {
		fontSize: '11px',
		textTransform: 'uppercase',
	},
	commentBody: {
		color: theme.textColor,
		textAlign: 'justify',
	},
	email: {
		float: 'right',
		cursor: 'pointer',
	},
});

const Comment = (props) => {
	const { data, classes } = props;
	return (
		<div className={classes.commentRoot}>
			<h4 className={classes.commentTitle}>
				{data.name}
			</h4>
			<div className={classes.commentBody} dangerouslySetInnerHTML={{
				__html: data.body
			}} />
			<span className={classes.email}>
				{data.email}
			</span>
			<div className="clearfix" />
		</div>
	);
};

Comment.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectSheet(styles)(Comment);