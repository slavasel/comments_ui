import axios from 'axios';
import { config } from '../globalConfig.js';

export const REQUEST_USERS_SUCCESS = 'REQUEST_USERS_SUCCESS';
export const REQUEST_USERS_FAIL = 'REQUEST_USERS_FAIL';
export function requestUsers() {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios.get(`${config.publicApiUrl}/users`) // use public api
				.then(function (users) {
					dispatch({ type: REQUEST_USERS_SUCCESS, users: users.data });
					resolve();
				})
				.catch(function (error) {
					dispatch({ type: REQUEST_USERS_FAIL, error });
					reject();
				});
		});
	};
}
