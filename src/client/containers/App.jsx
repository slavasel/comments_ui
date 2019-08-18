import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { ThemeProvider } from 'react-jss'
import CommentsUI from './CommentsUI.jsx';
import userStore from '../reducers/user_store.js';
import postStore from '../reducers/post_store.js';
import theme from '../theme.js';

const store = createStore(
	combineReducers({
		postStore,
		userStore,
	}), applyMiddleware(thunk)
);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CommentsUI />
				</ThemeProvider>
			</Provider>
		)
	}
}

export default App;