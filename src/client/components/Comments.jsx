import React, { useState } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { useSelector } from 'react-redux';
import PieChart from 'react-minimal-pie-chart';
import { Row, Col } from 'react-bootstrap';
import hookHelper from '../helpers/hookHelper';
import dataHelper from '../helpers/dataHelper';
import * as postActionsFuncs from '../actions/post_actions';
import Comment from './Comment.jsx';
import CommentForm from './CommentForm.jsx';
import Badges from './Badges.jsx';
import Loader from './Loader.jsx';

const styles = theme => ({
	root: {
		'& h3': {
			fontSize: '15px',
			color: '#6d6d6d',
			margin: '10px',
		},
	},
	loader: {
		position: 'relative',
		padding: '50px',
	},
	chart: {
		height: '200px',
	},
	chartLabels: {
		fontSize: '12px',
		height: '30px',
		margin: '7px',
	},
});

const Comments = (props) => {
	// ACTION CREATORS
	const postActions = hookHelper.useActions(postActionsFuncs);

	// STORE VARIABLES
	const comments = useSelector(state => state.postStore.comments);
	const tags = useSelector(state => state.postStore.tags);
	const users = useSelector(state => state.postStore.users);

	// STATE VARIABLES
	const [submitting, toggleSubmit] = useState(false);
	const [filteredComments, changeFiltered] = useState(comments);

	// PROPS VARIABLES
	const { postId, classes } = props;

	// FUNCTIONS
	const filterComments = (tags) => {
		if (tags.length) {
			changeFiltered(dataHelper.filterByTags(comments, tags));
		} else {
			changeFiltered(comments);
		}
	};

	const addComment = (comment) => {
		toggleSubmit(true);
		postActions.addComment({
			body: comment,
			name: 'myUser',
			email: 'my-user@domain.com',
			postId,
		}).then(() => {
			changeFiltered(false);
			toggleSubmit(false);
		});
	};

	const onlyUnique = (value, index, self) => {
		return self.indexOf(value) === index;
	};

	// DATA PREPARATION
	const chartData = dataHelper.prepareTagsChart(tags);
	const uniqueTags = tags.filter(onlyUnique);
	const uniqueUsers = users.filter(onlyUnique);
	const selectedComments = filteredComments || comments;
	return (
		<div className={classes.root}>
			<h3>Comments</h3>

			{/* COMMENT FORM */}
			{submitting
				? <div className={classes.loader}>
						<Loader />
					</div>
				: <CommentForm
						onAdd={addComment}
						tags={uniqueTags}
						users={uniqueUsers}
					/>
			}

			{/* LIST OF COMMENTS */}
			{!submitting ? (
				<Badges tags={uniqueTags} onChange={filterComments} />
			) : null}

			{selectedComments.map(comment => (
				<Comment
					data={comment}
					key={comment.id}
				/>
			))}
			<div className="clearfix" />

			{/* CHART */}
			<h3>Most popular tags</h3>
			<Row>
				<Col md={6}>
					{Object.keys(chartData).map(key => (
						<div key={chartData[key].title} className={classes.chartLabels}>
							{chartData[key].title}
							<div style={{
								background: chartData[key].color,
								width: '25px',
								height: '25px',
								float: 'left',
								margin: '0 5px'
							}} />
						</div>
					))}
				</Col>
				<Col md={6}>
					<PieChart
						className={classes.chart}
						data={chartData}

						label
						labelStyle={{
							fontSize: '5px',
							fontFamily: 'sans-serif',
							fill: '#fff'
						}}
					/>

				</Col>
			</Row>
		</div>
	);
};

Comments.propTypes = {
	postId: PropTypes.number.isRequired,
};

export default injectSheet(styles)(Comments);