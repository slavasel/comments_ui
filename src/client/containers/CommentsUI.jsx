import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import Loader from '../components/Loader.jsx';
import Post from '../components/Post.jsx';
import Comments from '../components/Comments.jsx';
import * as postActions from '../actions/post_actions.js';
import * as userActions from '../actions/user_actions.js';

const styles = theme => ({
	frame: {
		background: theme.colorBackground,
	},
	header: {
		background: theme.colorHeaderBackground,
		color: '#6d6d6d',
		margin: '0',
		padding: '10px 20px',
		fontSize: '24px',
	},
	select: {
		fontSize: '12px',
		margin: '7px',
		color: '#6d6d6d',
		'& select': {
			display: 'block',
		}
	},
});


class CommentsUI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			commentsLoading: false,
			currentPost: {},
		};
		this.loadComments = this.loadComments.bind(this);
		this.filterPosts = this.filterPosts.bind(this);
	}
	componentDidMount() {
		this.fetchData();
	}
	fetchData() {
		const { userActions, postActions } = this.props;
		// Get list of users. Will be used for user linking and display
		userActions.requestUsers().then(() => {
			// Get list of posts
			postActions.requestPosts().then(() => {
				const { users, posts } = this.props;
				// Replace user ids by the real names
				postActions.replaceIdsByName(users);
				if (posts.length) {
					// Get first post comments
					const firstPostId = posts[0].id;
					this.loadComments(firstPostId);
				}
				this.setState({ loading: false });
			});
		});
	}
	loadComments(postId) {
		this.setState({ commentsLoading: true, selectedId: postId });
		this.scrollToTop();

		const { postActions, posts } = this.props;
		postActions.requestComments(postId).then(() => {
			const currentPost = posts.find(post => post.id === postId);
			this.setState({ commentsLoading: false, currentPost });
		});
	}
	filterPosts(event) {
		if (event && event.target) {
			const { value } = event.target;
			const { posts } = this.props;
			let filteredPosts;
			if (value !== 'none') {
				filteredPosts = posts.filter(p => p.userId === parseInt(value, 10));
			} else {
				filteredPosts = [...posts];
			}
			this.setState({ filteredPosts }, () => {
				this.loadComments(filteredPosts[0].id);
			});
		}
	}
	scrollToTop() {
		window.scrollTo(0,0);
	}
	render() {
		const { classes, users, posts } = this.props;
		const { loading, commentsLoading, selectedId, currentPost, filteredPosts } = this.state;
		const selectedPosts = filteredPosts || posts;
		return (
			<div>
				{loading
					? (<Loader />)
					: (
						<div>
							<h1 className={classes.header}>Comments UI</h1>
							<Container fluid>
								<Row className={classes.frame}>
									{/* POSTS SECTION */}
									<Col md="4">
										<div className={classes.select}>
											Filter posts by creator:
											<select onChange={this.filterPosts}>
												<option value="none">All</option>
												{users.map(user => (
													<option value={user.id} key={user.id}>{user.name}</option>
												))}
											</select>
										</div>
										{selectedPosts.map((post, key) => (
											<Post
												key={post.id}
												data={post}
												loadComments={this.loadComments}
											  isSelected={selectedId === post.id}
											/>
										))
										}
									</Col>
									{/* COMMENTS SECTION */}
									<Col md="8">
										{commentsLoading ? (
											<div className="position-relative padding-50-procent">
												<Loader />
											</div>
											) : (
												<div>
													<Post
														data={currentPost}
													  embeded
													/>
													<Comments
														postId={selectedId}
													  isLoading={commentsLoading}
													/>
												</div>
											)
										}
									</Col>
							</Row>
						</Container>
					</div>
				)}
			</div>
		)
	}
}

CommentsUI.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.any).isRequired,
	users: PropTypes.arrayOf(PropTypes.any).isRequired,
	postActions: PropTypes.objectOf(PropTypes.any).isRequired,
	userActions: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => {
	return {
		posts: state.postStore.posts || [],
		comments: state.postStore.comments || {},
		users: state.userStore.users || [],
	}
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	postActions: bindActionCreators(postActions, dispatch),
	userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
	injectSheet(styles)(CommentsUI)
);