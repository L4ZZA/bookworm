import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types'
import api from '../api'

// userLoggedIn action
export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	user
});

// userLoggedOut action
export const userLoggedOut = user => ({
	type: USER_LOGGED_OUT
});

export const login = credentials => dispatch => 
	api.user.login(credentials).then(user => {
		localStorage.bookwormJWT = user.token;
		// dispatch userLoggedIn action
		dispatch(userLoggedIn(user));
});

export const logout = () => dispatch => {
	// Remove token from local storage
	localStorage.removeItem("bookwormJWT");
	// dispatch userLoggedOut action
	dispatch(userLoggedOut());
};

export const confirm = token => dispatch =>
  	api.user.confirm(token).then(user => {
  	  	localStorage.bookwormJWT = user.token;
  	  	dispatch(userLoggedIn(user));
  	}
 );
