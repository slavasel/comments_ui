import {
	REQUEST_POSTS_SUCCESS, REQUEST_POSTS_FAIL,
	REPLACE_POST_USERNAME_SUCCESS,
	REQUEST_POST_COMMENTS_SUCCESS, REQUEST_POST_COMMENTS_FAIL,
	ADD_POST_COMMENT_SUCCESS, ADD_POST_COMMENT_FAIL,
} from '../actions/post_actions.js'
import dataHelper from '../helpers/dataHelper';

const initialState = {
	posts: [],
	comments: [],
	tags: [],
	users: [],
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_POSTS_SUCCESS: {
			const newState = { ...state };
			newState.posts = action.posts;
			return newState;
		}
		case REPLACE_POST_USERNAME_SUCCESS: {
			const newState = { ...state };
			const { users } = action;
			const newPosts = state.posts.map((post) => {
				const newPost = { ... post };
				users.forEach((user) => {
					 if (user.id === post.userId) {
					 	newPost.user = user.name;
					 }
				});
				return newPost;
			});
			newState.posts = newPosts;
			return newState;
		}
		case REQUEST_POST_COMMENTS_SUCCESS: {
			const newState = { ...state };
			const { comments } = action;
			const tags = dataHelper.findTags(comments);
			newState.tags = tags;
			const users = dataHelper.findUsers(comments);
			newState.users = users;
			newState.comments = dataHelper.parseComments(comments);
			return newState;
		}
		case ADD_POST_COMMENT_SUCCESS: {
			const newState = { ...state };
			const { data } = action;
			const comments = [...newState.comments];
			comments.unshift(data);
			const tags = dataHelper.findTags(comments);
			newState.tags = tags;
			newState.comments = dataHelper.parseComments(comments);
			return newState;
		}
		case REQUEST_POSTS_FAIL:
		case REQUEST_POST_COMMENTS_FAIL:
		case ADD_POST_COMMENT_FAIL:
			return Object.assign(state, { error: action.error });
		default:
			return state
	}
};

export default postReducer