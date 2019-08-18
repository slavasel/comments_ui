import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Overlay } from 'react-bootstrap';


const styles = theme => ({
	tooltip: {
		width: '300px',
		borderRadius: '5px',
		padding: '5px 5px',
		background: '#f3f1f1',
		border: '1px solid #c7c7c7',
		fontSize: '13px',
	},
	item: {
		cursor: 'pointer',
		padding: '0 5px',
		'&:hover': {
			background: '#fffcfc',
		}
	},
});

const Suggestions = (props) => {
	// REFS
	const suggestionRef = useRef(null);

	// PROPS VARIABLES
	const { classes, show, data, element, onSelect } = props;

	// STATE
	const [selected, setSelected] = useState(-1);
	const [preparedData, changeData] = useState([]);

	// METHODS
	const listenerFunc = (event) => {
		// Up/Bottom/Return arrows listening
		if (event.keyCode === 40 && selected < data.length - 1) {
			setSelected(selected + 1);
		}
		if (event.keyCode === 38 && selected > 0) {
			setSelected(selected - 1);
		}
		if (event.keyCode === 13) {
			if (!preparedData[selected]) {
				onSelect(element);
			} else {
				onSelect(preparedData[selected]);
			}
		}
	};

	// LIFECYCLE
	useEffect(() => {
		let newData = data.filter(d => d.indexOf(element) !== -1);
		if (JSON.stringify(newData) !== JSON.stringify(preparedData)) {
			changeData(newData);
			setSelected(-1);
		}
	});

	useEffect(() => {
		window.addEventListener('keydown', listenerFunc);
		return () => {
			window.removeEventListener('keydown', listenerFunc);
		};
	}, [listenerFunc]);

	return (
		<div>
			<span ref={suggestionRef} />
			{preparedData.length ? (
				<Overlay target={suggestionRef.current} placement="right" show={show}>
					{({
						placement,
						scheduleUpdate,
						arrowProps,
						outOfBoundaries,
						show: _show,
						...props
					}) => (
						<div
							{...props}
							className={classes.tooltip}
						>
							{preparedData.map((item, key) => (
								<div
									key={item}
									className={classes.item}
									onClick={() => onSelect(item)}
									style={{
										background: key === selected ? '#fffcfc' : 'none'
									}}
								>
									{item}
								</div>
							))}
						</div>
					)}
				</Overlay>
			) : null}
		</div>
	);
};

Suggestions.propTypes = {
	show: PropTypes.bool.isRequired,
	onSelect: PropTypes.func.isRequired,
	element: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default injectSheet(styles)(Suggestions);