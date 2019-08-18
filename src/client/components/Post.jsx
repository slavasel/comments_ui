import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import TaleMarkup from './TaleMarkup.jsx';

const styles = theme => ({
	postRoot: props => ({
		padding: '10px',
		background: props.isSelected || props.embeded ? theme.colorBackground : '#fff',
		borderBottom: props.embeded ? 'none' : '1px solid #ccc',
		fontSize: theme.textFontSize,
		cursor: props.isSelected || props.embeded ? 'default' :'pointer',
	}),
	postTitle: {
		fontSize: '11px',
		textTransform: 'uppercase',
	},
	postBody: {
		color: theme.textColor,
		textAlign: 'justify',
	},
	user: {
		textAlign: 'right',
		fontStyle: 'italic',
	},
});

const Post = (props) => {
	const { data, isSelected, classes, loadComments } = props;

	const selectTPost = () => {
		if (!isSelected) {
			loadComments(data.id);
		}
	};
	return (
		<div
			className={classes.postRoot}
		  onClick={selectTPost}
		>
			<h4 className={classes.postTitle}>
				{data.title}
			</h4>
			<div className={classes.postBody}>
				<TaleMarkup text={data.body} />
			</div>
			<div className={classes.user}>
				{data.user}
			</div>
		</div>
	);
};

Post.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	loadComments: PropTypes.func,
	isSelected: PropTypes.bool,
	embeded: PropTypes.bool,
};

Post.defaultProps = {
	isSelected: false,
	embeded: false,
	loadComments: () => {},
};

export default injectSheet(styles)(Post);