import axios from 'axios';
import { config } from '../globalConfig.js';
import mockHelper from '../helpers/mockHelper.js';

export const REQUEST_POSTS_SUCCESS = 'REQUEST_POSTS_SUCCESS';
export const REQUEST_POSTS_FAIL = 'REQUEST_POSTS_FAIL';
export function requestPosts() {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios.get(`${config.publicApiUrl}/posts`) // use public api
				.then(function (posts) {
					dispatch({ type: REQUEST_POSTS_SUCCESS, posts: posts.data });
					resolve();
				})
				.catch(function (error) {
					dispatch({ type: REQUEST_POSTS_FAIL, error });
					reject();
				});
		});
	};
};

export const REPLACE_POST_USERNAME_SUCCESS = 'REPLACE_POST_USERNAME_SUCCESS';
export function replaceIdsByName(users) {
	return dispatch => dispatch({ type: REPLACE_POST_USERNAME_SUCCESS, users });
};

export const REQUEST_POST_COMMENTS_SUCCESS = 'REQUEST_POST_COMMENTS_SUCCESS';
export const REQUEST_POST_COMMENTS_FAIL = 'REQUEST_POST_COMMENTS_FAIL';
export function requestComments(postId) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios.get(`${config.publicApiUrl}/comments?postId=${postId}`) // use public api
				.then(function (comments) {
					const { data } = comments;
					const extendedComments = mockHelper.addTags(data);
					dispatch({
						type: REQUEST_POST_COMMENTS_SUCCESS,
						comments: extendedComments,
					});
					resolve();
				})
				.catch(function (error) {
					dispatch({ type: REQUEST_POST_COMMENTS_FAIL, error });
					reject();
				});
		});
	};
};

export const ADD_POST_COMMENT_SUCCESS = 'ADD_POST_COMMENT_SUCCESS';
export const ADD_POST_COMMENT_FAIL = 'ADD_POST_COMMENT_FAIL';
export function addComment(requestData) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios.post(`${config.publicApiUrl}/comments?postId=${requestData.postId}`, requestData) // use public api
				.then(function (comment) {
					dispatch({
						type: ADD_POST_COMMENT_SUCCESS,
						data: comment.data,
					});
					resolve();
				})
				.catch(function (error) {
					dispatch({ type: ADD_POST_COMMENT_FAIL, error });
					reject();
				});
		});
	};
};

