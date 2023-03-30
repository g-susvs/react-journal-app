export const initialState = {
	status: 'checking',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const authenticatedState = {
	status: 'authenticated',
	uid: 'AFA13SD',
	email: 'jsus.savs@test1.com',
	displayName: 'Jesús Valencia',
	photoURL: 'https://profile.jpg',
	errorMessage: null,
};

export const notAuthenticatedState = {
	status: 'not-authenticated',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: undefined,
};

export const demoUser = {
	uid: 'AFA13SD',
	email: 'demo@google.com',
	displayName: 'Demo User',
	photoURL: 'https://demo.jpg',
};
