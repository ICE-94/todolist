import React, {
	createContext,
	useState,
} from 'react';
import firebase from 'firebase';

const firebaseConfig = {
	apiKey:
		'AIzaSyCTRBYgCT1RXbP97b8ap5zEYekUKUscPC0',
	authDomain: 'todolist-e11c9.firebaseapp.com',
	databaseURL:
		'https://todolist-e11c9.firebaseio.com',
	projectId: 'todolist-e11c9',
	storageBucket: 'todolist-e11c9.appspot.com',
	messagingSenderId: '290029560930',
	appId:
		'1:290029560930:web:5a35a2901faa65ccc85d3b',
	measurementId: 'G-KYGZVVEEM6',
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const storage = firebase.storage();

export const login = (user) => {
	if (user) {
		return null;
	}
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope(
		'https://www.googleapis.com/auth/contacts.readonly'
	);
	provider.setCustomParameters({
		login_hint: 'user@example.com',
	});

	return firebase
		.auth()
		.signInWithPopup(provider);
};

export const logout = () => {
	return firebase.auth().signOut();
};

export const getFireDB = () => {
	return database.ref('/').once('value');
};

export const setTest = () => {
	database.ref('/test').set({
		0: { test: 'test입니다' },
		1: { test: 'test입니다2' },
	});
};

export const updateTodoElement = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const userRef = database.ref(`/users`);
			const result = await userRef
				.child(
					`${firebase.auth().currentUser.uid}`
				)
				.once('value');

			let index = 0;
			let count = 0;
			if (result.exists()) {
				index = result.val().length;

				const KEYS = Object.keys(data.imageFile);

				for (const key of KEYS) {
					const uploadTask = storage
						.ref(
							`/users/${
								firebase.auth().currentUser.uid
							}/${index}/image/${
								data.imageFile[key].name
							}`
						)
						.put(data.imageFile[key]);

					uploadTask.on(
						'state_changed',
						function (snapshot) {
							//중간중간 호출 되서
							//프로그래스바 그릴때 사용하거나
							//작업이 중지 됬을 때
							//작업이 다시 시작 됬을 때
						},
						function (error) {
							//에러발생하면 ㄱㄱ
						},
						function () {
							//작업이 성공적으로 모두 완료 된 후
							uploadTask.snapshot.ref
								.getDownloadURL()
								.then(function (downloadURL) {
									data.imageURL.push(downloadURL);

									if (++count === KEYS.length) {
										database
											.ref(
												`/users/${
													firebase.auth()
														.currentUser.uid
												}/${index}`
											)
											.set(data);
									}
								});
						}
					);
				}
			} else {
				const KEYS = Object.keys(data.imageFile);

				for (const key of KEYS) {
					const uploadTask = storage
						.ref(
							`/users/${
								firebase.auth().currentUser.uid
							}/${index}/image/${
								data.imageFile[key].name
							}`
						)
						.put(data.imageFile[key]);

					uploadTask.on(
						'state_changed',
						function (snapshot) {},
						function (error) {},
						function () {
							uploadTask.snapshot.ref
								.getDownloadURL()
								.then(function (downloadURL) {
									data.imageURL.push(downloadURL);

									if (++count === KEYS.length) {
										database
											.ref(
												`/users/${
													firebase.auth()
														.currentUser.uid
												}/${index}`
											)
											.set(data);
									}
								});
						}
					);
				}
			}
			resolve(index);
		} catch (error) {
			reject(error);
		}
	});
};

export const download = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			//이부분에서 데이터 베이스 긁어 와야함
			const data = await database
				.ref(
					`/users/${
						firebase.auth().currentUser.uid
					}`
				)
				.once('value');
			//긁어온 데이터에서 이미지 항목에서 이미지 이름들 반복문 돌림
			//반복문 안에서 그 이름 가지고 ref 걸어서 경로 접근하고
			if (data.exists()) {
				resolve(data.val());
			} else {
				reject('data not found');
			}
		} catch (err) {
			reject(err);
		}
	});
};

export const addOnAuthChange = (setUser) => {
	firebase
		.auth()
		.onAuthStateChanged((connectedUser) => {
			if (connectedUser != null) {
				setUser(connectedUser);
			}
		});
};

export const test = () => {
	console.log(firebase.auth().currentUser);
};

// // console.log(firebase);
// firebase.initializeApp(firebaseConfig);

// // if (!firebase.apps.length) {
// //   firebase.initializeApp(firebaseConfig);
// // }

// //////////////log in
// export const addOnAuthChange = (setUser) => {
//   firebase.auth().onAuthStateChanged((connectedUser) => {
//     if (connectedUser != null) {
//       setUser(connectedUser);
//     }
//   });
// };

// export const logIn = async () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   provider.addScope(
//     'https://www.googleapis.com/auth/contacts.readonly',
//   );
//   //firebase.auth().languageCode = 'pt';
//   provider.setCustomParameters({
//     login_hint: 'user@example.com',
//   });

//   try {
//     const result = await firebase.auth().signInWithPopup(provider);
//     // const token = result.credential.accessToken;
//     // const user

//     console.log(result);

//     return true;
//   } catch (error) {

//     console.log(error);
//     // Handle Errors here.
//     // var errorCode = error.code;
//     // var errorMessage = error.message;
//     // The email of the user's account used.
//     // var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     // var credential = error.credential;
//     // ...
//     return false;
//   }
// };
// ////////////////////

// //////////////log out
// export const logOut = async (setUser) => {
//   try {
//     await firebase.auth().signOut();
//     setUser(null);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };
// /////////////////////

/////////////////context
export const FirebaseContext = createContext();

export const FirebaseProvider = ({
	children,
}) => {
	const [user, setUser] = useState(null);

	const context = {
		user,
		setUser,
	};

	return (
		<FirebaseContext.Provider value={context}>
			{children}
		</FirebaseContext.Provider>
	);
};
////////////////////////
