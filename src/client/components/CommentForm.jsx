import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Button } from 'react-bootstrap';
import Suggestions from './Suggestions.jsx';


const styles = theme => ({
	root: {
		padding: '10px',
	},
	textarea: {
		borderRadius: '10px',
		width: '100%',
		fontSize: theme.textFontSize,
		color: '#6d6d6d',
		outline: 'none',
		padding: '5px 10px',
	},
	button: {
		margin: '5px 0',
		float: 'right',
	}
});

const CommentForm = (props) => {
	// REFS
	const commentRef = useRef(null);

	// PROP VARIABLES
	const { onAdd, tags, users, classes } = props;

	// STATE VARIABLES
	const [comment, onCommentChange] = useState('');
	const [suggestions, toggleSuggestions] = useState({
		opened: false,
		element: '',
	});
	const [tagSuggestions, toggleTagSuggestions] = useState({
		opened: false,
		element: '',
	});

	// METHODS
	const parseString = (value, separator) => {
		const atIndex = value.indexOf(separator);
		return value.substring(atIndex + 1);
	};

	const onChange = (event) => {
		if (event && event.target) {
			const { value } = event.target;
			// Show suggestions for names
			const shouldShowSuggestions = value.indexOf('@') !== -1;
			toggleSuggestions({ opened: shouldShowSuggestions, element: parseString(value, '@') });

			// Show suggestions for tags
			const shouldShowTagSuggestions = value.indexOf('#') !== -1;
			toggleTagSuggestions({ opened: shouldShowTagSuggestions, element: parseString(value, '#') });

			// Update element
			onCommentChange(value);
		}
	};

	const selectGeneric = (value, type, selectedSuggestions, indicator) => {
		const newComment = comment
			.replace(`${indicator}${value}`, `[${type}=${value}]`) // custom
			.replace(`${indicator}${selectedSuggestions.element}`, `[${type}=${value}]`) // typed + selected
			.replace(indicator, `[${type}=${value}]`); // selected
		commentRef.current.focus();
		onCommentChange(newComment);
	};

	const selectName = (name) => {
		selectGeneric(name, 'to', suggestions, '@');
		toggleSuggestions({ opened: false, element: '' });
	};

	const selectTag = (tag) => {
		selectGeneric(tag, 'tag', tagSuggestions, '#');
		toggleTagSuggestions({ opened: false, element: '' });
	};

	const listenToArrows = event => {
		if (event.keyCode === 40 // bottom
			|| event.keyCode === 38 // up
			|| event.keyCode === 13 // return
		) {
			event.preventDefault();
		}
	};

	// LIFECYCLE
	useEffect(() => {
		commentRef.current.focus();
	}, []);

	return (
		<div className={classes.root}>
			<textarea
				className={classes.textarea}
				onChange={onChange}
				value={comment}
			  ref={commentRef}
				onKeyDown={listenToArrows}
			/>
			<Button
				className={classes.button}
				variant="outline-primary"
				size="sm"
				onClick={() => onAdd(comment)}
			>
				Add
			</Button>

			<Suggestions
				data={tags}
				element={tagSuggestions.element}
				show={tagSuggestions.opened}
				onSelect={selectTag}
			/>

			<Suggestions
				data={users}
				element={suggestions.element}
				show={suggestions.opened}
				onSelect={selectName}
			/>

			<div className="clearfix" />
		</div>
	);
};

CommentForm.propTypes = {
	onAdd: PropTypes.func.isRequired,
	tags: PropTypes.arrayOf(PropTypes.string),
	users: PropTypes.arrayOf(PropTypes.string),
};

CommentForm.defaultProps = {
	tags: [],
};

export default injectSheet(styles)(CommentForm);