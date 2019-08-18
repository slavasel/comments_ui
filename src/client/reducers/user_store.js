import {
	REQUEST_USERS_SUCCESS, REQUEST_USERS_FAIL,
} from '../actions/user_actions.js'

const initialState = {
	users: [],
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_USERS_SUCCESS: {
			const newState = { ...state };
			newState.users = action.users;
			return newState;
		}
		case REQUEST_USERS_FAIL:
			return Object.assign(state, { error: action.error });
		default:
			return state
	}
};

export default postReducer